import * as constant from './actionTypes'

const initialState = {
  fetching: false,
  profile: {},
  getProfileSuccess: false,
  getProfileFailure: false,
  menuOpened: true
}

export default (state = initialState, action) => {
  switch(action.type) {
    case constant.GET_PROFILE_REQUEST:{
      return ({ ...state, fetching: true, getProfileSuccess: false, getProfileFailure: false })
    }
    case constant.GET_PROFILE_SUCCESS:{
    return ({ ...state, profile: { ...action.payload }, getProfileSuccess: true, getProfileFailure: false, fetching: false })

    }
    case constant.GET_PROFILE_FAILURE:{
      return ({ ...state, fetching: false, getProfileSuccess: false, getProfileFailure: true })
    }
    case constant.TOGGLE_MENU:{
      return({ ...state, menuOpened: action.payload })
    }
    default:
      return state
  }
}