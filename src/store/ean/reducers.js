import * as constant from './actionTypes'

const initialState = {
  ean: null,
  loaderEan: false
}

export default (state = initialState, action) => {
  switch(action.type){
    case constant.GET_EAN_REQUEST: {
      return { ...state, ean: null, fetching: true }
    }
    case constant.GET_EAN_SUCCESS: {
      return { ...state, ean: action.payload, fetching: false }
    }
    case constant.GET_EAN_FAILURE:  {
      return { ...state, fetching: false }
    }
    case constant.SHOW_EAN_LOADER: {
      return { ...state, loaderEan: action.payload }
    }
    default:
      return state
  }
}