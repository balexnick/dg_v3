import * as constant from './actionTypes'

const initialState = {
  bbrand: null,
  btime: null,
  table: null,
  tableFetching: false,
  bbrandFetching: false,
  btimeFetching: false
}

export default (state = initialState, action) => {
  switch(action.type){
    case constant.GET_RATING_TABLE_REQUEST: {
      return ({ ...state, table: null, tableFetching: true })
    }
    case constant.GET_RATING_TABLE_SUCCESS: {
      return ({ ...state, ...action.payload, tableFetching: false })
    }
    case constant.GET_RATING_TABLE_FAILURE: {
      return ({ ...state, tableFetching: false })
    }
    case constant.GET_BBCHART_DATA_REQUEST: {
      return ({ ...state, bbrandFetching: true })
    }
    case constant.GET_BBCHART_DATA_SUCCESS: {
      return ({ ...state, ...action.payload, bbrandFetching: false })
    }
    case constant.GET_BBCHART_DATA_FAILURE: {
      return ({ ...state, bbrandFetching: false })
    }
    case constant.GET_BTIME_DATA_REQUEST: {
      return ({ ...state, btimeFetching: true })
    }
    case constant.GET_BTIME_DATA_SUCCESS: {
      return ({ ...state, ...action.payload, btimeFetching: false })
    }
    case constant.GET_BTIME_DATA_FAILURE: {
      return ({ ...state, btimeFetching: false })
    }
    default:
      return state
  }
}


