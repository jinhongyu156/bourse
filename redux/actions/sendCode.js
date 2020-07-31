import I18n from "i18n-js";
import { fetchPost, fetchImage, isObject } from "./../../javascripts/util.js";
import { phoneNumberReg, emailTextReg } from "./../../javascripts/regExp.js";

/* action type */
export const ACTION_SET_SENDCODE_COUNTDOWN_ACTIVE = "ACTION_SET_SENDCODE_COUNTDOWN_ACTIVE";
export const ACTION_SET_SENDCODE_SENDCODESTATUS = "ACTION_SET_SENDCODE_SENDCODESTATUS";
export const ACTION_SET_SENDCODE_SENDCODEERROR = "ACTION_SET_SENDCODE_SENDCODEERROR";
/* action create */

// 设置当前验证码状态
export function setSendCodeStatus( sendCodeStatus )
{
	return { type: ACTION_SET_SENDCODE_SENDCODESTATUS, payload: sendCodeStatus }
};

// 发送验证码
let timer = null;
export function sendCode()
{
	return async function( dispatch, getState )
	{
		const { register } = getState();
		const { sendCode } = getState();

		const seconds = sendCode.countdown;

		// 开始倒计时
		function startCountdown()
		{
			const prevRegisterType = register.registerType;
			const overTimeStamp = Date.now() + seconds * 1000;								// 切换到后台时, 倒计时将不受影响
			const run = function()
			{
				const nowTimeStamp = Date.now();
				const nextRegisterType = getState().register.registerType;
				const nextRegisterPhoneNumber = getState().register.phoneNumber;
				const nextRegisterEmailText = getState().register.emailText;

				if ( nowTimeStamp >= overTimeStamp )
				{
					let sendCodeStatus = 0
					if ( prevRegisterType === nextRegisterType )
					{
						if ( nextRegisterType === 0 )
						{
							sendCodeStatus = phoneNumberReg.test( nextRegisterPhoneNumber ) ? 3 : 0;
						};
						if ( nextRegisterType === 1 )
						{
							sendCodeStatus = emailTextReg.test( nextRegisterEmailText ) ? 3 : 0;
						};
					} else
					{
						if ( nextRegisterType === 0 )
						{
							sendCodeStatus = phoneNumberReg.test( nextRegisterPhoneNumber ) ? 1 : 0;
						};
						if ( nextRegisterType === 1 )
						{
							sendCodeStatus = emailTextReg.test( nextRegisterEmailText ) ? 1 : 0;
						};
					};
					dispatch( { type: ACTION_SET_SENDCODE_COUNTDOWN_ACTIVE, payload: { countdown: seconds, sendCodeStatus: sendCodeStatus } } );
					clearInterval( timer );
				} else
				{
					dispatch( { type: ACTION_SET_SENDCODE_COUNTDOWN_ACTIVE, payload: { countdown: parseInt( ( overTimeStamp - nowTimeStamp ) / 1000 ), sendCodeStatus: 2 } } );
				};
			};
			run();
			timer = setInterval( run, 1000 );
		};

		if ( sendCode.sendCodeStatus === 0 || sendCode.sendCodeStatus === 2 )
		{
			dispatch( { type: ACTION_SET_SENDCODE_SENDCODEERROR, payload: I18n.t( "sendCode.info" ) } );
		} else
		{
			try
			{
				const params = {
					"提交": register.registerType === 0 ? "发送手机短信验证码" : register.registerType === 1 ? "发送邮箱验证码" : "",
					"电话": register.registerType === 0 ? register.phoneNumber : register.registerType === 1 ? register.emailText : "",
					"验证码": register.imageCode
				};

				const res = await fetchPost( "/yanzheng.php", params );

				if( isObject( res ) && Object.keys( res ).includes( "发送成功" ) )
				{
					// dispatch( { type: ACTION_SET_SENDCODE_SENDCODEERROR, payload: null } ); // 新版本修改
					dispatch( { type: ACTION_SET_SENDCODE_SENDCODEERROR, payload: res[ "发送成功" ] } );
					startCountdown();
				} else
				{
					dispatch( { type: ACTION_SET_SENDCODE_SENDCODEERROR, payload: res } );
				};
			} catch( err )
			{
				dispatch( { type: ACTION_SET_SENDCODE_SENDCODEERROR, payload: err.type === "network" ? `${ err.status }: ${ I18n.t( "sendCode.sendCodeError" ) }` : err.toString() } );
			};
		};
	};
};

