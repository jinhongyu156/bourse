import {
	ACTION_SET_FINANCE_TABINDEX, ACTION_SET_FINANCE_STATEMENTDATA, ACTION_SET_FINANCE_ISLOADING, ACTION_SET_FINANCE_FECTHSTATEMENTERROR,

	ACTION_SET_FINANCE_NOTICEMESSAGE
} from "./../actions/finance.js";

const defaultState = {
	tabIndex: 0,										// 当前用户 tab index, 0: 积分, 1: ETUSD, 2: USDT, 3: 交易金
	isloading: false,									// 是否正在请求
	statementData: [],									// 用户流水信息数据
	fecthStatementError: null,							// 请求用户流水信息错误信息

	noticeMessage: ""
};

export default function( state = defaultState, action )
{
	switch( action.type )
	{
		case ACTION_SET_FINANCE_TABINDEX:
			return Object.assign( {}, state, { tabIndex: action.payload } );

		case ACTION_SET_FINANCE_STATEMENTDATA:
			return Object.assign( {}, state, { statementData: action.payload } );

		case ACTION_SET_FINANCE_ISLOADING:
			return Object.assign( {}, state, { isloading: action.payload } );

		case ACTION_SET_FINANCE_FECTHSTATEMENTERROR:
			return Object.assign( {}, state, { fecthStatementError: action.payload } );

		case ACTION_SET_FINANCE_NOTICEMESSAGE:
			return Object.assign( {}, state, { noticeMessage: action.payload } );

		default:
			return state;

	};
};