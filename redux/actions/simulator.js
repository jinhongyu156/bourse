import I18n from "i18n-js";
import Ws from "./../../javascripts/ws.js";
import { fetchPost, isObject, isArray, getNum, objectValueGetNum, dateFormat } from "./../../javascripts/util.js";

import { numberReg, passwordReg } from "./../../javascripts/regExp.js";

/* action type */
export const ACTIONS_SET_SIMULATOR_PRODUCTID = "ACTIONS_SET_SIMULATOR_PRODUCTID";
export const ACTIONS_SET_SIMULATOR_ALLDATA = "ACTIONS_SET_SIMULATOR_ALLDATA";
export const ACTIONS_SET_SIMULATOR_PARTDATA = "ACTIONS_SET_SIMULATOR_PARTDATA";
export const ACTIONS_SET_SIMULATOR_FETCHDATAERROR = "ACTIONS_SET_SIMULATOR_FETCHDATAERROR";

export const ACTION_SET_SIMULATOR_QUERYTYPEINDEX = "ACTION_SET_SIMULATOR_QUERYTYPEINDEX";
export const ACTION_SET_SIMULATOR_ISSHOWACTIONSHEET = "ACTION_SET_SIMULATOR_ISSHOWACTIONSHEET";
export const ACTION_SET_SIMULATOR_USERQUERYDATA = "ACTION_SET_SIMULATOR_USERQUERYDATA";

export const ACTIONS_SET_SIMULATOR_ISLOADING = "ACTIONS_SET_SIMULATOR_ISLOADING";


export const ACTION_SET_SIMULATOR_INPUTTEXT = "ACTION_SET_SIMULATOR_INPUTTEXT";
export const ACTION_SET_SIMULATOR_INPUTERROR = "ACTION_SET_SIMULATOR_INPUTERROR";
export const ACTION_SET_SIMULATOR_FETCHSUBMITERROR = "ACTION_SET_SIMULATOR_FETCHSUBMITERROR";
export const ACTION_SET_SIMULATOR_CLEAR = "ACTION_SET_SIMULATOR_CLEAR";
export const ACTION_SET_SIMULATOR_USABLE = "ACTION_SET_SIMULATOR_USABLE";
export let ws = null;

/* action create */

