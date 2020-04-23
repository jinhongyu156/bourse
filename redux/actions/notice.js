import Ws from "./../../javascripts/ws.js";

/* action type */
export const ACTION_SET_NOTICE_NOTICEMESSAGE = "ACTION_SET_NOTICE_NOTICEMESSAGE";

/* action create */
// 设置通知消息
function setNoticeMessage( noticeMessage )
{
	return { type: ACTION_SET_NOTICE_NOTICEMESSAGE, payload: noticeMessage };
};

// ws 通知
export function wsNotice()
{
	return async function( dispatch )
	{
		const ws = Ws.getInstance( "ws://tcp.slb.one:8308/", {
			heartCheck: function()
			{
				ws.sendMessage( "1" );
			},
			onopen: function()
			{
				ws.sendMessage( "1" );
			},
			onmessage: function( res )
			{
				dispatch( setNoticeMessage( res ) );
			}
		} );
		ws.initWebSocket();
	}
};
