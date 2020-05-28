import * as constant from './actionTypes'
import {queryStringForRoutes} from 'utils/queryStringForRoutes'
import {changeCalendarRangeFromRoute} from 'store/app/actions'
import API from 'utils/API'


// ------------------------------------
// Action
// ------------------------------------

export function getSTableRequest () {
  return {
    type    : constant.GET_STABLE_REQUEST
  }
}

export function getSTableSuccess (data) {
  return {
    type    : constant.GET_STABLE_SUCCESS,
    payload : data
  }
}

export function getSTableFailure (data) {
  return {
    type    : constant.GET_STABLE_FAILURE,
    payload   : data.error
  }
}

export function getCTableRequest () {
  return {
    type    : constant.GET_CTABLE_REQUEST
  }
}

export function getCTableSuccess (data) {
  return {
    type    : constant.GET_CTABLE_SUCCESS,
    payload : data
  }
}

export function getCTableFailure (data) {
  return {
    type    : constant.GET_CTABLE_FAILURE,
    error   : data.error
  }
}

export function getChartSRequest () {
  return {
    type     : constant.GET_CHARTS_REQUEST
  }
}

export function getChartSSuccess (data) {
  return {
    type    : constant.GET_CHARTS_SUCCESS,
    payload : data
  }
}

export function getChartSFailure (err) {
  return {
    type    : constant.GET_CHARTS_FAILURE,
    payload : err
  }
}

export function getChartCRequest () {
  return {
    type     : constant.GET_CHARTC_REQUEST
  }
}

export function getChartCSuccess (data) {
  return {
    type    : constant.GET_CHARTC_SUCCESS,
    payload : data
  }
}

export function getChartCFailure (err) {
  return {
    type    : constant.GET_CHARTC_FAILURE,
    payload : err
  }
}

export function getChartFBRequest () {
  return {
    type     : constant.GET_CHARTFB_REQUEST
  }
}

export function getChartFBSuccess (data) {
  return {
    type    : constant.GET_CHARTFB_SUCCESS,
    payload : data
  }
}

export function getChartFBFailure (err) {
  return {
    type    : constant.GET_CHARTFB_FAILURE,
    payload : err
  }
}

export function getFTableRequest () {
  return {
    type    : constant.GET_FTABLE_REQUEST
  }
}

export function getFTableSuccess (data) {
  return {
    type    : constant.GET_FTABLE_SUCCESS,
    payload : data
  }
}

export function getFTableFailure (data) {
  return {
    type    : constant.GET_FTABLE_FAILURE,
    payload : data.error
  }
}


// ------------------------------------
// Specialized Action Creator
// ------------------------------------



export const getViewSTableAction = (
  requestId,
  filter,
  take,
  skip,
  searchValue = null,
  sorting = { columnName: 'fav', direction: 'desc' },
  // orderBy = 'favdesc'
) => {
  return async (dispatch, getState) => {
    dispatch(getSTableRequest())

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
      url: `/viewability/stable/${qs}`,
      requestId,
    })
    .then(data => {
      dispatch(changeCalendarRangeFromRoute(data))
      dispatch(getSTableSuccess(data))
    })
    .catch(err => dispatch(getSTableFailure({ error: err })))
  }
}

export const getViewCTableAction = (
  requestId,
  filter,
  take,
  skip,
  searchValue = null,
  sorting = { columnName: 'fav', direction: 'desc' },
  // orderBy = 'favdesc'
) => {
  return async (dispatch, getState) => {
    dispatch(getCTableRequest())

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
      url: `/viewability/ctable/${qs}`,
      requestId
    })
    .then(data => {
      dispatch(changeCalendarRangeFromRoute(data))
      dispatch(getCTableSuccess(data))
    })
    .catch(err => dispatch(getCTableFailure({ error: err })))
  }
}

export const getViewChartSAction = (requestId, filter) => {
  return async (dispatch, getState) => {
    dispatch(getChartSRequest())

    let contextualFilterData = getState().app.contextualFilterData

    let qs = await queryStringForRoutes(filter, contextualFilterData)

    return API({
      url: `/viewability/staxs/${qs}`,
      requestId
    })
    .then(data => {
      dispatch(changeCalendarRangeFromRoute(data))
      dispatch(getChartSSuccess(data))
    })
    .catch(err => dispatch(getChartSFailure({ error: err })))
  }
}

export const getViewChartCAction = (requestId, filter) => {
  return async (dispatch, getState) => {
    dispatch(getChartCRequest())

    let contextualFilterData = getState().app.contextualFilterData

    let qs = await queryStringForRoutes(filter, contextualFilterData)

    return API({
      url: `/viewability/staxc/${qs}`,
      requestId,
    })
    .then(data => {
      dispatch(changeCalendarRangeFromRoute(data))
      dispatch(getChartCSuccess(data))
    })
    .catch(err => dispatch(getChartCFailure({ error: err })))
  }
}

export const getViewChartFBAction = (requestId, filter) => {
  return async (dispatch, getState) => {
    dispatch(getChartFBRequest())
    
    let contextualFilterData = getState().app.contextualFilterData

    let qs = await queryStringForRoutes(filter, contextualFilterData)

    return API({
      url: `/viewability/staxfb/${qs}`,
      requestId,
    })
    .then(data => {
      console.log(data)
      dispatch(changeCalendarRangeFromRoute(data))
      dispatch(getChartFBSuccess(data))
    })
    .catch(err => dispatch(getChartFBFailure({ error: err })))
  }
}

export const getViewFTableAction = (
  requestId,
  filter,
  take,
  skip,
  searchValue = null,
  sorting = { columnName: 'fav', direction: 'desc' },
  // orderBy = 'favdesc'
) => {
  return async (dispatch, getState) => {
    dispatch(getFTableRequest())

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
      url: `/viewability/ftable/${qs}`,
      requestId
    })
    .then(data => {
      dispatch(changeCalendarRangeFromRoute(data))
      dispatch(getFTableSuccess(data))
    })
    .catch(err => dispatch(getFTableFailure({ error: err })))
  }
}


export const getSubheaderViewabilityData = (selectedFilter) => {
  return (dispatch) => {
    dispatch(getViewSTableAction('/getViewSTable', selectedFilter, 20, 0))
    dispatch(getViewCTableAction('/getViewCTable', selectedFilter, 20, 0))
    dispatch(getViewFTableAction('/getViewFTable', selectedFilter, 20, 0))
    dispatch(getViewChartSAction('/getViewChartS', selectedFilter))
    dispatch(getViewChartCAction('/getViewChartC', selectedFilter))
    dispatch(getViewChartFBAction('/getViewChartFB', selectedFilter))
  }
}