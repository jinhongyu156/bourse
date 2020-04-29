import { fetchPost, isObject, isArray, objectValueGetNum } from "./../../javascripts/util.js";

import I18n from "i18n-js";
/* action type */
export const ACTION_SET_USER_TABINDEX1 = "ACTION_SET_USER_TABINDEX1";
export const ACTION_SET_USER_TABINDEX2 = "ACTION_SET_USER_TABINDEX2";

export const ACTION_SET_USER_USERDETAILDATA = "ACTION_SET_USER_USERDETAILDATA";

export const ACTION_SET_USER_MYCLIENTDATA = "ACTION_SET_USER_MYCLIENTDATA";
/* action create */

// 设置 tabIndex1
export function setTabIndex1( tabIndex1 )
{
	return function( dispatch )
	{
		dispatch( { type: ACTION_SET_USER_TABINDEX1, payload: tabIndex1 } );
		dispatch( { type: ACTION_SET_USER_TABINDEX2, payload: 0 } );
	};
};

// 设置 tabIndex2
export function setTabIndex2( tabIndex2 )
{
	return { type: ACTION_SET_USER_TABINDEX2, payload: tabIndex2 };
};

// 设置 userDetailData
function setUserDetailData( userDetailData, fetchUserDetailDataError )
{
	return { type: ACTION_SET_USER_USERDETAILDATA, payload: { userDetailData, fetchUserDetailDataError } };
};

// 设置 myClientData
function setMyClientData( myClientData, isLoadingMyClientData, fetchMyClientDataError )
{
	return { type: ACTION_SET_USER_MYCLIENTDATA, payload: { myClientData, isLoadingMyClientData, fetchMyClientDataError } };
};

// 请求 userDetailData
export function fetchUserDetailData()
{
	return async function( dispatch )
	{
		const params = { "提交": "返回登录参数" };
		try
		{
			const res = await fetchPost( "/user.php", params );
			console.log( "res", res );
			if( isObject( res ) )
			{
				const userData = objectValueGetNum( res, [ "ETUSD", "SLBT", "USDT", "交易金", "代金券", "投资ETUSD" ] );
				dispatch( setUserDetailData( userData, null ) );
			} else
			{
				dispatch( setUserDetailData( {}, res.toString() ) );
			};
		} catch( err )
		{
			console.log( "err", err );
			dispatch( setUserDetailData( {}, err.type === "network" ? `${ err.status }: ${ I18n.t( "user.fetchUserDetailDataError" ) }` : err.err.toString() ) );
		};
	};
};

// 请求 myClientData
function fetchMyClientData( id, belongId )
{
	return async function( dispatch )
	{
		const params = { "提交": "查询下级用户信息", "推荐人id": id, "上级id": belongId, "查询状态": "向下" };
		dispatch( setMyClientData( [], true, null ) );
		try
		{
			const res = await fetchPost( "/user.php", params );
			console.log( "res", res );
			if( res && isArray( res ) )
			{
				const arr = res.map( item => objectValueGetNum( item, [ "SLBT", "USDT", "交易金" ] ) );
				dispatch( setMyClientData( arr, false, null ) );
			} else
			{
				dispatch( setMyClientData( [], false, null ) );
			};
		} catch( err )
		{
			console.log( "err", err );
			dispatch( setMyClientData( [], false, err.type === "network" ? `${ err.status }: 获取与是啊比` : err.err.toString() ) );
		};
	};
};

export function fetchTabData( ...args )
{
	return async function( dispatch, getState )
	{
		const { user } = getState();
		if( user.tabIndex1 === 0 && user.tabIndex2 === 0 )
		{
			dispatch( fetchMyClientData( ...args ) );
		};
	};
};