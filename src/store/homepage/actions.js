import * as constant from './actionTypes'
import {queryStringForRoutes} from 'utils/queryStringForRoutes'
import {changeCalendarRangeFromRoute} from 'store/app/actions'
import API from 'utils/API'


// ------------------------------------
// Action
// ------------------------------------
export function getHomeKpiRequest () {
  return {
    type    : constant.GET_HOMEKPI_REQUEST
  }
}

export function getHomeKpiSuccess (data) {
  return {
    type    : constant.GET_HOMEKPI_SUCCESS,
    payload : data
  }
}

export function getHomeKpiFailure (data) {
  return {
    type    : constant.GET_HOMEKPI_FAILURE,
    payload : data.error
  }
}



// ------------------------------------
// Specialized Action Creator
// ------------------------------------

export const getHomeKpiAction = (requestId, filter) => {
  return async (dispatch, getState) => {
    dispatch(getHomeKpiRequest())

    let contextualFilterData = getState().app.contextualFilterData

    let qs = await queryStringForRoutes(filter, contextualFilterData)
    
    return API({
      url: `/home/${qs}`,
      requestId,
    })
    .then(data => {
      dispatch(changeCalendarRangeFromRoute(data))
      dispatch(getHomeKpiSuccess(data))
    })
    .catch(err => dispatch(getHomeKpiFailure({ error: err })))
  }
}



export const getSubheaderHomeData = (selectedFilter) => {
  return (dispatch) => {
    dispatch(getHomeKpiAction(selectedFilter))
  }
}