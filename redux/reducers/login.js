import {
	ACTION_SET_LOGIN_ISLOADING, ACTION_SET_LOGIN_LOGINTYPE, ACTION_SET_LOGIN_INPUTTEXT, ACTION_SET_LOGIN_IMAGEBLOB,
	ACTION_SET_LOGIN_INPUTERROR, ACTION_SET_LOGIN_ISLOGIN, ACTION_SET_LOGIN_FETCHLOGINERROR, ACTION_SET_LOGIN_FETCHIMAGEERROR,
	ACTION_SET_LOGIN_ISSHOWACTIONSHEET, ACTION_SET_LOGIN_CLEAR
} from "./../actions/login.js";

const defaultState = {
	phoneNumber: "",							// 电话号码输入文本
	emailText: "",								// 电子邮件输入文本
	password: "",								// 密码输入文本
	code: "",									// 验证码输入文本
	inputError: {},								// 输入是否存在错误
	imageBlob: null,							// 验证码图片二进制数据
	loginType: 0,								// 0: 电话号码登录方式, 1: 电子邮件登录方式
	isLoading: false,							// 是否正在登录
	isLogin: false,								// 是否登录
	fetchLoginError: null,						// 登录错误信息
	fetchImageError: null,						// 获取验证码错误信息
	isShowActionSheet: false,					// 显示 ActionSheet
	actionSheetData: {}							// 显示 ActionSheet 所需要的数据
};


export default function( state = defaultState, action )
{
	switch( action.type )
	{
		case ACTION_SET_LOGIN_ISLOADING:
			return Object.assign( {}, state, { isLoading: action.payload } );

		case ACTION_SET_LOGIN_LOGINTYPE:
			return Object.assign( {}, state, { loginType: action.payload.loginType } );

		case ACTION_SET_LOGIN_INPUTTEXT:
			return Object.assign( {}, state, action.payload );

		case ACTION_SET_LOGIN_IMAGEBLOB:
			return Object.assign( {}, state, { imageBlob: action.payload } );

		case ACTION_SET_LOGIN_INPUTERROR:
			return Object.assign( {}, state, { inputError: action.payload } );

		case ACTION_SET_LOGIN_ISLOGIN:
			return Object.assign( {}, state, { isLogin: action.payload } );

		case ACTION_SET_LOGIN_FETCHLOGINERROR:
			return Object.assign( {}, state, { fetchLoginError: action.payload } );

		case ACTION_SET_LOGIN_FETCHIMAGEERROR:
			return Object.assign( {}, state, { fetchImageError: action.payload } );

		case ACTION_SET_LOGIN_ISSHOWACTIONSHEET:
			return Object.assign( {}, state, {
				isShowActionSheet: action.payload.isShowActionSheet,
				actionSheetData: action.payload.actionSheetData
			} );

		case ACTION_SET_LOGIN_CLEAR:
			const _defaultState = Object.assign( {}, defaultState );
			delete _defaultState.isLogin;
			return Object.assign( {}, state, _defaultState );

		default:
			return state;
	};
};
