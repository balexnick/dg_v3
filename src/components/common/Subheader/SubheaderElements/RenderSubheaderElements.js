import React, { useState } from 'react'
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem'
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'

import RenderMenuItems from './RenderMenuItems'
import RenderMoreFilters from './RenderMoreFilters'
import ExtraMoreItems from './ExtraMoreItems'
import FilterTrees from '../FilterTrees'


const styles = {
  showMoreItemsBtn: {
    width: '16.66%',
    color: '#009688',
  }
}
const COUNT_MANY_FILTERS = 8;

const RenderSubheaderElements = (props) => {
  const {
    filterChanged,
    extraFilter, 
    selectedFilter, 
    translates,
    classes, 
    checkedAllButton, 
    selectExtraFilter, 
    handleAllOptionClickMainMenuItems, 
    activeTrees,
    submitFilter
  } = props

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

  const handleValidate = () => {
    submitFilter();
    setOpen([])
  }

  const getExtraFiltersItems = (extraFilter, key) => { 
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
                  className='subheader-menuitem'
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
                    className='subheader-menuitem'
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

  const getMoreExtraFiltersItems = (extraFilter, key) => {
    let amountItems = countSingleMenu - 1;
    const widthMonitor = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (widthMonitor < 1000) amountItems = amountItems - 1;
    if (widthMonitor > 1280) amountItems = amountItems + 1;

    const isHideManyFilers = extraFilter.values.length > COUNT_MANY_FILTERS;

    if(extraFilter.type === 'checkbox') {
      return (
        <div className='filters-col justify'>
          <h4 style={{ marginTop: 0 }}>{extraFilter.verbose}</h4>
          <div className={key + 1 > amountItems ? 'extrafilter-more' : 'extrafilter'}>
            <div>
              <MenuItem
                className='subheader-menuitem'
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
            {isHideManyFilers ? (
              <ExtraMoreItems 
                classes={classes}
                extraFilter={extraFilter}
                selectExtraFilter={selectExtraFilter}
                selectedFilter={selectedFilter}
                countManyFilters={COUNT_MANY_FILTERS}
              />
            ) : (
              extraFilter.values.map((item, key) => (
                <MenuItem
                  className='subheader-menuitem'
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
            )}
          </div>
        </div>
      )
    }

    if(extraFilter.type === 'tree') {
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
              labelAllCheckbox={this.getTranslates().buttons.all}
            />
          </div>
        </div>
      )
    }

    return null;
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

        <RenderMoreFilters 
          anchorEl={anchorEl}
          isShow={extraFilter.length > countSingleMenu}
          isOpen={Boolean(open[countSingleMenu])}
          extraFilter={extraFilter.slice(countSingleMenu)}
          countSingleMenu={countSingleMenu}
          getExtraFiltersItems={getMoreExtraFiltersItems}
          handleFilterModalOpen={handleFilterModalOpen}
          handleFilterModalClose={handleFilterModalClose}
          translates={translates}
        />
      </div>

      <Button
        variant='contained'
        color='primary'
        disabled={!filterChanged}
        onClick={handleValidate}
        style={{ height: '40px' }}
      >
        {translates.buttons.validate}
      </Button>
    </div>
  )
}

export default withStyles(styles)(RenderSubheaderElements);
