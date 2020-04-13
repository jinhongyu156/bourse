import { combineReducers } from "redux";
import loginReducer from "./login.js";
import registerReducer from "./register.js";
import sendCodeReducer from "./sendCode.js";

import languageReducer from "./language.js";

export default combineReducers( {
	login: loginReducer,
	register: registerReducer,
	sendCode: sendCodeReducer,
	language: languageReducer
} );
