import React from 'react';
import { Route, Redirect } from 'react-router';
import { connect } from 'react-redux';

const GuestRoute = ({ component: Component, ...rest }) => {
  if (rest.isLogged) {
    return <Route {...rest} render={props => <Redirect to={{ pathname: "/", state: { from: props.location } }} />} />
  }
  else {
    return <Route {...rest} render={props => <Component {...props} />} />
  }
};

const mapStateToProps = ({ authReducer }) => {
  return {
    isLogged: authReducer.isLogged
  }
};
export default connect(mapStateToProps)(GuestRoute);