import * as constant from './actionTypes'
import {queryStringForRoutes} from 'utils/queryStringForRoutes'
import {changeCalendarRangeFromRoute} from 'store/app/actions'
import API from 'utils/API'


// ------------------------------------
// Action
// ------------------------------------

export function getReportRequest () {
  return {
    type    : constant.GET_REPORT_REQUEST
  }
}

export function getReportSuccess (report) {
  return {
    type    : constant.GET_REPORT_SUCCESS,
    payload : report
  }
}

export function getReportFailure (data) {
  return {
    type    : constant.GET_REPORT_FAILURE,
    payload : data.error
  }
}

// ------------------------------------
// Specialized Action Creator
// ------------------------------------

export const getReportAction = (
  requestId,
  reportId,
  filter,
  take,
  skip,
  searchValue = null,
  sorting = { columnName: 'fav', direction: 'desc' },
  // orderBy = 'favdesc'
) => {
  return async (dispatch, getState) => {
    dispatch(getReportRequest())
    let contextualFilterData = getState().app.contextualFilterData
    let qs = await queryStringForRoutes(filter, contextualFilterData);

    if (searchValue) {
      qs += '&search=' + searchValue
    }

    if (sorting) {
      qs += '&orderby=' + sorting.columnName + sorting.direction
    }

    if (take !== undefined) qs += '&psize=' + take;
    if (skip !== undefined) qs += '&skip=' + skip;

    qs += `&reportid=${reportId}`;

    return API({
      url: `/reports/${qs}`,
      requestId,
    })
    .then(data => {
      dispatch(changeCalendarRangeFromRoute(data))
      dispatch(getReportSuccess(data))
    })
    .catch(err => dispatch(getReportFailure({ error: err })))
  }
}


export const getSubheaderReportData = (selectedFilter) => {
  return (dispatch, getState) => {
    let requestId = getState().app.requestID
    dispatch(getReportAction('/getReport', requestId, selectedFilter, 20, 0))
  }
}