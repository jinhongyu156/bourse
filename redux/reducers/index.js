import { combineReducers } from "redux";
import loginReducer from "./login.js";
import registerReducer from "./register.js";
import sendCodeReducer from "./sendCode.js";

import financeReducer from "./finance.js";

import languageReducer from "./language.js";
import storageToReduxReducer from "./storageToRedux.js";

export default combineReducers( {
	login: loginReducer,
	register: registerReducer,
	sendCode: sendCodeReducer,

	finance: financeReducer,

	language: languageReducer,
	storageToRedux: storageToReduxReducer
} );
