import { combineReducers } from 'redux';
import authReducer from './authReducer';
import itemsReducer from './itemsReducer';

const allReducers = combineReducers({ authReducer, itemsReducer });

export default allReducers;