import { fetchPost, isObject } from "./../../javascripts/util.js";

import I18n from "i18n-js";
/* action type */
export const ACTIONS_SET_CHART_HEADERDROPDOWNINDEX = "ACTIONS_SET_CHART_HEADERDROPDOWNINDEX";
export const ACTIONS_SET_CHART_ORDERPARAMSDROPDOWNINDEX = "ACTIONS_SET_CHART_ORDERPARAMSDROPDOWNINDEX";
export const ACTIONS_SET_CHART_ORDERPARAMSTABINDEX = "ACTIONS_SET_CHART_ORDERPARAMSTABINDEX";
export const ACTIONS_SET_CHART_ORDERLISTDATA = "ACTIONS_SET_CHART_ORDERLISTDATA";
/* action create */
// 设置 headerDropdownIndex
export function setHeaderDropdownIndex( headerDropdownIndex )
{
	return { type: ACTIONS_SET_CHART_HEADERDROPDOWNINDEX, payload: headerDropdownIndex };
};

// 设置 orderParamsDropdownIndex
export function setOrderParamsDropdownIndex( orderParamsDropdownIndex )
{
	return { type: ACTIONS_SET_CHART_ORDERPARAMSDROPDOWNINDEX, payload: orderParamsDropdownIndex };
};

// 设置 orderParamsTabIndex
export function setOrderParamsTabIndex( orderParamsTabIndex )
{
	return { type: ACTIONS_SET_CHART_ORDERPARAMSTABINDEX, payload: orderParamsTabIndex };
};

// 设置 orderListData, loadingOrderListData, fetchOrderListDataError
function setOrderListData( orderListData, loadingOrderListData, fetchOrderListDataError )
{
	return { type: ACTIONS_SET_CHART_ORDERLISTDATA, payload: { orderListData, loadingOrderListData, fetchOrderListDataError } };
};

// 请求 orderList 数据
export function fetchOrderList()
{
	return async function( dispatch, getState )
	{
		const { chart } = getState();
		const params = { "提交": "Coin", "type": chart.headerDropdownIndex === 0 ? "ETUSD/USDT" : chart.headerDropdownIndex === 1 ? "SLBT/USDT" : "" };
		console.log( "params", params );
		dispatch( setOrderListData( {}, true, null ) );
		try
		{
			const res = await fetchPost( "/Coin.php", params );

			console.log( "res", res );

			if( isObject( res ) )
			{
				dispatch( setOrderListData( res, false, null ) );
			} else
			{
				dispatch( setOrderListData( {}, false, null ) );
			};

		} catch( err )
		{
			console.log( "err", err );
			dispatch( setOrderListData( {}, false, err.type === "network" ? `${ err.status }: ${ I18n.t( "chart.fetchOrderListDataError" ) }` : err.err.toString() ) );
		};

	};
};
