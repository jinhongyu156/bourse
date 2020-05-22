import { ACTION_SET_USDTMENTION_INPUTTEXT, ACTION_SET_USDTMENTION_INPUTERROR, ACTION_SET_USDTMENTION_VALUATIONDATA, ACTION_SET_USDTMENTION_FETCHMENTIONSUBMIT, ACTION_SET_USDTMENTION_CLEAR } from "./../actions/usdtMention.js";

const defaultState = {
	number: "",															// 数量
	password: "",														// 密码
	inputError: {},														// 输入是否存在错误

	valuationData: {},													// 估价数据
	fetchValuationDataLoading: false,									// 是否正在请求估价
	fetchValuationDataError: null,										// 请求估价错误

	fetchMentionSubmitLoading: false,									// 是否正在请求提现
	fetchMentionSubmitError: null										// 提现的请求错误
};

export default function( state = defaultState, action )
{
	switch( action.type )
	{
		case ACTION_SET_USDTMENTION_INPUTTEXT:
			return Object.assign( {}, state, action.payload );

		case ACTION_SET_USDTMENTION_INPUTERROR:
			return Object.assign( {}, state, { inputError: action.payload } );

		case ACTION_SET_USDTMENTION_VALUATIONDATA:
			return Object.assign( {}, state, action.payload );

		case ACTION_SET_USDTMENTION_FETCHMENTIONSUBMIT:
			return Object.assign( {}, state, action.payload );

		case ACTION_SET_USDTMENTION_CLEAR:
			return Object.assign( {}, state, defaultState )

		default:
			return state;
	};
};
