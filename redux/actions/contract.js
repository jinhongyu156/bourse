import Ws from "./../../javascripts/ws.js";
import { fetchPost, isObject, isArray, getNum, objectValueGetNum, dateFormat } from "./../../javascripts/util.js";
import { numberReg } from "./../../javascripts/regExp.js";

import I18n from "i18n-js";
/* action type */
export const ACTIONS_SET_CONTRACT_TABINDEX = "ACTIONS_SET_CONTRACT_TABINDEX";
export const ACTIONS_SET_CONTRACT_PRODUCTID = "ACTIONS_SET_CONTRACT_PRODUCTID";
export const ACTIONS_SET_CONTRACT_ALLDATA = "ACTIONS_SET_CONTRACT_ALLDATA";
export const ACTIONS_SET_CONTRACT_PARTDATA = "ACTIONS_SET_CONTRACT_PARTDATA";
export const ACTIONS_SET_CONTRACT_FETCHDATAERROR = "ACTIONS_SET_CONTRACT_FETCHDATAERROR";

export const ACTIONS_SET_CONTRACT_ISLOADING = "ACTIONS_SET_CONTRACT_ISLOADING";
/* action create */

export let ws = null;

// 计算总价格
function getTotal( productId, tabIndex, count, float, unit )
{
	return ( productId === "BTC" ? getNum( String( count * ( float * unit ) / 20 ), 2 )
		: productId === "GOLD" ? getNum( String( count * ( float * unit ) / 100 ), 2 )
		: productId === "OIL" ? getNum( String( count * ( float * unit ) / 50 ), 2 )
		: "" ).concat( tabIndex === 0 ? "USDT"
			: tabIndex === 1 ? I18n.t( "contract.trading" )
			: tabIndex === 2 ? "SLBT"
			: "" );
};

// 获取中文注释
export function getMessage( code, productId )
{
	return code.replace( productId, productId === "BTC" ? I18n.t( "contract.btc" )
		: productId === "GOLD" ? I18n.t( "contract.gold" )
		: productId === "OIL" ? I18n.t( "contract.oil" )
		: ""
	);
};

// 整理 contractData 将新属性 count, msg, total 放入其中
export function getNewContractData( contractData, userDetailData, productId, tabIndex )
{
	const newContractData = contractData.slice( 0 );

	for ( let i = newContractData.length - 1; i >= 0; i-- )
	{
		const newprice = newContractData[ i ].newprice;

		for ( let j = newContractData[ i ].feilv.length - 1; j >= 0; j-- )
		{
			const fee = 1 * newprice * newContractData[ i ].feilv[ j ][ "波动盈亏" ] * ( productId === "BTC" ? 0.002 : productId === "GOLD" ? 0.001 : productId === "OIL" ? 0.0015 : 0 );
			// 算法: ( 交易金 * 0.002 ) / 1 笔的手续费 = 直接填写

			const n = Math.ceil( ( userDetailData[ tabIndex === 0 ? "USDT" : tabIndex === 1 ? "交易金" : tabIndex === 2 ? "SLBT" : "USDT" ] * 0.002 ) / fee );

			const initCount = tabIndex === 1 ? String( n <= 1 ? 1 : n ) : "1";

			const count = newContractData[ i ].feilv[ j ].count ? newContractData[ i ].feilv[ j ].count : initCount;

			const msg = getMessage( newContractData[ i ].feilv[ j ].code, newContractData[ i ].name );

			const total = getTotal( newContractData[ i ].name, tabIndex, Number( count ), Number( newContractData[ i ].feilv[ j ][ "波动盈亏" ] ), newContractData[ i ].newprice );

			Object.assign( newContractData[ i ].feilv[ j ], { count, msg, total, mincount: initCount } );
		};
	};
	return newContractData;
};

