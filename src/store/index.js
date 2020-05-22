import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";


import * as app from './app/actions'
import * as auth from './auth/actions';

import appReducer from './app/reducers'
import authReducer from './auth/reducers';

export const actions = {
  app,
  auth
};

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer
});

const middleware = [thunk];

export let store = createStore(rootReducer, applyMiddleware(...middleware))