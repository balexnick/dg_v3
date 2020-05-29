import * as constant from './actionTypes'

const initialState = {
  data: null
}

export default (state = initialState, action) => {
  switch(action.type){
    case constant.GET_HOMEKPI_REQUEST: {
      return ({ ...state, data: null, fetching: true })
    }
    case constant.GET_HOMEKPI_SUCCESS: {
      return ({ ...state, data: action.payload, fetching: false })
    }
    case constant.GET_HOMEKPI_FAILURE: {
      return ({ ...state, fetching: false })
    }
    default:
      return state
  }
}


