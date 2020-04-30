import { fetchPost, isObject, isArray, objectValueGetNum } from "./../../javascripts/util.js";
import { passwordReg } from "./../../javascripts/regExp.js";

import I18n from "i18n-js";
/* action type */
export const ACTION_SET_USER_TABINDEX1 = "ACTION_SET_USER_TABINDEX1";
export const ACTION_SET_USER_TABINDEX2 = "ACTION_SET_USER_TABINDEX2";

export const ACTION_SET_USER_USERDETAILDATA = "ACTION_SET_USER_USERDETAILDATA";

export const ACTION_SET_USER_MYCLIENTDATA = "ACTION_SET_USER_MYCLIENTDATA";

export const ACTION_SET_USER_INPUTTEXT = "ACTION_SET_USER_INPUTTEXT";
export const ACTION_SET_USER_INPUTERROR = "ACTION_SET_USER_INPUTERROR";
export const ACTION_SET_USER_ISLOADINGEDITPASSWORD = "ACTION_SET_USER_ISLOADINGEDITPASSWORD";
export const ACTION_SET_USER_FETCHEDITPASSWORDERROR = "ACTION_SET_USER_FETCHEDITPASSWORDERROR";
export const ACTION_SET_USER_CLEAREDITPASSWORD = "ACTION_SET_USER_CLEAREDITPASSWORD";
export const ACTION_SET_USER_QUERYNAVINDEX = "ACTION_SET_USER_QUERYNAVINDEX";
export const ACTION_SET_USER_QUERYTYPEINDEX = "ACTION_SET_USER_QUERYTYPEINDEX";
export const ACTION_SET_USER_ISSHOWACTIONSHEET = "ACTION_SET_USER_ISSHOWACTIONSHEET";
export const ACTION_SET_USER_USERQUERYDATA = "ACTION_SET_USER_USERQUERYDATA";
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

// 设置 isLoadingEditPassWord
function setIsLoadingEditPassWord( isLoadingEditPassWord )
{
	return { type: ACTION_SET_USER_ISLOADINGEDITPASSWORD, payload: isLoadingEditPassWord };
};

// 设置 fetchEditPassWordError
function setFetchEditPassWordError( fetchEditPassWordError )
{
	return { type: ACTION_SET_USER_FETCHEDITPASSWORDERROR, payload: fetchEditPassWordError };
};

// 清空修改密码区数据
export function clearEditPassWord()
{
	return { type: ACTION_SET_USER_CLEAREDITPASSWORD };
};

