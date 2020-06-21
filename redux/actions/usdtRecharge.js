import AsyncStorage from "@react-native-community/async-storage"; 
import I18n from "i18n-js";
import { fetchPost, isObject } from "./../../javascripts/util.js";
import { intReg } from "./../../javascripts/regExp.js";
/* action type */
export const ACTION_SET_USDTRECHARGE_ISSHOWPREVSTATE = "ACTION_SET_USDTRECHARGE_ISSHOWPREVSTATE";
export const ACTION_SET_USDTRECHARGE_ORDERDATA = "ACTION_SET_USDTRECHARGE_ORDERDATA";

export const ACTION_SET_USDTRECHARGE_INPUTTEXT = "ACTION_SET_USDTRECHARGE_INPUTTEXT";
export const ACTION_SET_USDTRECHARGE_INPUTERROR = "ACTION_SET_USDTRECHARGE_INPUTERROR";
export const ACTION_SET_USDTRECHARGE_ISSHOWACTIONSHEET  = "ACTION_SET_USDTRECHARGE_ISSHOWACTIONSHEET";

export const ACTION_SET_USDTRECHARGE_FETCHRECHARGESUBMIT = "ACTION_SET_USDTRECHARGE_FETCHRECHARGESUBMIT";
export const ACTION_SET_USDTRECHARGE_FETCHNOTICEPAID = "ACTION_SET_USDTRECHARGE_FETCHNOTICEPAID";
/* action create */

let timer = null;

// 将付款信息合并到原数据中
function assign( orderData )
{
	const infoData = orderData[ "付款信息" ].split( "|" );
	orderData[ "accountTitle" ] = infoData[ 0 ];
	orderData[ "account" ] = infoData[ 1 ];
	orderData[ "bankName" ] = infoData[ 2 ];
	orderData[ "timeout" ] = orderData[ "超时时间" ] + "000";
	orderData[ "countdown" ] = parseInt( ( Number( orderData[ "超时时间" ] + "000" ) - Date.now() ) / 1000 ); 
	return orderData;
};

// 设置 orderData, fetchOrderDataLoading, fetchOrderDataError
function setOrderData( orderData, fetchOrderDataLoading, fetchOrderDataError )
{
	return { type: ACTION_SET_USDTRECHARGE_ORDERDATA, payload: { orderData, fetchOrderDataLoading, fetchOrderDataError } };
};

// 设置 fetchRechargeSubmitLoading, fetchRechargeSubmitError
function setFetchRechargeSubmit( fetchRechargeSubmitLoading, fetchRechargeSubmitError )
{
	return { type: ACTION_SET_USDTRECHARGE_FETCHRECHARGESUBMIT, payload: { fetchRechargeSubmitLoading, fetchRechargeSubmitError } };
};

// 设置 fetchNoticePaidLoading, fetchNoticePaidError
function setFetchNoticePaid( fetchNoticePaidLoading, fetchNoticePaidError )
{
	return { type: ACTION_SET_USDTRECHARGE_FETCHNOTICEPAID, payload: { fetchNoticePaidLoading, fetchNoticePaidError } };
};

// 设置是否显示上一个订单的状态
export function setIsShowPrevState( isShowPrevState, isInit = false )
{
	return async function( dispatch )
	{
		if( isInit )
		{
			try
			{
				const res = await fetchPost( "/Recharge.php", { "提交": "Getrecharge" } );
				if( res === "null" )
				{
					await AsyncStorage.setItem( "isShowPrevState", String( false ) );
					dispatch( { type: ACTION_SET_USDTRECHARGE_ISSHOWPREVSTATE, payload: false } );
				} else
				{
					await AsyncStorage.setItem( "isShowPrevState", String( true ) );
					dispatch( { type: ACTION_SET_USDTRECHARGE_ISSHOWPREVSTATE, payload: true } );
				};
			} catch( err )
			{
				await AsyncStorage.setItem( "isShowPrevState", String( false ) );
				dispatch( { type: ACTION_SET_USDTRECHARGE_ISSHOWPREVSTATE, payload: false } );
			};
		} else
		{
			await AsyncStorage.setItem( "isShowPrevState", String( isShowPrevState ) );
			dispatch( { type: ACTION_SET_USDTRECHARGE_ISSHOWPREVSTATE, payload: isShowPrevState } );
		};
	};
};

//  打开 ActionSheet
export function showActionSheet( actionSheetData )
{
	return { type: ACTION_SET_USDTRECHARGE_ISSHOWACTIONSHEET, payload: { isShowActionSheet: true, actionSheetData: actionSheetData } };
};

// 关闭 ActionSheet
export function hideActionSheet()
{
	return { type: ACTION_SET_USDTRECHARGE_ISSHOWACTIONSHEET, payload: { isShowActionSheet: false, actionSheetData: {} } };
};

// 充值方式 rechargeType ActionSheet
export function showRechargeTypeActionSheet()
{
	return function( dispatch )
	{
		dispatch( showActionSheet( {
			title: I18n.t( "usdtRecharge.rechargeTypeActionSheetTitle" ),
			message: I18n.t( "usdtRecharge.rechargeTypeActionSheetMessage" ),
			options: I18n.t( "usdtRecharge.rechargeTypeActionSheetOptions" ),
			cancelButtonIndex: 1,
			markButtonIndex: 0,
			onPress: function( index )
			{
				dispatch( { type: ACTION_SET_USDTRECHARGE_INPUTTEXT, payload: { "rechargeType": index } } );
				dispatch( hideActionSheet() );
			}
		} ) );
	};
};

