import * as constant from './actionTypes'

const initialState = {
  token: localStorage.getItem('datagramToken'),
  profile: null,
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
      return { ...state, fetching: false, error: action.error }
    }
    case constant.GET_PROFILE_REQUEST:{
      return { ...state, profile: null, fetching: true }
    }
    case constant.GET_PROFILE_SUCCESS:{
      return { ...state, profile: action.payload, fetching: false }
    }
    case constant.GET_PROFILE_FAILURE:{
      return { ...state, fetching: false }
    }
    default:
      return state
  }
}
