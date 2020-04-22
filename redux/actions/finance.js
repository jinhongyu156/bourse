import { ToastAndroid } from "react-native";
import Ws from "./../../javascripts/ws.js";
import { amountReg } from "./../../javascripts/regExp.js";
import { fetchPost, isObject, getNum } from "./../../javascripts/util.js";

import I18n from "i18n-js";

export const defaultModalData = { visible: false, title: "", text: "", inputError: null, fecthError: null, isloading: false, tip: "" };

/* action type */
export const ACTION_SET_FINANCE_TABINDEX = "ACTION_SET_FINANCE_TABINDEX";
export const ACTION_SET_FINANCE_STATEMENTDATA = "ACTION_SET_FINANCE_STATEMENTDATA";
export const ACTION_SET_FINANCE_ISLOADINGSTATEMENTDATA = "ACTION_SET_FINANCE_ISLOADINGSTATEMENTDATA";
export const ACTION_SET_FINANCE_FECTHSTATEMENTERROR = "ACTION_SET_FINANCE_FECTHSTATEMENTERROR";

export const ACTION_SET_FINANCE_USERDETAILDATA = "ACTION_SET_FINANCE_USERDETAILDATA";
export const ACTION_SET_FINANCE_ISLOADINGUSERDETAILDATA = "ACTION_SET_FINANCE_ISLOADINGUSERDETAILDATA";

export const ACTION_SET_FINANCE_MODALDATA = "ACTION_SET_FINANCE_MODALDATA";

export const ACTION_SET_FINANCE_NOTICEMESSAGE = "ACTION_SET_FINANCE_NOTICEMESSAGE";
/* action create */
// 设置当前选项卡 index
export function setTabIndex( tabIndex )
{
	return function( dispatch )
	{
		dispatch( { type: ACTION_SET_FINANCE_TABINDEX, payload: tabIndex } );
		dispatch( setStatementData( [], null ) );
		dispatch( fetchStatement() );
	};
};

// 设置用户流水信息
export function setStatementData( statementData, fecthStatementError )
{
	return { type: ACTION_SET_FINANCE_STATEMENTDATA, payload: { statementData, fecthStatementError } };
};

// 设置是否正在加载流水数据
export function setIsloadingStatementData( isloadingStatementData )
{
	return { type: ACTION_SET_FINANCE_ISLOADINGSTATEMENTDATA, payload: isloadingStatementData };
};

// 设置用户详细信息
function setUserDetailData( userDetailData )
{
	return { type: ACTION_SET_FINANCE_USERDETAILDATA, payload: userDetailData };
};

// 设置是否正在加载用户详细信息
function setIsloadingUserDetailData( isloadingUserDetailData )
{
	return { type: ACTION_SET_FINANCE_ISLOADINGUSERDETAILDATA, payload: isloadingUserDetailData };
};

// 兑换比例计算
function getTip( key, number, rate )
{
	return key === "USD兑换ETU" ? `${ number } USTD = ${ ( number / rate ).toFixed( 2 ) } ETUSD`
		: key === "积分兑USDT" ? `${ number } ${ I18n.t( "finance.exchange.point" ) } = ${ number } USDT`
		: key === "积分兑ETUSD" ? `${ number } ${ I18n.t( "finance.exchange.point" ) } = ${ ( number / rate ).toFixed( 3 ) } USDT`
		: ""
};

// 设置模态框输入文本
export function setModalText( text )
{
	return function( dispatch, getState )
	{
		const { finance } = getState();
		const payload = Object.assign( {}, finance.modalData, {
			text: text, inputError: !amountReg.test( text ),
			tip: getTip( finance.modalData.title, amountReg.test( text ) ? Number( text ) : 0, finance.userDetailData.rate )
		} );
		dispatch( { type: ACTION_SET_FINANCE_MODALDATA, payload: payload } );
	};
};

// 打开兑换模态框
export function showExchangeModal( title )
{
	return function( dispatch, getState )
	{
		const { finance } = getState();
		const payload = Object.assign( {}, defaultModalData, {
			title: title, visible: true, tip: getTip( title, 0, finance.userDetailData.rate )
		} );
		dispatch( { type: ACTION_SET_FINANCE_MODALDATA, payload: payload } );
	};
};

