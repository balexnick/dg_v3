import * as constant from './actionTypes'
import {queryStringForRoutes} from 'utils/queryStringForRoutes'
import {changeCalendarRangeFromRoute} from 'store/app/actions'
import {setNewAlertOptions} from 'store/app/actions'
import API from 'utils/API'


// ------------------------------------
// Action
// ------------------------------------

export function getChartDataRequest () {
  return {
    type    : constant.GET_CHART_DATA_REQUEST
  }
}

export function getChartDataSuccess (data) {
  return {
    type    : constant.GET_MEDIA_CHART_DATA_SUCCESS,
    payload : data
  }
}

export function getChartDataFailure (err) {
  return {
    type    : constant.GET_CHART_DATA_FAILURE,
    payload : err
  }
}

export function getFChartDataRequest () {
  return {
    type    : constant.GET_FCHART_DATA_REQUEST
  }
}

export function getFChartDataSuccess (data) {
  return {
    type    : constant.GET_FCHART_DATA_SUCCESS,
    payload : data
  }
}

export function getFChartDataFailure (err) {
  return {
    type    : constant.GET_FCHART_DATA_FAILURE,
    payload : err
  }
}

export function getMediaTableRequest () {
  return {
    type    : constant.GET_MEDIA_TABLE_REQUEST
  }
}

export function getMediaTableSuccess (data) {
  return {
    type    : constant.GET_MEDIA_TABLE_SUCCESS,
    payload : data
  }
}

export function getMediaTableFailure (data) {
  return {
    type    : constant.GET_MEDIA_TABLE_FAILURE,
    payload : data.error
  }
}

export function getMediaTimelineRequest () {
  return {
    type    : constant.GET_MEDIATIMELINE_DATA_REQUEST
  }
}

export function getMediaTimelineSuccess (data) {
  return {
    type    : constant.GET_MEDIATIMELINE_DATA_SUCCESS,
    payload : data
  }
}

export function getMediaTimelineFailure (data) {
  return {
    type    : constant.GET_MEDIATIMELINE_DATA_FAILURE,
    payload : data.error
  }
}

export function changeLocalPeriod (period) {
  return {
    type    : constant.CHANGE_LOCAL_PERIOD,
    payload : period
  }
}

export function changeLocalPeriodAction (period) {
  return (dispatch) => {
    dispatch(changeLocalPeriod(period))
  }
}

export function changeManufacturerGroup (value) {
  return {
    type    : constant.CHANGE_MANUFACTURER_GROUP,
    payload : value
  }
}

export function changeFChartManufacturerGroup (value) {
  return {
    type    : constant.CHANGE_FCHART_MANUFACTURER_GROUP,
    payload : value
  }
}


// ------------------------------------
// Specialized Action Creator
// ------------------------------------

export function changeManufacturerGroupAction (value) {
  return (dispatch) => {
    dispatch(changeManufacturerGroup(value))
  }
}

export function changeFChartManufacturerGroupAction (value) {
  return (dispatch) => {
    dispatch(changeFChartManufacturerGroup(value))
  }
}

export const getMediaChartAction = (requestId, filter) => {
  return async (dispatch, getState) => {
    dispatch(getChartDataRequest())
  
    const { media } = getState();

    let contextualFilterData = getState().app.contextualFilterData

    let qs = await queryStringForRoutes(filter, contextualFilterData)

    if (filter && media && media.localPeriod.stax) {
      qs += '&period=' + media.localPeriod.stax;
    }

    if(filter && media && media.manufacturerGroup) {
      qs += '&manufacturer_group=' + media.manufacturerGroup;
    }
    return API({
      url: `/media/stax/${qs}`,
      requestId,
    })
    .then(data => {
      dispatch(changeCalendarRangeFromRoute(data))
      dispatch(getChartDataSuccess(data))
      if (data[0].data.stax.alert_kpi) {
        const newAlerts = { type: 'stax', data: data.stax }
        dispatch(setNewAlertOptions(newAlerts)) 
      }

    })
    .catch(err => {
      dispatch(getChartDataFailure({ error: err }))
    })
  }
}

export const getMediaFChartAction = (requestId, filter) => {
  return async (dispatch, getState) => {
    dispatch(getFChartDataRequest())
    const { media } = getState();

    let contextualFilterData = getState().app.contextualFilterData

    let qs = await queryStringForRoutes(filter, contextualFilterData)

    if(filter && media && media.fChartManufacturerGroup) {
      qs += '&manufacturer_group=' + media.fChartManufacturerGroup;
    }

    return API({
      url: `/media/fstax/${qs}`,
      requestId,
    })
    .then(data => {
      dispatch(changeCalendarRangeFromRoute(data))
      dispatch(getFChartDataSuccess(data))
      if (data.fstax.alert_kpi) {
        const newAlerts = { type: 'fstax', data: data.fstax }
        dispatch(setNewAlertOptions(newAlerts))
      }
    })
    .catch(err => {
      dispatch(getFChartDataFailure({ error: err }))
    })
  }
}

export const getMediaTableAction = (
  requestId,
  filter,
  take,
  skip,
  searchValue = null,
  sorting = { columnName: 'brand', direction: 'asc' },
  // orderBy = 'favdesc'
) => {
  return async (dispatch, getState) => {
    dispatch(getMediaTableRequest())

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
      url: `/media/table/${qs}`,
      requestId,
    })
    .then(data => {
      dispatch(changeCalendarRangeFromRoute(data))
      dispatch(getMediaTableSuccess(data))
      if (data.table.alert_kpi) {
        const newAlerts = { type: 'table', data: data.table }
        dispatch(setNewAlertOptions(newAlerts))
      }
    })
    .catch(err => {
      dispatch(getMediaTableFailure({ error: err }))
    })
  }
}

export const getMediaTimeline = (requestId, filter) => {
  return async (dispatch, getState) => {
    dispatch(getMediaTimelineRequest());
    let contextualFilterData = getState().app.contextualFilterData
    let qs = await queryStringForRoutes(filter, contextualFilterData)
    return API({
      url: `/media/timeline/${qs}`,
      requestId,
    })
    .then(data => {
      dispatch(getMediaTimelineSuccess(data));
    })
    .catch(err => {
      dispatch(getMediaTimelineFailure({ error: err }))
    })
  }
}


export const getSubheaderMediaData = (selectedFilter) => {
  return (dispatch) => {
    dispatch(getMediaChartAction('/getMediaChart', selectedFilter))
    dispatch(getMediaFChartAction('/getMediaFChart', selectedFilter))
    dispatch(getMediaTableAction('/getMediaTable', selectedFilter, 20, 0))
    dispatch(getMediaTimeline('/getMediaTimeline', selectedFilter))
  }
}