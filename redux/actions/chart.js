import { fetchPost, isObject, isArray, objectValueGetNum } from "./../../javascripts/util.js";
import { numberReg } from "./../../javascripts/regExp.js";
import I18n from "i18n-js";
/* action type */
export const ACTIONS_SET_CHART_HEADERDROPDOWNINDEX = "ACTIONS_SET_CHART_HEADERDROPDOWNINDEX";
export const ACTIONS_SET_CHART_ORDERPARAMSDROPDOWNINDEX = "ACTIONS_SET_CHART_ORDERPARAMSDROPDOWNINDEX";
export const ACTIONS_SET_CHART_ORDERPARAMSTABINDEX = "ACTIONS_SET_CHART_ORDERPARAMSTABINDEX";
export const ACTIONS_SET_CHART_USERORDERLISTTABINDEX = "ACTIONS_SET_CHART_USERORDERLISTTABINDEX";

export const ACTIONS_SET_CHART_ORDERLISTDATA = "ACTIONS_SET_CHART_ORDERLISTDATA";
export const ACTIONS_SET_CHART_USERDETAILDATA = "ACTIONS_SET_CHART_USERDETAILDATA";
export const ACTIONS_SET_CHART_USERORDERLISTDATA = "ACTIONS_SET_CHART_USERORDERLISTDATA";

