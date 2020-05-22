import {
	ACTION_SET_MYBANKCARD_HASCARD,
	ACTION_SET_MYBANKCARD_INPUTTEXT, ACTION_SET_MYBANKCARD_SETBANKLISTDATA, ACTION_SET_MYBANKCARD_INPUTERROR, ACTION_SET_MYBANKCARD_ISSHOWBANKSELECTOR,
	ACTION_SET_MYBANKCARD_BINDCARD, ACTION_SET_MYBANKCARD_UNBINDCARD, ACTION_SET_MYBANKCARD_CARDDATA
} from "./../actions/myBankCard.js";

const defaultState = {
	hasCard: null,														// 该用户是否已绑定银行卡
	bankId: "",															// 银行 id
	bankName: "",														// 银行名称
	bankDeposit: "",													// 开户行
	bankCardNumber: "",													// 银行卡号

	inputError: {},														// 输入是否存在错误
	isShowBankSelector: false,											// 是否显示 Bank Selector

	bankListData: [],													// 银行卡列表数据
	fetchBankListDataLoading: false,									// 是否正在加载银行卡列表数据
	fetchBankListDataError: null,										// 请求银行卡列表数据错误

	fetchBindCardLoading: false,										// 正在绑卡
	fetchBindCardError: false,											// 请求绑卡错误

	fetchUnBindCardLoading: false,										// 正在解绑
	fetchUnBindCardError: false,										// 请求解绑错误

	fetchCardDataLoading: false,										// 是否正在银行卡数据
	fetchCardDataError: null											// 请求银行卡数据错误
};

export default function( state = defaultState, action )
{
	switch( action.type )
	{
		case ACTION_SET_MYBANKCARD_HASCARD:
			return Object.assign( {}, state, { hasCard: action.payload } );

		case ACTION_SET_MYBANKCARD_INPUTTEXT:
			return Object.assign( {}, state, action.payload );

		case ACTION_SET_MYBANKCARD_SETBANKLISTDATA:
			return Object.assign( {}, state, action.payload );

		case ACTION_SET_MYBANKCARD_ISSHOWBANKSELECTOR:
			return Object.assign( {}, state, { isShowBankSelector: action.payload } );

		case ACTION_SET_MYBANKCARD_INPUTERROR:
			return Object.assign( {}, state, { inputError: action.payload } );

		case ACTION_SET_MYBANKCARD_BINDCARD:
			return Object.assign( {}, state, action.payload );

		case ACTION_SET_MYBANKCARD_UNBINDCARD:
			return Object.assign( {}, state, action.payload );

		case ACTION_SET_MYBANKCARD_CARDDATA:
			return Object.assign( {}, state, action.payload );

		default:
			return state;
	};
};
