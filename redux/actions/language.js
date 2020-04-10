import AsyncStorage from "@react-native-community/async-storage"; 

/* action type */
export const ACTION_SET_LANGUAGE = "ACTION_SET_LANGUAGE";

/* action create */
// 设置当前语言
export function setLanguage( language )
{
	dispatch( { type: ACTION_SET_LANGUAGE, payload: language } )
};