// 请求用户查询数据
function fetchUserQueryData()
{
	return async function( dispatch, getState )
	{
		const { user } = getState();
		const params = {
			"提交": user.queryTypeIndex === 0 ? "查询流水" : user.queryTypeIndex === 1 ? "OTC交易" : user.queryTypeIndex === 2 ? "C2C交易" : "",
			"流水类型": user.queryNavIndex === 0 ? "USDT" : user.queryNavIndex === 1 ? "ETUSD" : user.queryNavIndex === 2 ? "交易金" : user.queryNavIndex === 3 ? "SLBT" : user.queryNavIndex === 4 ? "代金券" : ""
		};
		dispatch( setUserQueryData( [], true, null ) );
		try
		{
			const res = await fetchPost( "/user.php", params );
			console.log( "res", res );
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

// 设置 userQueryData
function setUserQueryData( userQueryData, isLoadingUserQueryData, fetchUserQueryDataError )
{
	return { type: ACTION_SET_USER_USERQUERYDATA, payload: { userQueryData, isLoadingUserQueryData, fetchUserQueryDataError } };
};

// 设置 queryNavIndex
export function setQueryNavIndex( queryNavIndex )
{
	return function( dispatch )
	{
		dispatch( { type: ACTION_SET_USER_QUERYNAVINDEX, payload: queryNavIndex } );
		dispatch( fetchUserQueryData() );
	};
};

// 设置 queryTypeIndex
export function setQueryTypeIndex( queryTypeIndex )
{
	return { type: ACTION_SET_USER_QUERYTYPEINDEX, payload: queryTypeIndex }
};

//  打开 ActionSheet
export function showActionSheet( actionSheetData )
{
	return { type: ACTION_SET_USER_ISSHOWACTIONSHEET, payload: { isShowActionSheet: true, actionSheetData: actionSheetData } };
};

// 关闭 ActionSheet
export function hideActionSheet()
{
	return { type: ACTION_SET_USER_ISSHOWACTIONSHEET, payload: { isShowActionSheet: false, actionSheetData: {} } };
};

// 打开 queryTypeIndex 选择 ActionSheet
export function showQueryTypeIndexActionSheet()
{
	return function( dispatch, getState )
	{
		const { user } = getState();

		dispatch( showActionSheet( {
			title: I18n.t( "user.actionSheetTitle" ), cancelButtonIndex: 3, markButtonIndex: user.queryTypeIndex,
			options: [ I18n.t( "user.queryStatement" ), I18n.t( "user.otc" ), I18n.t( "user.c2c" ), I18n.t( "user.cancel" ) ],
			onPress: function( index )
			{
				if( index !== 3 ) dispatch( setQueryTypeIndex( index ) );
				dispatch( hideActionSheet() );
				dispatch( fetchUserQueryData() );
			}
		} ) );
	};
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

// 用户输入 设置 oldPassWord newPassWord confirmPassWord inputError
export function setInputText( key, value )
{
	return function( dispatch, getState )
	{
		const { user } = getState();
		dispatch( { type: ACTION_SET_USER_INPUTTEXT, payload: { [ key ]: value } } );

		if( key === "oldPassWord" || key === "newPassWord" )
		{
			dispatch( { type: ACTION_SET_USER_INPUTERROR, payload: Object.assign( {}, user.inputError, { [ key ]: !passwordReg.test( value ) } ) } );
		};
		if( key === "confirmPassWord" )
		{
			dispatch( { type: ACTION_SET_USER_INPUTERROR, payload: Object.assign( {}, user.inputError, { [ key ]: !( passwordReg.test( value ) && value === user.newPassWord ) } ) } );
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
			dispatch( setMyClientData( [], false, err.type === "network" ? `${ err.status }: ${ I18n.t( "user.fetchMyClientDataError" ) }` : err.err.toString() ) );
		};
	};
};

// 请求修改密码
function fetchEditPassword( callback )
{
	return async function( dispatch, getState )
	{
		const { user } = getState();
		if( user.oldPassWord && user.newPassWord && user.confirmPassWord && !user.isLoadingEditPassWord && Object.values( user.inputError ).every( item => item === false ) )
		{
			dispatch( setIsLoadingEditPassWord( true ) );
			try
			{
				const res = await fetchPost( "/user.php", { "提交": "原密码重置", "原密码": user.oldPassWord, "密码": user.newPassWord, "确认密码": user.confirmPassWord } );
				console.log( "res", res );
				if( res === "重置成功" )
				{
					callback();
					dispatch( clearEditPassWord() );
				} else
				{
					dispatch( setFetchEditPassWordError( res ) );
				};
				dispatch( setIsLoadingEditPassWord( false ) );
			} catch( err )
			{
				console.log( "err", err );
				dispatch( setFetchEditPassWordError( err.type === "network" ? `${ err.status }: ${ I18n.t( "user.fetchEditPassWordError" ) }` : err.err.toString() ) );
				dispatch( setIsLoadingEditPassWord( false ) );
			};
		} else
		{
			dispatch( setFetchEditPassWordError( I18n.t( "user.inputEditPassWordError" ) ) );
		};
	};
};

// 请求各 tab 数据
export function fetchTabData( ...args )
{
	return async function( dispatch, getState )
	{
		const { user } = getState();
		if( user.tabIndex1 === 0 && user.tabIndex2 === 0 )
		{
			dispatch( fetchMyClientData( ...args ) );
		};
		if( user.tabIndex1 === 0 && user.tabIndex2 === 2 )
		{
			dispatch( fetchEditPassword( ...args ) );
		};
		if( user.tabIndex1 === 0 && user.tabIndex2 === 3 )
		{
			dispatch( fetchUserQueryData( ...args ) );
		};
	};
};