// 设置 input 文本
export function setInputText( key, value )
{
	return function( dispatch, getState )
	{
		const { usdtRecharge } = getState();
		const { ctc } = getState();
		const usdtInfo = ( ctc.data[ 0 ] && ctc.data[ 0 ].data.filter( c => c.key === "USDT" )[ 0 ].unitRate ) ? Number( ctc.data[ 0 ].data.filter( c => c.key === "USDT" )[ 0 ].unitRate ) : 0;

		dispatch( { type: ACTION_SET_USDTRECHARGE_INPUTTEXT, payload: { [ key ]: value } } );

		if( key === "rechargeNumber" )
		{
			dispatch( { type: ACTION_SET_USDTRECHARGE_INPUTERROR, payload: Object.assign( {}, usdtRecharge.inputError, { [ key ]: !intReg.test( value ) } ) } );
		};
	};
};

// 付款倒计时 更改 orderData.countdown 字段
function startCountdown()
{
	return async function( dispatch, getState )
	{
		const { usdtRecharge } = getState();
		const overTimeStamp = Number( usdtRecharge.orderData.timeout );
		const run = function()
		{
			const nowTimeStamp = Date.now();
			if ( nowTimeStamp >= overTimeStamp )
			{
				clearInterval( timer );
				dispatch( setOrderData( Object.assign( {}, usdtRecharge.orderData, { countdown: 0 } ), false, null ) )
				dispatch( fetchOrderData() );
			} else
			{
				dispatch( setOrderData( Object.assign( {}, usdtRecharge.orderData, { countdown: parseInt( ( overTimeStamp - nowTimeStamp ) / 1000 ) } ), false, null ) );
			};
		};
		run();
		clearInterval( timer );
		timer = setInterval( run, 1000 );
	};
};

// 请求转币
export function fetchOrderData()
{
	return async function( dispatch )
	{
		dispatch( setOrderData( {}, true, null ) )
		try
		{
			const res = await fetchPost( "/Recharge.php", { "提交": "Getrecharge" } );

			console.log( "res111111111111", res );

			if( res === "null" )
			{
				dispatch( setOrderData( {}, false, null ) );
			} else
			{
				dispatch( setOrderData( assign( res ), false, null ) );
				console.log( "res22222222222", assign( res ) );

				if( ( res[ "订单状态" ] === "0" ) && ( Number( Date.now() ) < Number( assign( res )[ "timeout" ] ) ) )
				{
					setTimeout( () => dispatch( startCountdown() ), 3000 );
				};
			};
		} catch( err )
		{
			console.log( "err", err );
			dispatch( setOrderData( {}, false, err.type === "network" ? `${ err.status }: ${ I18n.t( "usdtRecharge.fetchOrderDataError" ) }` : err.err.toString() ) )
		};
	};
};

// 请求充值
export function fetchRechargeSubmit()
{
	return async function( dispatch, getState )
	{
		const { usdtRecharge } = getState();

		if ( usdtRecharge.rechargeNumber && Object.values( usdtRecharge.inputError ).every( item => item === false ) )
		{
			dispatch( setFetchRechargeSubmit( true, null ) );
			try
			{
				const res = await fetchPost( "/Recharge.php", { "充值数量": usdtRecharge.rechargeNumber, "提交": "Recharge" } );

				if( isObject( res ) )
				{
					if( res.code === 1 )
					{
						dispatch( fetchOrderData() );
						dispatch( setFetchRechargeSubmit( false, null ) );
						dispatch( setIsShowPrevState( true ) );
					} else
					{
						dispatch( setFetchRechargeSubmit( false, res.message ) );
					};
				} else
				{
					dispatch( setFetchRechargeSubmit( false, res.toString() ) );
				};
			} catch( err )
			{
				dispatch( setFetchRechargeSubmit( false, err.type === "network" ? `${ err.status }: ${ I18n.t( "usdtRecharge.fetchRechargeSubmitError" ) }` : err.err.toString() ) );
			};
		} else
		{
			dispatch( setFetchRechargeSubmit( false, I18n.t( "usdtRecharge.inputRechargeSubmitError" ) ) );
		};
	};
};

// 已支付请求
export function fetchNoticePaid()
{
	return async function( dispatch, getState )
	{
		const { usdtRecharge } = getState();
		const params = { "订单号": usdtRecharge.orderData[ "订单号" ], "姓名": usdtRecharge.drawee, "提交": "Payment" };

		if( usdtRecharge.drawee )
		{
			dispatch( setFetchNoticePaid( true, null ) );
			try
			{
				const res = await fetchPost( "/Recharge.php", params );

				if( isObject( res ) )
				{
					if( res.code === 1 )
					{
						dispatch( fetchOrderData() );
						dispatch( setFetchNoticePaid( false, null ) );
						clearInterval( timer );
					} else
					{
						dispatch( setFetchNoticePaid( false, res.message ) );
					};
				} else
				{
					dispatch( setFetchNoticePaid( false, res.toString() ) );
				};
			} catch( err )
			{
				dispatch( setFetchNoticePaid( false, err.type === "network" ? `${ err.status }: ${ I18n.t( "usdtRecharge.fetchNoticePaidError" ) }` : err.err.toString() ) );
			};
		} else
		{
			dispatch( setFetchNoticePaid( false, I18n.t( "usdtRecharge.inputNoticePaidError" ) ) );
		};
	};
};
