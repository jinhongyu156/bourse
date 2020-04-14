import I18n from "i18n-js";
import AsyncStorage from "@react-native-community/async-storage"; 

import { fetchPost, fetchImage } from "./../../javascripts/util.js";
import { phoneNumberReg, emailTextReg, passwordReg } from "./../../javascripts/regExp.js";

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
	return function( dispatch, getState )
	{
		const { login } = getState();

		dispatch( { type: ACTION_SET_LOGIN_INPUTTEXT, payload: { code: "" } } );
		dispatch( { type: ACTION_SET_LOGIN_LOGINTYPE, payload: { loginType } } );

		if( phoneNumberReg.test( login.phoneNumber ) && loginType === 0 )
		{
			dispatch( fetchImageCode() )
		} else
		{
			dispatch( { type: ACTION_SET_IMAGEBLOB, payload: null } );
		};

		if( emailTextReg.test( login.emailText ) && loginType === 1 )
		{
			dispatch( fetchImageCode() )
		} else
		{
			dispatch( { type: ACTION_SET_IMAGEBLOB, payload: null } );
		};
	};
};

// 设置输入文本
export function setInputText( key, value )
{
	return function( dispatch, getState )
	{
		const { login } = getState();

		dispatch( { type: ACTION_SET_LOGIN_INPUTTEXT, payload: { [ key ]: value } } );
		if( key === "phoneNumber" )
		{
			dispatch( { type: ACTION_SET_LOGIN_INPUTERROR, payload: Object.assign( {}, login.inputError, { phoneNumber: phoneNumberReg.test( value ) ? false : true } ) } );
			if( phoneNumberReg.test( value ) )
			{
				login.imageBlob || dispatch( fetchImageCode() );
			} else
			{
				dispatch( { type: ACTION_SET_IMAGEBLOB, payload: null } );
			};
		};
		if( key === "emailText" )
		{
			dispatch( { type: ACTION_SET_LOGIN_INPUTERROR, payload: Object.assign( {}, login.inputError, { emailText: emailTextReg.test( value ) ? false : true } ) } );
			if( emailTextReg.test( value ) )
			{
				login.imageBlob || dispatch( fetchImageCode() );
			} else
			{
				dispatch( { type: ACTION_SET_IMAGEBLOB, payload: null } );
			}
		};
		if( key === "password" )
		{
			dispatch( { type: ACTION_SET_LOGIN_INPUTERROR, payload: Object.assign( {}, login.inputError, { password: passwordReg.test( value ) ? false : true } ) } );
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
			const params = { "提交": "获取图形验证码", "电话": login.loginType === 0 ? login.phoneNumber : login.loginType === 1 ? login.emailText : "" };
			try
			{
				const res = await fetchImage( "/yanzheng.php", params );
				dispatch( { type: ACTION_SET_IMAGEBLOB, payload: res } );
				dispatch( { type: ACTION_SET_FETCHIMAGEERROR, payload: null } );
			} catch( err )
			{
				dispatch( { type: ACTION_SET_IMAGEBLOB, payload: null } );
				dispatch( { type: ACTION_SET_FETCHIMAGEERROR, payload: err.type === "network" ? `${ err.status }: ${ I18n.t( "login.fetchImageCodeError" ) }` : err.toString() } );
			}
		};
	};
};

// 登录请求
export function fetchLogin()
{
	return async function( dispatch, getState )
	{
		const { login } = getState();

		if ( ( ( login.loginType === 0 && login.phoneNumber ) || ( login.loginType === 1 && login.emailText ) ) && login.password && login.code && !login.isLoading && Object.values( login.inputError ).every( item => item === false ) )
		{
		console.log( "111111", 111111, login.inputError );
			dispatch( { type: ACTION_SET_LOGIN_ISLOADING, payload: true } );
			const params = { "提交": "登录", "电话": login.phoneNumber, "密码": login.password, "验证码": login.code };
			try
			{
				const res = await fetchPost( "/user.php", params );
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
				}

			} catch( err )
			{
				await AsyncStorage.setItem( "isLogin", "false" );
				dispatch( { type: ACTION_SET_ISLOGIN, payload: false } );
				dispatch( { type: ACTION_SET_FETCHLOGINERROR, payload: err.type === "network" ? `${ err.status }: ${ I18n.t( "login.fetchLoginError" ) }` : err.toString() } );
				dispatch( { type: ACTION_SET_LOGIN_ISLOADING, payload: false } );
			};
		} else
		{
			dispatch( { type: ACTION_SET_FETCHLOGINERROR, payload: I18n.t( "login.inputError" ) } );
		};
	};
};
