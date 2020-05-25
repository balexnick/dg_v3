import axios from 'axios';
import { store } from 'store'
import { changeResponseCalendarRange } from 'store/app/actions';

const CancelToken = axios.CancelToken;

let OpenRequests = [];

const axiosAPI = axios.create({
  baseURL: 'https://api.datagram.ai/datagram',
});

axiosAPI.interceptors.request.use(
  function(config) {
    return config;
  },
  function(error) {
    return Promise.reject(error);
  },
);
  
axiosAPI.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    if(axios.isCancel(error)) return Promise.reject(error);
    switch (error.response.status) {
      case 401:
        if(window.location.pathname === '/login') break;
        break
      case 404:
      case 500:
      case 504:
      default:
      break;
    }

    return Promise.reject(error);
  },
);

export function cancelRequests() {
  OpenRequests.forEach(req => req());
  OpenRequests = [];
}

const API = ({ url, data, method = 'GET', requestId, useToken = true }) => {

  if(useToken) {
    const token = localStorage.getItem('datagramToken');
    if(url.indexOf('?') !== -1) {
      url += `&mct=${token}`;
    } else {
      url += `?mct=${token}`;
    } 
  }

  return axiosAPI({
    url, method, data, 
    cancelToken: new CancelToken(cancel => {
      OpenRequests.push(cancel)
    }),
  })
  .then(res => {
    const { ds, de } = res.data;
    if (ds && de) {
      store.dispatch(changeResponseCalendarRange({
        start: ds,
        end: de
      }))
    }

    return res.data;
  })
}

export default API