import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu';
import FilterMenu from 'components/common/FilterMenu';

const styles = {
  moreFiltersPaper: {
    maxHeight: '350px',
    width: 1150,
    top: '13px !important',
  },
}

class RenderMoreFilters extends PureComponent {
    render() {
      const { countSingleMenu, anchorEl, classes, extraFilter, isShow, isOpen } = this.props;
      const { getExtraFiltersItems, handleFilterModalOpen, handleFilterModalClose, translates } = this.props;
      const moreFilters = [];
      if(!isShow) return null;
      extraFilter.forEach((value, key) => {
        moreFilters.push(
          <FilterMenu
            key={key}
            items={getExtraFiltersItems(value, key + countSingleMenu)}
          />
        )
      })
      return ( 
        <div className='custom-expansion-panel'>
          <Button
            style={{ background: '#fff' }}
            aria-owns={anchorEl ? 'simple-menu' : null}
            aria-haspopup="true"
            onClick={(e) => {handleFilterModalOpen(e, countSingleMenu)}}
          >
            {translates.subheader.extrafilters.title}
          </Button>
          <Menu
            id='simple-menu'
            anchorEl={anchorEl}
            disableAutoFocusItem
            open={isOpen}
            onClose={handleFilterModalClose}
            classes={{ paper: classes.moreFiltersPaper }}
          >
            <div className="more-filters-form-wrap">
              { moreFilters }
            </div>
          </Menu>
        </div>
      )
    }
}

export default withStyles(styles)(RenderMoreFilters);