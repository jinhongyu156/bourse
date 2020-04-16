import AsyncStorage from "@react-native-community/async-storage"; 
import I18n from "./../../i18n/index.js";
import RNRestart from "react-native-restart";

/* action type */
export const ACTION_SET_USERLANGUAGE = "ACTION_SET_USERLANGUAGE";

/* action create */
// 设置当前语言
export function setLanguage( language, isInit = false )
{
	return async function( dispatch )
	{
		try {
			I18n.locale = language;
			await AsyncStorage.setItem( "userLanguage", language );
			dispatch( { type: ACTION_SET_USERLANGUAGE, payload: language } );
			isInit || RNRestart.Restart();
		} catch ( e ) {
			dispatch( { type: ACTION_SET_USERLANGUAGE, payload: null } );
		};
	}
};
