import * as constant from './actionTypes'
import {queryStringForRoutes} from 'utils/queryStringForRoutes'
import {changeCalendarRangeFromRoute} from 'store/app/actions'
import {setNewAlertOptions} from 'store/app/actions'
import API from 'utils/API'


// ------------------------------------
// Action
// ------------------------------------
export function getSalesTableRequest () {
  return {
    type    : constant.GET_SALES_TABLE_REQUEST
  }
}

export function getSalesTableSuccess (data) {
  return {
    type    : constant.GET_SALES_TABLE_SUCCESS,
    payload : data
  }
}

export function getSalesTableFailure (data) {
  return {
    type    : constant.GET_SALES_TABLE_FAILURE,
    payload : data.error
  }
}

export function getSalesSTableRequest () {
  return {
    type    : constant.GET_SALES_STABLE_REQUEST
  }
}

export function getSalesSTableSuccess (data) {
  return {
    type    : constant.GET_SALES_STABLE_SUCCESS,
    payload : data
  }
}

export function getSalesSTableFailure (data) {
  return {
    type    : constant.GET_SALES_STABLE_FAILURE,
    payload : data.error
  }
}

export function getSalesChartBrandRequest () {
  return {
    type    : constant.GET_SALES_CHARTBRAND_REQUEST
  }
}

export function getSalesChartBrandSuccess (data) {
  return {
    type    : constant.GET_SALES_CHARTBRAND_SUCCESS,
    payload : data
  }
}

export function getSalesChartBrandFailure (err) {
  return {
    type    : constant.GET_SALES_CHARTBRAND_FAILURE,
    payload : err
  }
}

export function getSalesChartVolRequest () {
  return {
    type    : constant.GET_SALES_CHARTVOL_REQUEST
  }
}

export function getSalesChartVolSuccess (data) {
  return {
    type    : constant.GET_SALES_CHARTVOL_SUCCESS,
    payload : data
  }
}

export function getSalesChartVolFailure (err) {
  return {
    type    : constant.GET_SALES_CHARTVOL_FAILURE,
    payload : err
  }
}

export function getSalesChartBrandPromoRequest () {
  return {
    type    : constant.GET_SALES_CHARTBRANDPROMO_REQUEST
  }
}

export function getSalesChartBrandPromoSuccess (data) {
  return {
    type    : constant.GET_SALES_CHARTBRANDPROMO_SUCCESS,
    payload : data
  }
}

export function getSalesChartBrandPromoFailure (err) {
  return {
    type    : constant.GET_SALES_CHARTBRANDPROMO_FAILURE,
    payload : err
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


// ------------------------------------
// Specialized Action Creator
// ------------------------------------

export const getSalesTableAction = (
  requestId,
  filter,
  take,
  skip,
  searchValue = null,
  sorting = { columnName: 'fav', direction: 'desc' },
) => {
  return async (dispatch, getState) => {
    dispatch(getSalesTableRequest())

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
      url: `/sales/ptable/${qs}`,
      requestId,
    })
    .then(data => {
      dispatch(changeCalendarRangeFromRoute(data))
      dispatch(getSalesTableSuccess(data))
      if (data.ptable.alert_kpi) {
        const newAlerts = { type: 'ptable', data: data.ptable }
        dispatch(setNewAlertOptions(newAlerts))
      }
    })
    .catch(err => dispatch(getSalesTableFailure({ error: err })))
  }
}

export const getSalesSTableAction = (
  requestId,
  filter,
  take,
  skip,
  searchValue = null,
  sorting = { columnName: 'dept', direction: 'asc' },
  // orderBy = 'deptasc'
) => {
  return async (dispatch, getState) => {
    dispatch(getSalesSTableRequest())

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
      url: `/sales/stable/${qs}`,
      requestId,
    })
    .then(data => {
      dispatch(changeCalendarRangeFromRoute(data))
      dispatch(getSalesSTableSuccess(data))
      if (data.stable.alert_kpi) {
        const newAlerts = { type: 'stable', data: data.stable }
        dispatch(setNewAlertOptions(newAlerts))
      }
    })
    .catch(err => dispatch(getSalesSTableFailure({ error: err })))
  }
}

export const getSalesChartBrandAction = (requestId, filter) => {
  return async (dispatch, getState) => {
    dispatch(getSalesChartBrandRequest())

    const { sales } = getState()

    let contextualFilterData = getState().app.contextualFilterData

    let qs = await queryStringForRoutes(filter, contextualFilterData)

    if (filter && sales && sales.localPeriod.staxbrand) {
      qs += '&period=' + sales.localPeriod.staxbrand
    }

    return API({
      url: `/sales/staxbrand/${qs}`,
      requestId,
    })
    .then(data => {
      dispatch(changeCalendarRangeFromRoute(data))
      dispatch(getSalesChartBrandSuccess(data))
      if (data.staxbrand.alert_kpi) {
        const newAlerts = { type: 'staxbrand', data: data.staxbrand }
        dispatch(setNewAlertOptions(newAlerts))
      }
    })
    .catch(err => dispatch(getSalesChartBrandFailure({ error: err })))
  }
}

export const getSalesChartVolAction = (requestId, filter) => {
  return async (dispatch, getState) => {
    dispatch(getSalesChartVolRequest())

    let contextualFilterData = getState().app.contextualFilterData

    let qs = await queryStringForRoutes(filter, contextualFilterData)

    return API({
      url: `/sales/staxvol/${qs}`,
      requestId,
    })
    .then(data => {
      dispatch(changeCalendarRangeFromRoute(data))
      dispatch(getSalesChartVolSuccess(data))
      if (data.staxvol.alert_kpi) {
        const newAlerts = { type: 'staxvol', data: data.staxvol }
        dispatch(setNewAlertOptions(newAlerts))
      }
    })
    .catch(err => dispatch(getSalesChartVolFailure({ error: err })))
  }
}

export const getSalesChartBrandPromoAction = (requestId, filter) => {
  return async (dispatch, getState) => {
    dispatch(getSalesChartBrandPromoRequest())

    const { sales } = getState()

    let contextualFilterData = getState().app.contextualFilterData

    let qs = await queryStringForRoutes(filter, contextualFilterData)

    if (filter && sales && sales.localPeriod.staxbrandpromo) {
      qs += '&period=' + sales.localPeriod.staxbrandpromo
    }

    return API({
      url: `/sales/staxbrandpromo/${qs}`,
      requestId,
    })
    .then(data => {
      dispatch(changeCalendarRangeFromRoute(data))
      dispatch(getSalesChartBrandPromoSuccess(data))
      if (data.staxbrandpromo.alert_kpi) {
        const newAlerts = { type: 'staxbrandpromo', data: data.staxbrandpromo }
        dispatch(setNewAlertOptions(newAlerts))
      }
    })
    .catch(err => dispatch(getSalesChartBrandPromoFailure({ error: err })))
  }
}


export const getSubheaderSaleData = (selectedFilter) => {
  return (dispatch) => {
    dispatch(getSalesTableAction('/getSalesTable', selectedFilter, 20, 0))
    dispatch(getSalesSTableAction('/getSalesSTable', selectedFilter, 20, 0))
    dispatch(getSalesChartBrandAction('/getSalesChartBrand', selectedFilter))
    dispatch(getSalesChartVolAction('/getSalesChartVol', selectedFilter))
    dispatch(getSalesChartBrandPromoAction('/getSalesChartBrandPromo', selectedFilter))
  }
}