import I18n from "i18n-js";
import { fetchPost, fetchImage } from "./../../javascripts/util.js";
import { phoneNumberReg, emailTextReg, passwordReg, refereeReg, nameReg } from "./../../javascripts/regExp.js";

/* action type */
export const ACTION_SET_REGISTER_ISLOADING = "ACTION_SET_REGISTER_ISLOADING";
export const ACTION_SET_REGISTER_REGISTERTYPE = "ACTION_SET_REGISTER_REGISTERTYPE";
export const ACTION_SET_REGISTER_INPUTTEXT = "ACTION_SET_REGISTER_INPUTTEXT";
export const ACTION_SET_REGISTER_AGREE = "ACTION_SET_REGISTER_AGREE";
export const ACTION_SET_REGISTER_ISSHOWMODAL = "ACTION_SET_REGISTER_ISSHOWMODAL";
export const ACTION_SET_REGISTER_INPUTERROR = "ACTION_SET_REGISTER_INPUTERROR";
export const ACTION_SET_REGISTER_IMAGEBLOB = "ACTION_SET_REGISTER_IMAGEBLOB";

export const ACTION_SET_REGISTER_FETCHIMAGEERROR = "ACTION_SET_REGISTER_FETCHIMAGEERROR";
export const ACTION_SET_REGISTER_FETCHREGISTERERROR = "ACTION_SET_REGISTER_FETCHREGISTERERROR";

export const ACTION_SET_REGISTER_CLEAR = "ACTION_SET_REGISTER_CLEAR";

/* action create */
import { setSendCodeStatus, clearSendCodeError } from "./sendCode.js"
// 切换注册方式
export function setRegisterType( registerType )
{
	return function( dispatch, getState )
	{
		const { register } = getState();
		const { sendCode } = getState();

		dispatch( { type: ACTION_SET_REGISTER_INPUTTEXT, payload: { imageCode: "" } } );
		dispatch( { type: ACTION_SET_REGISTER_REGISTERTYPE, payload: { registerType } } );

		if ( sendCode.sendCodeStatus !== 2 )
		{
			if ( registerType === 0 )
			{
				dispatch( setSendCodeStatus( ( register.imageCode && phoneNumberReg.test( register.phoneNumber ) ) ? 1 : 0 ) );
			};

			if ( registerType === 1 )
			{
				dispatch( setSendCodeStatus( ( register.imageCode && emailTextReg.test( register.emailText ) ) ? 1 : 0 ) );
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
	return function( dispatch, getState )
	{
		const { register } = getState();

		dispatch( { type: ACTION_SET_REGISTER_INPUTTEXT, payload: { [ key ]: value } } );

		if( key === "phoneNumber" )
		{
			dispatch( { type: ACTION_SET_REGISTER_INPUTERROR, payload: Object.assign( {}, register.inputError, { phoneNumber: !phoneNumberReg.test( value ) } ) } );
			dispatch( setSendCodeStatus( ( register.imageCode && phoneNumberReg.test( value ) ) ? 1 : 0 ) );
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
			dispatch( setSendCodeStatus( ( register.imageCode && emailTextReg.test( value ) ) ? 1 : 0 ) );
			if( emailTextReg.test( value ) )
			{
				register.imageBlob || dispatch( fetchImageCode() );
			} else
			{
				dispatch( { type: ACTION_SET_REGISTER_IMAGEBLOB, payload: null } );
			}
		};

		if( key === "imageCode" )
		{
			dispatch( setSendCodeStatus( ( ( ( phoneNumberReg.test( register.phoneNumber ) && register.registerType === 0 ) || ( emailTextReg.test( register.emailText ) && register.registerType === 1 ) ) && value ) ? 1 : 0 ) );
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
			dispatch( { type: ACTION_SET_REGISTER_INPUTERROR, payload: Object.assign( {}, register.inputError, { newPassword: !( passwordReg.test( value ) && register.password === value ) } ) } );
		};

		if( key === "name" )
		{
			dispatch( { type: ACTION_SET_REGISTER_INPUTERROR, payload: Object.assign( {}, register.inputError, { name: !nameReg.test( value ) } ) } );
		};

	};
};

// 设置是否同意用户协议
export function toggleAgree( agree )
{
	return function( dispatch, getState )
	{
		const { register } = getState();
		dispatch( { type: ACTION_SET_REGISTER_AGREE, payload: !register.agree } );
	};
};

// 打开 modal 框
export function showModal()
{
 	return { type: ACTION_SET_REGISTER_ISSHOWMODAL, payload: true };
};

// 关闭 modal 框
export function hideModal()
{
 	return { type: ACTION_SET_REGISTER_ISSHOWMODAL, payload: false };
};

// 注册页面 componentWillUnmount
export function clear()
{
	return function( dispatch )
	{
		dispatch( clearSendCodeError() );
		dispatch( setSendCodeStatus( 0 ) );
		dispatch( { type: ACTION_SET_REGISTER_CLEAR } );
	};
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

// 注册请求
export function fetchRegister( type, callback )
{
	return async function( dispatch, getState )
	{
		const { register } = getState();

		if (
			( ( register.registerType === 0 && register.phoneNumber ) || ( register.registerType === 1 && register.emailText ) ) &&
			( type === "register" ? ( register.name && register.referee ) : ( register.newPassword ) ) &&
			register.password && register.imageCode && register.code &&
			!register.isLoading && Object.values( register.inputError ).every( item => item === false )
		)
		{
			dispatch( { type: ACTION_SET_REGISTER_ISLOADING, payload: true } );
			try
			{
				const params = type === "register"
					? {
						"提交": "注册",
						"注册方式": register.registerType === 0 ? "手机注册" : register.registerType === 1 ? "邮箱注册" : "",
						"电话": register.registerType === 0 ? register.phoneNumber : register.registerType === 1 ? register.emailText : "",
						"姓名": register.name,
						"密码": register.password,
						"推荐人ID": register.referee,
						"图形验证码": register.imageCode,
						"短信验证码": register.code
					}
				: type === "forget"
					? {
						"提交": "重置密码",
						"注册方式": register.registerType === 0 ? "手机账号" : register.registerType === 1 ? "邮箱账号" : "",
						"电话": register.registerType === 0 ? register.phoneNumber : register.registerType === 1 ? register.emailText : "",
						"密码": register.password,
						"确认密码": register.newPassword,
						"图形验证码": register.imageCode,
						"短信验证码": register.code
					}
				: {};

				const res = await fetchPost( "/user.php", params );
				if( res === "ok" )
				{
					dispatch( { type: ACTION_SET_REGISTER_FETCHREGISTERERROR, payload: null } );
					dispatch( { type: ACTION_SET_REGISTER_ISLOADING, payload: false } );
					callback();
				} else
				{
					dispatch( { type: ACTION_SET_REGISTER_FETCHREGISTERERROR, payload: res } );
					dispatch( { type: ACTION_SET_REGISTER_ISLOADING, payload: false } );
				};
			} catch( err )
			{
				dispatch( { type: ACTION_SET_REGISTER_FETCHREGISTERERROR, payload: err.type === "network" ? `${ err.status }: ${ I18n.t( "register.fetchRegisterError" ) }` : err.toString() } );
				dispatch( { type: ACTION_SET_REGISTER_ISLOADING, payload: false } );
			};
		} else
		{
			dispatch( { type: ACTION_SET_REGISTER_FETCHREGISTERERROR, payload: I18n.t( "register.inputError" ) } );
			dispatch( { type: ACTION_SET_REGISTER_ISLOADING, payload: false } );
		};
	};
};
