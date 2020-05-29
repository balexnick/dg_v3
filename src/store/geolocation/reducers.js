import * as constant from './actionTypes'

const initialState = {
  mapd: null,
  mapp: null,
  table: null,
  staxdrive: null,
  tableFetching: false,
  mapdFetching: false,
  mappFetching: false,
  staxdriveFetching: false
}

export default (state = initialState, action) => {
  switch(action.type){
    case constant.GET_GEOLOCATION_TABLE_REQUEST: {
      return ({ ...state, table: null, tableFetching: true })
    }
    case constant.GET_GEOLOCATION_TABLE_SUCCESS: {
      return ({ ...state, ...action.payload, tableFetching: false })
    }
    case constant.GET_GEOLOCATION_TABLE_FAILURE: {
      return ({ ...state, tableFetching: false })
    }
    case constant.GET_GEOLOCATION_MAPD_REQUEST: {
      return ({ ...state, mapdFetching: true })
    }
    case constant.GET_GEOLOCATION_MAPD_SUCCESS: {
      return ({ ...state, ...action.payload, mapdFetching: false })
    }
    case constant.GET_GEOLOCATION_MAPD_FAILURE: {
      return ({ ...state, mapdFetching: false })
    }
    case constant.GET_GEOLOCATION_MAPP_REQUEST: {
      return ({ ...state, mappFetching: true })
    }
    case constant.GET_GEOLOCATION_MAPP_SUCCESS: {
      return ({ ...state, ...action.payload, mappFetching: false })
    }
    case constant.GET_GEOLOCATION_MAPP_FAILURE: {
      return ({ ...state, mappFetching: false })
    }
    case constant.GET_GEOLOCATION_CHARTDRIVE_REQUEST: {
      return ({ ...state, staxdriveFetching: true })
    }
    case constant.GET_GEOLOCATION_CHARTDRIVE_SUCCESS: {
      return ({ ...state, ...action.payload, staxdriveFetching: false })
    }
    case constant.GET_GEOLOCATION_CHARTDRIVE_FAILURE:  {
      return ({ ...state, staxdriveFetching: false })
    }
    default:
      return state
  }
}


