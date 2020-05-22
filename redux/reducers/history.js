import { ACTION_SET_HISTORY_HISTORYTYPE, ACTION_SET_HISTORY_HISTORYDATA, ACTION_SET_HISTORY_FETCHSUBMIT } from "./../actions/history.js";

const defaultState = {
	historyType: 0,								// 0: 充值, 1: 提现
	historyData: [],							// 历史数据
	fetchHistoryDataLoading: false,				// 是否正在请求历史数据
	fetchHistoryDataError: null,				// 请求历史数据出现错误

	fetchSubmitLoading: false					// 是否正在提交放币
};


export default function( state = defaultState, action )
{
	switch( action.type )
	{
		case ACTION_SET_HISTORY_HISTORYTYPE:
			return Object.assign( {}, state, { historyType: action.payload } );

		case ACTION_SET_HISTORY_HISTORYDATA:
			return Object.assign( {}, state, action.payload );

		case ACTION_SET_HISTORY_FETCHSUBMIT:
			return Object.assign( {}, state, action.payload );

		default:
			return state;
	};
};
