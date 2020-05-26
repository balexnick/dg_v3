import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu';
import FilterMenu from 'components/common/FilterMenu';

const styles = {
  mainFiltersPaper: {
    maxHeight: '350px',
  },
};

class RenderMenuItems extends PureComponent {
  render() {
    const { anchorEl, open, extraFilter, extraSelectedFilter, classes } = this.props;
    const { getExtraFiltersItems, handleFilterModalOpen, handleFilterModalClose } = this.props;
    const mainMenuItems = [];
    if (extraFilter.length) {
      extraFilter.forEach((value, key) => {
        mainMenuItems.push(
          <div className='custom-expansion-panel' data-test='test' key={'cep_'+key}>
            <Button
              style={{ background: '#fff' }}
              aria-owns={anchorEl ? 'simple-menu' : null}
              aria-haspopup="true"
              onClick={(e) => {handleFilterModalOpen(e, key)}}
            >
              {value.verbose}
              <span style={{ marginLeft: '5px', textTransform: 'initial', color: '#aaa' }} className='custom-expansion-panel-sum'>
                {'(' + extraSelectedFilter.filter(e => e.key === value.name).length + ')'}
              </span>
            </Button>
            <Menu
              id='simple-menu'
              anchorEl={anchorEl}
              open={Boolean(open[key])}
              onClose={handleFilterModalClose}
              disableAutoFocusItem
              classes={{ paper: classes.mainFiltersPaper }}
            >
              <div className="filters-form-wrap">
                <FilterMenu items={getExtraFiltersItems(value, key)} />
              </div>
            </Menu> 
          </div>
        )
      });
    }
    return mainMenuItems;
  }
}

export default withStyles(styles)(RenderMenuItems);