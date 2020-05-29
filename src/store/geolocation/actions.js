import * as constant from './actionTypes'
import {queryStringForRoutes} from 'utils/queryStringForRoutes'
import {changeCalendarRangeFromRoute} from 'store/app/actions'
import {setNewAlertOptions} from 'store/app/actions'
import API from 'utils/API'


// ------------------------------------
// Action
// ------------------------------------

export function getGeolocationMapDRequest () {
  return {
    type    : constant.GET_GEOLOCATION_MAPD_REQUEST
  }
}

export function getGeolocationMapDSuccess (data) {
  return {
    type    : constant.GET_GEOLOCATION_MAPD_SUCCESS,
    payload : data
  }
}

export function getGeolocationMapDFailure (err) {
  return {
    type    : constant.GET_GEOLOCATION_MAPD_FAILURE,
    payload : err
  }
}

export function getGeolocationMapPRequest () {
  return {
    type     : constant.GET_GEOLOCATION_MAPP_REQUEST
  }
}

export function getGeolocationMapPSuccess (data) {
  return {
    type    : constant.GET_GEOLOCATION_MAPP_SUCCESS,
    payload : data
  }
}

export function getGeolocationMapPFailure (err) {
  return {
    type    : constant.GET_GEOLOCATION_MAPP_FAILURE,
    payload : err
  }
}

export function getGeolocationTableRequest () {
  return {
    type    : constant.GET_GEOLOCATION_TABLE_REQUEST
  }
}

export function getGeolocationTableSuccess (data) {
  return {
    type    : constant.GET_GEOLOCATION_TABLE_SUCCESS,
    payload : data
  }
}

export function getGeolocationTableFailure (data) {
  return {
    type    : constant.GET_GEOLOCATION_TABLE_FAILURE,
    payload : data.error
  }
}

export function getGeolocationChartDriveRequest () {
  return {
    type    : constant.GET_GEOLOCATION_CHARTDRIVE_REQUEST
  }
}

export function getGeolocationChartDriveSuccess (data) {
  return {
    type    : constant.GET_GEOLOCATION_CHARTDRIVE_SUCCESS,
    payload : data
  }
}

export function getGeolocationChartDriveFailure (err) {
  return {
    type    : constant.GET_GEOLOCATION_CHARTDRIVE_FAILURE,
    payload : err
  }
}


// ------------------------------------
// Specialized Action Creator
// ------------------------------------

export const getGeolocationMapDAction = (requestId, filter) => {
  return async (dispatch, getState) => {
    dispatch(getGeolocationMapDRequest())
    let contextualFilterData = getState().app.contextualFilterData
    let qs = await queryStringForRoutes(filter, contextualFilterData)

    return API({
      url: `/geolocation/mapd/${qs}`,
      requestId,
    })
    .then(data => {
      dispatch(changeCalendarRangeFromRoute(data))
      dispatch(getGeolocationMapDSuccess(data))
    })
    .catch(err => dispatch(getGeolocationMapDFailure({ error: err })))
  }
}

export const getGeolocationMapPAction = (requestId, filter) => {
  return async (dispatch, getState) => {
    dispatch(getGeolocationMapPRequest())

    let contextualFilterData = getState().app.contextualFilterData
    let qs = await queryStringForRoutes(filter, contextualFilterData)

    return API({
      url: `/geolocation/mapp/${qs}`,
      requestId,
    })
    .then(data => {
      dispatch(changeCalendarRangeFromRoute(data))
      dispatch(getGeolocationMapPSuccess(data))
    })
    .catch(err => dispatch(getGeolocationMapPFailure({ error: err })))
  }
}

export const getGeolocationChartDriveAction = (requestId, filter) => {
  return async (dispatch, getState) => {
    dispatch(getGeolocationChartDriveRequest())
    
    let contextualFilterData = getState().app.contextualFilterData

    let qs = await queryStringForRoutes(filter, contextualFilterData)

    return API({
      url: `/geolocation/staxdrive/${qs}`,
      requestId,
    })
    .then(data => {
      dispatch(changeCalendarRangeFromRoute(data))
      dispatch(getGeolocationChartDriveSuccess(data))
      if (data.staxdrive.alert_kpi) {
        const newAlerts = { type: 'staxdrive', data: data.staxdrive }
        dispatch(setNewAlertOptions(newAlerts))
      }
    })
    .catch(err => dispatch(getGeolocationChartDriveFailure({ error: err })))
  }
}

export const getGeolocationTableAction = (
  requestId,
  filter,
  take,
  skip,
  searchValue = null,
  sorting = { columnName: 'dept', direction: 'desc' },
  // orderBy = 'deptasc'
) => {
  return async (dispatch, getState) => {
    dispatch(getGeolocationTableRequest())

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
      url: `/geolocation/table/${qs}`,
      requestId,
    })
    .then(data => {
      dispatch(changeCalendarRangeFromRoute(data))
      dispatch(getGeolocationTableSuccess(data))
    })
    .catch(err => dispatch(getGeolocationTableFailure({ error: err })))
  }
}


export const getSubheaderGeolocationData = (selectedFilter) => {
  return (dispatch) => {
    dispatch(getGeolocationTableAction('/getGeolocationTable', selectedFilter, 20, 0))
    dispatch(getGeolocationMapDAction('/getGeolocationMapD', selectedFilter))
    dispatch(getGeolocationMapPAction('/getGeolocationMapP', selectedFilter))
    dispatch(getGeolocationChartDriveAction('/getGeolocationChartDrive', selectedFilter))
  }
}