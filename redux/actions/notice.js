import Ws from "./../../javascripts/ws.js";

/* action type */
export const ACTION_SET_NOTICE_NOTICEMESSAGE = "ACTION_SET_NOTICE_NOTICEMESSAGE";

/* action create */
export let ws = null;

// 设置通知消息
function setNoticeMessage( noticeMessage )
{
	return { type: ACTION_SET_NOTICE_NOTICEMESSAGE, payload: noticeMessage };
};

export function closeWs()
{
	if( ws ) {
		ws.close();
	}
};

// ws 通知
export function wsNotice()
{
	return async function( dispatch )
	{
		// if( ws ) return;
		closeWs();
		ws = new Ws( "ws://tcp.slb.one:8080/", {
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

	};
};
