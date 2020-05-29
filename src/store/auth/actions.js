import * as constant from './actionTypes'
import API from 'utils/API'
import {browserHistory} from 'index'

export const loginAction = (requestId, username, password) => {
  return (dispatch) => {
    dispatch({type: constant.LOGIN_REQUEST})
    return API({
      url: `/login`,
      method: 'POST',
      data: { username, password },
      requestId,
      useToken: false,
    })
    .then(data => dispatch(loginSuccess(data)))
    .catch(err =>  dispatch({type: constant.LOGIN_FAILURE, payload: err }))
  }
}

export function loginSuccess (data) {
  browserHistory.push('/')
  localStorage.setItem('datagramToken', data.token)
  return {
    type    : constant.LOGIN_SUCCESS,
    payload : data.token
  }
}

export const removeToken = () => {
  return{
    type    : constant.REMOVE_TOKEN,
  }
}