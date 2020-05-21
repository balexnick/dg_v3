import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

import * as auth from './auth/actions';
import * as profile from './profile/actions'

import authReducer from './auth/reducers';
import profileReducer from './profile/reducers'

export const actions = {
  auth,
  profile
};

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer
});

const middleware = [thunk];

export let store = createStore(rootReducer, applyMiddleware(...middleware))