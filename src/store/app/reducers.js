import * as constant from './actionTypes'
import moment from 'moment'

function getInitialSelectedFilters() {
  const selectedFilter = {
    date: moment().format('YYYYMMDD'),
    date2: moment().add(1, 'week').format('YYYYMMDD'),
    pickedDate: moment().format('YYYYMMDD'),
    pickedDate2: moment().add(1, 'week').format('YYYYMMDD'),
    extra: [],
    requestDate: false,
    requestDate2: false,
    col: [],
  }
  
  const localStorageFiltersString = localStorage.getItem('selected-filters');
  if(localStorageFiltersString) {
    const localStorageObj = JSON.parse(localStorageFiltersString);
    selectedFilter.date = localStorageObj.date;
    selectedFilter.date2 = localStorageObj.date2;
    selectedFilter.extra = localStorageObj.extra;
    selectedFilter.pickedDate = localStorageObj.pickedDate;
    selectedFilter.pickedDate2 = localStorageObj.pickedDate2;
  }
  return selectedFilter;
}


const initialState = {
  fetching: false,
  profile: {},
  getProfileSuccess: false,
  getProfileFailure: false,
  menuOpened: true,
  filters: {},
  extraFilters: [],
  contextualFilterData: [],
  selectedFilter: getInitialSelectedFilters(),
  snackBarFilters: [],
  activeTrees: {},
  deletedFiltersIds: [],
  error: null,
  loadingDefaultFilters: false,
  defaultFiltersSet: false,
  requestID: null,
  alertsModal: {},
  pageTitleKey: null,
  isOpenSaveFiltersModal: false,
  selectedFiltersExistence: false,
  isOpenGroupFiltersModal: false,
  isShowSubheaderSnackbar: false,
  subheaderSnackbarMessage: '',
  isLoadGroupFiltersList: false,
  groupFiltersList: [],
}

