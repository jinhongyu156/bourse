import { ACTION_SET_REGISTER_ISLOADING, ACTION_SET_REGISTER_REGISTERTYPE, ACTION_SET_REGISTER_INPUTTEXT, ACTION_SET_REGISTER_INPUTERROR, ACTION_SET_REGISTER_CLEAR } from "./../actions/register.js";

const defaultState = {
	name: "",									// 用户名称
	referee: "",								// 推荐人 id
	phoneNumber: "",							// 电话号码输入文本
	emailText: "",								// 电子邮件输入文本
	password: "",								// 密码输入文本
	imageCode: "",								// 图片验证码输入文本
	code: "",									// 验证码输入文本
	inputError: "",								// 输入是否存在错误
	registerType: 0,							// 0: 电话号码注册方式, 1: 电子邮件注册方式
	isLoading: false							// 是否正在注册
};

export default function( state = defaultState, action )
{
	switch( action.type )
	{
		case ACTION_SET_REGISTER_REGISTERTYPE:
			return Object.assign( {}, state, { registerType: action.payload.registerType } );

		case ACTION_SET_REGISTER_INPUTTEXT:
			return Object.assign( {}, state, action.payload );

		case ACTION_SET_REGISTER_INPUTERROR:
			return Object.assign( {}, state, { inputError: action.payload } );

		case ACTION_SET_REGISTER_CLEAR:
			return Object.assign( {}, state, defaultState );
		default:
			return state;
	};
};
