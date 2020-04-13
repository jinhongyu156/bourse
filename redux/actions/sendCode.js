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
		const { login } = getState();

		if ( login.sendCodeStatus === 2 ) return;

		const prevLoginType = login.loginType;

		const overTimeStamp = Date.now() + seconds * 1000;		// 切换到后台时, 倒计时将不受影响
		const run = function()
		{
			const nowTimeStamp = Date.now();
			const nextLoginType = getState().login.loginType;

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
