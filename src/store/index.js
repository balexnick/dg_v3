import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

import * as auth from './auth/actions';

import authReducer from './auth/reducers';

export const actions = {
  auth,
};

const rootReducer = combineReducers({
  auth: authReducer,
});

const middleware = [thunk];

export let store = createStore(rootReducer, applyMiddleware(...middleware))