// 计算总价格
function getTotal( productId, tabIndex, count, float, unit )
{
	return ( productId === "BTC" ? getNum( String( count * ( float * unit ) / 20 ), 2 )
		: productId === "GOLD" ? getNum( String( count * ( float * unit ) / 100 ), 2 )
		: productId === "OIL" ? getNum( String( count * ( float * unit ) / 50 ), 2 )
		: "" ).concat( "USDT" );
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
export function getNewContractData( contractData, tabIndex )
{
	const newContractData = contractData.slice( 0 );

	for ( let i = newContractData.length - 1; i >= 0; i-- )
	{
		for ( let j = newContractData[ i ].feilv.length - 1; j >= 0; j-- )
		{
			const count = newContractData[ i ].feilv[ j ].count ? newContractData[ i ].feilv[ j ].count : "1"

			const msg = getMessage( newContractData[ i ].feilv[ j ].code, newContractData[ i ].name );

			const total = getTotal( newContractData[ i ].name, tabIndex, Number( count ), Number( newContractData[ i ].feilv[ j ][ "波动盈亏" ] ), newContractData[ i ].newprice );

			Object.assign( newContractData[ i ].feilv[ j ], { count, msg, total } );
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
		newUserOrderData[ i ][ "id" ] = newUserOrderData[ i ][ "id" ] ? newUserOrderData[ i ][ "id" ] : newUserOrderData[ i ][ "订单号" ];
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


// 设置 contractData, productId, currentProduct, userOrderData, masterOrderData, userDetailData, fetchDataError
function setAllData( contractData, productId, currentProduct, userOrderData, masterOrderData, userDetailData, fetchDataError )
{
	return { type: ACTIONS_SET_SIMULATOR_ALLDATA, payload: { contractData, productId, currentProduct, userOrderData, masterOrderData, userDetailData, fetchDataError } };
};

// 设置 contractData, currentProduct, masterOrderData, userOrderData
function setPartData( contractData, currentProduct, masterOrderData, userOrderData )
{
	return { type: ACTIONS_SET_SIMULATOR_PARTDATA, payload: ( userOrderData && masterOrderData ) ? { contractData, currentProduct, masterOrderData, userOrderData } : { contractData, currentProduct } };
};

// 设置是否正在加载
function setIsLoading( isLoading )
{
	return { type: ACTIONS_SET_SIMULATOR_ISLOADING, payload: isLoading };
};

// 设置 fetchDataError
function setFetchDataError( fetchDataError )
{
	return { type: ACTIONS_SET_SIMULATOR_FETCHDATAERROR, payload: fetchDataError };
};

// 设置提交错误属性 fetchSubmitError
function setFetchSubmitError( fetchSubmitError )
{
	return { type: ACTION_SET_SIMULATOR_FETCHSUBMITERROR, payload: fetchSubmitError };
};

// 设置可用数量和获取可用数量错误信息
function setUsable( usable, fetchUsableError )
{
	return { type: ACTION_SET_SIMULATOR_USABLE, payload: { usable, fetchUsableError } };
};

// 设置 userQueryData
function setUserQueryData( userQueryData, isLoadingUserQueryData, fetchUserQueryDataError )
{
	return { type: ACTION_SET_SIMULATOR_USERQUERYDATA, payload: { userQueryData, isLoadingUserQueryData, fetchUserQueryDataError } };
};

// 设置当前 product id
export function setProductId( productId )
{
	return function( dispatch, getState )
	{
		const { simulator } = getState();

		dispatch( { type: ACTIONS_SET_SIMULATOR_PRODUCTID, payload: { productId, currentProduct: getCurrentProduct( simulator.contractData, productId ) } } );
	};
};

// 用户写入数据, 更新 count, total
export function setCount( text, code )
{
	return function( dispatch, getState )
	{
		const { simulator } = getState();

		const newContractData = simulator.contractData.slice( 0 );;

		for ( let i = newContractData.length - 1; i >= 0; i-- )
		{
			const contractDataItem = newContractData[ i ];
			if( contractDataItem.name === simulator.productId )
			{
				for ( let j = contractDataItem.feilv.length - 1; j >= 0; j-- )
				{
					const currentProductItem = contractDataItem.feilv[ j ];
					if( currentProductItem.code === code )
					{
						const count = numberReg.test( text ) ? text : "1";
						const total = getTotal( contractDataItem.name, simulator.tabIndex, Number( count ), Number( currentProductItem[ "波动盈亏" ] ), contractDataItem.newprice );
						Object.assign( newContractData[ i ].feilv[ j ], { count, total } );
						break;
					};
				};
				break;
			};
		};

		const currentProduct = getCurrentProduct( newContractData, simulator.productId );

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
		closeWs()
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
					const { simulator } = getState();
					// 同步 contractData newprice 字段
					const contractData = simulator.contractData.map( item => res.includes( item.name ) ? Object.assign( {}, item, { newprice: Number( res.split( "," )[ 1 ] ) } ) : item );
					// 整理 contractData 数据
					const newContractData = getNewContractData( contractData, simulator.tabIndex );
					// 同步 userOrderData newprice 字段
					const newUserOrderData = getNewUserOrderData( simulator.userOrderData, contractData );
					// 同步 masterOrderData newprice 字段
					const newMasterOrderData = getNewUserOrderData( simulator.masterOrderData, contractData );
					// 获取 currentProduct 数据
					const currentProduct = getCurrentProduct( newContractData, simulator.productId );
					// 更新
					dispatch( setPartData( newContractData, currentProduct, newUserOrderData ) );
				};
			}
		} );
		ws.initWebSocket();
	};
};


