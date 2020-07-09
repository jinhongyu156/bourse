import {
	ACTIONS_SET_SIMULATOR_PRODUCTID, ACTIONS_SET_SIMULATOR_ALLDATA, ACTIONS_SET_SIMULATOR_PARTDATA, ACTIONS_SET_SIMULATOR_FETCHDATAERROR, ACTIONS_SET_SIMULATOR_ISLOADING, ACTION_SET_SIMULATOR_QUERYTYPEINDEX, ACTION_SET_SIMULATOR_ISSHOWACTIONSHEET, ACTION_SET_SIMULATOR_USERQUERYDATA,
	ACTION_SET_SIMULATOR_INPUTTEXT, ACTION_SET_SIMULATOR_INPUTERROR, ACTION_SET_SIMULATOR_FETCHSUBMITERROR, ACTION_SET_SIMULATOR_CLEAR, ACTION_SET_SIMULATOR_USABLE
} from "./../actions/simulator.js";

const defaultState = {
	usable: "",
	number: "",
	address: "",
	password: "",
	inputError: {},
	fetchUsableError: null,
	fetchSubmitError: null,

	queryTypeIndex: 0,									// 查询方式 0: 流水, 1: OTC
	isShowActionSheet: false,							// 是否打开 actionSheet
	actionSheetData: {},								// actionSheet 数据
	productId: "",										// 当前选中 product name
	fetchDataError: null,								// 请求数据存在的错误
	contractData: [],									// 合约数据
	isloading: false,									// 是否正在加载合约数据
	currentProduct: [],									// 当前产品的合约数据
	userOrderData: [],									// 用户订单数据
	userQueryData: [],									// 用户流水数据
	isLoadingUserQueryData: false,						// 是否正在加载用户流水数据
	fetchUserQueryDataError: null,						// 加载用户流水数据错误信息
	masterOrderData: [],								// 高手订单
	userDetailData: {}									// 用户详细数据
};

export default function( state = defaultState, action )
{
	switch( action.type )
	{
		case ACTIONS_SET_SIMULATOR_PRODUCTID:
			return Object.assign( {}, state, { productId: action.payload.productId, currentProduct: action.payload.currentProduct } );

		case ACTIONS_SET_SIMULATOR_ALLDATA:
			return Object.assign( {}, state, action.payload );

		case ACTIONS_SET_SIMULATOR_PARTDATA:
			return Object.assign( {}, state, action.payload );

		case ACTIONS_SET_SIMULATOR_FETCHDATAERROR:
			return Object.assign( {}, state, { fetchDataError: action.payload } );

		case ACTIONS_SET_SIMULATOR_ISLOADING:
			return Object.assign( {}, state, { isloading: action.payload } );

		case ACTION_SET_SIMULATOR_USERQUERYDATA:
			return Object.assign( {}, state, action.payload );

		case ACTION_SET_SIMULATOR_QUERYTYPEINDEX:
			return Object.assign( {}, state, { queryTypeIndex: action.payload } );

		case ACTION_SET_SIMULATOR_ISSHOWACTIONSHEET:
			return Object.assign( {}, state, { isShowActionSheet: action.payload.isShowActionSheet, actionSheetData: action.payload.actionSheetData } );

		case ACTION_SET_SIMULATOR_INPUTTEXT:
			return Object.assign( {}, state, action.payload );

		case ACTION_SET_SIMULATOR_INPUTERROR:
			return Object.assign( {}, state, { inputError: action.payload } );

		case ACTION_SET_SIMULATOR_FETCHSUBMITERROR:
			return Object.assign( {}, state, { fetchSubmitError: action.payload } );

		case ACTION_SET_SIMULATOR_CLEAR:
			return Object.assign( {}, state, { usable: "", number: "", address: "", password: "", inputError: {}, fetchUsableError: null, fetchSubmitError: null } );

		case ACTION_SET_SIMULATOR_USABLE:
			return Object.assign( {}, state, { usable: action.payload.usable, fetchUsableError: action.payload.fetchUsableError } );

		default:
			return state;

	};
};
