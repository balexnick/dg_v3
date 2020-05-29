import React from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { withStyles } from '@material-ui/core/styles';
import { Treebeard, decorators, theme } from 'react-treebeard';
import { filterTree, openTree } from 'utils/searchFiltersInTree';
import { debounce } from 'utils/debounce';

theme.tree.base.backgroundColor = 'transparent'

const styles = {
  allCheckbox: {
    width: '36px',
    height: '28px',
  },
  treeCheckbox: {
    height: '30px'
  },
  formControlLabel: {
    color: '#000000'
  }
}

const findObjectById = function(obj, data) {
  if(obj.id === data.id) {
    obj = data;
  }
  else {
    for(let i in obj.children) {
      let foundId = findObjectById(obj.children[i], data);
      if(foundId) {
        obj.children[i] = foundId;
      }
    }
  }
  return obj;
};

class FilterTrees extends React.Component {

  constructor (props) {
    super(props)
    this.onToggle = this.onToggle.bind(this)
    this.state = {
      initialData: props.data.values,
      firstArray: props.data || {},
      data: props.data.values || [],
      activeTrees: props.activeTrees || {},
      selectExtraFilter: props.selectExtraFilter || null
    }

    decorators.Toggle = (props) => {
      const { height, width, wrapper, arrow, base } = props.style;
      const { onClick } = props;
      const midHeight = height * 0.5;
      const points = props.node.toggled ? `0,0 ${midHeight},${height} ${width},0` :`0,0 0,${height} ${width},${midHeight}`;
      return (
        <div
          style={base}
          onClick={onClick}
        >
          <div style={wrapper}>
            <svg height={height} width={width}>
              <polygon style={arrow} points={points}></polygon>
            </svg>
          </div>
        </div>
      );
    };

    decorators.Header = (props) => {
      const { style, node } = props;
      const { activeTrees } = this.state;
      return (
        <div style={style.base}>
          <div style={style.title}>
            <FormControlLabel
              control={
                <Checkbox
                  label={node.name}
                  checked={ activeTrees["index_"+node.id] || false }
                  classes={{ root: this.props.classes.treeCheckbox }}
                  color='primary'
                  onChange={() => this.onChangeCheckbox(node)}
                />
              }
              label={node.name}
              classes={{ root: this.props.classes.formControlLabel }}
            />
          </div>
        </div>
      );
    };

    decorators.Container = (props) => {
      const { node, decorators, onClick, style } = props
      //  
      return (
        <div>
            {node.children && !!node.children.length && <decorators.Toggle style={style.toggle} node={node} onClick={onClick}/>} 
            <decorators.Header style={style.header} node={node}/>
        </div>
      );
    };
  }

onToggle(node, toggled) {
  const { cursor, data } = this.state;

  if (cursor) this.setState({cursor, active: false});
  node.active = true;
  if (node.children.length) node.toggled = toggled;

  this.setState({ cursor: node, data });
}

onChangeCheckbox(node) {
  const { activeTrees, data, firstArray, selectExtraFilter } = this.state;
  let newActiveTrees = activeTrees;
  newActiveTrees["index_"+node.id] = !activeTrees["index_"+node.id];
  node.active = newActiveTrees["index_"+node.id];
  const newData = findObjectById(data, node);
  this.setState(
    { activeTrees: newActiveTrees, data: newData },
    () => selectExtraFilter(
      firstArray.verbose.toLowerCase(),
      firstArray.name,
      node,
      "tree"
    )
  )
}

  onChangeSearchInput = debounce(text => {
    const filter = text.trim();
    const { initialData } = this.state;
    if (!filter) {
      const toggledFilteredData = openTree(initialData, false);
      this.setState({data: toggledFilteredData});
      return;
    }
    let filtered = filterTree(initialData, filter);
    this.setState({data: filtered});
  }, 1000);

  render () {
    const { data } = this.state;
    const { checkedAllButton, handleAllOptionClickMainMenuItems, labelAllCheckbox } = this.props;
    return (
      <div className="tree-filters-wrap">
        <input
          className="filter-trees-search-input"
          onChange={(e) => this.onChangeSearchInput(e.target.value)}
          placeholder="Search"
          type="text"
        />
        <MenuItem
          onClick={handleAllOptionClickMainMenuItems}
          className='subheader-menuitem'
        >
          <Checkbox
            color="primary"
            classes={{ root: this.props.classes.allCheckbox }}
            checked={checkedAllButton}
          />
          {labelAllCheckbox}
        </MenuItem>
        <Treebeard
          data={data}
          onToggle={this.onToggle}
          decorators={decorators}
          style={theme}
        />
      </div>
    )
  }
}


export default withStyles(styles)(FilterTrees);