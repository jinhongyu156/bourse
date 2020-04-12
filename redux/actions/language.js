import AsyncStorage from "@react-native-community/async-storage"; 

/* action type */
export const ACTION_SET_USERLANGUAGE = "ACTION_SET_USERLANGUAGE";

/* action create */
// 设置当前语言
export function setLanguage( language )
{
	return async function( dispatch )
	{
		try {
			await AsyncStorage.setItem( "userLanguage", language );
			dispatch( { type: ACTION_SET_USERLANGUAGE, payload: language } );
		} catch ( e ) {
			dispatch( { type: ACTION_SET_USERLANGUAGE, payload: null } );
		};
	}
};

// 将 AsyncStorage 中的语言数据载入 Redux
export function getAsyncStorage( callback )
{
	return async function( dispatch )
	{
		try {
			const userLanguage = await AsyncStorage.getItem( "userLanguage" )
			userLanguage && dispatch( { type: ACTION_SET_USERLANGUAGE, payload: userLanguage } );
			callback && callback();
		} catch( e ) {
			dispatch( { type: ACTION_SET_USERLANGUAGE, payload: null } );
		};
	};
};
