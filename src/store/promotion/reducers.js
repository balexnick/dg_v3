import * as constant from './actionTypes'

const initialState = {
 
}

export default (state = initialState, action) => {
  switch(action.type){
    case constant.GET_PROMOTION_TABLE_REQUEST: {
      return ({ ...state, table: null, tableFetching: true })
    }
    case constant.GET_PROMOTION_TABLE_SUCCESS: {
      return ({ ...state, ...action.payload, tableFetching: false })
    }
    case constant.GET_PROMOTION_TABLE_FAILURE: {
      return ({ ...state, tableFetching: false })
    }
    case constant.GET_CHARTBRAND_DATA_REQUEST: {
      return ({ ...state, staxbrandFetching: true })
    }
    case constant.GET_CHARTBRAND_DATA_SUCCESS: {
      return ({ ...state, ...action.payload, staxbrandFetching: false })
    }
    case constant.GET_CHARTBRAND_DATA_FAILURE: {
      return ({ ...state, staxbrandFetching: false })
    }
    default:
      return state
  }
}


