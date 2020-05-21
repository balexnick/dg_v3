import React from 'react'
import { Router } from "react-router-dom";
import { Switch } from "react-router";
import {browserHistory} from 'index';
import ProtectedRoute from './ProtectedRoute';


import Login from 'pages/Login';
import Assortment from 'pages/Assortment';
import Geolocation from 'pages/Geolocation';
import Media from 'pages/Media';
import Price from 'pages/Price';
import Promotions from 'pages/Promotions';
import Products from 'pages/Products';
import Rating from 'pages/Rating';
import Sales from 'pages/Sales';
import Viewability from 'pages/Viewability';
import Homepage from 'pages/Home'

const Routes = () => {
  return (
    <Router history={browserHistory}>
      <Switch>
        <ProtectedRoute path='/login' notauth component={Login} />
        <ProtectedRoute path='/assortment' component={Assortment} />
        <ProtectedRoute path='/geolocation' component={Geolocation} />
        <ProtectedRoute path='/media' component={Media} />
        <ProtectedRoute path='/price' component={Price} />
        <ProtectedRoute path='/promotion' component={Promotions} />
        <ProtectedRoute path='/products' component={Products} />
        <ProtectedRoute path='/rating' component={Rating} />
        <ProtectedRoute path='/sales' component={Sales} />
        <ProtectedRoute path='/viewability' component={Viewability} />
        <ProtectedRoute path='/' component={Homepage} />
      </Switch>
    </Router>
  )
}

export default Routes;
