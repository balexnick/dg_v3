import * as constant from './actionTypes'
import API from 'utils/API'
import {getSubheaderProductData} from 'store/product/actions'
import {getSubheaderEANData} from 'store/ean/actions'
import {getSubheaderPriceData} from 'store/price/actions'
import {getSubheaderPromotionData} from 'store/promotion/actions'
import {getSubheaderAssortmentData} from 'store/assortment/actions'
import {getSubheaderRatingData} from 'store/rating/actions'
import {getSubheaderViewabilityData} from 'store/viewability/actions'
import {getSubheaderGeolocationData} from 'store/geolocation/actions'
import {getSubheaderReportData} from 'store/report/actions'
import {getSubheaderMediaData} from 'store/media/actions'
import {getSubheaderSaleData} from 'store/sales/actions'
import {getSubheaderHomeData} from 'store/homepage/actions'
import {getSubheaderGallerieData} from 'store/gallerie/actions'
// ------------------------------------
// Action
// ------------------------------------


export const getFiltersAndCategoriesSuccess = (data) => {
  return {
    type    : constant.GET_FILTERS_AND_CATEGORIES_SUCCESS,
    payload :  {
      filters : data.slice(0, 3),
      extraFilters : data
    }
  }
}

export const setContextualFilterLoading = (data) => {
  return {
    type   :  constant.CONTEXTUAL_FILTER_LOADING,
    payload: data
  }
}

export const setContextualFilterData = (data) => {
  return {
    type   : constant.CONTEXTUAL_FILTER_DATA,
    payload: data
  }
}

export const changeCalendarRange = (date) => {
  return {
    type    : constant.CHANGE_CALENDAR_RANGE,
    payload : date
  }
}

export const changeCalendarRange2 = (date) => {
  return {
    type    : constant.CHANGE_CALENDAR_RANGE2,
    payload : date
  }
}

export const changeResponseCalendarRange = (date) => {
  return {
    type    : constant.CHANGE_RESPONSE_CALENDAR_RANGE,
    payload : date
  }
}

export const setDeletedFiltersIds = (deletedFiltersIds) => {
  return {
    type: constant.SET_DELETED_FILTERS_IDS,
    payload: deletedFiltersIds,
  }
}

export const selectFilter = (selectedFilter) => {
  return {
    type: constant.SELECT_FILTERS,
    payload: selectedFilter
  }
}

export const setActiveTrees = (activeTrees) => {
  return {
    type: constant.SET_ACTIVE_TREES,
    payload: activeTrees,
  }
}

export const getFiltersAndCategoriesFailure = (data) => {
  return {
    type  : constant.GET_FILTERS_AND_CATEGORIES_FAILURE,
    error : data.error
  }
}

export const changeCalendarRangeFromRoute = (date) =>{
  return {
    type    : constant.CHANGE_CALENDAR_RANGE_FROM_ROUTE,
    payload : date
  }
}

export const setRequestId = (data) => {
  return {
    type    : constant.REQUEST_ID,
    payload : data
  }
}

export const setNewAlertOptions = (alertData) => {
  return {
    type    : constant.SET_NEW_ALERT_OPTIONS,
    payload : alertData
  }
}

export const setPageTitleKey = data => {
  return{
    type    : constant.SET_PAGE_TITLE_KEY,
    payload : data
  }
}

// ------------------------------------
// Specialized Action Creator
// ------------------------------------
export const getProfileAction = () => {
  return (dispatch) => {
    dispatch({type: constant.GET_PROFILE_REQUEST})
    return API({
      url: `/me`
    })
    .then(data => dispatch({type: constant.GET_PROFILE_SUCCESS, payload: data }))
    .catch(err => dispatch({type: constant.GET_PROFILE_FAILURE, error: err }))
  }
}

export const toggleMenu = (opened) => {
  return (dispatch) => {
    dispatch({type: constant.TOGGLE_MENU, payload: opened})
  }
}

export const getFiltersAndCategoriesAction = () => {
  return (dispatch, getState) => {
    return API({
      url: '/filters'
    })
    .then(data => {
      sessionStorage.setItem('all_filters', JSON.stringify(data));
      dispatch(getFiltersAndCategoriesSuccess(data))
    })
    .catch(err => dispatch(getFiltersAndCategoriesFailure({ error: err })))
  }
}

export const getContextualFilterAction = () => {
  return (dispatch) => {
    dispatch(setContextualFilterLoading(true));
    let url = window.location.pathname.split('/')[1];
    if (!url) url = 'home';
    return API({
      url: `/${url}/filters/`
    })
    .then(data => {
      dispatch(setContextualFilterLoading(false));
      const newData = data.map(item => {
        const values = item.values.map(self => {
          return { ...self, isChecked: true }
        })
        return { ...item, values }
      })
      dispatch(setContextualFilterData(newData))
    })
    .catch(() => {
      dispatch(setContextualFilterLoading(false));
      dispatch(setContextualFilterData([]))
    })
  }
}

export const setSnackBarSelectedFiltersAction = () =>{
  return (dispatch, getState) => {
    const { selectedFilter, activeTrees } = getState().app;
    const newActiveTrees = {...activeTrees};
    if (selectedFilter.extra) { 
      const newSelectedFilters = selectedFilter.extra.map(item => {
        switch (item.key) {
          case 'c': {
            item.color = '#3f51b573';
            break;
          }
          case 'retailer': {
            item.color = '#ab47bc4f';
            break;
          }
          case 'brand': {
            item.color = '#8bc34a73';
            break;
          }
          default: {
            item.color = '#00968869';
          }
        }

        if(item.type === 'tree') newActiveTrees["index_" + item.id] = true;
        return item
      })
      dispatch({
        type: constant.CHANGE_SNACKBAR,
        payload: {
          activeTrees: newActiveTrees,
          snackBarFilters: newSelectedFilters,
        }
      })
    }
  }
}



export const getSubheaderPageData = (selectedFilter) => {
  return (dispatch, getState) => {
    const TITLE_OBJ = {
      assortment:  getSubheaderAssortmentData(selectedFilter),
      report:  getSubheaderReportData(selectedFilter),
      price:  getSubheaderPriceData(selectedFilter),
      promotion:  getSubheaderPromotionData(selectedFilter),
      ean: getSubheaderEANData(selectedFilter),
      product:  getSubheaderProductData(selectedFilter),
      view:  getSubheaderViewabilityData(selectedFilter),
      media: getSubheaderMediaData(selectedFilter),
      rating:  getSubheaderRatingData(selectedFilter),
      geolocation:  getSubheaderGeolocationData(selectedFilter),
      sales: getSubheaderSaleData(selectedFilter),
      home: getSubheaderHomeData(selectedFilter),
      gallerie: getSubheaderGallerieData(selectedFilter),
    } 
    const titleKey =  getState().app.pageTitleKey
    dispatch(TITLE_OBJ[titleKey])
  }
}