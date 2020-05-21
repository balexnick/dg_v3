import * as constant from './actionTypes'

const initialState = {
  token: localStorage.getItem('datagramToken'),
  fetching: false,
  error: null
}

export default (state = initialState, action) => {
  switch(action.type) {
    case constant.LOGIN_REQUEST:{
      return { ...state, token: null, fetching: true, error: null }
    }
    case constant.LOGIN_SUCCESS:{
      return { ...state, token: action.payload, fetching: false, error: null }
    }
    case constant.LOGIN_FAILURE:{
      return { ...state, fetching: false, error: true }
    }
    default:
      return state
  }
}
