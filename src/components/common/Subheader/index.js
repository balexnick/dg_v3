import React, {useState} from 'react'
import { connect } from 'react-redux'
import RenderSubheaderElements from './SubheaderElements/RenderSubheaderElements'
import { withRouter } from 'react-router-dom';
import './Subheader.scss'

const Subheader = (props) => {
  const {
    extraFilters, 
    selectedFilter, 
    translates, 
    activeTrees,
    selectFilter,
    setActiveTrees,
    menuOpened
  } = props

  const [checkedAllButton, setCheckedAllButton] = useState({})
  const [filterChanged, setFilterChanged] = useState(false)


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
    </div>
  )
}

const mapStateToProps = store => ({
  extraFilters : store.app.extraFilters,
  selectedFilter: store.app.selectedFilter,
  activeTrees: store.app.activeTrees,
})

export default withRouter(connect(mapStateToProps, null)(Subheader))
