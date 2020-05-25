var arrayToTree = require('array-to-tree');
var allFindedFilters = [];
var startedNodes = [];
var tmpNode;
// Helper functions for filtering

const addParentNodesToAllFilters = (parent_id) => {
  startedNodes.forEach(node => {
    findNodeById(node, parent_id);
    if(!allFindedFilters.find(filter => filter.id === tmpNode.id)) {
      const { id, name, parent_id } = tmpNode;
      allFindedFilters.push({ id, name, parent_id });
      addParentNodesToAllFilters(parent_id);
    }
  })
}

const findNodeById = (node, nodeId) => {
  const isRequiredNode = node.id === nodeId;
  if(isRequiredNode) tmpNode = node;
  if(node.children && node.children.length) {
    node.children.forEach(child => findNodeById(child, nodeId));
  }
}

const findNodes = (node, filter) => {
  const isRequiredNode = matcher(filter, node);
  if(isRequiredNode) {
    const { id, name, parent_id } = node;
    if(!allFindedFilters.find(filter => filter.id === node.id)) {
      allFindedFilters.push({ id, name, parent_id });
    }
    if(!allFindedFilters.find(filter => filter.id === node.parent_id)) {
      addParentNodesToAllFilters(node.parent_id);
    }
  }
  if(node.children && node.children.length) node.children.forEach(child => {
    findNodes(child, filter)
  });
};

const matcher = (filterText, node) => {
  return node.name.toLowerCase().indexOf(filterText.toLowerCase()) !== -1;
};

export const filterTree = (node, filter) => {
  allFindedFilters = [];
  startedNodes = node;
  node.forEach(elem => findNodes(elem, filter));

  const filteredTree = arrayToTree(allFindedFilters);
  return openTree(filteredTree, true);
};

export const openTree = (node, bool) => {
  return node.map(function m(elem){
            if(elem.children && elem.children.length) {
              elem.toggled = bool;
              elem.children.map(m);
            }
            return elem;
          });
}

