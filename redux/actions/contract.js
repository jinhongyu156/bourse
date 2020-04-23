import { fetchPost, isObject, isArray } from "./../../javascripts/util.js";
import I18n from "i18n-js";
/* action type */
export const ACTIONS_SET_CONTRACT_TABINDEX = "ACTIONS_SET_CONTRACT_TABINDEX";
export const ACTIONS_SET_CONTRACT_PRODUCTID = "ACTIONS_SET_CONTRACT_PRODUCTID";
export const ACTIONS_SET_CONTRACT_DATA = "ACTIONS_SET_CONTRACT_DATA";

/* action create */
// 设置当前 tabIndex
export function setTabIndex( tabIndex )
{
	return { type: ACTIONS_SET_CONTRACT_TABINDEX, payload: tabIndex };
};

// 设置当前 product id
export function setProductId( productId )
{
	return { type: ACTIONS_SET_CONTRACT_PRODUCTID, payload: productId };
};

// 设置合约页面数据
function setData( contractData, userOrderData, userDetailData, fetchDataError )
{
	return { type: ACTIONS_SET_CONTRACT_DATA, payload: { contractData, userOrderData, userDetailData, fetchDataError } };
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

				dispatch( setData( contractData, userOrderData, userDetailData, null ) );
				dispatch( setProductId( contractData.length ? contractData[ 0 ].name : "" ) )
			} else
			{
				dispatch( setData( [], [], {}, res ) );
			};
		} catch( err )
		{
			console.log( "err", err.toString() );
			dispatch( setData( [], [], {}, err.type === "network" ? `${ err.status }: ${ I18n.t( "contract.fetchDataError" ) }` : err.err.toString() ) );
		};
	};
};
