import * as constant from './actionTypes'

const initialState = {
  stax: null,
  staxpo: null,
  staxbrand: null,
  dnrup: null,
  table: null,
  tableFetching: false,
  btable: false,
  btableFetching: false,
  staxFetching: false,
  dnrupFetching: false,
  staxbrandFetching: false,
  localPeriod:{
    chartDN: 1,
  }
}

export default (state = initialState, action) => {
  switch(action.type){
    case constant.GET_ASSORTMENT_TABLE_REQUEST: {
      return ({ ...state, table: null, tableFetching: true })
    }
    case constant.GET_ASSORTMENT_TABLE_SUCCESS: {
      return ({ ...state, ...action.payload, tableFetching: false })
    }
    case constant.GET_ASSORTMENT_TABLE_FAILURE: {
      return ({ ...state, tableFetching: false })
    }

    case constant.GET_ASSORTMENT_BRAND_TABLE_REQUEST: {
      return ({ ...state, btable: null, btableFetching: true })
    }
    case constant.GET_ASSORTMENT_BRAND_TABLE_SUCCESS: {
      return ({ ...state, ...action.payload, btableFetching: false })
    }
    case constant.GET_ASSORTMENT_BRAND_TABLE_FAILURE: {
      return ({ ...state, btableFetching: false })
    }

    case constant.GET_ASSORTMENT_CHARTDN_REQUEST: {
      return ({ ...state, dnrupFetching: true })
    }
    case constant.GET_ASSORTMENT_CHARTDN_SUCCESS: {
      return ({ ...state, ...action.payload, dnrupFetching: false })
    }
    case constant.GET_ASSORTMENT_CHARTDN_FAILURE:  {
      return ({ ...state, dnrupFetching: false })
    }

    case constant.GET_ASSORTMENT_CHARTBRAND_REQUEST: {
      return ({ ...state, staxbrandFetching: true })
    }
    case constant.GET_ASSORTMENT_CHARTBRAND_SUCCESS: {
      return ({ ...state, ...action.payload, staxbrandFetching: false })
    }
    case constant.GET_ASSORTMENT_CHARTBRAND_FAILURE: {
      return ({ ...state, staxbrandFetching: false })
    }

    case constant.CHANGE_LOCAL_PERIOD: {
      return ({ ...state, localPeriod: { ...state.localPeriod, ...action.payload } })
    }
    default:
      return state
  }
}


