import AsyncStorage from "@react-native-community/async-storage"; 

/* action type */
export const ACTION_SET_ISLOADING = "ACTION_SET_ISLOADING";

/* action create */
// 登录
export function fetchCityData()
{
	return async function( dispatch, getState )
	{
		const { home } = getState();

		if ( home.isLoading ) return;
	};
};
