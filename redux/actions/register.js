
import { fetchPost, fetchImage } from "./../../javascripts/util.js";
import { phoneNumberReg, emailTextReg, passwordReg, refereeReg, nameReg } from "./../../javascripts/regExp.js";

/* action type */
import { ACTION_SET_SENDCODESTATUS } from "./sendCode.js";
export const ACTION_SET_REGISTER_ISLOADING = "ACTION_SET_REGISTER_ISLOADING";
export const ACTION_SET_REGISTER_REGISTERTYPE = "ACTION_SET_REGISTER_REGISTERTYPE";
export const ACTION_SET_REGISTER_INPUTTEXT = "ACTION_SET_REGISTER_INPUTTEXT";
export const ACTION_SET_REGISTER_INPUTERROR = "ACTION_SET_REGISTER_INPUTERROR";
export const ACTION_SET_REGISTER_IMAGEBLOB = "ACTION_SET_REGISTER_IMAGEBLOB";

export const ACTION_SET_REGISTER_FETCHIMAGEERROR = "ACTION_SET_REGISTER_FETCHIMAGEERROR";

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

		if( phoneNumberReg.test( register.phoneNumber ) && registerType === 0 )
		{
			dispatch( fetchImageCode() )
		} else
		{
			dispatch( { type: ACTION_SET_REGISTER_IMAGEBLOB, payload: null } );
		};

		if( emailTextReg.test( register.emailText ) && registerType === 1 )
		{
			dispatch( fetchImageCode() )
		} else
		{
			dispatch( { type: ACTION_SET_REGISTER_IMAGEBLOB, payload: null } );
		};
	};
};

// 设置输入文本
export function setInputText( key, value )
{
	return async function( dispatch, getState )
	{
		const { register } = getState();

		dispatch( { type: ACTION_SET_REGISTER_INPUTTEXT, payload: { [ key ]: value } } );

		if( key === "phoneNumber" )
		{
			dispatch( { type: ACTION_SET_REGISTER_INPUTERROR, payload: Object.assign( {}, register.inputError, { phoneNumber: !phoneNumberReg.test( value ) } ) } );
			dispatch( { type: ACTION_SET_SENDCODESTATUS, payload: phoneNumberReg.test( value ) ? 1 : 0 } );
			if( phoneNumberReg.test( value ) )
			{
				register.imageBlob || dispatch( fetchImageCode() );
			} else
			{
				dispatch( { type: ACTION_SET_REGISTER_IMAGEBLOB, payload: null } );
			};
		};

		if( key === "emailText" )
		{
			dispatch( { type: ACTION_SET_REGISTER_INPUTERROR, payload: Object.assign( {}, register.inputError, { emailText: !emailTextReg.test( value ) } ) } );
			dispatch( { type: ACTION_SET_SENDCODESTATUS, payload: emailTextReg.test( value ) ? 1 : 0 } );
			if( emailTextReg.test( value ) )
			{
				register.imageBlob || dispatch( fetchImageCode() );
			} else
			{
				dispatch( { type: ACTION_SET_REGISTER_IMAGEBLOB, payload: null } );
			}
		};
		if( key === "referee" )
		{
			dispatch( { type: ACTION_SET_REGISTER_INPUTERROR, payload: Object.assign( {}, register.inputError, { referee: !refereeReg.test( value ) } ) } );
		};

		if( key === "password" )
		{
			dispatch( { type: ACTION_SET_REGISTER_INPUTERROR, payload: Object.assign( {}, register.inputError, { password: !passwordReg.test( value ) } ) } );
		};

		if( key === "newPassword" )
		{
			dispatch( { type: ACTION_SET_REGISTER_INPUTERROR, payload: Object.assign( {}, register.inputError, { newPassword: !( passwordReg.test( value ) && ( value === register.password ) ) } ) } );
		};

		if( key === "name" )
		{
			dispatch( { type: ACTION_SET_REGISTER_INPUTERROR, payload: Object.assign( {}, register.inputError, { name: !nameReg.test( value ) } ) } );
		};

	};
};

// 注册页面 componentWillUnmount
export function clear()
{
	return { type: ACTION_SET_REGISTER_CLEAR };
};

// 图片验证码请求
export function fetchImageCode()
{
	return async function( dispatch, getState )
	{
		const { register } = getState();

		if(
			( register.registerType === 0 && phoneNumberReg.test( register.phoneNumber ) ) ||
			( register.registerType === 1 && emailTextReg.test( register.emailText ) )
		)
		{
			const params = {
				"提交": "获取图形验证码",
				"电话": register.registerType === 0 ? register.phoneNumber : register.registerType === 1 ? register.emailText : ""
			};

			try
			{
				const res = await fetchImage( "/yanzheng.php", params );
				dispatch( { type: ACTION_SET_REGISTER_IMAGEBLOB, payload: res } );
				dispatch( { type: ACTION_SET_REGISTER_FETCHIMAGEERROR, payload: null } );
			} catch( err )
			{
				dispatch( { type: ACTION_SET_REGISTER_IMAGEBLOB, payload: null } );
				dispatch( { type: ACTION_SET_REGISTER_FETCHIMAGEERROR, payload: err.type === "network" ? `${ err.status }: ${ I18n.t( "register.fetchImageCodeError" ) }` : err.toString() } );
			}
		};
	};
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

