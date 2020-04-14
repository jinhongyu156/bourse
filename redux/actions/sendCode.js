import { phoneNumberReg, emailTextReg } from "./../../components/regExp.js";

/* action type */
export const ACTION_SET_COUNTDOWN_ACTIVE = "ACTION_SET_COUNTDOWN_ACTIVE";
export const ACTION_SET_SENDCODESTATUS = "ACTION_SET_SENDCODESTATUS";

/* action create */
// 发送验证码
let timer = null;
export function sendCode()
{
	const seconds = 10;
	return function( dispatch, getState )
	{
		const { register } = getState();
		const { sendCode } = getState();

		if ( sendCode.sendCodeStatus === 0 || sendCode.sendCodeStatus === 2 ) return;
		console.log( "成功发送" );
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
					sendCodeStatus = 3;
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
				}
				dispatch( { type: ACTION_SET_COUNTDOWN_ACTIVE, payload: { countdown: seconds, sendCodeStatus: sendCodeStatus } } );
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
