import * as constant from './actionTypes'

const initialState = {
  data: null
}

export default (state = initialState, action) => {
  switch(action.type){
    case constant.GET_GALLERIE_REQUEST: {
      return ({ ...state, data: null, fetching: true })
    }
    case constant.GET_GALLERIE_SUCCESS: {
      return ({ ...state, data: action.payload, fetching: false })
    }
    case constant.GET_GALLERIE_FAILURE: {
      return ({ ...state, fetching: false })
    }
    default:
      return state
  }
}


