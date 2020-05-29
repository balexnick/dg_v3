import React, {useEffect, useState, useRef} from 'react'
import RenderSubheaderElements from './SubheaderElements/RenderSubheaderElements'
import { withRouter } from 'react-router-dom';
import Chip from '@material-ui/core/Chip';
import RootRef from '@material-ui/core/RootRef';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import SaveFiltersModal from './SaveFiltersModal';
import GroupFiltersListModal from './GroupFiltersListModal'
import Snackbar from '@material-ui/core/Snackbar';

import './Subheader.scss'

const Subheader = (props) => {
  const {
    extraFilters, 
    selectedFilter, 
    translates, 
    activeTrees,
    selectFilter,
    setActiveTrees,
    menuOpened,
    snackBarFilters,
    setSnackBarSelectedFiltersAction,
    setDeletedFiltersIds,
    isOpenSaveFiltersModal,
    toggleSaveFiltersModal,
    saveDefaultGroupFilters,
    isShowSubheaderSnackbar,
    hideSubheaderSnackbar,
    subheaderSnackbarMessage,
    isOpenGroupFiltersModal,
    getGroupFiltersList,
    toggleGroupFiltersListModal,
    groupFiltersList,
    isLoadGroupFiltersList,
    setGroupFilters,
    deleteGroupFilter
  } = props
  const [checkedAllButton, setCheckedAllButton] = useState({})
  const [filterChanged, setFilterChanged] = useState(false)
  const [showMoreFilters, setShowMoreFilters] = useState(false)
  const selectedFiltersContainer = useRef(); 
  let selectedFiltersChips = {};

  useEffect(() => {
    setSnackBarSelectedFiltersAction()
  },[setSnackBarSelectedFiltersAction])

  const handleAllOptionClickMainMenuItems = (groupIndex) => {
    const newSelectedFilter = selectedFilter;
    const groupFilters = extraFilters[groupIndex];
    if (groupFilters.type === 'tree') {
      if (!checkedAllButton["index_"+groupFilters.name]) {
        checkedAllButton["index_"+groupFilters.name] = true;
        // select all filters in the tree - recursively
        const filterIds = selectedFilter.extra.map(elem => elem.id);
        groupFilters.values.forEach(function f(item) {
          if(!filterIds.find(id => "" + item.id === id)) { // if no filter is selected
            activeTrees["index_"+item.id] = true;
            item.id = item.id.toString();
            item.title = item.name;
            item.key = groupFilters.name;
            item.verbose = groupFilters.verbose.toLowerCase();
            newSelectedFilter.extra.push(item);
          }
          
          if(item.children && item.children.length) {
            item.children.forEach(f);
          }
        })

      } else {
        // remove group tree filters 
        checkedAllButton["index_"+groupFilters.name] = false;

        const filterIds = [];
        groupFilters.values.forEach(function f(elem) {
          activeTrees["index_"+elem.id] = false;
          filterIds.push(elem.id + "");
          if(elem.children && elem.children.length) {
            elem.children.forEach(f);
          }
        });

        newSelectedFilter.extra = selectedFilter.extra.filter(item => !filterIds.find(id => id === item.id));
      }
    }

    if (groupFilters.type === 'checkbox') {

      const filterIds = selectedFilter.extra.map(elem => elem.id);

      if(!checkedAllButton["index_"+groupFilters.name]) {
        groupFilters.values.forEach(item => {
          if(!filterIds.find(id => item.id === id)) {
            item.key = groupFilters.name;
            item.verbose = groupFilters.verbose.toLowerCase();
            newSelectedFilter.extra.push(item)
          }
        })
        checkedAllButton["index_"+groupFilters.name] = true;

      } else {
        // remove group checkbox filters 
        const filterIds = groupFilters.values.map(elem => {
          return elem.id;
        });

        newSelectedFilter.extra = selectedFilter.extra.filter(item => !filterIds.find(id => id === item.id));

        checkedAllButton["index_"+groupFilters.name] = false;
      }
    }
    selectFilter(newSelectedFilter);
    setActiveTrees(activeTrees);
    setFilterChanged(true)
    setCheckedAllButton(checkedAllButton)
    // this.forceUpdate()
  }

  const selectExtraFilter = (verbose, filterName, item, type = 'checkbox') => {
    const newSelectedFilter = JSON.parse(JSON.stringify(selectedFilter));
    const addedNewFilter = {};
    if(selectedFilter.extra.find(filter => filter.id === item.id.toString())) {
      newSelectedFilter.extra = selectedFilter.extra.filter(filter => filter.id !== item.id + "");
      checkedAllButton["index_"+filterName] = false;
    } else {
      switch(type) {
        case "tree": {
          addedNewFilter.id = item.id + "";
          addedNewFilter.title = item.name;
          addedNewFilter.key = filterName;
          addedNewFilter.verbose = verbose;
          break;
        }
        case "checkbox": {
          addedNewFilter.id = item.id + "";
          addedNewFilter.title = item.title;
          addedNewFilter.key = filterName;
          addedNewFilter.verbose = verbose;
          break;
        }
        default: 
          break;
      }

      newSelectedFilter.extra.push(addedNewFilter);

      const currentFilter = extraFilters.find(elem => elem.name === filterName);
      let groupFilterTotalLength = 0;
      switch(currentFilter.type) {
        case "tree": {
          currentFilter.values.forEach(function f(filter) {
            groupFilterTotalLength++;
            if(filter.children && filter.children.length) {
              filter.children.forEach(f);
            }
          })
          break;
        }
        case "checkbox": {
          groupFilterTotalLength = currentFilter.values.length;
          break;
        }
        default: {
          groupFilterTotalLength = currentFilter.values.length;
        }
      }

      const checkedFiltersInCurrentGroup = newSelectedFilter.extra.filter(filter => filter.key === currentFilter.name);

      if(checkedFiltersInCurrentGroup.length === groupFilterTotalLength) {
        checkedAllButton["index_"+filterName] = true;
      }

    }
    selectFilter(newSelectedFilter);

    setCheckedAllButton(checkedAllButton)
    setFilterChanged(true)
  }

  const submitFilter = () => {
    const {setRequestId, getSubheaderPageData} = props
    localStorage.setItem('selected-filters', JSON.stringify(selectedFilter));
    let id = props.location.pathname.split('/').pop()
    setRequestId(id)
    getSubheaderPageData(selectedFilter)
    setSnackBarSelectedFiltersAction();
    setDeletedFiltersIds([]);
    setFilterChanged(false)
  }

  const reinitializeFilters = () => {
    let newSelectedFilter = Object.assign({}, selectedFilter, { extra: [] })
    setActiveTrees({});
    setFilterChanged(true)
    setCheckedAllButton({})
    selectFilter(newSelectedFilter)
    submitFilter()
  }
  const toggleShowMoreSelectedFilters = () => {
    setShowMoreFilters(!showMoreFilters)
  }

  const handleSelectedFilterClick = (item) => {
    const { deletedFiltersIds } = props;
    console.log(props)
    if(!selectedFilter.extra.find(elem => elem.id === item.id)) {
      selectedFilter.extra.push({
        id: item.id,
        title: item.title,
        key: item.key,
        verbose: item.verbose
      })
      activeTrees["index_" + item.id] = true;
    }
    const newDeletedFiltersIds = deletedFiltersIds.filter(deletedId => deletedId !== item.id);
    selectFilter(selectedFilter);
    setActiveTrees(activeTrees);
    setDeletedFiltersIds(newDeletedFiltersIds);
  }

  const handleDeleteSelectedFilter = item => {
    const { deletedFiltersIds } = props;

    activeTrees["index_" + item.id] = false;

    selectedFilter.extra = selectedFilter.extra.filter((elem) => {
      return elem.id !== item.id && elem.key !== item.name
    })
    if (deletedFiltersIds.indexOf(item.id) === -1) {
      deletedFiltersIds.push(item.id)
    }

    selectFilter(selectedFilter);
    setActiveTrees(activeTrees);
    setDeletedFiltersIds(deletedFiltersIds);
    setFilterChanged(true)
  }


  const renderSelectedFilters = (filters) => {

    const { location, toggleSelectedFiltersExistence, deletedFiltersIds } = props;
    // console.log(props)
    const selectedFilters = []
    if (filters && filters.length > 0) {
      
      filters = filters.filter((el) => el.id !== '')
      filters.forEach((item, index) => {
        let label = ''
        if (item.hasOwnProperty('type') && item.type === 'extra') {
          label = (item.hasOwnProperty('title')) ? `${item.verbose} : ${item.title}` : item.name
        } else {
          label = (item.hasOwnProperty('title')) ? item.title : item.name
        }
        selectedFilters.push(
          <RootRef 
            key={`${index}-${item.id}`} 
            rootRef={(node) => selectedFiltersChips[`${index}`] = node}
          >
            <Chip
              id={item.id}
              style={{ margin: 4, backgroundColor: deletedFiltersIds.indexOf(item.id) > -1 ? '#ddd' : item.color }}
              label={label}
              onDelete={() => !deletedFiltersIds[item.id] && handleDeleteSelectedFilter(item)}
              onClick={() => handleSelectedFilterClick(item)}
            />
          </RootRef>
        )
      })
      
      const hideShowMoreBtn = selectedFilters.length < 20;
      let widthContainerSelectedFilters = 0;
      let countVisibleFilters = 0;
      let countHiddenFilters = 0;
      toggleSelectedFiltersExistence(true);

      if(!hideShowMoreBtn && selectedFiltersContainer.current && Object.keys(selectedFiltersChips).length) {
        
        widthContainerSelectedFilters = selectedFiltersContainer.current.getBoundingClientRect().width;
        
        let sumWidthChips = 0;

        for (let chip in selectedFiltersChips) {
          if(selectedFiltersChips[chip]) {
            let nodeStyle = window.getComputedStyle(selectedFiltersChips[chip])
            const rightMarginChip = parseFloat(nodeStyle.getPropertyValue('margin-right'));
            const leftMarginChip = parseFloat(nodeStyle.getPropertyValue('margin-left'));
            const sumMarginChip = rightMarginChip + leftMarginChip;
            sumWidthChips += selectedFiltersChips[chip].getBoundingClientRect().width + sumMarginChip;
            if (sumWidthChips < widthContainerSelectedFilters) {
              countVisibleFilters++
            } else break;
          } else {
            delete selectedFiltersChips[chip];
          }
        }


      }
      countHiddenFilters = selectedFilters.length - countVisibleFilters;
      
      const isHasEanContainer = location.pathname.includes('/ean');

      return (
        <div className={`selectedfilters ${isHasEanContainer ? 'padding-top-null' : ''}`}   >
          <div className='container' ref={selectedFiltersContainer}>
              { hideShowMoreBtn ? 
                selectedFilters : 
                <Collapse in={showMoreFilters} collapsedHeight='40px'>
                  {selectedFilters}
                </Collapse> }
              <Button onClick={submitFilter} disabled={deletedFiltersIds.length === 0} color='primary'>Valider</Button>
              <Button onClick={reinitializeFilters} color='primary' >Effacer tout</Button>
              <Button onClick={toggleSaveFiltersModal} color='primary' >Sauvegarder requête</Button>
              <Button onClick={toggleGroupFiltersListModal} color='primary' >Mes requêtes</Button>
          </div>
          <div className='show-more-selectedfilters' style={{ display: hideShowMoreBtn ? 'none' : 'flex' }}>
            <Button color='primary' onClick={toggleShowMoreSelectedFilters}>
            { !showMoreFilters ? `SHOW MORE FILTERS (${countHiddenFilters})` : 'SHOW LESS FILTERS' }
            { showMoreFilters ? <KeyboardArrowUp /> : <KeyboardArrowDown /> }
            </Button>
          </div>
        </div>
      )
    }

    toggleSelectedFiltersExistence(false);
    return null
  }

  const saveDefaultGroupFiltersFunc = (e) => {
    e.preventDefault();
    saveDefaultGroupFilters({ 
      defaultFiltersGroup: selectedFilter, 
      nameGroupFilters: e.target.filter_name.value 
    });
  }
  return (
    <div className='dg-subheader' style={{ paddingLeft: menuOpened ? 220 : 70 }}>
      <RenderSubheaderElements 
        extraFilter={extraFilters}
        selectedFilter={selectedFilter}
        translates={translates}
        checkedAllButton={checkedAllButton}
        handleAllOptionClickMainMenuItems={handleAllOptionClickMainMenuItems}
        activeTrees={activeTrees}
        selectExtraFilter={selectExtraFilter}
        filterChanged={filterChanged}
        submitFilter={submitFilter}
      />

      {renderSelectedFilters(snackBarFilters)}

      <SaveFiltersModal
        isOpenSaveFiltersModal={isOpenSaveFiltersModal}
        toggleSaveFiltersModal={toggleSaveFiltersModal}
        sendGroupFilters={saveDefaultGroupFiltersFunc}
      />

      <Snackbar
        open={isShowSubheaderSnackbar}
        autoHideDuration={4000}
        onClose={hideSubheaderSnackbar}
        message={subheaderSnackbarMessage}
      />

      <GroupFiltersListModal
        getGroupFiltersList={getGroupFiltersList}
        isOpenGroupFiltersModal={isOpenGroupFiltersModal}
        toggleGroupFiltersListModal={toggleGroupFiltersListModal}
        groupFiltersList={groupFiltersList}
        isLoadGroupFiltersList={isLoadGroupFiltersList}
        setGroupFilters={setGroupFilters}
        submitFilter={submitFilter}
        deleteGroupFilter={deleteGroupFilter}
      />
    </div>

  )
}


export default withRouter(Subheader)
