import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import Routes from 'routes'
import { createBrowserHistory } from "history";
import {store} from 'store/index';
import './index.scss'

export const browserHistory = createBrowserHistory()

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Routes />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