export default (state = initialState, action) => {
  switch(action.type) {
    case constant.GET_PROFILE_REQUEST:{
      return ({ ...state, fetching: true, getProfileSuccess: false, getProfileFailure: false })
    }
    case constant.GET_PROFILE_SUCCESS:{
      const selectedFilter = {
        ...state.selectedFilter,
      }
      
      if(!localStorage.getItem('selected-filters')) {
        selectedFilter.extra = action.payload.default_filters || [];
        localStorage.setItem('selected-filters', JSON.stringify(selectedFilter));
      }
  
      return ({
        ...state,
        selectedFilter,
        profile: { ...action.payload },
        getProfileSuccess: true, 
        getProfileFailure: false, 
        fetching: false,
        error: null,
        loadingDefaultFilters: false,
        defaultFiltersSet: true
      })
    }
    case constant.GET_PROFILE_FAILURE:{
      return ({ ...state, fetching: false, getProfileSuccess: false, getProfileFailure: true })
    }
    case constant.TOGGLE_MENU:{
      return({ ...state, menuOpened: action.payload })
    }

    case constant.GET_FILTERS_AND_CATEGORIES_SUCCESS: {
      if (action.payload.categories) {
        const cloneObject = Object.assign({}, action.payload.categories.values);
        delete cloneObject.children
      }
  
      return ({ ...state,
        filters : action.payload.filters,
        extraFilters : action.payload.extraFilters,
        fetching : false
      })
    }
    case constant.GET_FILTERS_AND_CATEGORIES_FAILURE: {
      return ({ ...state, fetching: false })
    }

    case constant.CONTEXTUAL_FILTER_LOADING: {
      return ({ ...state, fetching: action.payload })
    }

    case constant.CONTEXTUAL_FILTER_DATA: {
      return ({ ...state, contextualFilterData: action.payload })
    }

    case constant.CHANGE_CALENDAR_RANGE: {
      let selectedFilter = JSON.parse(JSON.stringify(state.selectedFilter))
      selectedFilter.date = moment(action.payload.start).format('YYYYMMDD')
      selectedFilter.pickedDate = moment(action.payload.end).format('YYYYMMDD')
      localStorage.setItem('selected-filters', JSON.stringify(selectedFilter));
  
      selectedFilter.requestDate = true
      return ({
        ...state,
        selectedFilter
      })
    }

    case constant.CHANGE_CALENDAR_RANGE2: {
      let selectedFilter = JSON.parse(JSON.stringify(state.selectedFilter))
      selectedFilter.date2 = moment(action.payload.start2).format('YYYYMMDD')
      selectedFilter.pickedDate2 = moment(action.payload.end2).format('YYYYMMDD')
      localStorage.setItem('selected-filters', JSON.stringify(selectedFilter));
  
      selectedFilter.requestDate2 = true
      return ({
        ...state,
        selectedFilter
      })
    }

    case constant.CHANGE_RESPONSE_CALENDAR_RANGE: {
      let selectedFilter = JSON.parse(JSON.stringify(state.selectedFilter))
      selectedFilter.date = moment(action.payload.start).format('YYYYMMDD')
      selectedFilter.pickedDate = moment(action.payload.end).format('YYYYMMDD')
      localStorage.setItem('selected-filters', JSON.stringify(selectedFilter));
  
      selectedFilter.requestDate = false
      return ({
        ...state,
        selectedFilter
      })
    }

    case constant.CHANGE_SNACKBAR: {
      return ({
        ...state,
        snackBarFilters: action.payload.snackBarFilters,
        activeTrees: action.payload.activeTrees,
      })
    }

    case constant.SET_DELETED_FILTERS_IDS: {
      return ({
        ...state,
        deletedFiltersIds: action.payload,
      })
    }

    case constant.SELECT_FILTERS: {
      return ({ ...state, selectedFilter: { ...action.payload, requestDate: state.selectedFilter.requestDate } })
    }

    case constant.SET_ACTIVE_TREES: {
      return ({
        ...state,
        activeTrees: action.payload,
      })
    }
    
    case constant.REQUEST_ID: {
      return({
        ...state,
        requestID: action.payload
      })
    }

    case constant.SET_NEW_ALERT_OPTIONS: {
      const { data, type } = action.payload
      const { alert_kpi = [], alert_cond = [], alert_freq = [], alert_options = [], export_route, export_component} = data
      const newAlertData = {}
      if (type) {
        const alertFreqTrs = alert_freq.map((item) => { return { 'title' : item, 'name' : item } })
        newAlertData[type] = {
          alert_kpi: alert_kpi,
          alert_cond: alert_cond,
          alert_freq:alertFreqTrs,
          alert_options: alert_options,
          route: export_route,
          component: export_component
        }
      }
      return ({ ...state, alertsModal: { ...state.alertsModal, ...newAlertData } })
    } 

    case constant.SET_PAGE_TITLE_KEY: {
      return ({
        ...state,
        pageTitleKey: action.payload,
      })
    }

    case constant.TOGGLE_SAVE_FILTERS_MODAL:  {
      return ({
        ...state,
        isOpenSaveFiltersModal: !state.isOpenSaveFiltersModal,
      })
    }

    case constant.TOGGLE_SELECTED_FILTERS_EXISTENCE:{
      return ({
        ...state,
        selectedFiltersExistence: action.payload
      })
    }

    case constant.TOGGLE_GROUP_FILTERS_LIST_MODAL:{
      return ({
        ...state,
        isOpenGroupFiltersModal: !state.isOpenGroupFiltersModal,
      })
    }

    case constant.SHOW_SUBHEADER_SNACKBAR:  {
      return ({
        ...state,
        isShowSubheaderSnackbar: true,
        subheaderSnackbarMessage: action.payload,
      })
    }

    case constant.HIDE_SUBHEADER_SNACKBAR: {
      return ({
        ...state,
        isShowSubheaderSnackbar: false,
        subheaderSnackbarMessage: '',
      })
    }

    case constant.TOGGLE_LOAD_GROUP_FILTERS_LIST: {
      return ({
        ...state,
        isLoadGroupFiltersList: !state.isLoadGroupFiltersList,
      })
    }

    case constant.SET_GROUP_FILTERS_LIST:  {
      return ({
        ...state,
        isLoadGroupFiltersList: false,
        groupFiltersList: action.payload,
      })
    }

    default:
      return state
  }
}