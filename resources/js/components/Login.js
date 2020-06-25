import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { connect } from 'react-redux';
import * as Yup from "yup";
import axios from 'axios';
import {FormRow} from './CreateItem';
import { login, fetchUserSuccess, fetchUserFailure, loginSuccess, loginFailed } from '../store/actions/actions';

class Login extends Component {

  locationState = this.props.location.state || { from: { pathname: '/' } };

  schema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().required()
  });

  onSubmit = (values) => {
    this.props.login();
    axios.post('/api/v1/auth/login', values).then(({ data }) => {
      this.props.loginSuccess(data.access_token, values.remember);
      this.props.fetchUser();
      this.props.history.replace(this.locationState.from);
    }).catch(error => {
      this.props.loginFailed(error.response.data.error);
    });
  }

  render() {
    return (
      <div className="page">
        {this.props.authError && <div className="alert alert-danger">{this.props.authError}</div>}
        <div className="card">
          <div className="card-header">
            <span>Login</span>
          </div>
          <div className="card-body">
            <Formik
              initialValues={{ email: '', password: '', remember: false }}
              validationSchema={this.schema}
              onSubmit={this.onSubmit}
            >
              <Form>
                <FormRow name="email" label="Email" />
                <FormRow name="password" label="Password" type="password" />
                <div className="form-group form-check row">
                  <div className="col-md-9 offset-md-3">
                    <Field type="checkbox" name="remember" className="form-check-input ml-n3" />
                    <label className="form-check-label">Remember me?</label>
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-md-9 offset-md-3">
                    {
                      this.props.isLoading ? <button className="btn btn-primary" type="button" disabled>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      Loading...
                    </button> : <button className="btn btn-primary" type="submit">Sign in</button>
                    }
                  </div>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: () => dispatch(login()),
    loginSuccess: (token, remember) => dispatch(loginSuccess(token, remember)),
    loginFailed: (error) => dispatch(loginFailed(error)),
    fetchUser: () => {
      axios.get('api/v1/auth/user').then(response => {
        dispatch(fetchUserSuccess(response.data.user));
      }).catch(error => dispatch(fetchUserFailure()))
    }
  }
};

const mapStateToProps = ({authReducer}) => {
  return {
    authError: authReducer.authError,
    isLoading: authReducer.loading
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);