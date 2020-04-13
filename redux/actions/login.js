import { phoneNumberReg, emailTextReg } from "./../../components/regExp.js";

/* action type */
export const ACTION_SET_LOGIN_ISLOADING = "ACTION_SET_LOGIN_ISLOADING";
export const ACTION_SET_LOGIN_LOGINTYPE = "ACTION_SET_LOGIN_LOGINTYPE";
export const ACTION_SET_LOGIN_INPUTTEXT = "ACTION_SET_LOGIN_INPUTTEXT";
export const ACTION_SET_LOGIN_INPUTERROR = "ACTION_SET_LOGIN_INPUTERROR";
export const ACTION_SET_LOGIN_CLEAR = "ACTION_SET_LOGIN_CLEAR";

/* action create */
// 切换登录方式
export function setLoginType( loginType )
{
	return async function( dispatch, getState )
	{
		const { login } = getState();
		dispatch( { type: ACTION_SET_LOGIN_INPUTTEXT, payload: { code: "" } } );
		dispatch( { type: ACTION_SET_LOGIN_LOGINTYPE, payload: { loginType } } );
	};
};

// 设置输入文本
export function setInputText( key, value )
{
	return async function( dispatch, getState )
	{
		if( key === "phoneNumber" )
		{
			dispatch( { type: ACTION_SET_LOGIN_INPUTERROR, payload: phoneNumberReg.test( value ) ? "" : "phoneNumber" } );
			
		};
		if( key === "emailText" )
		{
			dispatch( { type: ACTION_SET_LOGIN_INPUTERROR, payload: emailTextReg.test( value ) ? "" : "emailText" } );
		};
		dispatch( { type: ACTION_SET_LOGIN_INPUTTEXT, payload: { [ key ]: value } } );

	};
};

// 登录页面 componentWillUnmount
export function clear()
{
	return { type: ACTION_SET_LOGIN_CLEAR };
};

// 登录
export function fetchCityData()
{
	return async function( dispatch, getState )
	{
		const { home } = getState();

		if ( home.isLoading ) return;
	};
};

