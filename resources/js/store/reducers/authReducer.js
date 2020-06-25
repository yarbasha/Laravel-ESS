import * as types from '../actions/types';
import Cookie from 'js-cookie';

const authState = {
  user: null,
  token: Cookie.get("token"),
  authError: null,
  loading: false,
  isLogged: false
};

const authReducer = (state = authState, action) => {
  switch (action.type) {
    case types.LOGIN: {
      return {
        loading: true,
      }
    }
    case types.LOGIN_SUCCESS: {
      Cookie.set("token", action.token, { expires: action.remember ? 365 : null })
      return {
        token: action.token,
        loading: false,
        isLogged: true
      }
    }
    case types.LOGIN_FAILED: {
      return {
        loading: false,
        authError: action.error
      }
    }
    case types.FETCH_USER_SUCCESS: {
      return {
        user: action.user,
        isLogged: true
      }
    }
    case types.FETCH_USER_FAILURE: {
      Cookie.remove("token");
      return {
        token: null
      }
    }
    case types.LOGOUT: {
      Cookie.remove("token");
      return {
        user: null,
        token: null,
        isLogged: false
      }
    }
    default:
      return state
  }
}

export default authReducer;