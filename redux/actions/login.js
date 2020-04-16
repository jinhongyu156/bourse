import I18n from "i18n-js";
import AsyncStorage from "@react-native-community/async-storage"; 

import { fetchPost, fetchImage } from "./../../javascripts/util.js";
import { phoneNumberReg, emailTextReg, passwordReg } from "./../../javascripts/regExp.js";

/* action type */
export const ACTION_SET_LOGIN_ISLOADING = "ACTION_SET_LOGIN_ISLOADING";
export const ACTION_SET_LOGIN_LOGINTYPE = "ACTION_SET_LOGIN_LOGINTYPE";
export const ACTION_SET_LOGIN_INPUTTEXT = "ACTION_SET_LOGIN_INPUTTEXT";
export const ACTION_SET_LOGIN_IMAGEBLOB = "ACTION_SET_LOGIN_IMAGEBLOB";
export const ACTION_SET_LOGIN_INPUTERROR = "ACTION_SET_LOGIN_INPUTERROR";
export const ACTION_SET_LOGIN_ISLOGIN = "ACTION_SET_LOGIN_ISLOGIN";
export const ACTION_SET_LOGIN_FETCHLOGINERROR = "ACTION_SET_LOGIN_FETCHLOGINERROR";
export const ACTION_SET_LOGIN_FETCHIMAGEERROR = "ACTION_SET_LOGIN_FETCHIMAGEERROR";
export const ACTION_SET_LOGIN_ISSHOWACTIONSHEET = "ACTION_SET_LOGIN_ISSHOWACTIONSHEET";
export const ACTION_SET_LOGIN_CLEAR = "ACTION_SET_LOGIN_CLEAR";

/* action create */
import { setLanguage } from "./language.js";

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
			dispatch( { type: ACTION_SET_LOGIN_IMAGEBLOB, payload: null } );
		};

		if( emailTextReg.test( login.emailText ) && loginType === 1 )
		{
			dispatch( fetchImageCode() )
		} else
		{
			dispatch( { type: ACTION_SET_LOGIN_IMAGEBLOB, payload: null } );
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
			dispatch( { type: ACTION_SET_LOGIN_INPUTERROR, payload: Object.assign( {}, login.inputError, { phoneNumber: !phoneNumberReg.test( value ) } ) } );
			if( phoneNumberReg.test( value ) )
			{
				login.imageBlob || dispatch( fetchImageCode() );
			} else
			{
				dispatch( { type: ACTION_SET_LOGIN_IMAGEBLOB, payload: null } );
			};
		};
		if( key === "emailText" )
		{
			dispatch( { type: ACTION_SET_LOGIN_INPUTERROR, payload: Object.assign( {}, login.inputError, { emailText: !emailTextReg.test( value ) } ) } );
			if( emailTextReg.test( value ) )
			{
				login.imageBlob || dispatch( fetchImageCode() );
			} else
			{
				dispatch( { type: ACTION_SET_LOGIN_IMAGEBLOB, payload: null } );
			}
		};
		if( key === "password" )
		{
			dispatch( { type: ACTION_SET_LOGIN_INPUTERROR, payload: Object.assign( {}, login.inputError, { password: !passwordReg.test( value ) } ) } );
		};
	};
};

//  打开 ActionSheet
export function showActionSheet( actionSheetData )
{
	return { type: ACTION_SET_LOGIN_ISSHOWACTIONSHEET, payload: { isShowActionSheet: true, actionSheetData: actionSheetData } };
};

// 关闭 ActionSheet
export function hideActionSheet()
{
	return { type: ACTION_SET_LOGIN_ISSHOWACTIONSHEET, payload: false }
};

// 打开语言选择 ActionSheet
export function showLanguageActionSheet()
{
	return function( dispatch, getState )
	{
		const { language } = getState();

		dispatch( showActionSheet( Object.assign( {},
			{
				title: I18n.t( "login.actionSheetTitle" ),
				message: I18n.t( "login.actionSheetMessage" ),
				cancelButtonIndex: 2,
				options: I18n.t( "login.actionSheetOptions" ),
				onPress: function( index )
				{
					dispatch( setLanguage( index == 1 ? "en" : "zh" ) )
					dispatch( hideActionSheet() );
				}
			},
			language.userLanguage == "zh" ? { markButtonIndex: 0 } : language.userLanguage == "en" ? { markButtonIndex: 1 } : {}
		) ) );
	};
};

// 设置登录状态
export function setIsLogin( isLogin )
{
	return { type: ACTION_SET_LOGIN_ISLOGIN, payload: isLogin };
};

// 退出登录
export function logout()
{
	return async function( dispatch, getState )
	{
		const { login } = getState();
		if ( login.isLogin )
		{
			await AsyncStorage.setItem( "isLogin", "false" );
			dispatch( setIsLogin( false ) );
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
				dispatch( { type: ACTION_SET_LOGIN_IMAGEBLOB, payload: res } );
				dispatch( { type: ACTION_SET_LOGIN_FETCHIMAGEERROR, payload: null } );
			} catch( err )
			{
				dispatch( { type: ACTION_SET_LOGIN_IMAGEBLOB, payload: null } );
				dispatch( { type: ACTION_SET_LOGIN_FETCHIMAGEERROR, payload: err.type === "network" ? `${ err.status }: ${ I18n.t( "login.fetchImageCodeError" ) }` : err.toString() } );
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
			dispatch( { type: ACTION_SET_LOGIN_ISLOADING, payload: true } );
			console.log( "login", login );
			const params = { "提交": "登录", "电话": login.loginType === 0 ? login.phoneNumber : login.loginType === 1 ? login.emailText : "", "密码": login.password, "验证码": login.code };
			try
			{
				const res = await fetchPost( "/user.php", params );
				if( res === "ok" )
				{
					await AsyncStorage.setItem( "isLogin", "true" );
					dispatch( setIsLogin( true ) );
					dispatch( { type: ACTION_SET_LOGIN_FETCHLOGINERROR, payload: null } );
					dispatch( { type: ACTION_SET_LOGIN_ISLOADING, payload: false } );
				} else
				{
					await AsyncStorage.setItem( "isLogin", "false" );
					dispatch( setIsLogin( false ) );
					dispatch( { type: ACTION_SET_LOGIN_FETCHLOGINERROR, payload: res } );
					dispatch( { type: ACTION_SET_LOGIN_ISLOADING, payload: false } );
				}

			} catch( err )
			{
				await AsyncStorage.setItem( "isLogin", "false" );
				dispatch( setIsLogin( false ) );
				dispatch( { type: ACTION_SET_LOGIN_FETCHLOGINERROR, payload: err.type === "network" ? `${ err.status }: ${ I18n.t( "login.fetchLoginError" ) }` : err.toString() } );
				dispatch( { type: ACTION_SET_LOGIN_ISLOADING, payload: false } );
			};
		} else
		{
			dispatch( { type: ACTION_SET_LOGIN_FETCHLOGINERROR, payload: I18n.t( "login.inputError" ) } );
		};
	};
};
