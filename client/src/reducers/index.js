import postsReducer from './posts';
import authReducer from './auth';
import { combineReducers } from "redux";

export default combineReducers({ postsReducer, authReducer });