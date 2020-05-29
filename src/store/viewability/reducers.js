import * as constant from './actionTypes'

const initialState = {
  stable: null,
  stableFetching: false,
  ctable: null,
  ctableFetching: false,
  staxs: null,
  staxsFetching: false,
  staxc: null,
  staxcFetching: false,
  staxfb: null,
  staxfbFetching: false,
  ftable: null,
  ftableFetching: false
}

export default (state = initialState, action) => {
  switch(action.type){
    case constant.GET_STABLE_REQUEST:  {
      return ({ ...state, stable: null, stableFetching: true })
    }
    case constant.GET_STABLE_SUCCESS:  {
      return ({ ...state, ...action.payload, stableFetching: false })
    }
    case constant.GET_STABLE_FAILURE:  {
      return ({ ...state, stableFetching: false })
    }
    case constant.GET_CTABLE_REQUEST:  {
      return ({ ...state, ctable: null, ctableFetching: true })
    }
    case constant.GET_CTABLE_SUCCESS:  {
      return ({ ...state, ...action.payload, ctableFetching: false })
    }
    case constant.GET_CTABLE_FAILURE:  {
      return ({ ...state, ctableFetching: false })
    }
    case constant.GET_CHARTS_REQUEST:  {
      return ({ ...state, staxsFetching: true })
    }
    case constant.GET_CHARTS_SUCCESS:  {
      return ({ ...state, ...action.payload, staxsFetching: false })
    }
    case constant.GET_CHARTS_FAILURE:  {
      return ({ ...state, staxsFetching: false })
    }
    case constant.GET_CHARTC_REQUEST:  {
      return ({ ...state, staxcFetching: true })
    }
    case constant.GET_CHARTC_SUCCESS:  {
      return ({ ...state, ...action.payload, staxcFetching: false })
    }
    case constant.GET_CHARTC_FAILURE:  {
      return ({ ...state, staxcFetching: false })
    }
    case constant.GET_CHARTFB_REQUEST:  {
      return ({ ...state, staxfbFetching: true })
    }
    case constant.GET_CHARTFB_SUCCESS:  {
      return ({ ...state, ...action.payload, staxfbFetching: false })
    }
    case constant.GET_CHARTFB_FAILURE:  {
      return ({ ...state, staxfbFetching: false })
    }
    case constant.GET_FTABLE_REQUEST:  {
      return ({ ...state, ftable: null, ftableFetching: true })
    }
    case constant.GET_FTABLE_SUCCESS:  {
      return ({ ...state, ...action.payload, ftableFetching: false })
    }
    case constant.GET_FTABLE_FAILURE:  {
      return ({ ...state, ftableFetching: false })
    }
    default:
      return state
  }
}


