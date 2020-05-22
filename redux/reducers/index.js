import { combineReducers } from "redux";
import loginReducer from "./login.js";
import registerReducer from "./register.js";
import sendCodeReducer from "./sendCode.js";
import accessReducer from "./access.js";

import noticeReducer from "./notice.js";
import financeReducer from "./finance.js";
import contractReducer from "./contract.js";
import ctcReducer from "./ctc.js";
import userReducer from "./user.js";
import chartReducer from "./chart.js";
import articleReducer from "./article.js";
import themeReducer from "./theme.js";
import myBankCardReducer from "./myBankCard.js";

import usdtRechargeReducer from "./usdtRecharge.js";
import usdtMentionReducer from "./usdtMention.js";
import historyReducer from "./history.js";


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
	user: userReducer,
	chart: chartReducer,
	article: articleReducer,
	theme: themeReducer,
	myBankCard: myBankCardReducer,
	usdtRecharge: usdtRechargeReducer,
	usdtMention: usdtMentionReducer,
	history: historyReducer,

	language: languageReducer,
	storageToRedux: storageToReduxReducer
} );
