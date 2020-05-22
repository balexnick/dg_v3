import * as conatant from './actionTypes'
import API from 'utils/API'

export const getProfileAction = () => {
  return (dispatch) => {
    dispatch({type: conatant.GET_PROFILE_REQUEST})
    return API({
      url: `/me`
    })
    .then(data => dispatch({type: conatant.GET_PROFILE_SUCCESS, payload: data }))
    .catch(err => dispatch({type: conatant.GET_PROFILE_FAILURE, error: err }))
  }
}


export const toggleMenu = (opened) => {
  return (dispatch) => {
    dispatch({type: conatant.TOGGLE_MENU, payload: opened})
  }
}