import { ACTION_SET_ISLOADING, ACTION_SET_COUNTDOWN_ACTIVE, ACTION_SET_LOGINTYPE, ACTION_SET_INPUTTEXT, ACTION_SET_SENDCODESTATUS, ACTION_SET_INPUTERROR } from "./../actions/login.js";

const defaultState = {
	phoneNumber: "",							// 电话号码输入文本
	emailText: "",								// 电子邮件输入文本
	password: "",								// 密码输入文本
	code: "",									// 验证码输入文本
	inputError: "",								// 输入是否存在错误
	loginType: 0,								// 0: 电话号码登录方式, 1: 电子邮件登录方式
	isLoading: false,							// 是否正在登录
	sendCodeStatus: 0,							// 发送验证码操作的状态, 0: 手机号码/邮箱地址不正确无法发送, 1: 未发生过短信; 2: 已发送短信正在等待过程中; 3: 重发短信
	countdown: 60,								// 距离下次发送验证码的倒计时
};

export default function( state = defaultState, action )
{
	switch( action.type )
	{
		case ACTION_SET_COUNTDOWN_ACTIVE:
			return Object.assign( {}, state, { countdown: action.payload.countdown, sendCodeStatus: action.payload.sendCodeStatus } );

		case ACTION_SET_LOGINTYPE:
			return Object.assign( {}, state, { loginType: action.payload.loginType } );

		case ACTION_SET_SENDCODESTATUS:
			return Object.assign( {}, state, { sendCodeStatus: action.payload } );

		case ACTION_SET_INPUTERROR:
			return Object.assign( {}, state, { inputError: action.payload } );

		case ACTION_SET_INPUTTEXT:
			return Object.assign( {}, state, action.payload );

		default:
			return state;
	};
};