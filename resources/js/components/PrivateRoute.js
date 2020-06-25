import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router';

const PrivateRoute = ({ component: Component, ...rest }) => {
  if (rest.isLogged) {
    return <Route {...rest} render={props => <Component {...props} />} />
  } else {
    return <Route {...rest} render={({ location }) =>
      <Redirect to={{ pathname: '/login', state: { from: location } }} />} />
  }
};

const mapStateToProps = ({ authReducer }) => {
  return {
    isLogged: authReducer.isLogged
  }
};

export default connect(mapStateToProps)(PrivateRoute);

