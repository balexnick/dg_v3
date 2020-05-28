import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";


import * as app from './app/actions';
import * as auth from './auth/actions';
import * as product from './product/actions';
import * as ean from './ean/actions'
import * as price from './price/actions';
import * as promotion from './promotion/actions';
import * as assortment from './assortment/actions';
import * as rating from './rating/actions';
import * as viewability from './viewability/actions'
import * as geolocation from './geolocation/actions';
import * as report from './report/actions';
import * as media from './media/actions';
import * as homepage from './homepage/actions';
import * as gallerie from './gallerie/actions'

import appReducer from './app/reducers';
import authReducer from './auth/reducers';
import productReducer from './product/reducers';
import eanReducer from './ean/reducers'
import priceReducer from './price/reducers';
import promotionReducer from './promotion/reducers';
import assortmentReducer from './assortment/reducers';
import ratingReducer from './rating/reducers';
import viewabilityReducer from './viewability/reducers'
import geolocationReducer from './geolocation/reducers';
import reportReducer from './report/reducers';
import mediaReducer from './media/reducers';
import homepageReducer from './homepage/reducers';
import gallerieReducer from './gallerie/reducers'

export const actions = {
  app,
  auth,
  product,
  ean,
  price,
  promotion, 
  assortment, 
  rating,
  viewability,
  geolocation,
  report,
  media,
  homepage,
  gallerie,
};

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  product: productReducer,
  ean: eanReducer,
  price: priceReducer,
  promotion: promotionReducer,
  assortment: assortmentReducer, 
  rating: ratingReducer,
  viewability: viewabilityReducer,
  geolocation: geolocationReducer,
  report: reportReducer,
  media: mediaReducer,
  homepage: homepageReducer,
  gallerie: gallerieReducer,
});

const middleware = [thunk];

export let store = createStore(rootReducer, applyMiddleware(...middleware))