import { FETCH_USER_SUCCESS, FETCH_USER_FAILURE, LOGIN, LOGIN_SUCCESS, LOGIN_FAILED,LOGOUT, SET_ITEMS, DELETE_ITEM, RESET_ITEMS } from "./types";

export function login() {
  return {
    type: LOGIN
  }
}

export function fetchUserSuccess(user) {
  return {
    type: FETCH_USER_SUCCESS,
    user
  }
}

export function fetchUserFailure() {
  return {
    type: FETCH_USER_FAILURE,
  }
}

export function loginSuccess(token, remember) {
  return {
    type: LOGIN_SUCCESS,
    token,
    remember
  }
}

export function loginFailed(error) {
  return {
    type: LOGIN_FAILED,
    error
  }
}

export function logout() {
  return {
    type: LOGOUT
  }
}

export function resetItems() {
  return {
    type: RESET_ITEMS
  }
}

export function setItems(items) {
  return {
    type: SET_ITEMS,
    items
  }
}

export function deleteItem (deletedItem) {
  return{
    type: DELETE_ITEM,
    deletedItem
  }
}