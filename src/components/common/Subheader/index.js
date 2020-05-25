import React, {useState} from 'react'
import { connect } from 'react-redux'
import RenderSubheaderElements from './SubheaderElements/RenderSubheaderElements'

import './Subheader.scss'
const Subheader = (props) => {
  const {
    extraFilters, 
    selectedFilter, 
    translates, 
    activeTrees,
    selectFilter,
    setActiveTrees
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

  return (
    <div className='dg-subheader'>
      <RenderSubheaderElements 
        extraFilter={extraFilters}
        selectedFilter={selectedFilter}
        translates={translates}
        checkedAllButton={checkedAllButton}
        handleAllOptionClickMainMenuItems={handleAllOptionClickMainMenuItems}
        activeTrees={activeTrees}
        // filterChanged={filterChanged}
        // submitFilter={this.submitFilter}
        // selectExtraFilter={this.selectExtraFilter}
        // locale={locale}
      />
    </div>
  )
}

const mapStateToProps = store => ({
  extraFilters : store.app.extraFilters,
  selectedFilter: store.app.selectedFilter,
  activeTrees: store.app.activeTrees,
})

export default connect(mapStateToProps, null)(Subheader)
