import * as conatant from './actionTypes'
import API from 'utils/API'

export function loginRequest () {
  return {
    type    : conatant.LOGIN_REQUEST
  }
}

export function loginSuccess (data) {
  if (data.error) {
    localStorage.removeItem('selected-filters');
    localStorage.removeItem('datagramToken');
    return loginFailure(data)
  } else {
    localStorage.setItem('datagramToken', data.token)
    window.location.href = '/'
    return {
      type    : conatant.LOGIN_SUCCESS,
      payload : data.token
    }
  }
}

export function loginFailure (data) {
  return {
    type    : conatant.LOGIN_FAILURE,
    error   : data.error
  }
}

export function getProfileRequest () {
  return {
    type    : conatant.GET_PROFILE_REQUEST
  }
}

export function getProfileSuccess (profile) {
  return {
    type    : conatant.GET_PROFILE_SUCCESS,
    payload : profile
  }
}

export function getProfileFailure (data) {
  return {
    type  : conatant.GET_PROFILE_FAILURE,
    error : data.error
  }
}

export const loginAction = (requestId, username, password) => {
  return (dispatch) => {
    // dispatch(loginRequest())
    return API({
      url: `/login`,
      method: 'POST',
      data: { username, password },
      requestId,
      useToken: false,
    })
    .then(data => loginSuccess(data))
    .catch(err => loginFailure({ error: err }))
  }
}

export const getProfileAction = () => {
  return (dispatch) => {
    dispatch(getProfileRequest())
    const token = localStorage.getItem('datagramToken')
    if (token) {
      return API({
        url: '/me',
      })
      .then(res => res.json())
      .then(data => dispatch(getProfileSuccess(data)))
      .catch(err => dispatch(getProfileFailure({ error: err })))
    } else {
      localStorage.removeItem('selected-filters')
      dispatch(getProfileFailure({ error: 'Unauthorized!' }))
    }
  }
}