// 关闭兑换模态框
export function hideExchangeModal( submit, callback = function() {} )
{
	return async function( dispatch, getState )
	{
		const { finance } = getState();
		if( submit )
		{
			if( !finance.modalData.inputError && !finance.modalData.isloading )
			{
				try
				{
					dispatch( { type: ACTION_SET_FINANCE_MODALDATA, payload: Object.assign( {}, finance.modalData, { isloading: true } ) } );
					const res = await fetchPost( "/ETC.php", { "提交": finance.modalData.title, "兑换数量": finance.modalData.text } );
					console.log( "res", res );
					if( res === "兑换成功" )
					{
						dispatch( { type: ACTION_SET_FINANCE_MODALDATA, payload: defaultModalData } );
						callback();
					} else
					{
						dispatch( { type: ACTION_SET_FINANCE_MODALDATA, payload: Object.assign( {}, finance.modalData, { fecthError: res, isloading: false } ) } );
					};
				} catch( err )
				{
					console.log( "err", err );
					const payload = Object.assign( {}, finance.modalData, { fecthError: err.type === "network" ? `${ err.status }: ${ I18n.t( "finance.exchange.exchangeFailure" ) }` : err.toString(), isloading: false } )
					dispatch( { type: ACTION_SET_FINANCE_MODALDATA, payload: payload } );
				};
			} else
			{
				dispatch( { type: ACTION_SET_FINANCE_MODALDATA, payload: Object.assign( {}, finance.modalData, { fecthError: I18n.t( "finance.exchange.inputError" ) } ) } );
			};
		} else
		{
			dispatch( { type: ACTION_SET_FINANCE_MODALDATA, payload: defaultModalData } );
		};
	};
};

// 设置通知消息
export function setNoticeMessage( noticeMessage )
{
	return { type: ACTION_SET_FINANCE_NOTICEMESSAGE, payload: noticeMessage };
};

// 请求流水数据
export function fetchStatement()
{
	return async function( dispatch, getState )
	{
		const { finance } = getState();
		const params = { "提交": "获取明细", "交易区": finance.tabIndex === 0 ? "积分明细" : finance.tabIndex === 1 ? "ETUSD明细" : finance.tabIndex === 2 ? "USDT明细" : finance.tabIndex === 3 ? "交易金" : "" };
		try
		{
			dispatch( setIsloadingStatementData( true ) );
			const res = await fetchPost( "/ETC.php", params );

			if( isObject( res ) && res[ "明细报表" ] )
			{
				const dataArr = Object.values( res[ "明细报表" ] )[ 0 ].map( function( item, index )
				{
					item[ "流水金额" ] = getNum( item[ "流水金额" ], 2 );
					item[ "用户余额" ] = getNum( item[ "用户余额" ], 2 );
					return item;
				} );

				dispatch( setStatementData( dataArr, null ) );
				dispatch( setIsloadingStatementData( false ) );
			} else
			{
				dispatch( setStatementData( [], null ) );
				dispatch( setIsloadingStatementData( false ) );
			};

		} catch( err )
		{
			console.log( "err", err );
			dispatch( setStatementData( [], err.type === "network" ? `${ err.status }: 获取失败` : err.toString() ) );
			dispatch( setIsloadingStatementData( false ) );
		};

	};
};

// ws 通知
export function wsNotice()
{
	return async function( dispatch )
	{
		const ws = Ws.getInstance( "ws://tcp.slb.one:8308/", {
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
				dispatch( setNoticeMessage( res ) );
			}
		} );
		ws.initWebSocket();
	}
};

// 请求用户详细数据
export function fetchUserDetailData()
{
	return async function( dispatch )
	{
		const params = { "提交": "ETC参数获取", "交易区": "交易金明细" };
		try
		{
			dispatch( setIsloadingUserDetailData( true ) );
			const res = await fetchPost( "/ETC.php", params );
			if( isObject( res ) && res[ "用户信息" ] && res[ "USDCNH" ] )
			{
				const data = Object.assign( {}, res[ "用户信息" ], { rate: Number( res[ "USDCNH" ][ "baojia" ] ) } )
				dispatch( setUserDetailData( data ) );
				dispatch( setIsloadingUserDetailData( false ) );
			} else
			{
				dispatch( setUserDetailData( {} ) );
				dispatch( setIsloadingUserDetailData( false ) );
			};
		} catch( err )
		{
			console.log( "err", err );
			dispatch( setUserDetailData( {} ) );
			dispatch( setIsloadingUserDetailData( false ) );
		};

	};
};