// 整理 userOrderData 将新属性 newprice 放入其中( 新属性来自 contractData ), 并将某些字段保留 3 位小数
export function getNewUserOrderData( userOrderData, contractData )
{
	const newUserOrderData = userOrderData.slice( 0 );

	for ( let i = newUserOrderData.length - 1; i >= 0; i-- )
	{
		for ( let j = contractData.length - 1; j >= 0; j-- )
		{
			if( newUserOrderData[ i ][ "产品代码" ].includes( contractData[ j ].name ) )
			{
				newUserOrderData[ i ][ "newprice" ] = getNum( String( contractData[ j ].newprice ), 3 );
				break;
			};
		};
		newUserOrderData[ i ] = objectValueGetNum( newUserOrderData[ i ], [ "总金额", "购买数量", "总手续费", "波动盈亏", "建仓点数", "止损价", "止盈价" ], 3 );
		newUserOrderData[ i ][ "id" ] = newUserOrderData[ i ][ "订单号" ];
		newUserOrderData[ i ][ "time" ] = dateFormat( newUserOrderData[ i ][ "建仓时间" ] * 1000 );
		newUserOrderData[ i ][ "currentValue" ] = Number( newUserOrderData[ i ][ "newprice" ] ) * Number( newUserOrderData[ i ][ "购买数量" ] ) * Number( newUserOrderData[ i ][ "波动盈亏" ] );
		newUserOrderData[ i ][ "profit" ] = getNum( String( ( Number( newUserOrderData[ i ][ "产品方向" ] ) ? -1 : 1 ) * ( Number( newUserOrderData[ i ][ "newprice" ] ) - Number( newUserOrderData[ i ][ "建仓点数" ] ) ) * Number( newUserOrderData[ i ][ "波动盈亏" ] ) * Number( newUserOrderData[ i ][ "购买数量" ] ) ), 3 );
	};
	return newUserOrderData;
};

// 获取当前产品数据
export function getCurrentProduct( contractData, productId )
{
	let currentProduct = [];
	for ( let i = contractData.length - 1; i >= 0; i-- )
	{
		if( contractData[ i ].name === productId )
		{
			currentProduct = contractData[ i ].feilv;
			break;
		};
	};
	return currentProduct;
};

// 设置 contractData, productId, currentProduct, userOrderData, userDetailData, fetchDataError
function setAllData( contractData, productId, currentProduct, userOrderData, userDetailData, fetchDataError )
{
	return { type: ACTIONS_SET_CONTRACT_ALLDATA, payload: { contractData, productId, currentProduct, userOrderData, userDetailData, fetchDataError } };
};

// 设置 fetchDataError
function setFetchDataError( fetchDataError )
{
	return { type: ACTIONS_SET_CONTRACT_FETCHDATAERROR, payload: fetchDataError };
};

// 设置是否正在加载
function setIsLoading( isLoading )
{
	return { type: ACTIONS_SET_CONTRACT_ISLOADING, payload: isLoading };
};

// 设置 contractData 和 currentProduct
function setPartData( contractData, currentProduct, userOrderData )
{
	return { type: ACTIONS_SET_CONTRACT_PARTDATA, payload: userOrderData ? { contractData, currentProduct, userOrderData } : { contractData, currentProduct } };
};

// 设置当前 tabIndex
export function setTabIndex( tabIndex )
{
	return function( dispatch )
	{
		dispatch( { type: ACTIONS_SET_CONTRACT_TABINDEX, payload: tabIndex } );
		dispatch( fetchContractData() );
	};
};

// 设置当前 product id
export function setProductId( productId )
{
	return function( dispatch, getState )
	{
		const { contract } = getState();

		dispatch( { type: ACTIONS_SET_CONTRACT_PRODUCTID, payload: { productId, currentProduct: getCurrentProduct( contract.contractData, productId ) } } );
	};
};

// 用户写入数据, 更新 count, total
export function setCount( text, code )
{
	return function( dispatch, getState )
	{
		const { contract } = getState();

		const newContractData = contract.contractData.slice( 0 );;

		for ( let i = newContractData.length - 1; i >= 0; i-- )
		{
			const contractDataItem = newContractData[ i ];
			if( contractDataItem.name === contract.productId )
			{
				for ( let j = contractDataItem.feilv.length - 1; j >= 0; j-- )
				{
					const currentProductItem = contractDataItem.feilv[ j ];

					if( currentProductItem.code === code )
					{
						const count = numberReg.test( text ) ? ( Number( text ) >= Number( currentProductItem.mincount ) ? text : currentProductItem.mincount ) : `${ currentProductItem.mincount }`;
						const total = getTotal( contractDataItem.name, contract.tabIndex, Number( count ), Number( currentProductItem[ "波动盈亏" ] ), contractDataItem.newprice );
						Object.assign( newContractData[ i ].feilv[ j ], { count, total } );
						break;
					};
				};
				break;
			};
		};

		const currentProduct = getCurrentProduct( newContractData, contract.productId );

		dispatch( setPartData( newContractData, currentProduct ) );
	};
};

export function closeWs()
{
	if( ws ) {
		ws.close();
	}
};

