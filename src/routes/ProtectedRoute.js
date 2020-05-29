import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Layout from 'layout'

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      const { token } = rest;
      return token ? (
        <Layout>
          <Component {...props} />
        </Layout>
      ) : (
        <Redirect to='/login'/>
      );
    }}
  />
)

const mapStateToProps = store => ({
  token: store.auth.token,
});

export default connect(mapStateToProps)(ProtectedRoute);


