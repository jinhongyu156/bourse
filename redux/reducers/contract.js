import {
	ACTIONS_SET_CONTRACT_TABINDEX, ACTIONS_SET_CONTRACT_PRODUCTID, ACTIONS_SET_CONTRACT_FETCHDATAERROR,
	ACTIONS_SET_CONTRACT_ALLDATA, ACTIONS_SET_CONTRACT_CONTRACTDATA, ACTIONS_SET_CONTRACT_CURRENTPRODUCT
} from "./../actions/contract.js";

const defaultState = {
	tabIndex: 0,										// 当前选中 tab index, 0: USDT, 1: 交易金, 2: SLBT
	productId: "",										// 当前选中 product name
	fetchDataError: null,								// 请求数据存在的错误
	contractData: [],									// 合约数据
	currentProduct: [],									// 当前产品的合约数据
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
			return Object.assign( {}, state, { productId: action.payload.productId, currentProduct: action.payload.currentProduct } );

		case ACTIONS_SET_CONTRACT_ALLDATA:
			return Object.assign( {}, state, action.payload );

		case ACTIONS_SET_CONTRACT_CONTRACTDATA:
			return Object.assign( {}, state, { contractData: action.payload.contractData, currentProduct: action.payload.currentProduct } );

		case ACTIONS_SET_CONTRACT_CURRENTPRODUCT:
			return Object.assign( {}, state, { currentProduct: action.currentProduct } )

		case ACTIONS_SET_CONTRACT_FETCHDATAERROR:
			return Object.assign( {}, state, { fetchDataError: action.payload } )

		default:
			return state;

	};
};
