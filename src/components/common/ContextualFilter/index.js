import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import FilterList from '@material-ui/icons/FilterList';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import { cancelRequests } from 'utils/API';

const styles = theme => ({
  fab: {
    margin: theme.spacing(1),
    position: 'fixed',
    right: 0,
    width: 75,
    height: 75,
    marginTop: 50,
    zIndex: '11'
  },  

  subDoughter:{
    margin: '90px 50px 0 0',
    padding: '15px 15px 65px 15px', 
    background: '#fff', 
    borderRadius: '6px',
    position: 'fixed',
    right: '0',
    zIndex: '-1'
  }
});

class ContextualFilter extends Component {
  state = {
    isOpen: false,
    isCheckedFirst: true,
    isCheckedSecond: false
  }

  componentDidMount() {
    let data = this.props.contextualFilterData

    if(this.props.contextualFilterData.length > 0) {
      data.forEach(item => {
        if (item.type === 'radio') {
          this.setState({ valueRadio: item.values[0].title })
        }
      });
    }
    
    if(this.props.contextualFilterData.length === 0) {
      let i = 0
      let timerId = setInterval(() => {
        ++i
        if (i > 5) {
          clearInterval(timerId)
        }
  
        let data = this.props.contextualFilterData

        if(data.length > 0) {
          data.forEach(item => {
            if (item.type === 'radio') {
              this.setState({ valueRadio: item.values[0].title })
            }
          });
          clearInterval(timerId)
        }
      }, 1000);
    }
  }

  toggleModal = () => {
    this.setState({ isOpen: !this.state.isOpen });

    const { contextualFilterData } = this.props;

    if(contextualFilterData.length > 0) {
      contextualFilterData.forEach(item => {
        if (item.type === 'radio') {
          item.values[1].isChecked = false
        }
      });
    }
  }

  handleChange = (i, id) => {
    const { contextualFilterData, setContextualFilterData } = this.props;
    const newData = [...contextualFilterData];
    newData[i].values = contextualFilterData[i].values.map(item => {
      if (item.id === id) {
        return {
          ...item,
          isChecked: !item.isChecked,
        }
      }
      return item;
    });

    setContextualFilterData(newData);
  }
  
  handleChangeRadio = event => {
    const { contextualFilterData, setContextualFilterData } = this.props;
    const newData = [...contextualFilterData];

    newData[0].values = contextualFilterData[0].values.map(item => {
      if (item.id === 'oui') {
        return {
          ...item,
          isChecked: !this.state.isCheckedFirst,
        }
      }

      if (item.id === 'non') {
        return {
          ...item,
          isChecked: !this.state.isCheckedSecond,
        }
      }

      return item;
    });

    setContextualFilterData(newData);

    this.setState({
      valueRadio: event.target.value,
      isCheckedFirst: !this.state.isCheckedFirst,
      isCheckedSecond: !this.state.isCheckedSecond
    });
  };

  submitFilter = () => {
    let id = this.props.location.pathname.split('/').pop()
    this.props.setRequestId(id)
    this.props.getSubheaderPageData(this.props.selectedFilter)
    cancelRequests();
    this.props.setSnackBarSelectedFiltersAction();
    this.props.setDeletedFiltersIds([]);
  }

  handleOk = () => {
    this.submitFilter();
    this.setState({ isOpen: false });
  }

  handleAllOptionClick = (groupIndex, isAllChecked) => {
    const { contextualFilterData, setContextualFilterData } = this.props

    const newData = [...contextualFilterData]
    newData[groupIndex].values = contextualFilterData[groupIndex].values.map(item => {
      return {
        ...item,
        isChecked: !isAllChecked
      }
    })

    setContextualFilterData(newData)
  }

  renderOptions = () => {
    const { contextualFilterData } = this.props;
    const result = contextualFilterData.map((block, i) => {

      const isAllChecked = block.values.every(checkbox => checkbox.isChecked)

      // all option
      let allOption = ''

      if (block.type === "checkbox") {
        allOption = (
          <div key={'all'}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isAllChecked}
                  onChange={() => this.handleAllOptionClick(i, isAllChecked)}
                  value={'all'}
                  color="primary"
                  style={{ height: '30px' }}
                />
              }
              label={this.props.translates.buttons.all}
            />
          </div>
        );
      }

      let options = []

      if (block.type === "checkbox") {
        block.values.forEach((self) => {
          options.push(
            <div key={self.id}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={self.isChecked}
                    onChange={() => this.handleChange(i, self.id)}
                    value={self.title}
                    color="primary"
                    style={{ height: '30px' }}
                  />
                }
                label={self.title}
              />
            </div>
          )

        })
      }

      if (block.type === "radio") {
        let itemsRadio = []

        block.values.forEach((self, index) => {
          itemsRadio.push(
            <FormControlLabel
              value={self.title}
              control={<Radio />}
              label={self.title}
              key={'fcl_' + index}
            />
          )
        })

        options.push(
          <div key={i}>
            <RadioGroup onChange={this.handleChangeRadio} value={this.state.valueRadio}>
              { itemsRadio }
            </RadioGroup>
          </div>
        )
      }

      return (
        <div
          key={i}
          style={{ marginBottom: 10 }}
        >
          <div style={{ fontWeight: 600 }}>{block.verbose}</div>
          {[allOption, ...options]}
        </div>
      )
    })

    return result;
  }

  render() {
    const { isOpen } = this.state;
    const { classes, fetching, contextualFilterData } = this.props;
    const translates = this.props.translates
    if (fetching || contextualFilterData.length === 0) return null;
    return (
      <div className='contextual-filter' >
        <Fab
          color="primary"
          aria-label="Dropdown"
          className={classes.fab}
          onClick={this.toggleModal}
        >
          <FilterList style={{ fontSize: 50, marginTop: 5 }} />
        </Fab>

        {isOpen && (
          <div className={`sub ${classes.subDoughter}`}>
            <div style={{ maxHeight: 300, overflowY: 'auto' }}>
              <div>
                {this.renderOptions()}
              </div>
            </div>
            <Button
              variant='contained'
              onClick={this.handleOk}
              color="primary"
              style={{ bottom: '15px', position: 'absolute', left: '15px' }}
            >
              {translates.buttons.validate}
            </Button>
          </div>
        )}

      </div>
    );
  }
}


export default withRouter((withStyles(styles)(ContextualFilter)));