export const ACTIONS_SET_CHART_INPUTTEXT = "ACTIONS_SET_CHART_INPUTTEXT";
export const ACTIONS_SET_CHART_INPUTERROR = "ACTIONS_SET_CHART_INPUTERROR";
export const ACTIONS_SET_CHART_CLEARINPUTTEXT = "ACTIONS_SET_CHART_CLEARINPUTTEXT";
export const ACTIONS_SET_CHART_KLINEDATA = "ACTIONS_SET_CHART_KLINEDATA";
/* action create */
// 设置 headerDropdownIndex
export function setHeaderDropdownIndex( headerDropdownIndex )
{
	return function( dispatch )
	{
		dispatch( { type: ACTIONS_SET_CHART_HEADERDROPDOWNINDEX, payload: headerDropdownIndex } );
		dispatch( fetchOrderList() );
		dispatch( fetchUserOrderListData() );
		dispatch( fetchKline() );
	};
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

// 设置 userOrderListTabIndex
export function setUserOrderListTabIndex( userOrderListTabIndex )
{
	return function( dispatch )
	{
		dispatch( { type: ACTIONS_SET_CHART_USERORDERLISTTABINDEX, payload: userOrderListTabIndex } );
		dispatch( fetchUserOrderListData() );
	};
};

// 设置 number, price, inputError
export function setInputText( key, value )
{
	return function( dispatch, getState )
	{
		const { chart } = getState();
		console.log( "key, value", key, value );
		dispatch( { type: ACTIONS_SET_CHART_INPUTTEXT, payload: { [ key ]: value } } );

		if( key === "number" )
		{
			dispatch( { type: ACTIONS_SET_CHART_INPUTERROR, payload: Object.assign( {}, chart.inputError, { "number": !numberReg.test( value ) } ) } );
		};

		if( key === "price" )
		{
			dispatch( { type: ACTIONS_SET_CHART_INPUTERROR, payload: Object.assign( {}, chart.inputError, { "price": !numberReg.test( value ) } ) } );
		};
	};
};

// 设置 orderListData, loadingOrderListData, fetchOrderListDataError
function setOrderListData( orderListData, loadingOrderListData, fetchOrderListDataError )
{
	return { type: ACTIONS_SET_CHART_ORDERLISTDATA, payload: { orderListData, loadingOrderListData, fetchOrderListDataError } };
};

// 设置 userDetailData
function setUserDetailData( userDetailData, fetchUserDetailDataError )
{
	return { type: ACTIONS_SET_CHART_USERDETAILDATA, payload: { userDetailData, fetchUserDetailDataError } };
};

// 设置 userOrderListData, loadingUserOrderListData, fetchUserOrderListDataError
function setUserOrderListData( userOrderListData, loadingUserOrderListData, fetchUserOrderListDataError )
{
	return { type: ACTIONS_SET_CHART_USERORDERLISTDATA, payload: { userOrderListData, loadingUserOrderListData, fetchUserOrderListDataError } };
};

// 设置 kLineData, loadingKLineData, fetchKLineDataError
function setKLineData( kLineData, loadingKLineData, fetchKLineDataError )
{
	return { type: ACTIONS_SET_CHART_KLINEDATA, payload: { kLineData, loadingKLineData, fetchKLineDataError } };
};

// 清楚 input 文本
function clearInputText()
{
	return { type: ACTIONS_SET_CHART_CLEARINPUTTEXT };
};

// 请求 orderList 数据
export function fetchOrderList()
{
	return async function( dispatch, getState )
	{
		const { chart } = getState();
		const params = { "提交": "Coin", "type": chart.headerDropdownIndex === 0 ? "ETUSD/USDT" : chart.headerDropdownIndex === 1 ? "SLBT/USDT" : "" };

		dispatch( setOrderListData( {}, true, null ) );
		try
		{
			const res = await fetchPost( "/Coin.php", params );
			console.log( "res", res );
			if( isObject( res ) )
			{
				res[ "buy" ].reverse();
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

// 请求 userDetailData
export function fetchUserDetailData()
{
	return async function( dispatch )
	{
		const params = { "提交": "返回登录参数" };
		try
		{
			const res = await fetchPost( "/user.php", params );
			console.log( "res", res );
			if( isObject( res ) )
			{
				const userData = objectValueGetNum( res, [ "ETUSD", "SLBT", "USDT", "交易金", "代金券", "投资ETUSD" ] );
				dispatch( setUserDetailData( userData, null ) );
			} else
			{
				dispatch( setUserDetailData( {}, res.toString() ) );
			};
		} catch( err )
		{
			console.log( "err", err );
			dispatch( setUserDetailData( {}, err.type === "network" ? `${ err.status }: ${ I18n.t( "chart.fetchUserDetailDataError" ) }` : err.err.toString() ) );
		};
	};
};

// 请求 userOrderListData
export function fetchUserOrderListData()
{
	return async function( dispatch, getState )
	{
		const { chart } = getState();
		const params = { "提交": "order_list", "state": String( chart.userOrderListTabIndex + 1 ), "产品名称": chart.headerDropdownIndex === 0 ? "ETUSD/USDT" : chart.headerDropdownIndex === 1 ? "SLBT/USDT" : "" };
		dispatch( setUserOrderListData( [], true, null ) );
		try
		{
			const res = await fetchPost( "/Coin.php", params );
			if( isArray( res ) )
			{
				dispatch( setUserOrderListData( res, false, null ) );
			} else
			{
				dispatch( setUserOrderListData( [], false, null ) );
			};
		} catch( err )
		{
			dispatch( setUserOrderListData( {}, false, err.type === "network" ? `${ err.status }: ${ I18n.t( "chart.fetchUserOrderListDataError" ) }` : err.err.toString() ) );
		};
	};
};

// 撤销委托
export function fetchCancelUserOrder( id, callback )
{
	return async function( dispatch, getState )
	{
		const params = { "提交": "Cancelorder", "order_id": id };
		try
		{
			const res = await fetchPost( "/Coin.php", params );

			if( res === "成功" )
			{
				callback( I18n.t( "chart.fetchCancelUserOrderSuccess" ) );
				dispatch( fetchUserOrderListData() );
			} else
			{
				callback( I18n.t( "chart.fetchCancelUserOrderError" ) );
			};
		} catch( err )
		{
			callback( err.type === "network" ? `${ err.status }: ${ I18n.t( "chart.fetchCancelUserOrderError" ) }` : err.err.toString() );
		};
	};
};

// 请求下单
export function fetchOrderSubmit( callback )
{
	return async function( dispatch, getState )
	{
		const { chart } = getState();

		const params = {
			"买卖方向": String( chart.orderParamsTabIndex ),
			"数量": String( chart.number ),
			"单价": String( chart.price ),
			"提交": chart.orderParamsTabIndex === 0 ? "Coin_sell" : chart.orderParamsTabIndex === 1 ? "Coin_buy" : "",
			"产品名称": chart.headerDropdownIndex === 0 ? "ETUSD/USDT" : chart.headerDropdownIndex === 1 ? "SLBT/USDT" : "",
			"限价市价": chart.orderParamsDropdownIndex === 0 ? "市价买入" : chart.orderParamsDropdownIndex === 1 ? "限价卖出" : ""
		};

		if( chart.number && chart.price && Object.values( chart.inputError ).every( item => item === false ) )
		{
			try
			{
				const res = await fetchPost( "/Coin.php", params );
				console.log( res );
				if( res === "ok" )
				{
					callback( I18n.t( "chart.fetchOrderSubmitSuccess" ) );
					dispatch( fetchUserOrderListData() );
					dispatch( clearInputText() );
				} else
				{
					callback( res );
				};
			} catch( err )
			{
				callback( err.type === "network" ? `${ err.status }: ${ I18n.t( "chart.fetchOrderSubmitError" ) }` : err.err.toString() );
			};
		} else
		{
			callback( I18n.t( "chart.fetchOrderSubmitInputError" ) );
		};
	};
};

// 获取 K 线数据
export function fetchKline()
{
	return async function( dispatch, getState )
	{
		const { chart } = getState();

		const params = { "提交": "kxian", "产品名称": chart.headerDropdownIndex === 0 ? "ETUSD/USDT" : chart.headerDropdownIndex === 1 ? "SLBT/USDT" : "" };

		dispatch( setKLineData( {}, true, null ) );
		try
		{
			const res = await fetchPost( "/Coin.php", params );

			if( isObject( res ) )
			{
				const arr = [];
				const length = Object.entries( res ).length;
				for ( let i = length - 1; i >= 0; i = parseInt( i - length / 5 ) )
				{
					arr.push( Object.entries( res )[ i ] );
				};
				arr.reverse();
				dispatch( setKLineData( arr, false, null ) );
			} else
			{
				dispatch( setKLineData( {}, false, res.toString() ) );
			};
		} catch( err )
		{
			dispatch( setKLineData( {}, err.type === "network" ? `${ err.status }: ${ I18n.t( "chart.fetchKLineDataError" ) }` : err.err.toString() ) );
		};
	};
};
