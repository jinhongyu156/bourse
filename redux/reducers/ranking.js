import { ACTION_SET_RANKING_STATE } from "./../actions/ranking.js";

const defaultState = {
	data: [],								// 数据
	selfId: null,							// 用户自身的 ID
	targetId: null,							// 用户关注的 ID
	loading: false,							// 是否正在请求数据
	error: null								// 请求数据的错误信息
};

export default function( state = defaultState, action )
{
	switch( action.type )
	{
		case ACTION_SET_RANKING_STATE:
			return Object.assign( {}, state, action.payload );

		default:
			return state;
	};
};
