import Ws from "./../../javascripts/ws.js";

import { fetchPost, isObject, getNum } from "./../../javascripts/util.js";

/* action type */
export const ACTION_SET_FINANCE_TABINDEX = "ACTION_SET_FINANCE_TABINDEX";
export const ACTION_SET_FINANCE_STATEMENTDATA = "ACTION_SET_FINANCE_STATEMENTDATA";
export const ACTION_SET_FINANCE_ISLOADINGSTATEMENTDATA = "ACTION_SET_FINANCE_ISLOADINGSTATEMENTDATA";
export const ACTION_SET_FINANCE_FECTHSTATEMENTERROR = "ACTION_SET_FINANCE_FECTHSTATEMENTERROR";

export const ACTION_SET_FINANCE_USERDETAILDATA = "ACTION_SET_FINANCE_USERDETAILDATA";
export const ACTION_SET_FINANCE_ISLOADINGUSERDETAILDATA = "ACTION_SET_FINANCE_ISLOADINGUSERDETAILDATA";

export const ACTION_SET_FINANCE_MODALVISIBLE = "ACTION_SET_FINANCE_MODALVISIBLE";
export const ACTION_SET_FINANCE_MODALDATA = "ACTION_SET_FINANCE_MODALDATA";
export const ACTION_SET_FINANCE_MODALINPUTTEXT = "ACTION_SET_FINANCE_MODALINPUTTEXT";

export const ACTION_SET_FINANCE_NOTICEMESSAGE = "ACTION_SET_FINANCE_NOTICEMESSAGE";
/* action create */
// 设置当前选项卡 index
export function setTabIndex( tabIndex )
{
	return function( dispatch )
	{
		dispatch( { type: ACTION_SET_FINANCE_TABINDEX, payload: tabIndex } );
		dispatch( setStatementData( [] ) );
		dispatch( fetchStatement() );
	};
};

// 设置用户流水信息
export function setStatementData( statementData )
{
	return { type: ACTION_SET_FINANCE_STATEMENTDATA, payload: statementData };
};

// 设置是否正在加载流水数据
export function setIsloadingStatementData( isloadingStatementData )
{
	return { type: ACTION_SET_FINANCE_ISLOADINGSTATEMENTDATA, payload: isloadingStatementData };
};

// 设置加载流水数据是否存在错误
export function setFecthStatementError( fecthStatementError )
{
	return { type: ACTION_SET_FINANCE_FECTHSTATEMENTERROR, payload: fecthStatementError };
};

// 设置用户详细信息
export function setUserDetailData( userDetailData )
{
	return { type: ACTION_SET_FINANCE_USERDETAILDATA, payload: userDetailData };
};

// 设置是否正在加载用户详细信息
export function setIsloadingUserDetailData( isloadingUserDetailData )
{
	return { type: ACTION_SET_FINANCE_ISLOADINGUSERDETAILDATA, payload: isloadingUserDetailData };
};

// 兑换比例计算
function getTip( key, number, rate )
{
	console.log( "key, number, rate", key, number, rate );
	let tip = "";

	if( key === "USD兑换ETU" )
	{
		tip = `${ number } USTD = ${ ( number / rate ).toFixed( 2 ) } ETUSD`;
	};
	if( key === "积分兑USDT" )
	{
		tip = `${ number } 积分 = ${ number } USDT`;
	};
	if( key === "积分兑ETUSD" )
	{
		tip = `${ number } 积分 = ${ ( number / rate ).toFixed( 3 ) } USDT`;
	};
	return tip;
}

// 打开模态框
export function showModal()
{
	return { type: ACTION_SET_FINANCE_MODALVISIBLE, payload: true };
};

// 关闭模态框
export function hideModal()
{
	return { type: ACTION_SET_FINANCE_MODALVISIBLE, payload: false };
};

// 设置模态框数据
export function setModalData( modalData )
{
	return { type: ACTION_SET_FINANCE_MODALDATA, payload: modalData };
};

// 设置模态框输入文本
export function setModalText( text )
{
	return function( dispatch, getState )
	{
		const { finance } = getState();

		dispatch( setModalData( {
			title: finance.modalData.title,
			tip: getTip( finance.modalData.title, Number( text ), finance.userDetailData.rate )
		} ) );

		dispatch( { type: ACTION_SET_FINANCE_MODALINPUTTEXT, payload: text } );

	}
};

// 打开兑换模态框
export function showExchangeModal( title )
{
	return function( dispatch, getState )
	{
		const { finance } = getState();

		dispatch( setModalData( {
			title: title,
			tip: getTip( title, 0, finance.userDetailData.rate )
		} ) );

		dispatch( showModal() );
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

				dispatch( setStatementData( dataArr ) );
				dispatch( setFecthStatementError( null ) )
				dispatch( setIsloadingStatementData( false ) );
			} else
			{
				dispatch( setStatementData( [] ) );
				dispatch( setFecthStatementError( null ) )
				dispatch( setIsloadingStatementData( false ) );
			};

		} catch( err )
		{
			console.log( "err", err );
			dispatch( setStatementData( [] ) );
			dispatch( setIsloadingStatementData( false ) );
			dispatch( setFecthStatementError( err.type === "network" ? `${ err.status }: ${ I18n.t( "login.fetchLoginError" ) }` : err.toString() ) )
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
