import * as constant from './actionTypes'
// import {queryStringForRoutes} from 'utils/queryStringForRoutes'
// import {changeCalendarRangeFromRoute} from 'store/app/actions'
import API from 'utils/API'


// ------------------------------------
// Action
// ------------------------------------

export function getGallerieRequest () {
  return {
    type    : constant.GET_GALLERIE_REQUEST
  }
}

export function getGallerieSuccess (data) {
  return {
    type    : constant.GET_GALLERIE_SUCCESS,
    payload : data
  }
}

export function getGallerieFailure (data) {
  return {
    type    : constant.GET_GALLERIE_FAILURE,
    payload : data.error
  }
}



// ------------------------------------
// Specialized Action Creator
// ------------------------------------

export const getGallerieAction = (requestId, filter) => {
  return (dispatch) => {
    dispatch(getGallerieRequest())
  
    return API({
      url: `/gallerie`,
      requestId,
    })
    .then(data => dispatch(getGallerieSuccess(data)))
    .catch(err => dispatch(getGallerieFailure({ error: err })))
  }
}


export const getSubheaderGallerieData = (selectedFilter) => {
  return (dispatch) => {
    dispatch(getGallerieAction(selectedFilter))
  }
}