// 请求合约页面数据
export function fetchSimulatorData()
{
	return async function( dispatch, getState )
	{
		const { simulator } = getState();
		dispatch( setIsLoading( true ) );
		Promise.all( [ fetchPost( "/new_heyue.php", { "提交": "返回登录参数", "交易区": "USDT" } ), fetchPost( "/user.php", { "提交": "获取高手订单" } ) ] ).then( res => {

			if( isObject( res[ 0 ] ) )
			{
				const contractData = ( res[ 0 ][ "biaojialist" ] && res[ 0 ][ "biaojialist" ][ "baojias" ] && isArray( res[ 0 ][ "biaojialist" ][ "baojias" ] ) && res[ 0 ][ "biaojialist" ][ "baojias" ].length ) ? res[ 0 ][ "biaojialist" ][ "baojias" ] : [];
			
				const userOrderData = isArray( res[ 0 ][ "用户模拟订单" ] ) ? res[ 0 ][ "用户模拟订单" ] : [];
				const masterOrderData =  ( isObject( res[ 1 ] ) && isArray( res[ 1 ][ "高手订单" ] ) ) ? res[ 1 ][ "高手订单" ] : [];
				
				const userDetailData = res[ 0 ][ "登录参数" ] ? objectValueGetNum( res[ 0 ][ "登录参数" ], [ "USDT", "SLBT", "交易金", "模拟USDT" ] ) : {};
				
				const productId = simulator.productId ? simulator.productId : ( contractData.length ? contractData[ 0 ].name : "" )
				
				const newContractData = getNewContractData( contractData, simulator.tabIndex );
				const newUserOrderData = getNewUserOrderData( userOrderData, contractData );
				const newMasterOrderData = getNewUserOrderData( masterOrderData, contractData );

				const currentProduct = getCurrentProduct( newContractData, productId );

				dispatch( setAllData( newContractData, productId, currentProduct, newUserOrderData, newMasterOrderData, userDetailData, null ) );
				dispatch( wsContract() );
				dispatch( setIsLoading( false ) );
			} else
			{
				dispatch( setFetchDataError( res ) );
				dispatch( setIsLoading( false ) );
			};

		} ).catch( err => {
			dispatch( setFetchDataError( err.type === "network" ? `${ err.status }: ${ I18n.t( "simulator.fetchSimulatorDataError" ) }` : err.err.toString() ) );
			dispatch( setIsLoading( false ) );
		} )
	};
};


// 请求购买
export function fetchSimulatorSubmit( params, callback )
{
	return async function( dispatch )
	{
		try
		{
			const res = await fetchPost( "/new_heyue.php", { "提交": "模拟下单购买", "产品代码": params.code, "购买数量": params.count, "产品方向": params.direction, "交易区": "USDT" } );
			if( res === "ok" )
			{
				dispatch( fetchSimulatorData() );
				callback( I18n.t( "simulator.fetchSimulatorSubmitSuccess" ) )
			} else
			{
				callback( res );
			};
		} catch( err )
		{
			callback( err.type === "network" ? `${ err.status }: ${ I18n.t( "simulator.fetchSimulatorSubmitError" ) }` : err.err.toString() );
		};
	};
};

// 请求平仓
export function fetchSimulatorClosing( params, callback )
{
	return async function( dispatch )
	{
		try
		{
			const res = await fetchPost( "/new_heyue.php", { "提交": "模拟平仓", "订单号": params.id, "交易区": "USDT" } );

			if( res === "ok" )
			{
				dispatch( fetchSimulatorData() );
				callback( I18n.t( "simulator.fetchSimulatorClosingSuccess" ) )
			} else
			{
				callback( res );
			};
		} catch( err )
		{
			callback( err.type === "network" ? `${ err.status }: ${ I18n.t( "simulator.fetchSimulatorClosingError" ) }` : err.err.toString() );
		};
	};
};

// 请求用户查询模拟流水数据
export function fetchSimulatorUserQueryData()
{
	return async function( dispatch, getState )
	{
		const { simulator } = getState();
		const params = { "提交": simulator.queryTypeIndex === 0 ? "模拟查询流水" : simulator.queryTypeIndex === 1 ? "模拟OTC交易": "" };

		dispatch( setUserQueryData( [], true, null ) );
		try
		{
			const res = await fetchPost( "/user.php", params );

			if( res && isArray( res ) )
			{
				dispatch( setUserQueryData( res, false, null ) );
			} else
			{
				dispatch( setUserQueryData( [], false, null ) );
			};
		} catch( err )
		{
			dispatch( setUserQueryData( [], false, err.type === "network" ? `${ err.status }: ${ I18n.t( "user.fetchUserQueryDataError" ) }` : err.err.toString() ) );
		};
	};
};

// 设置 queryTypeIndex
export function setSimulatorQueryTypeIndex( queryTypeIndex )
{
	return { type: ACTION_SET_SIMULATOR_QUERYTYPEINDEX, payload: queryTypeIndex }
};

//  打开 ActionSheet
export function showSimulatorActionSheet( actionSheetData )
{
	return { type: ACTION_SET_SIMULATOR_ISSHOWACTIONSHEET, payload: { isShowActionSheet: true, actionSheetData: actionSheetData } };
};

// 关闭 ActionSheet
export function hideSimulatorActionSheet()
{
	return { type: ACTION_SET_SIMULATOR_ISSHOWACTIONSHEET, payload: { isShowActionSheet: false, actionSheetData: {} } };
};

