import { ACTIONS_SET_CONTRACT_TABINDEX, ACTIONS_SET_CONTRACT_PRODUCTID, ACTIONS_SET_CONTRACT_DATA } from "./../actions/contract.js";

const defaultState = {
	tabIndex: 0,										// 当前选中 tab index, 0: USDT, 1: 交易金, 2: SLBT
	productId: "",										// 当前选中 product name
	fetchDataError: null,								// 请求数据存在的错误
	contractData: [],									// 合约数据
	userOrderData: [],									// 用户订单数据
	userDetailData: {}									// 用户详细数据
};

export default function( state = defaultState, action )
{
	switch( action.type )
	{
		case ACTIONS_SET_CONTRACT_TABINDEX:
			return Object.assign( {}, state, { tabIndex: action.payload } );

		case ACTIONS_SET_CONTRACT_PRODUCTID:
			return Object.assign( {}, state, { productId: action.payload } );

		case ACTIONS_SET_CONTRACT_DATA:
			return Object.assign( {}, state, action.payload );

		default:
			return state;

	};
};