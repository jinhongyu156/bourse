import { phoneNumberReg, emailTextReg, passwordReg } from "./../../javascripts/regExp.js";

/* action type */
import { ACTION_SET_SENDCODESTATUS } from "./sendCode.js";
export const ACTION_SET_REGISTER_ISLOADING = "ACTION_SET_REGISTER_ISLOADING";
export const ACTION_SET_REGISTER_REGISTERTYPE = "ACTION_SET_REGISTER_REGISTERTYPE";
export const ACTION_SET_REGISTER_INPUTTEXT = "ACTION_SET_REGISTER_INPUTTEXT";
export const ACTION_SET_REGISTER_INPUTERROR = "ACTION_SET_REGISTER_INPUTERROR";
export const ACTION_SET_REGISTER_CLEAR = "ACTION_SET_REGISTER_CLEAR";

/* action create */
// 切换注册方式
export function setRegisterType( registerType )
{
	return async function( dispatch, getState )
	{
		const { register } = getState();
		const { sendCode } = getState();

		dispatch( { type: ACTION_SET_REGISTER_INPUTTEXT, payload: { code: "" } } );
		dispatch( { type: ACTION_SET_REGISTER_REGISTERTYPE, payload: { registerType } } );
		if ( sendCode.sendCodeStatus !== 2 )
		{
			if ( registerType === 0 )
			{
				dispatch( { type: ACTION_SET_SENDCODESTATUS, payload: phoneNumberReg.test( register.phoneNumber ) ? 1 : 0 } );
			};

			if ( registerType === 1 )
			{
				dispatch( { type: ACTION_SET_SENDCODESTATUS, payload: emailTextReg.test( register.emailText ) ? 1 : 0 } );
			};
		};
	};
};

// 设置输入文本
export function setInputText( key, value )
{
	return async function( dispatch, getState )
	{
		if( key === "phoneNumber" )
		{
			dispatch( { type: ACTION_SET_REGISTER_INPUTERROR, payload: phoneNumberReg.test( value ) ? "" : "phoneNumber" } );
			dispatch( { type: ACTION_SET_SENDCODESTATUS, payload: phoneNumberReg.test( value ) ? 1 : 0 } );
		};
		if( key === "emailText" )
		{
			dispatch( { type: ACTION_SET_REGISTER_INPUTERROR, payload: emailTextReg.test( value ) ? "" : "emailText" } );
			dispatch( { type: ACTION_SET_SENDCODESTATUS, payload: emailTextReg.test( value ) ? 1 : 0 } );
		};
		dispatch( { type: ACTION_SET_REGISTER_INPUTTEXT, payload: { [ key ]: value } } );

	};
};

// 注册页面 componentWillUnmount
export function clear()
{
	return { type: ACTION_SET_REGISTER_CLEAR };
};

// 注册
export function fetchCityData()
{
	return async function( dispatch, getState )
	{
		const { register } = getState();
		console.log( "register", register );
		if ( register.isLoading ) return;
	};
};

