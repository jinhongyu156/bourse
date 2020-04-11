import AsyncStorage from "@react-native-community/async-storage"; 

/* action type */
export const ACTION_SET_ISLOADING = "ACTION_SET_ISLOADING";
export const ACTION_SET_COUNTDOWN_ACTIVE = "ACTION_SET_COUNTDOWN_ACTIVE";
export const ACTION_SET_LOGINTYPE = "ACTION_SET_LOGINTYPE";
export const ACTION_SET_INPUTTEXT = "ACTION_SET_INPUTTEXT";
export const ACTION_SET_SENDCODESTATUS = "ACTION_SET_SENDCODESTATUS";

/* action create */
let timer = null;
const phoneNumberReg = /^1(3|4|5|7|8)\d{9}$/;					// 以 1 开头, 第二位可能是 3/4/5/7/8 的任意一个, \d 表示数字 [0 - 9] 的 9 位, 总共加起来 11 位结束
const emailTextReg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.{1}([a-zA-Z]{2,4})$/;

// 发送验证码
export function sendCode()
{
	const seconds = 10;
	return function( dispatch, getState )
	{
		const { login } = getState();

		if ( login.sendCodeStatus === 2 ) return;

		const prevLoginType = login.loginType;

		const overTimeStamp = Date.now() + seconds * 1000;		// 切换到后台时, 倒计时将不受影响
		const run = function()
		{
			const nowTimeStamp = Date.now();
			const nextLoginType = getState().login.loginType;
			console.log( "prevLoginType, nextLoginType", prevLoginType, nextLoginType );
			if ( nowTimeStamp >= overTimeStamp )
			{
				dispatch( { type: ACTION_SET_COUNTDOWN_ACTIVE, payload: { countdown: seconds, sendCodeStatus: prevLoginType === nextLoginType ? 3 : 0 } } );
				clearInterval( timer );
			} else
			{
				dispatch( { type: ACTION_SET_COUNTDOWN_ACTIVE, payload: { countdown: parseInt( ( overTimeStamp - nowTimeStamp ) / 1000 ), sendCodeStatus: 2 } } );
			};
		};
		run();
		timer = setInterval( run, 1000 );
	};
};

// 切换登录方式
export function setLoginType( loginType )
{
	return async function( dispatch, getState )
	{
		const { login } = getState();

		if ( login.sendCodeStatus !== 2 )
		{
			dispatch( { type: ACTION_SET_SENDCODESTATUS, payload: loginType === 0
				? phoneNumberReg.test( login.phoneNumber ) ? 1 : 0
			: loginType === 1
				? emailTextReg.test( login.emailText ) ? 1 : 0
			: 0 } );
		};
		dispatch( { type: ACTION_SET_INPUTTEXT, payload: { code: "" } } );
		dispatch( { type: ACTION_SET_LOGINTYPE, payload: { loginType } } );
	};
};

// 设置输入文本
export function setInputText( key, value )
{
	return async function( dispatch, getState )
	{
		if( key === "phoneNumber" )
		{
			dispatch( { type: ACTION_SET_SENDCODESTATUS, payload: phoneNumberReg.test( value ) ? 1 : 0 } );
		};
		dispatch( { type: ACTION_SET_INPUTTEXT, payload: { [ key ]: value } } );
	};
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

