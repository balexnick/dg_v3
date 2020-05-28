import * as constant from './actionTypes'

const initialState = {
  stax: null,
  fstax: null,
  table: null,
  mediaTimeline: null,
  tableFetching: false,
  staxFetching: false,
  fstaxFetching: false,
  mediaTimelineFetching: false,
  localPeriod: {
    stax: 1,
  },
  manufacturerGroup: 'non',
  fChartManufacturerGroup: 'non',
  export: [],
  export_options: []
}

export default (state = initialState, action) => {
  switch(action.type){
    case constant.GET_MEDIA_TABLE_REQUEST: {
      return ({ ...state, table: null, tableFetching: true })
    }
    case constant.GET_MEDIA_TABLE_SUCCESS: {
      return ({ ...state, ...action.payload, tableFetching: false })
    }
    case constant.GET_MEDIA_TABLE_FAILURE: {
      return ({ ...state, tableFetching: false })
    }
    case constant.GET_CHART_DATA_REQUEST: {
      return ({ ...state, staxFetching: true })
    }
    case constant.GET_MEDIA_CHART_DATA_SUCCESS: {
      return ({ ...state, ...action.payload, mediaDefaultPeriod:action.payload.default_period, staxFetching: false })
    }
    case constant.GET_CHART_DATA_FAILURE: {
      return ({ ...state, staxFetching: false })
    }
    case constant.GET_FCHART_DATA_REQUEST: {
      return ({ ...state, fstaxFetching: true })
    }
    case constant.GET_FCHART_DATA_SUCCESS: {
      return ({ ...state, ...action.payload, fstaxFetching: false })
    }
    case constant.GET_FCHART_DATA_FAILURE: {
      return ({ ...state, fstaxFetching: false })
    }
    case constant.GET_MEDIATIMELINE_DATA_REQUEST: {
      return ({ ...state, mediaTimelineFetching: true })
    }
    case constant.GET_MEDIATIMELINE_DATA_SUCCESS: {
      return ({ ...state, mediaTimeline: action.payload.tline, mediaTimelineFetching: false })
    }
    case constant.GET_MEDIATIMELINE_DATA_FAILURE: {
      return ({ ...state, mediaTimelineFetching: false })
    }
    case constant.CHANGE_LOCAL_PERIOD: {
      return ({ ...state, localPeriod: { ...state.localPeriod, ...action.payload } })
    }
    case constant.CHANGE_MANUFACTURER_GROUP: {
      return ({ ...state, manufacturerGroup: action.payload })
    }
    case constant.CHANGE_FCHART_MANUFACTURER_GROUP: {
      return ({ ...state, fChartManufacturerGroup: action.payload })
    }
    default:
      return state
  }
}


