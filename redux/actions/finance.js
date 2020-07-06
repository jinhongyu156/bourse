import { amountReg } from "./../../javascripts/regExp.js";
import { fetchPost, isObject, getNum, objectValueGetNum } from "./../../javascripts/util.js";

import I18n from "i18n-js";

export const defaultModalData = { visible: false, key: "", title: "", text: "", times: 0, inputError: null, fecthError: null, isloading: false, tip: "" };

/* action type */
export const ACTION_SET_FINANCE_VERSION = "ACTION_SET_FINANCE_VERSION";
export const ACTION_SET_FINANCE_TABINDEX = "ACTION_SET_FINANCE_TABINDEX";
export const ACTION_SET_FINANCE_STATEMENTDATA = "ACTION_SET_FINANCE_STATEMENTDATA";
export const ACTION_SET_FINANCE_ISLOADINGSTATEMENTDATA = "ACTION_SET_FINANCE_ISLOADINGSTATEMENTDATA";
export const ACTION_SET_FINANCE_FECTHSTATEMENTERROR = "ACTION_SET_FINANCE_FECTHSTATEMENTERROR";

export const ACTION_SET_FINANCE_USERDETAILDATA = "ACTION_SET_FINANCE_USERDETAILDATA";
export const ACTION_SET_FINANCE_ISLOADINGUSERDETAILDATA = "ACTION_SET_FINANCE_ISLOADINGUSERDETAILDATA";

export const ACTION_SET_FINANCE_MODALDATA = "ACTION_SET_FINANCE_MODALDATA";

/* action create */

// 设置用户流水信息
function setStatementData( statementData, fecthStatementError )
{
	return { type: ACTION_SET_FINANCE_STATEMENTDATA, payload: { statementData, fecthStatementError } };
};

// 设置是否正在加载流水数据
function setIsloadingStatementData( isloadingStatementData )
{
	return { type: ACTION_SET_FINANCE_ISLOADINGSTATEMENTDATA, payload: isloadingStatementData };
};

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
	return key === "USD兑换ETU" ? `${ number } USDT = ${ ( number / rate ).toFixed( 2 ) } ETUSD`
		: key === "积分兑USDT" ? `${ number } ${ I18n.t( "finance.exchange.point" ) } = ${ number } USDT`
		: key === "积分兑ETUSD" ? `${ number } ${ I18n.t( "finance.exchange.point" ) } = ${ ( number / rate ).toFixed( 3 ) } USDT`
		: key === "投资ETU金融" ? `${ I18n.t( "finance.header.tip" ) } \n ${ ( number * 300 / rate ).toFixed( 2 ) } ETUSD = ${ ( number * 300 ).toFixed( 2 ) } ${ I18n.t( "finance.header.trading" ) } + ${ ( number * 900 ).toFixed( 2 ) } ${ I18n.t( "finance.header.hashrate" ) }`
		: "";
};

// 翻译 title
function getTitle( key )
{
	return key === "USD兑换ETU" ? `USDT ${ I18n.t( "finance.exchange.exchangeText" ) } ETU`
		: key === "积分兑USDT" ? `${ I18n.t( "finance.exchange.potintExchange" ) } USDT`
		: key === "积分兑ETUSD" ? `${ I18n.t( "finance.exchange.potintExchange" ) } ETUSD`
		: key === "投资ETU金融" ? `${ I18n.t( "finance.header.investETU" ) }`
		: "";
};

// 设置模态框输入文本
export function setModalText( text )
{
	return function( dispatch, getState )
	{
		const { finance } = getState();
		const payload = Object.assign( {}, finance.modalData, {
			text: text, inputError: !amountReg.test( text ),
			tip: getTip( finance.modalData.key, amountReg.test( text ) ? Number( text ) : 0, finance.userDetailData.rate )
		} );
		dispatch( { type: ACTION_SET_FINANCE_MODALDATA, payload: payload } );
	};
};

// 打开兑换模态框
export function showExchangeModal( key )
{
	return function( dispatch, getState )
	{
		const { finance } = getState();
		const payload = Object.assign( {}, defaultModalData, {
			key: key, title: getTitle( key ), visible: true, times: key === "投资ETU金融" ? 300 : 0, tip: getTip( key, 0, finance.userDetailData.rate )
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
					const res = await fetchPost( "/ETC.php", { "提交": finance.modalData.key, "兑换数量": finance.modalData.text } );
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
					const payload = Object.assign( {}, finance.modalData, { fecthError: err.type === "network" ? `${ err.status }: ${ I18n.t( "finance.exchange.exchangeFailure" ) }` : err.err.toString(), isloading: false } )
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
			dispatch( setStatementData( [], err.type === "network" ? `${ err.status }: ${ I18n.t( "finance.statement.fetchStatementError" ) }` : err.err.toString() ) );
			dispatch( setIsloadingStatementData( false ) );
		};
		
	};
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
				const userData = objectValueGetNum( res[ "用户信息" ], [ "USDT", "ETUSD", "SLBT", "交易金", "今日收益", "团队业绩", "总计收益", "昨日收益", "机器算力", "积分余额" ] )
				const data = Object.assign( {}, userData, { rate: Number( res[ "USDCNH" ][ "baojia" ] ) } )
				dispatch( setUserDetailData( data ) );
				dispatch( setIsloadingUserDetailData( false ) );
			} else
			{
				dispatch( setUserDetailData( {} ) );
				dispatch( setIsloadingUserDetailData( false ) );
			};
		} catch( err )
		{
			dispatch( setUserDetailData( {} ) );
			dispatch( setIsloadingUserDetailData( false ) );
		};
	};
};

// 请求领取收益
export function fetchGetBenefits( callback )
{
	return async function( dispatch )
	{
		const params = { "提交": "领取收益" };
		try
		{
			const res = await fetchPost( "/ETC.php", params );
			callback( res.toString() );
		} catch( err )
		{
			callback( err.type === "network" ? `${ err.status }: ${ I18n.t( "finance.header.fetchGetBenefitsError" ) }` : err.err.toString() );
		};
	};
};

// 获取版本
export function getVersion()
{
	return async function( dispatch )
	{
		const res = await fetchPost( "/version.php", {} );
		dispatch( { type: ACTION_SET_FINANCE_VERSION, payload: res } );
	};
};