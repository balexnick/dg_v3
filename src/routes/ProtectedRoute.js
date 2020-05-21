import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Layout from 'components/common/Layout'

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const {notauth, token} = rest

  const isAuth = component => {
    if (!token) return <Redirect to="/login" />;
    return (
      <Layout>
        {component}
      </Layout>
    )
  };

  const notAuth = component => {
    if (token) return <Redirect to="/" />;
    return component
  };
  
  return (
    notauth ? <Route {...rest} render={() => notAuth(<Component />)} />
     : <Route {...rest} render={() => isAuth(<Component />)} />
  );
}

const mapStateToProps = store => ({
  token: store.auth.token,
});

export default connect(mapStateToProps)(ProtectedRoute);
