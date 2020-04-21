import Ws from "./../../javascripts/ws.js";

import { fetchPost, isObject, getNum } from "./../../javascripts/util.js";

/* action type */
export const ACTION_SET_FINANCE_TABINDEX = "ACTION_SET_FINANCE_TABINDEX";
export const ACTION_SET_FINANCE_STATEMENTDATA = "ACTION_SET_FINANCE_STATEMENTDATA";
export const ACTION_SET_FINANCE_ISLOADING = "ACTION_SET_FINANCE_ISLOADING";
export const ACTION_SET_FINANCE_FECTHSTATEMENTERROR = "ACTION_SET_FINANCE_FECTHSTATEMENTERROR";

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

// 设置是否正在加载数据
export function setIsloading( isloading )
{
	return { type: ACTION_SET_FINANCE_ISLOADING, payload: isloading };
};

// 设置是否存在加载错误
export function setFecthStatementError( fecthStatementError )
{
	return { type: ACTION_SET_FINANCE_FECTHSTATEMENTERROR, payload: fecthStatementError };
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
			dispatch( setIsloading( true ) );
			const res = await fetchPost( "/ETC.php", params );

			if( isObject( res ) && res[ "明细报表" ] )
			{
				const dataArr = Object.values( res[ "明细报表" ] )[ 0 ].map( function( item, index )
				{
					item[ "流水金额" ] = getNum( item[ "流水金额" ], 2 );
					item[ "用户余额" ] = getNum( item[ "用户余额" ], 2 );
					return item;
				} );
				// const dataArr = [];
				dispatch( setStatementData( dataArr ) );
				dispatch( setFecthStatementError( null ) )
				dispatch( setIsloading( false ) );
			} else
			{
				dispatch( setStatementData( [] ) );
				dispatch( setFecthStatementError( null ) )
				dispatch( setIsloading( false ) );
			};

		} catch( err )
		{
			console.log( "err", err );
			dispatch( setStatementData( [] ) );
			dispatch( setIsloading( false ) );
			dispatch( setFecthStatementError( err.type === "network" ? `${ err.status }: ${ I18n.t( "login.fetchLoginError" ) }` : err.toString() ) )
		};

	};
};

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
