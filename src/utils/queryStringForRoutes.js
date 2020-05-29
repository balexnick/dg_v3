import {dataRangeQueryParser} from './dataRangeQueryParser';
import {contextualFilterQueryParser} from './contextualFilter';
import API from './API'
import {store} from 'store'
import {getFiltersAndCategoriesFailure} from 'store/app/actions';

export const queryStringForRoutes = async (filter, contextualFilterData) => {

  try {
    let allFilters = JSON.parse(sessionStorage.getItem('all_filters'));

    if(!allFilters) {
      allFilters = await refreshFilters();
    }

    return getFiltersQueryString(allFilters, filter, contextualFilterData);

  } catch (e) {
      const allFiltersForError = await refreshFilters();

      return getFiltersQueryString(allFiltersForError, filter, contextualFilterData);
  }
};

const getFiltersQueryString = (allFilters, filter, contextualFilterData) => {
  
  if(!(filter && filter.extra)) return '';

  let checkedFilter = {};

  let qs = contextualFilterQueryParser(contextualFilterData);

  const extraFilterGroupedByKey = [...filter.extra.reduce((hash, { id, key }) => {
    const current = hash.get(key) || { key, ids: [] }
    current.ids.push({ id })
    return hash.set(key, current)
  }, new Map()).values()]

  extraFilterGroupedByKey.forEach((extraFilter) => {
    checkedFilter = allFilters.find(filter => filter.name === extraFilter.key)
    
    let countFilterPoints = 0
    switch(checkedFilter.type) {
      case "tree": {
        // count of filters in the tree
        checkedFilter.values.forEach(function f(item) {
          countFilterPoints++;
          if(item.children && item.children.length) {
            item.children.forEach(f);
          }
        })
        break;
      }
      case "checkbox": {
        countFilterPoints = checkedFilter.values.length;
        break;
      }
      default:
        break
    }

    if (extraFilter.ids.length !== countFilterPoints) {
      
      extraFilter.ids.forEach((item, index) => {
          if (index === 0) {
            qs += '&' + extraFilter.key + '=' + item.id
          } else {
            qs += '|' + item.id
          }
       })
      }

    allFilters = allFilters.filter(filter => filter.name !== extraFilter.key)
  })

  allFilters.forEach(element => {
    qs += '&' + element.name + '='
  })

  qs += dataRangeQueryParser(filter)

  return `?${qs.slice(1)}`;
}

async function refreshFilters() {
  return API({
    url: '/filters',
  })
  .then(filters => {
    sessionStorage.setItem('all_filters', JSON.stringify(filters));
    return filters;
  })
  .catch(err => store.dispatch(getFiltersAndCategoriesFailure({ error: err })))
}