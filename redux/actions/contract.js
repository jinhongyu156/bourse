import Ws from "./../../javascripts/ws.js";
import { fetchPost, isObject, isArray, getNum } from "./../../javascripts/util.js";
import { numberReg } from "./../../javascripts/regExp.js";

import I18n from "i18n-js";
/* action type */
export const ACTIONS_SET_CONTRACT_TABINDEX = "ACTIONS_SET_CONTRACT_TABINDEX";
export const ACTIONS_SET_CONTRACT_PRODUCTID = "ACTIONS_SET_CONTRACT_PRODUCTID";
export const ACTIONS_SET_CONTRACT_ALLDATA = "ACTIONS_SET_CONTRACT_ALLDATA";
export const ACTIONS_SET_CONTRACT_CONTRACTDATA = "ACTIONS_SET_CONTRACT_CONTRACTDATA";
export const ACTIONS_SET_CONTRACT_FETCHDATAERROR = "ACTIONS_SET_CONTRACT_FETCHDATAERROR";
export const ACTIONS_SET_CONTRACT_CURRENTPRODUCT = "ACTIONS_SET_CONTRACT_CURRENTPRODUCT";
/* action create */

function getTotal( tabIndex, count, float, unit )
{
	const col30Message = tabIndex === "BTC" ? getNum( String( count * ( float * unit ) / 20 ), 2 )
		: tabIndex === "GOLD" ? getNum( String( count * ( float * unit ) / 100 ), 2 )
		: tabIndex === "OIL" ? getNum( String( count * ( float * unit ) / 50 ), 2 )
		: "";
};

// 整理 contractData
function getNewContractData( contractData )
{
	for ( let i = contractData.length - 1; i >= 0; i-- )
	{
		for ( let j = contractData[ i ].feilv.length - 1; j >= 0; j-- )
		{
			// getTotal(  )
			Object.assign( contractData[ i ].feilv[ j ], { unit: contractData[ i ].newprice, total: "", count: "1" } );
		};
	};

	return contractData;
};

// 获取当前产品数据
function getCurrentProduct( contractData, productId )
{
	return contractData.filter( item => item.name === productId )[ 0 ].feilv;
};

// 设置 contractData, productId, currentProduct, userOrderData, userDetailData, fetchDataError
function setData( contractData, productId, currentProduct, userOrderData, userDetailData, fetchDataError )
{
	return { type: ACTIONS_SET_CONTRACT_ALLDATA, payload: { contractData, productId, currentProduct, userOrderData, userDetailData, fetchDataError } };
};

// 设置 fetchDataError
function setFetchDataError( fetchDataError )
{
	return { type: ACTIONS_SET_CONTRACT_FETCHDATAERROR, payload: fetchDataError };
};

// 设置 currentProduct
function setCurrentProduct( currentProduct )
{
	return { type: ACTIONS_SET_CONTRACT_CURRENTPRODUCT, payload: currentProduct };
};

// 设置 contractData 和 currentProduct
function setContractData( contractData, currentProduct )
{
	return { type: ACTIONS_SET_CONTRACT_CONTRACTDATA, payload: { contractData, currentProduct } };
};

// 设置当前 tabIndex
export function setTabIndex( tabIndex )
{
	return function( dispatch, getState )
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

/*
	const col30Message = ( id === "BTC" ? getNum( String( count * ( float * price ) / 20 ), 2 )
		: id === "GOLD" ? getNum( String( count * ( float * price ) / 100 ), 2 )
		: id === "OIL" ? getNum( String( count * ( float * price ) / 50 ), 2 )
		: "" ).concat( index === 0 ? "USDT"
			: index === 1 ? I18n.t( "contract.trading" )
			: index === 2 ? "SLBT"
			: ""
		);
*/

// 用户写入数据
export function setCount( count, code )
{
	return function( dispatch, getState )
	{
		const { contract } = getState();
		console.log( "count", count )
		console.log( "code", code )
		// numberReg.test( text ) ? text : "1", code
		const currentProduct = contract.currentProduct.map( function( item )
		{
			console.log( item.code, ( code === item.code ), ( code === item.code ) ? Object.assign( {}, item, { count: count } ) : item );
			return ( code === item.code ) ? Object.assign( {}, item, { count: count } ) : item;
		} );
		console.log( "currentProduct", currentProduct )
		dispatch( setCurrentProduct( currentProduct ) );
	};
};

// 获取产品报价
function wsContract()
{
	return function( dispatch, getState )
	{
		const keys = [ "BTC", "GOLD", "OIL" ];

		const ws = new Ws( "ws://tcp.slb.one:9595/", {
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
					const newContractData = getNewContractData( contractData );
					// 获取 currentProduct 数据
					const currentProduct = getCurrentProduct( newContractData, contract.productId );
					// 更新
					dispatch( setContractData( newContractData, currentProduct ) );
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
		try
		{
			const res = await fetchPost( "/new_heyue.php", params );
			console.log( "res", res );
			if( isObject( res ) )
			{
				const contractData = ( res[ "biaojialist" ] && res[ "biaojialist" ][ "baojias" ] && isArray( res[ "biaojialist" ][ "baojias" ] ) && res[ "biaojialist" ][ "baojias" ].length ) ? res[ "biaojialist" ][ "baojias" ] : [];
				const userOrderData = isArray( res[ "用户订单" ] ) ? res[ "用户订单" ] : [];
				const userDetailData = res[ "登录参数" ] ? res[ "登录参数" ] : {};

				const newContractData = getNewContractData( contractData )
				const productId = contract.productId ? contract.productId : ( contractData.length ? contractData[ 0 ].name : "" )
				const currentProduct = getCurrentProduct( newContractData, productId );

				dispatch( setData( newContractData, productId, currentProduct, userOrderData, userDetailData, null ) );
				dispatch( wsContract() );
			} else
			{
				dispatch( setFetchDataError( res ) );
			};
		} catch( err )
		{
			console.log( "err", err.toString() );
			dispatch( setFetchDataError( err.type === "network" ? `${ err.status }: ${ I18n.t( "contract.fetchDataError" ) }` : err.err.toString() ) );
		};
	};
};

