import * as constant from './actionTypes'
import {queryStringForRoutes} from 'utils/queryStringForRoutes'
import {changeCalendarRangeFromRoute} from 'store/app/actions'
import API from 'utils/API'


// ------------------------------------
// Action
// ------------------------------------
export function getChartBrandDataRequest () {
  return {
    type    : constant.GET_CHARTBRAND_DATA_REQUEST
  }
}

export function getChartBrandDataSuccess (data) {
  return {
    type    : constant.GET_CHARTBRAND_DATA_SUCCESS,
    payload: data
  }
}

export function getChartBrandDataFailure (err) {
  return {
    type   : constant.GET_CHARTBRAND_DATA_FAILURE,
    payload: err
  }
}

export function getPromotionTableRequest () {
  return {
    type    : constant.GET_PROMOTION_TABLE_REQUEST
  }
}

export function getPromotionTableSuccess (data) {
  return {
    type    : constant.GET_PROMOTION_TABLE_SUCCESS,
    payload: data
  }
}

export function getPromotionTableFailure (data) {
  return {
    type    : constant.GET_PROMOTION_TABLE_FAILURE,
    error: data.error
  }
}



// ------------------------------------
// Specialized Action Creator
// ------------------------------------

export const getPromotionChartBrandAction = (requestId, filter) => {
  return async (dispatch, getState) => {
    dispatch(getChartBrandDataRequest())

    let contextualFilterData = getState().app.contextualFilterData;
    let qs = await queryStringForRoutes(filter, contextualFilterData)

    return API({
      url: `/promotion/staxbrand/${qs}`,
      requestId,
    })
    .then(data => {
      dispatch(changeCalendarRangeFromRoute(data))
      dispatch(getChartBrandDataSuccess(data))
    })
    .catch(err => dispatch(getChartBrandDataFailure({ error: err })))
  }
}

export const getPromotionTableAction = (
  requestId,
  filter,
  take,
  skip,
  searchValue = null,
  sorting = { columnName: 'fav', direction: 'desc' },
  // orderBy = 'favdesc'
) => {
  return async (dispatch, getState) => {
    dispatch(getPromotionTableRequest())

    let contextualFilterData = getState().app.contextualFilterData

    let qs = await queryStringForRoutes(filter, contextualFilterData)

    if (searchValue) {
      qs += '&search=' + searchValue
    }

    if (sorting) {
      qs += '&orderby=' + sorting.columnName + sorting.direction
    }

    if (take !== undefined) qs += '&psize=' + take
    if (skip !== undefined) qs += '&skip=' + skip

    return API({
      url: `/promotion/table/${qs}`,
      requestId,
    })
    .then(data => {
      dispatch(changeCalendarRangeFromRoute(data))
      dispatch(getPromotionTableSuccess(data))
    })
    .catch(err => dispatch(getPromotionTableFailure({ error: err })))
  }
}



export const getSubheaderPromotionData = (selectedFilter) => {
  return (dispatch) => {
    dispatch(getPromotionChartBrandAction('/getPromotionChartBrand', selectedFilter))
    dispatch(getPromotionTableAction('/getPromotionTable', selectedFilter, 20, 0))
  }
}