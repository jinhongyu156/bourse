import { ACTION_SET_SENDCODE_COUNTDOWN_ACTIVE, ACTION_SET_SENDCODE_SENDCODESTATUS, ACTION_SET_SENDCODE_SENDCODEERROR } from "./../actions/sendCode.js";

const defaultState = {
	sendCodeError: null,						// 发送验证码出现错误
	sendCodeStatus: 0,							// 发送验证码操作的状态, 0: 条件不满足无法发送, 1: 未发生过短信; 2: 已发送短信正在等待过程中; 3: 重发短信
	countdown: 60								// 距离下次发送验证码的倒计时

};

export default function( state = defaultState, action )
{
	switch( action.type )
	{
		case ACTION_SET_SENDCODE_COUNTDOWN_ACTIVE:
			return Object.assign( {}, state, { countdown: action.payload.countdown, sendCodeStatus: action.payload.sendCodeStatus } );

		case ACTION_SET_SENDCODE_SENDCODESTATUS:
			return Object.assign( {}, state, { sendCodeStatus: action.payload } );

		case ACTION_SET_SENDCODE_SENDCODEERROR:
			return Object.assign( {}, state, { sendCodeError: action.payload } );

		default:
			return state;
	};
};