import * as constant from './actionTypes'
import {queryStringForRoutes} from 'utils/queryStringForRoutes'
import {changeCalendarRangeFromRoute} from 'store/app/actions'
import API from 'utils/API'

// ------------------------------------
// Actions
// ------------------------------------

export const getEANRequest = () => {
  return {
    type: constant.GET_EAN_REQUEST
  }
}

export const getEANSuccess = (ean) => {
  return {
    type: constant.GET_EAN_SUCCESS,
    payload: ean
  }
}

export const getEANFailure = (data) => {
  return {
    type: constant.GET_EAN_FAILURE,
    error: data.error
  }
}


// export function showEANLoader (loader) {
//   return {
//     type: SHOW_EAN_LOADER,
//     payload: loader
//   }
// }

// ------------------------------------
// Specialized Action Creator
// ------------------------------------
export const getEANAction = (requestId, productId, filter) => {
  return async (dispatch, getState) => {
    dispatch(getEANRequest())

    const contextualFilterData = getState().app.contextualFilterData

    const qs = await queryStringForRoutes(filter, contextualFilterData)

    return API({
      url: `/ean/${productId}/${qs}`,
      requestId,
    })
    .then(data => {
      dispatch(changeCalendarRangeFromRoute(data))
      dispatch(getEANSuccess(data))
    })
    .catch(err => dispatch(getEANFailure({ error: err })))
  }
}

export const getSubheaderEANData = (selectedFilter) => {
  return (dispatch, getState) => {
    let requestId = getState().app.requestID
    dispatch(getEANAction('/getEAN', requestId, selectedFilter))
  }
}