import * as constant from './actionTypes'
import {queryStringForRoutes} from 'utils/queryStringForRoutes'
import {changeCalendarRangeFromRoute} from 'store/app/actions'
import {setNewAlertOptions} from 'store/app/actions'
import API from 'utils/API'

// ------------------------------------
// Actions
// ------------------------------------

export const getChartDataRequest = () => {
  return {
    type   : constant.GET_CHART_DATA_REQUEST
  }
}

export const getChartDataSuccess = (data) => {
  return {
    type   : constant.GET_PRICE_CHART_DATA_SUCCESS,
    payload: data
  }
}

export const getChartDataFailure = (err) => {
  return {
    type   : constant.GET_CHART_DATA_FAILURE,
    payload: err
  }
}

export const getPriceTableRequest = () => {
  return {
    type   : constant.GET_PRICE_TABLE_REQUEST
  }
}

export const getPriceTableSuccess = (data) => {
  return {
    type   : constant.GET_PRICE_TABLE_SUCCESS,
    payload: data
  }
}

export const getPriceTableFailure = (data) => {
  return {
    type   : constant.GET_PRICE_TABLE_FAILURE,
    error  : data.error
  }
}

// ------------------------------------
// Specialized Action Creator
// ------------------------------------
export const getPriceChartAction = (requestId, filter) => {
  return async (dispatch, getState) => {
    dispatch(getChartDataRequest())

    let contextualFilterData = getState().app.contextualFilterData

    let qs = await queryStringForRoutes(filter, contextualFilterData)

    return API({
      url: `/price/stax/${qs}`,
      requestId,
    })
    .then(data => {
      dispatch(changeCalendarRangeFromRoute(data))
      dispatch(getChartDataSuccess(data))
      if (data.stax.alert_kpi) {
        const newAlerts = { type: 'stax', data: data.stax }
        dispatch(setNewAlertOptions(newAlerts))
      }
    })
    .catch(err => dispatch(getChartDataFailure({ error: err })))
  }
}

export const getPriceTableAction = (
  requestId,
  filter,
  take,
  skip,
  searchValue = null,
  sorting = { columnName: 'fav', direction: 'desc' },
  // orderBy = 'favdesc'
) => {
  return async (dispatch, getState) => {
    dispatch(getPriceTableRequest())

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
      url: `/price/table/${qs}`,
      requestId,
    })
    .then(data => {
      dispatch(changeCalendarRangeFromRoute(data))
      dispatch(getPriceTableSuccess(data))
      if (data.table.alert_kpi) {
        const newAlerts = { type: 'table', data: data.table }
        dispatch(setNewAlertOptions(newAlerts))
      }
    })
    .catch(err => dispatch(getPriceTableFailure({ error: err })))
  }
}


export const getSubheaderPriceData = (selectedFilter) => {
  return (dispatch) => {
    dispatch(getPriceTableAction('/getPriceTable', selectedFilter, 20, 0))
    dispatch(getPriceChartAction('/getPriceChart', selectedFilter))
  }
}


