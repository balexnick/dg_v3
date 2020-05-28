import * as constant from './actionTypes'

const initialState = {
  stax: null,
  table: null,
  tableFetching: false,
  staxFetching: false,
  export: [],
  export_options: []
}


export default (state = initialState, action) => {
  switch(action.type){
    case constant.GET_PRICE_TABLE_REQUEST: {
      return ({ ...state, table: null, tableFetching: true })
    }
    case constant.GET_PRICE_TABLE_SUCCESS: {
      return ({ ...state, ...action.payload, tableFetching: false })
    }
    case constant.GET_PRICE_TABLE_FAILURE: {
      return ({ ...state, tableFetching: false })
    }
    case constant.GET_CHART_DATA_REQUEST: {
      return ({ ...state, staxFetching: true })
    }
    case constant.GET_PRICE_CHART_DATA_SUCCESS: {
      return ({ ...state, ...action.payload, staxFetching: false })
    }
    case constant.GET_CHART_DATA_FAILURE: {
      return ({ ...state, staxFetching: false })
    }
    default: 
      return state
  }
}