// 获取 newprice 字段最新值
function wsContract()
{
	return function( dispatch, getState )
	{
		// if( ws ) return;

		const keys = [ "BTC", "GOLD", "OIL" ];

		closeWs();

		ws = new Ws( "ws://tcp.slb.one:80/", {
			heartCheck: function()
			{
				ws.sendMessage( "1" );
			},
			onopen: function()
			{
				ws.sendMessage( "1" );
			},
			onmessage: function( res )
			{
				const isNeed = keys.some( item => res.includes( item ) );
				if( isNeed )
				{
					const { contract } = getState();
					// 同步 contractData newprice 字段
					const contractData = contract.contractData.map( item => res.includes( item.name ) ? Object.assign( {}, item, { newprice: Number( res.split( "," )[ 1 ] ) } ) : item );
					// 整理 contractData 数据
					const newContractData = getNewContractData( contractData, contract.userDetailData, contract.productId, contract.tabIndex );
					// 同步 userOrderData newprice 字段
					const newUserOrderData = getNewUserOrderData( contract.userOrderData, contractData );
					// 获取 currentProduct 数据
					const currentProduct = getCurrentProduct( newContractData, contract.productId );
					// 更新
					dispatch( setPartData( newContractData, currentProduct, newUserOrderData ) );
				};
			}
		} );
		ws.initWebSocket();
	};
};

// 请求合约页面数据
export function fetchContractData()
{
	return async function( dispatch, getState )
	{
		const { contract } = getState();
		const params = { "提交": "返回登录参数", "交易区": contract.tabIndex === 0 ? "USDT" : contract.tabIndex === 1 ? "交易金" : contract.tabIndex === 2 ? "SLBT" : "" };
		dispatch( setIsLoading( true ) );
		try
		{
			const res = await fetchPost( "/new_heyue.php", params );

			if( isObject( res ) )
			{
				const contractData = ( res[ "biaojialist" ] && res[ "biaojialist" ][ "baojias" ] && isArray( res[ "biaojialist" ][ "baojias" ] ) && res[ "biaojialist" ][ "baojias" ].length ) ? res[ "biaojialist" ][ "baojias" ] : [];

				const userOrderData = isArray( res[ "用户订单" ] ) ? res[ "用户订单" ] : [];
				const userDetailData = res[ "登录参数" ] ? objectValueGetNum( res[ "登录参数" ], [ "USDT", "SLBT", "交易金" ] ) : {};

				const productId = contract.productId ? contract.productId : ( contractData.length ? contractData[ 0 ].name : "" )
				const newContractData = getNewContractData( contractData, userDetailData, productId, contract.tabIndex );
				const newUserOrderData = getNewUserOrderData( userOrderData, contractData );
				const currentProduct = getCurrentProduct( newContractData, productId );

				dispatch( setAllData( newContractData, productId, currentProduct, newUserOrderData, userDetailData, null ) );
				dispatch( wsContract() );
				dispatch( setIsLoading( false ) );

			} else
			{
				dispatch( setFetchDataError( res ) );
				dispatch( setIsLoading( false ) );
			};
		} catch( err )
		{
			dispatch( setIsLoading( false ) );
			dispatch( setFetchDataError( err.type === "network" ? `${ err.status }: ${ I18n.t( "contract.fetchDataError" ) }` : err.err.toString() ) );
		};
	};
};

// 请求购买
export function fetchSubmit( params, callback )
{
	return async function( dispatch, getState )
	{
		const { contract } = getState();
		try
		{
			const res = await fetchPost( "/new_heyue.php", { "提交": "下单购买", "产品代码": params.code, "购买数量": params.count, "产品方向": params.direction, "交易区": contract.tabIndex === 0 ? "USDT" : contract.tabIndex === 1 ? "交易金" : contract.tabIndex === 2 ? "SLBT" : "" } );
			if( res === "ok" )
			{
				dispatch( fetchContractData() );
				callback( I18n.t( "contract.submitSuccess" ) )
			} else
			{
				callback( res );
			};
		} catch( err )
		{
			callback( err.type === "network" ? `${ err.status }: ${ I18n.t( "contract.submitError" ) }` : err.err.toString() );
		};
	};
};

// 请求平仓
export function fetchClosing( params, callback )
{
	return async function( dispatch, getState )
	{
		const { contract } = getState();
		try
		{
			const res = await fetchPost( "/new_heyue.php", { "提交": "平仓", "订单号": params.id, "交易区": contract.tabIndex === 0 ? "USDT" : contract.tabIndex === 1 ? "交易金" : contract.tabIndex === 2 ? "SLBT" : "" } );
			if( res === "ok" )
			{
				dispatch( fetchContractData() );
				callback( I18n.t( "contract.fetchClosingSuccess" ) )
			} else
			{
				callback( res );
			};
		} catch( err )
		{
			callback( err.type === "network" ? `${ err.status }: ${ I18n.t( "contract.fetchClosingError" ) }` : err.err.toString() );
		};
	};
};
