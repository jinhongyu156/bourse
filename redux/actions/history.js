import I18n from "i18n-js";
import Toast from "react-native-root-toast";

import { fetchPost, isArray } from "./../../javascripts/util.js";

export const ACTION_SET_HISTORY_HISTORYTYPE = "ACTION_SET_HISTORY_HISTORYTYPE";
export const ACTION_SET_HISTORY_HISTORYDATA = "ACTION_SET_HISTORY_HISTORYDATA";
export const ACTION_SET_HISTORY_FETCHSUBMIT = "ACTION_SET_HISTORY_FETCHSUBMIT"

// 设置 fetchSubmitLoading, fetchSubmitError
function setFetchSubmit( fetchSubmitLoading )
{
	return { type: ACTION_SET_HISTORY_FETCHSUBMIT, payload: { fetchSubmitLoading } }
};

// 设置 historyData, fetchHistoryDataLoading, fetchHistoryDataError
function setHistoryData( historyData, fetchHistoryDataLoading, fetchHistoryDataError )
{
	return { type: ACTION_SET_HISTORY_HISTORYDATA, payload: { historyData, fetchHistoryDataLoading, fetchHistoryDataError } }
};

// 切换登录方式
export function setHistoryType( historyType )
{
	return function( dispatch )
	{
		dispatch( { type: ACTION_SET_HISTORY_HISTORYTYPE, payload: historyType } );
		dispatch( fetchHistoryData() );
	};
};

// 请求历史记录
export function fetchHistoryData()
{
	return async function( dispatch, getState )
	{
		const { history } = getState();
		try
		{
			dispatch( setHistoryData( [], true, null ) );
			const res = await fetchPost( "/Recharge.php", { "提交": "Ctfunds", "status": history.historyType === 0 ? "充值" : history.historyType === 1 ? "提现" : "" } );

			if( isArray( res ) )
			{
				dispatch( setHistoryData( res, false, null ) );
			} else
			{
				dispatch( setHistoryData( [], false, I18n.t( "history.noDataText" ) ) );
			};

		} catch( err )
		{
			dispatch( setHistoryData( [], false, err.type === "network" ? `${ err.status }: ${ I18n.t( "history.fetchHistoryDataError" ) }` : err.err.toString() ) );
		};
	};
};

// 请求提交放币
export function fetchSubmit( params )
{
	return async function( dispatch, getState )
	{
		const { history } = getState();
		try
		{
			dispatch( setFetchSubmit( true ) );
			const res = await fetchPost( "/Recharge.php", { "提交": "BindCoin", "orderid": params } );
			dispatch( setFetchSubmit( false ) );
			dispatch( fetchHistoryData() );
			Toast.show( res );
		} catch( err )
		{
			Toast.show( err.type === "network" ? `${ err.status }: ${ I18n.t( "history.fetchSubmitError" ) }` : err.err.toString() );
		};
	};
};