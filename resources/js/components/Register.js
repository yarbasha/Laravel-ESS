import React, { Component } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from "yup";
import axios from 'axios';
import { FormRow } from './CreateItem';
import {connect} from 'react-redux';
import { fetchUserSuccess, fetchUserFailure, loginSuccess, loginFailed } from '../store/actions/actions';

class Register extends Component {

  state = {
    errorMessage: ''
  };

  initialValues = {
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  }

  schema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().required(),
    password_confirmation: Yup.string().oneOf([Yup.ref('password')], "Passwords must match")
  });

  onSubmit = (values) => {
    axios.post('/api/v1/auth/register', values).then(({data}) => {
      this.props.loginSuccess(data.access_token, false);
      this.props.fetchUser();
      this.props.history.push('/');
    }).catch(error => {
      this.setState({ errorMessage: error.response.data.errors });
    });
  }

  render() {
    const {errorMessage} = this.state;
    return (
      <div className="page">
        {errorMessage && <div className="alert alert-danger">
          <ul>
            {Object.keys(errorMessage).map((key, index) => (
              <li key={index}>{errorMessage[key]}</li>
            ))}
          </ul>
        </div>}
        <div className="card">
          <div className="card-header">
            <span>Register</span>
          </div>
          <div className="card-body">
            <Formik
              initialValues={this.initialValues}
              validationSchema={this.schema}
              onSubmit={this.onSubmit}
            >
              {({ errors, touched }) => (
                <Form>
                  <FormRow label="Name" name="name" error={errors.name && touched.name} />
                  <FormRow label="Email" name="email" error={errors.email && touched.email} />
                  <FormRow label="Password" name="password" type="password" error={errors.password && touched.password} />
                  <FormRow label="Confirm Password" name="password_confirmation" type="password" error={errors.password_confirmation && touched.password_confirmation} />
                  <div className="form-group row">
                    <div className="col-md-9 offset-md-3">
                      <button className="btn btn-primary" type="submit">Sign up</button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
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

export default connect(mapStateToProps, mapDispatchToProps)(Register);