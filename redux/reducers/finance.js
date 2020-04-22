import {
	ACTION_SET_FINANCE_TABINDEX, ACTION_SET_FINANCE_STATEMENTDATA, ACTION_SET_FINANCE_ISLOADINGSTATEMENTDATA, ACTION_SET_FINANCE_FECTHSTATEMENTERROR,
	ACTION_SET_FINANCE_USERDETAILDATA, ACTION_SET_FINANCE_ISLOADINGUSERDETAILDATA,
	ACTION_SET_FINANCE_MODALVISIBLE, ACTION_SET_FINANCE_MODALDATA, ACTION_SET_FINANCE_MODALINPUTTEXT,
	ACTION_SET_FINANCE_NOTICEMESSAGE
} from "./../actions/finance.js";

const defaultState = {
	tabIndex: 0,										// 当前用户 tab index, 0: 积分, 1: ETUSD, 2: USDT, 3: 交易金
	statementData: [],									// 用户流水信息数据
	isloadingStatementData: false,						// 是否正在请求流水信息数据
	fecthStatementError: null,							// 请求用户流水信息错误信息

	userDetailData: {},									// 用户详细数据
	isloadingUserDetailData: false,						// 是否正在请求用户详细数据

	modalVisible: false,								// 是否显示 Modal 框
	modalData: {},										// Modal 框所需数据
	modalInputText: "",									// Modal 框输入文本

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

		case ACTION_SET_FINANCE_ISLOADINGSTATEMENTDATA:
			return Object.assign( {}, state, { isloadingStatementData: action.payload } );

		case ACTION_SET_FINANCE_FECTHSTATEMENTERROR:
			return Object.assign( {}, state, { fecthStatementError: action.payload } );

		case ACTION_SET_FINANCE_USERDETAILDATA:
			return Object.assign( {}, state, { userDetailData: action.payload } );

		case ACTION_SET_FINANCE_ISLOADINGUSERDETAILDATA:
			return Object.assign( {}, state, { isloadingUserDetailData: action.payload } );

		case ACTION_SET_FINANCE_MODALVISIBLE:
			return Object.assign( {}, state, { modalVisible: action.payload } );

		case ACTION_SET_FINANCE_MODALDATA:
			console.log( "action", action );
			return Object.assign( {}, state, { modalData: action.payload } );

		case ACTION_SET_FINANCE_MODALINPUTTEXT:
			return Object.assign( {}, state, { modalInputText: action.payload } );

		case ACTION_SET_FINANCE_NOTICEMESSAGE:
			return Object.assign( {}, state, { noticeMessage: action.payload } );

		default:
			return state;

	};
};