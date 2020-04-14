import AsyncStorage from "@react-native-community/async-storage"; 

import { domain, setSearch, isObject } from "./../../javascripts/domain.js";
import { phoneNumberReg, emailTextReg } from "./../../components/regExp.js";

/* action type */
export const ACTION_SET_LOGIN_ISLOADING = "ACTION_SET_LOGIN_ISLOADING";
export const ACTION_SET_LOGIN_LOGINTYPE = "ACTION_SET_LOGIN_LOGINTYPE";
export const ACTION_SET_LOGIN_INPUTTEXT = "ACTION_SET_LOGIN_INPUTTEXT";
export const ACTION_SET_IMAGEBLOB = "ACTION_SET_IMAGEBLOB";
export const ACTION_SET_LOGIN_INPUTERROR = "ACTION_SET_LOGIN_INPUTERROR";
export const ACTION_SET_ISLOGIN = "ACTION_SET_ISLOGIN";
export const ACTION_SET_FETCHLOGINERROR = "ACTION_SET_FETCHLOGINERROR";
export const ACTION_SET_FETCHIMAGEERROR = "ACTION_SET_FETCHIMAGEERROR";
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
		dispatch( { type: ACTION_SET_LOGIN_INPUTTEXT, payload: { [ key ]: value } } );
		if( key === "phoneNumber" )
		{
			dispatch( { type: ACTION_SET_LOGIN_INPUTERROR, payload: phoneNumberReg.test( value ) ? "" : "phoneNumber" } );
			phoneNumberReg.test( value ) ? dispatch( fetchImageCode() ) : dispatch( { type: ACTION_SET_IMAGEBLOB, payload: null } );
		};
		if( key === "emailText" )
		{
			dispatch( { type: ACTION_SET_LOGIN_INPUTERROR, payload: emailTextReg.test( value ) ? "" : "emailText" } );
			emailTextReg.test( value ) ? dispatch( fetchImageCode() ) : dispatch( { type: ACTION_SET_IMAGEBLOB, payload: null } );
		};
	};
};

// 登录页面 componentWillUnmount
export function clear()
{
	return { type: ACTION_SET_LOGIN_CLEAR };
};

// 图片验证码请求
export function fetchImageCode()
{
	return async function( dispatch, getState )
	{
		const { login } = getState();
		if( ( login.loginType === 0 && phoneNumberReg.test( login.phoneNumber ) ) || ( login.loginType === 1 && emailTextReg.test( login.emailText ) ) )
		{
			try
			{
				const response = await fetch( setSearch( { url: `${ domain }/yanzheng.php`, params: { "提交": "获取图形验证码", "电话": login.phoneNumber } } ), { headers: { "Content-Type": "image/png" } } )
				console.log( "response", response );
				const blob = await response.blob();
				console.log( "blob", blob );

				const reader = new FileReader();

				reader.onload = function( e )
				{
					dispatch( { type: ACTION_SET_IMAGEBLOB, payload: e.target.result.split( "base64," )[ 1 ] } );
					dispatch( { type: ACTION_SET_FETCHIMAGEERROR, payload: null } );
				};
				reader.readAsDataURL( blob );
			} catch( err )
			{
				dispatch( { type: ACTION_SET_IMAGEBLOB, payload: null } );
				dispatch( { type: ACTION_SET_FETCHIMAGEERROR, payload: err.toString() } );
			};
		};
	};
};

// 登录请求
export function fetchLogin()
{
	return async function( dispatch, getState )
	{
		const { login } = getState();

		if ( login.password && login.code && !login.hasError && !login.isLoading && ( login.phoneNumber || login.emailText ) )
		{
			dispatch( { type: ACTION_SET_LOGIN_ISLOADING, payload: true } );
			try
			{
				const response = await fetch( `${ domain }/user.php`, {
					method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" },
					body: setSearch( { params: { "提交": "登录", "电话": login.phoneNumber, "密码": login.password, "验证码": login.code } } )
				} );

				const res = await response.text();

				if( res === "ok" )
				{
					await AsyncStorage.setItem( "isLogin", "true" );
					dispatch( { type: ACTION_SET_ISLOGIN, payload: true } );
					dispatch( { type: ACTION_SET_FETCHLOGINERROR, payload: null } );
					dispatch( { type: ACTION_SET_LOGIN_ISLOADING, payload: false } );
				} else
				{
					await AsyncStorage.setItem( "isLogin", "false" );
					dispatch( { type: ACTION_SET_ISLOGIN, payload: false } );
					dispatch( { type: ACTION_SET_FETCHLOGINERROR, payload: res } );
					dispatch( { type: ACTION_SET_LOGIN_ISLOADING, payload: false } );
				};

			} catch( err )
			{
				dispatch( { type: ACTION_SET_ISLOGIN, payload: false } );
				dispatch( { type: ACTION_SET_FETCHLOGINERROR, payload: err.toString() } );
				dispatch( { type: ACTION_SET_LOGIN_ISLOADING, payload: false } );
			};
		} else
		{
			dispatch( { type: ACTION_SET_FETCHLOGINERROR, payload: "请将信息填写完整" } );
		};
	};
};

