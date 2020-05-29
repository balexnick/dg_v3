import * as constant from './actionTypes'
import {queryStringForRoutes} from 'utils/queryStringForRoutes'
import {changeCalendarRangeFromRoute} from 'store/app/actions'
import {setNewAlertOptions} from 'store/app/actions'
import API from 'utils/API'


// ------------------------------------
// Action
// ------------------------------------

export function getBBChartDataRequest () {
  return {
    type     : constant.GET_BBCHART_DATA_REQUEST
  }
}

export function getBBChartDataSuccess (data) {
  return {
    type    : constant.GET_BBCHART_DATA_SUCCESS,
    payload : data
  }
}

export function getBBChartDataFailure (err) {
  return {
    type    : constant.GET_BBCHART_DATA_FAILURE,
    payload : err
  }
}

export function getBTimeDataRequest () {
  return {
    type    : constant.GET_BTIME_DATA_REQUEST
  }
}

export function getBTimeDataSuccess (data) {
  return {
    type    : constant.GET_BTIME_DATA_SUCCESS,
    payload : data
  }
}

export function getBTimeDataFailure (err) {
  return {
    type    : constant.GET_BTIME_DATA_FAILURE,
    payload : err
  }
}

export function getRatingTableRequest () {
  return {
    type    : constant.GET_RATING_TABLE_REQUEST
  }
}

export function getRatingTableSuccess (data) {
  return {
    type    : constant.GET_RATING_TABLE_SUCCESS,
    payload : data
  }
}

export function getRatingTableFailure (data) {
  return {
    type    : constant.GET_RATING_TABLE_FAILURE,
    error   : data.error
  }
}

// ------------------------------------
// Specialized Action Creator
// ------------------------------------

export const getRatingBBChartAction = (requestId, filter) => {
  return async (dispatch, getState) => {
    dispatch(getBBChartDataRequest())

    let contextualFilterData = getState().app.contextualFilterData

    let qs = await queryStringForRoutes(filter, contextualFilterData)

    return API({
      url: `/rating/bbchart/${qs}`,
      requestId,
    })
    .then(data => {
      dispatch(changeCalendarRangeFromRoute(data))
      dispatch(getBBChartDataSuccess(data))
      if (data.bbrand.alert_kpi) {
        const newAlerts = { type: 'bbrand', data: data.bbrand }
        dispatch(setNewAlertOptions(newAlerts))
      }
    })
    .catch(err => dispatch(getBBChartDataFailure({ error: err })))
  }
}

export const getRatingBTimeAction = (requestId, filter) => {
  return async (dispatch, getState) => {
    dispatch(getBTimeDataRequest())

    let contextualFilterData = getState().app.contextualFilterData

    let qs = await queryStringForRoutes(filter, contextualFilterData)

    return API({
      url: `/rating/btime/${qs}`,
      requestId
    })
    .then(data => {
      dispatch(changeCalendarRangeFromRoute(data))
      dispatch(getBTimeDataSuccess(data))
      if (data.btime.alert_kpi) {
        const newAlerts = { type: 'btime', data: data.btime }
        dispatch(setNewAlertOptions(newAlerts))
      }
    })
    .catch(err => dispatch(getBTimeDataFailure({ error: err })))
  }
}

export const getRatingTableAction = (
  requestId,
  filter,
  take,
  skip,
  searchValue = null,
  sorting = { columnName: 'fav', direction: 'desc' },
  // orderBy = 'favdesc'
) => {
  return async (dispatch, getState) => {
    dispatch(getRatingTableRequest())

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
      url: `/rating/table/${qs}`,
      requestId,
    })
    .then(data => {
      dispatch(changeCalendarRangeFromRoute(data))
      dispatch(getRatingTableSuccess(data))
      if (data.table.alert_kpi) {
        const newAlerts = { type: 'table', data: data.table }
        dispatch(setNewAlertOptions(newAlerts))
      }
    })
    .catch(err => dispatch(getRatingTableFailure({ error: err })))
  }
}


export const getSubheaderRatingData = (selectedFilter) => {
  return (dispatch) => {
    dispatch(getRatingBBChartAction('/getRatingBBChart', selectedFilter))
    dispatch(getRatingBTimeAction('/getRatingBTime', selectedFilter))
    dispatch(getRatingTableAction('/getRatingTable', selectedFilter, 20, 0))
  }
}