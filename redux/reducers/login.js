import { ACTION_SET_LOGIN_ISLOADING, ACTION_SET_LOGIN_LOGINTYPE, ACTION_SET_LOGIN_INPUTTEXT, ACTION_SET_LOGIN_INPUTERROR, ACTION_SET_LOGIN_CLEAR } from "./../actions/login.js";

const defaultState = {
	phoneNumber: "",							// 电话号码输入文本
	emailText: "",								// 电子邮件输入文本
	password: "",								// 密码输入文本
	code: "",									// 验证码输入文本
	inputError: "",								// 输入是否存在错误
	loginType: 0,								// 0: 电话号码登录方式, 1: 电子邮件登录方式
	isLoading: false							// 是否正在登录
};

export default function( state = defaultState, action )
{
	switch( action.type )
	{
		case ACTION_SET_LOGIN_LOGINTYPE:
			return Object.assign( {}, state, { loginType: action.payload.loginType } );

		case ACTION_SET_LOGIN_INPUTTEXT:
			return Object.assign( {}, state, action.payload );

		case ACTION_SET_LOGIN_INPUTERROR:
			return Object.assign( {}, state, { inputError: action.payload } );

		case ACTION_SET_LOGIN_CLEAR:
			return Object.assign( {}, state, defaultState );

		default:
			return state;
	};
};
