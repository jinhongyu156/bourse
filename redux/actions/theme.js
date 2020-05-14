import AsyncStorage from "@react-native-community/async-storage"; 

import RNRestart from "react-native-restart";

/* action type */
export const ACTION_SET_THEME_THEME = "ACTION_SET_THEME_THEME";
/* action create */

// 设置当前主题
export function setTheme( theme, isInit = false )
{
	return async function( dispatch )
	{
		try {
			await AsyncStorage.setItem( "theme", String( theme ) );
			dispatch( { type: ACTION_SET_THEME_THEME, payload: Number( theme ) } );
			isInit || RNRestart.Restart();
		} catch ( e ) {
			dispatch( { type: ACTION_SET_THEME_THEME, payload: null } );
		};
	}
};
