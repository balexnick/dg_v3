import * as constant from './actionTypes'

const initialState = {
  ptable: null,
  ptableFetching: false,
  stable: null,
  stableFetching: false,
  staxbrand: null,
  staxbrandFetching: false,
  staxvol: null,
  staxvolFetching: false,
  staxbrandpromo: null,
  staxbrandpromoFetching: false,
  localPeriod: {
    staxbrand: 1,
    staxbrandpromo: 1,
  },
  staxbrandDefaultPeriod : null,
  staxbrandpromoDefaultPeriod: null
}

export default (state = initialState, action) => {
  switch(action.type){
    case constant.GET_SALES_TABLE_REQUEST: {
      return ({ ...state, ptable: null, ptableFetching: true })
    }
    case constant.GET_SALES_TABLE_SUCCESS: {
      return ({ ...state, ...action.payload, ptableFetching: false })
    }
    case constant.GET_SALES_TABLE_FAILURE: {
      return ({ ...state, ptableFetching: false })
    }
    case constant.GET_SALES_STABLE_REQUEST: {
      return ({ ...state, stable: null, stableFetching: true })
    }
    case constant.GET_SALES_STABLE_SUCCESS: {
      return ({ ...state, ...action.payload, stableFetching: false })
    }
    case constant.GET_SALES_STABLE_FAILURE: {
      return ({ ...state, stableFetching: false })
    }
    case constant.GET_SALES_CHARTBRAND_REQUEST: {
      return ({ ...state, staxbrandFetching: true })
    }
    case constant.GET_SALES_CHARTBRAND_SUCCESS: {
      return ({ ...state, ...action.payload, staxbrandDefaultPeriod: action.payload.default_period, staxbrandFetching: false })
    }
    case constant.GET_SALES_CHARTBRAND_FAILURE: {
      return ({ ...state, staxbrandFetching: false })
    }
    case constant.GET_SALES_CHARTVOL_REQUEST: {
      return ({ ...state, staxvolFetching: true })
    }
    case constant.GET_SALES_CHARTVOL_SUCCESS: {
      return ({ ...state, ...action.payload, staxvolFetching: false })
    }
    case constant.GET_SALES_CHARTVOL_FAILURE: {
      return ({ ...state, staxvolFetching: false })
    }
    case constant.GET_SALES_CHARTBRANDPROMO_REQUEST: {
      return ({ ...state, staxbrandpromoFetching: true })
    }
    case constant.GET_SALES_CHARTBRANDPROMO_SUCCESS: {
      return ({ ...state, ...action.payload, staxbrandpromoDefaultPeriod:action.payload.default_period, staxbrandpromoFetching: false })
    }
    case constant.GET_SALES_CHARTBRANDPROMO_FAILURE: {
      return ({ ...state, staxbrandpromoFetching: false })
    }
    case constant.CHANGE_LOCAL_PERIOD: {
      return ({ ...state, localPeriod: { ...state.localPeriod, ...action.payload } })
    }
    default:
      return state
  }
}


