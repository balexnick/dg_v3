import * as constant from './actionTypes'

const initialState = {
  table: null,
  tableFetching: false,
  staxtitle: null,
  staxtitleFetching: false,
  staximage: null,
  staximageFetching: false,
  staxlegal: null,
  staxlegalFetching: false
}

export default (state = initialState, action) => {
  switch(action.type){
    case constant.GET_CHART_TITLE_DATA_REQUEST: {
      return ({ ...state, staxtitleFetching: true })
    }
    case constant.GET_CHARTTITLE_DATA_SUCCESS: {
      return ({ ...state, ...action.payload, staxtitleFetching: false })
    }
    case constant.GET_CHARTTITLE_DATA_FAILURE: {
      return ({ ...state, staxtitleFetching: false })
    }

    case constant.GET_CHARTIMAGE_DATA_REQUEST: {
      return ({ ...state, staximageFetching: true })
    }
    case constant.GET_CHARTIMAGE_DATA_SUCCESS: {
      return ({ ...state, ...action.payload, staximageFetching: false })
    }
    case constant.GET_CHARTIMAGE_DATA_FAILURE: {
      return ({ ...state, staximageFetching: false })
    }

    case constant.GET_CHARTLEGAL_DATA_REQUEST: {
      return ({ ...state, staxlegalFetching: true })
    }
    case constant.GET_CHARTLEGAL_DATA_SUCCESS:  {
      return ({ ...state, ...action.payload, staxlegalFetching: false })
    }
    case constant.GET_CHARTLEGAL_DATA_FAILURE: {
      return ({ ...state, staxlegalFetching: false })
    }

    case constant.GET_PRODUCT_TABLE_REQUEST: {
      return ({ ...state, table: null, tableFetching: true })
    }
    case constant.GET_PRODUCT_TABLE_SUCCESS: {
      return ({ ...state, ...action.payload, tableFetching: false })
    }
    case constant.GET_PRODUCT_TABLE_FAILURE: {
      return ({ ...state, tableFetching: false })
    }
    

    default:
      return state
  }
}


