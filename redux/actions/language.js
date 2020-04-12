import AsyncStorage from "@react-native-community/async-storage"; 

/* action type */
export const ACTION_SET_USERLANGUAGE = "ACTION_SET_USERLANGUAGE";

/* action create */
// 设置当前语言
export function setLanguage( language )
{
	return { type: ACTION_SET_USERLANGUAGE, payload: language };
};
