import * as constant from './actionTypes'

const initialState = {
  reportData: null, 
  reportId: null,
  reportTitle: null 
}

export default (state = initialState, action) => {
  switch(action.type){
    case constant.GET_REPORT_REQUEST: {
      return ({ ...state, reportData: null, fetching: true })
    }
    case constant.GET_REPORT_SUCCESS: {
      return ({
        ...state,
        ...action.payload,
        reportData: action.payload.rep && action.payload.rep.data,
        reportId: action.payload.rep && action.payload.rep.id,
        reportTitle: action.payload.rep && action.payload.rep.title,
        fetching: false
      })
    }
    case constant.GET_REPORT_FAILURE: {
      return ({ ...state, fetching: false })
    }
    default:
      return state
  }
}