export function sendMentionCode()
{
	return async function( dispatch, getState )
	{
		const { sendCode } = getState();
		const { access } = getState();
		const { user } = getState();

		const seconds = sendCode.countdown;

		// 开始倒计时
		function startCountdown()
		{
			const overTimeStamp = Date.now() + seconds * 1000;								// 切换到后台时, 倒计时将不受影响
			const run = function()
			{
				const nowTimeStamp = Date.now();


				if ( nowTimeStamp >= overTimeStamp )
				{
					dispatch( { type: ACTION_SET_SENDCODE_COUNTDOWN_ACTIVE, payload: { countdown: seconds, sendCodeStatus: 3 } } );
					clearInterval( timer );
				} else
				{
					dispatch( { type: ACTION_SET_SENDCODE_COUNTDOWN_ACTIVE, payload: { countdown: parseInt( ( overTimeStamp - nowTimeStamp ) / 1000 ), sendCodeStatus: 2 } } );
				};
			};
			run();
			timer = setInterval( run, 1000 );
		};

		if ( sendCode.sendCodeStatus === 0 || sendCode.sendCodeStatus === 2 )
		{
			dispatch( { type: ACTION_SET_SENDCODE_SENDCODEERROR, payload: I18n.t( "sendCode.info" ) } );
		} else
		{
			try
			{
				const filterItem = [ { key: "电话", value: user.accountData[ "电话" ] }, { key: "邮箱", value: user.accountData[ "邮箱" ] } ].filter( item => item.value === access.accountIndex );

				if( filterItem.length )
				{
					const params = { "提交": "提币发送验证码", "类型": filterItem[ 0 ][ "key" ] };

					const res = await fetchPost( "/user.php", params );

					if( isObject( res ) && Object.keys( res ).includes( "发送成功" ) )
					{
						dispatch( { type: ACTION_SET_SENDCODE_SENDCODEERROR, payload: null } );
						startCountdown();
					} else
					{
						dispatch( { type: ACTION_SET_SENDCODE_SENDCODEERROR, payload: res } );
					};
				};
			} catch( err )
			{
				dispatch( { type: ACTION_SET_SENDCODE_SENDCODEERROR, payload: err.type === "network" ? `${ err.status }: ${ I18n.t( "sendCode.sendCodeError" ) }` : err.toString() } );
			};
		};
	};
};

export function sendBindAccountCode()
{
	return async function( dispatch, getState )
	{
		const { sendCode } = getState();
		const { user } = getState();

		const seconds = sendCode.countdown;

		// 开始倒计时
		function startCountdown()
		{
			const overTimeStamp = Date.now() + seconds * 1000;								// 切换到后台时, 倒计时将不受影响
			const run = function()
			{
				const nowTimeStamp = Date.now();

				if ( nowTimeStamp >= overTimeStamp )
				{
					dispatch( { type: ACTION_SET_SENDCODE_COUNTDOWN_ACTIVE, payload: { countdown: seconds, sendCodeStatus: 3 } } );
					clearInterval( timer );
				} else
				{
					dispatch( { type: ACTION_SET_SENDCODE_COUNTDOWN_ACTIVE, payload: { countdown: parseInt( ( overTimeStamp - nowTimeStamp ) / 1000 ), sendCodeStatus: 2 } } );
				};
			};
			run();
			timer = setInterval( run, 1000 );
		};

		if ( sendCode.sendCodeStatus === 0 || sendCode.sendCodeStatus === 2 )
		{
			dispatch( { type: ACTION_SET_SENDCODE_SENDCODEERROR, payload: I18n.t( "sendCode.info" ) } );
		} else
		{
			try
			{
				const params = { "提交": "发送验证信息", "验证方式": user.bindAccountType ? "邮箱" : "手机", "电话": user.bindAccountType ? user.accountEmailText : user.accountPhoneText };
				const res = await fetchPost( "/user.php", params );

				if( isObject( res ) && Object.keys( res ).includes( "发送成功" ) )
				{
					dispatch( { type: ACTION_SET_SENDCODE_SENDCODEERROR, payload: null } );
					startCountdown();
				} else
				{
					dispatch( { type: ACTION_SET_SENDCODE_SENDCODEERROR, payload: res } );
				};
			} catch( err )
			{
				dispatch( { type: ACTION_SET_SENDCODE_SENDCODEERROR, payload: err.type === "network" ? `${ err.status }: ${ I18n.t( "sendCode.sendCodeError" ) }` : err.toString() } );
			};
		};
	};
};

export function clearTimer()
{
	clearInterval( timer );
};

// 清空发送验证码的错误信息
export function clearSendCodeError()
{
	return { type: ACTION_SET_SENDCODE_SENDCODEERROR, payload: null };
};
