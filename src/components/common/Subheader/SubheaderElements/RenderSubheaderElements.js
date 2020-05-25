import React, { useState } from 'react'
import RenderMenuItems from './RenderMenuItems'
import { withStyles } from '@material-ui/core/styles';

import MenuItem from '@material-ui/core/MenuItem'
import Checkbox from '@material-ui/core/Checkbox'
import FilterTrees from '../FilterTrees'


const styles = {
  menuItem: {
    padding: '6px 4px',
    fontSize: '14px',
    height: '15px',
  },
  showMoreItemsBtn: {
    width: '16.66%',
    color: '#009688',
  }
}
const RenderSubheaderElements = (props) => {
  const {extraFilter, selectedFilter, translates} = props
  const [open, setOpen] = useState([])
  const [anchorEl, setAnchorEl] = useState(null)
  const [countSingleMenu, setCountSingleMenu] = useState(5)

  const handleFilterModalOpen = (e, key) => {
    open[key] = !open[key];
    setOpen(open)
    setAnchorEl(e.currentTarget)
  }   

  const handleFilterModalClose = () => {
    setOpen([])
    setAnchorEl(null)
  }

  const getExtraFiltersItems = (extraFilter, key) => { 
    const { classes, checkedAllButton, selectExtraFilter, handleAllOptionClickMainMenuItems, activeTrees } = props;
    let amountItems = countSingleMenu - 1;
    const widthMonitor = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (widthMonitor < 1000) amountItems = amountItems - 1
    if (widthMonitor > 1280) amountItems = amountItems + 1

    switch (extraFilter.type) {
      case "tree":
        return (
          <div className='filters-col justify'>
            <h4>{extraFilter.verbose}</h4>
            <div className='extrafilter' style={{ padding: '0 15px' }}>
              <FilterTrees
                data={extraFilter}
                selectExtraFilter = {
                  (verbose, filterName, item, type = 'checkbox') => selectExtraFilter(verbose, filterName, item, type)
                }
                activeTrees={activeTrees}
                checkedAllButton={checkedAllButton["index_"+extraFilter.name] || false}
                handleAllOptionClickMainMenuItems={() => handleAllOptionClickMainMenuItems(key)}
                labelAllCheckbox={translates.buttons.all}
              />
            </div>
          </div>
        )
      case "checkbox":
        return (
          <div className='filters-col justify'>
            <h4 style={{ marginTop: 0 }}>{extraFilter.verbose}</h4>
            <div className={key + 1 > amountItems ? 'extrafilter-more' : 'extrafilter'}>
              <div>
                <MenuItem
                  classes={{ root: classes.menuItem }}
                  key={key}
                  onClick={() => handleAllOptionClickMainMenuItems(key)}
                >
                  <Checkbox
                    value={'all'}
                    color="primary"
                    checked={ checkedAllButton["index_"+extraFilter.name] || false }
                  />
                  {translates.buttons.all}
                </MenuItem>
              </div>
              {
                extraFilter.values.map((item, key) => (
                  <MenuItem
                    classes={{ root: classes.menuItem }}
                    key={key}
                    onClick={() => selectExtraFilter(extraFilter.verbose, extraFilter.name, item)}
                  >
                    <Checkbox
                      label={item.title}
                      checked={selectedFilter.extra.findIndex(r => r.id === item.id && r.key === extraFilter.name) > -1}
                      value={item.id}
                      color='primary'
                    />
                    {item.title}
                  </MenuItem>
                ))
              }
            </div>
          </div>
        )
      default:
        break
    }
  }

  return (
    <div className='subheader-filters'>
      <div className='subheader-filters-buttons'>
        <RenderMenuItems
          open={open}
          anchorEl={anchorEl}
          extraFilter={extraFilter.slice(0, countSingleMenu)}
          extraSelectedFilter={selectedFilter.extra}
          getExtraFiltersItems={getExtraFiltersItems}
          handleFilterModalOpen={handleFilterModalOpen}
          handleFilterModalClose={handleFilterModalClose}
          translates={translates}
        />
      </div>
    </div>
  )
}

export default withStyles(styles)(RenderSubheaderElements);
