import { ACTIONS_SET_CHART_HEADERDROPDOWNINDEX, ACTIONS_SET_CHART_ORDERPARAMSDROPDOWNINDEX, ACTIONS_SET_CHART_ORDERPARAMSTABINDEX, ACTIONS_SET_CHART_ORDERLISTDATA } from "./../actions/chart.js";

const defaultState = {
	headerDropdownIndex: 0,									// 头部 dropdown 当前选中 0: "ETUSD/USDT"; 1: "SLBT/USDT"
	orderParamsDropdownIndex: 0,							// order(params) dropdown 当前选中 0: 市价买入; 1: 限价买入
	orderParamsTabIndex: 0,									// order(params) 0: 买入; 1: 卖出
	orderListData: [],										// orderList 数据
	loadingOrderListData: false,							// 是否正在请求 orderList 数据
	fetchOrderListDataError: null							// orderList 数据请求失败
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

		case ACTIONS_SET_CHART_ORDERLISTDATA:
			return Object.assign( {}, state, action.payload );

		default:
			return state;

	};
};