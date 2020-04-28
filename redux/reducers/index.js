import { combineReducers } from "redux";
import loginReducer from "./login.js";
import registerReducer from "./register.js";
import sendCodeReducer from "./sendCode.js";
import accessReducer from "./access.js";

import noticeReducer from "./notice.js";
import financeReducer from "./finance.js";
import contractReducer from "./contract.js";
import ctcReducer from "./ctc.js";

import languageReducer from "./language.js";
import storageToReduxReducer from "./storageToRedux.js";

export default combineReducers( {
	login: loginReducer,
	register: registerReducer,
	sendCode: sendCodeReducer,
	access: accessReducer,

	notice: noticeReducer,
	finance: financeReducer,
	contract: contractReducer,
	ctc: ctcReducer,

	language: languageReducer,
	storageToRedux: storageToReduxReducer
} );
