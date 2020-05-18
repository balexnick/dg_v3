import React from 'react'
import { Router } from "react-router-dom";
import { Switch } from "react-router";
import Homepage from 'pages/Homepage';
import Login from 'pages/Login';
import Test from 'pages/Test';
import {browserHistory} from 'index';
import ProtectedRoute from './ProtectedRoute'

const Routes = () => {
  return (
    <Router history={browserHistory}>
      <Switch>
        <ProtectedRoute path='/login' notauth component={Login} />
        <ProtectedRoute path='/test' component={Test} />
        <ProtectedRoute path='/' component={Homepage} />
      </Switch>
    </Router>
  )
}

export default Routes;