import {
	ACTIONS_SET_CHART_HEADERDROPDOWNINDEX, ACTIONS_SET_CHART_ORDERPARAMSDROPDOWNINDEX, ACTIONS_SET_CHART_ORDERPARAMSTABINDEX, ACTIONS_SET_CHART_USERORDERLISTTABINDEX, ACTIONS_SET_CHART_INPUTTEXT, ACTIONS_SET_CHART_INPUTERROR, ACTIONS_SET_CHART_CLEARINPUTTEXT,
	ACTIONS_SET_CHART_ORDERLISTDATA, ACTIONS_SET_CHART_USERDETAILDATA, ACTIONS_SET_CHART_USERORDERLISTDATA, ACTIONS_SET_CHART_KLINEDATA
} from "./../actions/chart.js";

const defaultState = {
	headerDropdownIndex: 0,									// 头部 dropdown 当前选中 0: "ETUSD/USDT"; 1: "SLBT/USDT"
	orderParamsDropdownIndex: 0,							// order(params) dropdown 当前选中 0: 市价买入; 1: 限价买入
	orderParamsTabIndex: 0,									// order(params) 0: 买入; 1: 卖出
	userOrderListTabIndex: 0,								// 用户委托 index, 0: 当前委托; 1: 历史委托
	orderListData: [],										// orderList 数据
	loadingOrderListData: false,							// 是否正在请求 orderList 数据
	fetchOrderListDataError: null,							// orderList 数据请求失败
	userDetailData: {},										// 用户详细信息
	fetchUserDetailDataError: null,							// 用户详细信息请求错误
	userOrderListData: {},									// 用户订单数据
	loadingUserOrderListData: false,						// 是否正在加载用户订单数据
	fetchUserOrderListDataError: null,						// 用户订单数据请求错误
	number: "",												// input 输入的数量
	price: "",												// input 输入的价格
	inputError: {},											// input 输入错误

	kLineData: {},											// k 线数据
	loadingKLineData: false,								// 是否正在加载 k 线数据
	fetchKLineDataError: null								// k 线数据请求失败
};

export default function( state = defaultState, action )
{
	switch( action.type )
	{
		case ACTIONS_SET_CHART_HEADERDROPDOWNINDEX:
			return Object.assign( {}, state, { headerDropdownIndex: action.payload } );

		case ACTIONS_SET_CHART_ORDERPARAMSDROPDOWNINDEX:
			return Object.assign( {}, state, { orderParamsDropdownIndex: action.payload } );

		case ACTIONS_SET_CHART_ORDERPARAMSTABINDEX:
			return Object.assign( {}, state, { orderParamsTabIndex: action.payload } );

		case ACTIONS_SET_CHART_USERORDERLISTTABINDEX:
			return Object.assign( {}, state, { userOrderListTabIndex: action.payload } );

		case ACTIONS_SET_CHART_ORDERLISTDATA:
			return Object.assign( {}, state, action.payload );

		case ACTIONS_SET_CHART_USERDETAILDATA:
			return Object.assign( {}, state, action.payload );

		case ACTIONS_SET_CHART_USERORDERLISTDATA:
			return Object.assign( {}, state, action.payload );

		case ACTIONS_SET_CHART_INPUTTEXT:
			return Object.assign( {}, state, action.payload );

		case ACTIONS_SET_CHART_INPUTERROR:
			return Object.assign( {}, state, { inputError: action.payload } );

		case ACTIONS_SET_CHART_CLEARINPUTTEXT:
			return Object.assign( {}, state, { number: "", price: "", inputError: {} } );

		case ACTIONS_SET_CHART_KLINEDATA:
			return Object.assign( {}, state, action.payload );

		default:
			return state;

	};
};