import { combineReducers } from "redux";
import loginReducer from "./login.js";
import languageReducer from "./language.js";

export default combineReducers( {
	login: loginReducer,
	language: languageReducer,
} );