// 打开 queryTypeIndex 选择 ActionSheet
export function showSimulatorQueryTypeIndexActionSheet()
{
	return function( dispatch, getState )
	{
		const { simulator } = getState();

		dispatch( showSimulatorActionSheet( {
			title: I18n.t( "user.actionSheetTitle" ), cancelButtonIndex: 2, markButtonIndex: simulator.queryTypeIndex,
			options: [ I18n.t( "user.queryStatement" ), I18n.t( "user.otc" ), I18n.t( "user.cancel" ) ],
			onPress: function( index )
			{
				if( index !== 3 ) dispatch( setSimulatorQueryTypeIndex( index ) );
				dispatch( hideSimulatorActionSheet() );
				dispatch( fetchSimulatorUserQueryData() );
			}
		} ) );
	};
};
//////////////

// 清空数据
export function clear()
{
	return { type: ACTION_SET_SIMULATOR_CLEAR };
};

// 设置 input 文本
export function setInputText( key, value )
{
	return function( dispatch, getState )
	{
		const { simulator } = getState();

		dispatch( { type: ACTION_SET_SIMULATOR_INPUTTEXT, payload: { [ key ]: value } } );
		if( key === "number" )
		{
			dispatch( { type: ACTION_SET_SIMULATOR_INPUTERROR, payload: Object.assign( {}, simulator.inputError, { number: !numberReg.test( value ) } ) } );
		};
		if( key === "password" )
		{
			dispatch( { type: ACTION_SET_SIMULATOR_INPUTERROR, payload: Object.assign( {}, simulator.inputError, { password: !passwordReg.test( value ) } ) } );
		};
		if( key === "account" )
		{
			dispatch( { type: ACTION_SET_SIMULATOR_INPUTERROR, payload: Object.assign( {}, simulator.inputError, { account: !numberReg.test( value ) } ) } );
		};
	};
};

// 请求可用模拟数据
export function fetchUsable( coin, isSimulator )
{
	return async function( dispatch )
	{
		try
		{
			const res = await fetchPost( "/moni.php", { "提交": "获取模拟USDT" } );

			if( isObject( res ) && res[ coin ] )
			{
				dispatch( setUsable( res[ coin ], null ) );
			} else
			{
				dispatch( setUsable( "", res.toString() ) );
			};
		} catch( err )
		{

			dispatch( setUsable( "", err.type === "network" ? `${ err.status }: ${ I18n.t( "mention.fetchUsableError" ) }` : err.err.toString() ) );
		};
	};
};

// 请求模拟充币
export function fetchRechargeSubmit( callback )
{
	return async function( dispatch, getState )
	{
		const { simulator } = getState();
		if( ( Object.values( simulator.inputError ).every( item => item === false ) && simulator.number ) )
		{
			const params = { "提交": "模拟充币", "充币数量": simulator.number };
			try
			{
				const res = await fetchPost( "/moni.php", params );

				if( res === "ok" || res === "充值成功" )
				{
					callback();
				} else
				{
					dispatch( setFetchSubmitError( res ) );
				};
			} catch( err )
			{
				dispatch( setFetchSubmitError( err.type === "network" ? `${ err.status }: ${ I18n.t( "recharge.fetchSubmitError" ) }` : err.err.toString() ) );
			};
		} else
		{
			dispatch( setFetchSubmitError( I18n.t( "recharge.submitError" ) ) );
		};
	};
};

// 请求模拟提币
export function fetchMentionSubmit( callback )
{
	return async function( dispatch, getState )
	{
		const { simulator } = getState();

		if( Object.values( simulator.inputError ).every( item => item === false ) && simulator.usable && simulator.address && simulator.number && simulator.password )
		{
			if( Number( simulator.number ) < Number( simulator.usable ) )
			{
				const params = { "提交": "模拟提币", "提币数量": simulator.number, "提币地址": simulator.address, "资金密码": simulator.password };
				try
				{
					const res = await fetchPost( "/moni.php", params );

					if( res === "成功" || res === "提币成功" )
					{
						callback();
					} else
					{
						dispatch( setFetchSubmitError( res ) );
					};
				} catch( err )
				{

					dispatch( setFetchSubmitError( err.type === "network" ? `${ err.status }: ${ I18n.t( "mention.fetchSubmitError" ) }` : err.err.toString() ) );
				};
			} else
			{
				dispatch( setFetchSubmitError( I18n.t( "mention.submitError2" ) ) );
			};
		} else
		{
			dispatch( setFetchSubmitError( I18n.t( "mention.submitError1" ) ) );
		};
	};
};
