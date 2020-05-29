import * as constant from './actionTypes'
import {queryStringForRoutes} from 'utils/queryStringForRoutes'
import {changeCalendarRangeFromRoute} from 'store/app/actions'
import API from 'utils/API'


// ------------------------------------
// Action
// ------------------------------------

export const getChartTitleDataRequest = () => {
  return {
    type  : constant.GET_CHART_TITLE_DATA_REQUEST
  }
}

export const getChartTitleDataSuccess = (data) => {
  return {
    type   : constant.GET_CHARTTITLE_DATA_SUCCESS,
    payload: data
  }
}

export const getChartTitleDataFailure = (err) => {
  return {
    type   : constant.GET_CHARTTITLE_DATA_FAILURE,
    payload: err
  }
}


export const getChartImageDataRequest = () => {
  return {
    type   : constant.GET_CHARTIMAGE_DATA_REQUEST
  }
}

export const getChartImageDataSuccess = (data) => {
  return {
    type   : constant.GET_CHARTIMAGE_DATA_SUCCESS,
    payload: data
  }
}

export const getChartImageDataFailure = (err) => {
  return {
    type   : constant.GET_CHARTIMAGE_DATA_FAILURE,
    payload: err
  }
}


export const getChartLegalDataRequest = () => {
  return {
    type   : constant.GET_CHARTLEGAL_DATA_REQUEST
  }
}

export const getChartLegalDataSuccess = (data) => {
  return {
    type   : constant.GET_CHARTLEGAL_DATA_SUCCESS,
    payload: data
  }
}

export const getChartLegalDataFailure = (err) => {
  return {
    type   : constant.GET_CHARTLEGAL_DATA_FAILURE,
    payload: err
  }
}


export const getProductTableRequest = () => {
  return {
    type  : constant.GET_PRODUCT_TABLE_REQUEST
  }
}

export const getProductTableSuccess = (data) => {
  return {
    type   : constant.GET_PRODUCT_TABLE_SUCCESS,
    payload: data
  }
}

export const getProductTableFailure = (data) => {
  return {
    type : constant.GET_PRODUCT_TABLE_FAILURE,
    error: data.error
  }
}


// ------------------------------------
// Specialized Action Creator
// ------------------------------------

export const getProductChartTitleAction = (requestId, filter) => {
  return async (dispatch, getState) => {
    dispatch(getChartTitleDataRequest())
    let contextualFilterData = getState().app.contextualFilterData

    let qs = await queryStringForRoutes(filter, contextualFilterData)

    return API({
      url: `/product/staxtitle/${qs}`,
      requestId,
    })
    .then(data => {
      dispatch(changeCalendarRangeFromRoute(data))
      dispatch(getChartTitleDataSuccess(data))
    })
    .catch(err => dispatch(getChartTitleDataFailure({ error: err })))
  }
}

export const getProductChartImageAction = (requestId, filter) => {
  return async (dispatch, getState) => {
    dispatch(getChartImageDataRequest())

    let contextualFilterData = getState().app.contextualFilterData

    let qs = await queryStringForRoutes(filter, contextualFilterData)

    return API({
      url: `/product/staximage/${qs}`,
      requestId,
    })
    .then(data => {
      dispatch(changeCalendarRangeFromRoute(data))
      dispatch(getChartImageDataSuccess(data))
    })
    .catch(err => dispatch(getChartImageDataFailure({ error: err })))
  }
}

export const getProductChartLegalAction = (requestId, filter) => {
  return async (dispatch, getState) => {
    dispatch(getChartLegalDataRequest())

    let contextualFilterData = getState().app.contextualFilterData

    let qs = await queryStringForRoutes(filter, contextualFilterData)

    return API({
      url: `/product/staxlegal/${qs}`,
      requestId,
    })
    .then(data => {
      dispatch(changeCalendarRangeFromRoute(data))
      dispatch(getChartLegalDataSuccess(data))
    })
    .catch(err => dispatch(getChartLegalDataFailure({ error: err })))
  }
}

export const getProductTableAction = (
  requestId,
  filter,
  take,
  skip,
  searchValue = null,
  sorting = { columnName: 'fav', direction: 'desc' },
  // orderBy = 'favdesc'
) => {
  return async (dispatch, getState) => {
    dispatch(getProductTableRequest())

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
      url: `/product/table/${qs}`,
      requestId,
    })
    .then(data => {
      dispatch(changeCalendarRangeFromRoute(data))
      dispatch(getProductTableSuccess(data))
    })
    .catch(err => dispatch(getProductTableFailure({ error: err })))
  }
}

export const getSubheaderProductData = (selectedFilter) => {
  return (dispatch) => {
    dispatch(getProductChartTitleAction('/getProductChartTitle', selectedFilter))
    dispatch(getProductChartImageAction('/getProductChartImage', selectedFilter))
    dispatch(getProductChartLegalAction('/getProductChartLegal', selectedFilter))
    dispatch(getProductTableAction('/getProductTable', selectedFilter, 20, 0))
  }
}