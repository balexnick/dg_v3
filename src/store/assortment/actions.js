import * as constant from './actionTypes'
import {queryStringForRoutes} from 'utils/queryStringForRoutes'
import {changeCalendarRangeFromRoute} from 'store/app/actions'
import {setNewAlertOptions} from 'store/app/actions'
import API from 'utils/API'


export function getAssortmentChartDNRequest () {
  return {
    type   : constant.GET_ASSORTMENT_CHARTDN_REQUEST
  }
}

export function getAssortmentChartDNSuccess (data) {
  return {
    type   : constant.GET_ASSORTMENT_CHARTDN_SUCCESS,
    payload: data
  }
}

export function getAssortmentChartDNFailure (err) {
  return {
    type   : constant.GET_ASSORTMENT_CHARTDN_FAILURE,
    payload: err
  }
}


export function getAssortmentTableRequest () {
  return {
    type   : constant.GET_ASSORTMENT_TABLE_REQUEST
  }
}

export function getAssortmentTableSuccess (data) {
  return {
    type   : constant.GET_ASSORTMENT_TABLE_SUCCESS,
    payload: data
  }
}

export function getAssortmentTableFailure (data) {
  return {
    type   : constant.GET_ASSORTMENT_TABLE_FAILURE,
    error  : data.error
  }
}


export function getAssortmentBrandTableRequest () {
  return {
    type    : constant.GET_ASSORTMENT_BRAND_TABLE_REQUEST
  }
}

export function getAssortmentBrandTableSuccess (data) {
  return {
    type    : constant.GET_ASSORTMENT_BRAND_TABLE_SUCCESS,
    payload : data
  }
}

export function getAssortmentBrandTableFailure (data) {
  return {
    type    : constant.GET_ASSORTMENT_BRAND_TABLE_FAILURE,
    error   : data.error
  }
}


export function getAssortmentChartBrandRequest () {
  return {
    type     : constant.GET_ASSORTMENT_CHARTBRAND_REQUEST
  }
}

export function getAssortmentChartBrandSuccess (data) {
  return {
    type    : constant.GET_ASSORTMENT_CHARTBRAND_SUCCESS,
    payload: data
  }
}

export function getAssortmentChartBrandFailure (err) {
  return {
    type    : constant.GET_ASSORTMENT_CHARTBRAND_FAILURE,
    payload: err
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
// Action
// ------------------------------------


export const getAssortmentChartBrandAction = (requestId, filter) => {
  return async (dispatch, getState) => {
    dispatch(getAssortmentChartBrandRequest())
    const contextualFilterData = getState().app.contextualFilterData;

    let qs = await queryStringForRoutes(filter, contextualFilterData);

    return API({
      url: `/assortment/staxbrand/${qs}`,
      requestId,
    })
    .then(data => {
      dispatch(changeCalendarRangeFromRoute(data))
      dispatch(getAssortmentChartBrandSuccess(data))
      if (data.staxbrand.alert_kpi) {
        const newAlerts = { type: 'staxbrand', data: data.staxbrand }
        dispatch(setNewAlertOptions(newAlerts))
      }
    })
    .catch(err => dispatch(getAssortmentChartBrandFailure({ error: err })));
  }
}

export const getAssortmentChartDNAction = (requestId, filter) => {
  return async (dispatch, getState) => {
    dispatch(getAssortmentChartDNRequest())

    const { assortment } = getState()

    let contextualFilterData = getState().app.contextualFilterData

    let qs = await queryStringForRoutes(filter, contextualFilterData)

    if (filter && assortment.localPeriod.chartDN) {
      qs += '&period=' + assortment.localPeriod.chartDN
    }

    return API({ 
            url: `/assortment/dnrup/${qs}`, 
            requestId 
          })
          .then(data => {
            dispatch(changeCalendarRangeFromRoute(data))
            dispatch(getAssortmentChartDNSuccess(data))
            if (data.dnrup.alert_kpi) {
              const newAlerts = { type: 'dnrup', data: data.dnrup }
              dispatch(setNewAlertOptions(newAlerts))
            }
          })
          .catch(err => dispatch(getAssortmentChartDNFailure({ error: err })))
  }
}

export const getAssortmentTableAction = (
  requestId,
  filter,
  take,
  skip,
  searchValue = null,
  sorting = { columnName: 'fav', direction: 'desc' },
  // orderBy = 'favdesc'
) => {
  return async (dispatch, getState) => {
    dispatch(getAssortmentTableRequest())

    let contextualFilterData = getState().app.contextualFilterData
    
    let qs = await queryStringForRoutes(filter, contextualFilterData);

    if (searchValue) {
      qs += '&search=' + searchValue
    }

    if (sorting) {
      qs += '&orderby=' + sorting.columnName + sorting.direction
    }

    if (take !== undefined) qs += '&psize=' + take
    if (skip !== undefined) qs += '&skip=' + skip

    return API({
      url: `/assortment/table/${qs}`,
      requestId,
    })
    .then(data => {
      dispatch(changeCalendarRangeFromRoute(data))
      dispatch(getAssortmentTableSuccess(data))
      if (data.table.alert_kpi) {
        const newAlerts = { type: 'table', data: data.table }
        dispatch(setNewAlertOptions(newAlerts))
      }
    })
    .catch(err => dispatch(getAssortmentTableFailure({ error: err })))
  }
}

export const getAssortmentBrandTableAction = (
  requestId,
  filter,
  take,
  skip,
  searchValue = null,
  sorting = { columnName: 'c', direction: 'desc' },
  // orderBy = 'cdesc'
) => {
  return async (dispatch, getState) => {
    dispatch(getAssortmentBrandTableRequest())
    let contextualFilterData = getState().app.contextualFilterData

    let qs = await queryStringForRoutes(filter, contextualFilterData);

    if (searchValue) {
      qs += '&search=' + searchValue
    }

    if (sorting) {
      qs += '&orderby=' + sorting.columnName + sorting.direction
    }

    if (take !== undefined) qs += '&psize=' + take
    if (skip !== undefined) qs += '&skip=' + skip

    return API({
      url: `/assortment/tablebrand/${qs}`,
      requestId,
    })
    .then(data => {
      dispatch(changeCalendarRangeFromRoute(data))
      dispatch(getAssortmentBrandTableSuccess(data))
      if (data.btable.alert_kpi) {
        const newAlerts = { type: 'btable', data: data.btable }
        dispatch(setNewAlertOptions(newAlerts))
      }
    })
    .catch(err => dispatch(getAssortmentBrandTableFailure({ error: err })))
  }
}


// ------------------------------------
// Specialized Action Creator
// ------------------------------------



export const getSubheaderAssortmentData = (selectedFilter) => {
  return (dispatch) => {
    dispatch(getAssortmentTableAction('/getAssortmentTable', selectedFilter, 20, 0))
    dispatch(getAssortmentBrandTableAction('/getAssortmentBrandTable', selectedFilter, 20, 0))
    dispatch(getAssortmentChartBrandAction('/getAssortmentChartBrand', selectedFilter))
    dispatch(getAssortmentChartDNAction('/getAssortmentChartDN', selectedFilter))
  }
}