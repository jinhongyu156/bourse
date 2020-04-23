import { ACTION_SET_NOTICE_NOTICEMESSAGE } from "./../actions/notice.js";


export default function( state = { noticeMessage: "" }, action )
{
	switch( action.type )
	{
		case ACTION_SET_NOTICE_NOTICEMESSAGE:
			return Object.assign( {}, state, { noticeMessage: action.payload } );

		default:
			return state;

	};
};
