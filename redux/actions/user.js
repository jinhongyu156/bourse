import { fetchPost, isObject, isArray, objectValueGetNum } from "./../../javascripts/util.js";
import { passwordReg, phoneNumberReg, phoneNumberReg1, emailTextReg } from "./../../javascripts/regExp.js";

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
export const ACTION_SET_USER_BINDACCOUNTTYPE = "ACTION_SET_USER_BINDACCOUNTTYPE";
export const ACTION_SET_USER_ISSHOWACTIONSHEET = "ACTION_SET_USER_ISSHOWACTIONSHEET";
export const ACTION_SET_USER_USERQUERYDATA = "ACTION_SET_USER_USERQUERYDATA";

export const ACTION_SET_USER_AUTHDATA = "ACTION_SET_USER_AUTHDATA";
export const ACTION_SET_USER_SUBACCOUNTSDATA = "ACTION_SET_USER_SUBACCOUNTSDATA";
export const ACTION_SET_USER_ISLOADINGBINDSUBACCOUNT = "ACTION_SET_USER_ISLOADINGBINDSUBACCOUNT";
export const ACTION_SET_USER_FETCHBINDSUBACCOUNTERROR = "ACTION_SET_USER_FETCHBINDSUBACCOUNTERROR";
export const ACTION_SET_USER_CLEARBINDSUBACCOUNT = "ACTION_SET_USER_CLEARBINDSUBACCOUNT";
export const ACTION_SET_USER_HOTKEYDATA = "ACTION_SET_USER_HOTKEYDATA";
export const ACTION_SET_USER_SUMMARIZEDATA = "ACTION_SET_USER_SUMMARIZEDATA";
export const ACTION_SET_USER_ELECTRONICCONTRACTDATA = "ACTION_SET_USER_ELECTRONICCONTRACTDATA";

export const ACTION_SET_USER_ACCOUNTDATA = "ACTION_SET_USER_ACCOUNTDATA";
export const ACTION_SET_USER_CLEARACCOUNTDATA = "ACTION_SET_USER_CLEARACCOUNTDATA";
export const ACTION_SET_USER_FETCHBINDACCOUNTERROR = "ACTION_SET_USER_FETCHBINDACCOUNTERROR";
/* action create */

import { logout } from "./login.js"

import { setSendCodeStatus, clearSendCodeError, clearTimer } from "./sendCode.js"

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

// 设置 fetchBindAccountError
function setFetchBindAccountError( fetchBindAccountError )
{
	return { type: ACTION_SET_USER_FETCHBINDACCOUNTERROR, payload: fetchBindAccountError };
};

// 设置 userQueryData
function setUserQueryData( userQueryData, isLoadingUserQueryData, fetchUserQueryDataError )
{
	return { type: ACTION_SET_USER_USERQUERYDATA, payload: { userQueryData, isLoadingUserQueryData, fetchUserQueryDataError } };
};

// 设置 subAccountsData
function setSubAccountsData( subAccountsData, isLoadingSubAccountsData, fetchSubAccountsError )
{
	return { type: ACTION_SET_USER_SUBACCOUNTSDATA, payload: { subAccountsData, isLoadingSubAccountsData, fetchSubAccountsError } };
};

// 设置 fetchAccountData
function setFetchAccountData( accountData )
{
	return { type: ACTION_SET_USER_ACCOUNTDATA, payload: accountData };
};

// 设置 isLoadingBindSubAccount
function setIsLoadingBindSubAccount( isLoadingBindSubAccount )
{
	return { type: ACTION_SET_USER_ISLOADINGBINDSUBACCOUNT, payload: isLoadingBindSubAccount };
};

// 设置 fetchBindSubAccountError
function setFetchBindSubAccountError( fetchBindSubAccountError )
{
	return { type: ACTION_SET_USER_FETCHBINDSUBACCOUNTERROR, payload: fetchBindSubAccountError };
};

// 设置 hotkeyData
function setHotkeyData( hotkeyData, isLoadingHotkeyData, fetchHotkeyDataError )
{
	return { type: ACTION_SET_USER_HOTKEYDATA, payload: { hotkeyData, isLoadingHotkeyData, fetchHotkeyDataError } };
};

// 设置 authData, fetchAuthDataError
function setAuthData( authData, fetchAuthDataError )
{
	return { type: ACTION_SET_USER_AUTHDATA, payload: { authData, fetchAuthDataError } };
};

// 设置 summarizeData
function setSummarizeData( summarizeData, isLoadingSummarizeData, fetchSummarizeDataError )
{
	return { type: ACTION_SET_USER_SUMMARIZEDATA, payload: { summarizeData, isLoadingSummarizeData, fetchSummarizeDataError } };
};

// 设置 electronicContractData
function setElectronicContractData( electronicContractData, fetchElectronicContractDataError )
{
	return { type: ACTION_SET_USER_ELECTRONICCONTRACTDATA, payload: { electronicContractData, fetchElectronicContractDataError } };
};

// 清空修改密码区数据
export function clearEditPassWord()
{
	return { type: ACTION_SET_USER_CLEAREDITPASSWORD };
};

// 清空绑定信息区数据
export function clearAccountData()
{
	return function( dispatch )
	{
		clearTimer();
		dispatch( clearSendCodeError() );
		dispatch( setSendCodeStatus( 0 ) );
		dispatch( { type: ACTION_SET_USER_CLEARACCOUNTDATA } );
	};
};

// 情况绑定子账户区的数据
export function clearBindSubAccount()
{
	return { type: ACTION_SET_USER_CLEARBINDSUBACCOUNT };
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

// 设置 bindAccountType
export function setBindAccountType( bindAccountType )
{
	return function( dispatch )
	{
		dispatch( { type: ACTION_SET_USER_BINDACCOUNTTYPE, payload: bindAccountType } );
		dispatch( clearAccountData() );
	};
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
			title: I18n.t( "user.actionSheetTitle" ), cancelButtonIndex: 2, markButtonIndex: user.queryTypeIndex,
			options: [ I18n.t( "user.queryStatement" ), I18n.t( "user.otc" ), I18n.t( "user.cancel" ) ],
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
export function fetchUserDetailData( callback = () => {} )
{
	return async function( dispatch )
	{
		const params = { "提交": "返回登录参数" };
		try
		{
			const res = await fetchPost( "/user.php", params );
			if( res === "load" )
			{
				dispatch( logout() );
				callback()
			};

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
			dispatch( setUserDetailData( {}, err.type === "network" ? `${ err.status }: ${ I18n.t( "user.fetchUserDetailDataError" ) }` : err.err.toString() ) );
		};
	};
};

// 用户输入 设置 oldPassWord newPassWord confirmPassWord accountPhoneText accountEmailText inputError
export function setInputText( key, value )
{
	return function( dispatch, getState )
	{
		const { user } = getState();
		dispatch( { type: ACTION_SET_USER_INPUTTEXT, payload: { [ key ]: value } } );

		if( key === "oldPassWord" || key === "newPassWord" || key === "subAccountPassWordText" )
		{
			dispatch( { type: ACTION_SET_USER_INPUTERROR, payload: Object.assign( {}, user.inputError, { [ key ]: !passwordReg.test( value ) } ) } );
		};
		if( key === "confirmPassWord" )
		{
			dispatch( { type: ACTION_SET_USER_INPUTERROR, payload: Object.assign( {}, user.inputError, { [ key ]: !( passwordReg.test( value ) && value === user.newPassWord ) } ) } );
		};
		if( key === "subAccountText" )
		{
			dispatch( { type: ACTION_SET_USER_INPUTERROR, payload: Object.assign( {}, user.inputError, { [ key ]: !phoneNumberReg.test( value ) } ) } );
		};
		if( key === "accountPhoneText" )
		{
			dispatch( { type: ACTION_SET_USER_INPUTERROR, payload: Object.assign( {}, user.inputError, { [ key ]: !phoneNumberReg1.test( value ) } ) } );
			dispatch( setSendCodeStatus( ( phoneNumberReg1.test( value ) ) ? 1 : 0 ) );
		};
		if( key === "accountEmailText" )
		{
			dispatch( { type: ACTION_SET_USER_INPUTERROR, payload: Object.assign( {}, user.inputError, { [ key ]: !emailTextReg.test( value ) } ) } );
			dispatch( setSendCodeStatus( ( emailTextReg.test( value ) ) ? 1 : 0 ) );
		}
	};
};

// 请求 myClientData
export function fetchMyClientData( id, belongId )
{
	return async function( dispatch )
	{
		const params = { "提交": "查询下级用户信息", "推荐人id": id, "上级id": belongId, "查询状态": "向下" };
		dispatch( setMyClientData( [], true, null ) );
		try
		{
			const res = await fetchPost( "/user.php", params );
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
			dispatch( setMyClientData( [], false, err.type === "network" ? `${ err.status }: ${ I18n.t( "user.fetchMyClientDataError" ) }` : err.err.toString() ) );
		};
	};
};

// 请求修改密码
export function fetchEditPassword( callback )
{
	return async function( dispatch, getState )
	{
		const { user } = getState();

		if( user.oldPassWord && user.newPassWord && user.confirmPassWord && !user.isLoadingEditPassWord && [ user.inputError[ "oldPassWord" ], user.inputError[ "newPassWord" ], user.inputError[ "confirmPassWord" ] ].every( item => item === false ) )
		{
			dispatch( setIsLoadingEditPassWord( true ) );
			try
			{
				const res = await fetchPost( "/user.php", { "提交": "原密码重置", "原密码": user.oldPassWord, "密码": user.newPassWord, "确认密码": user.confirmPassWord } );
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
				dispatch( setFetchEditPassWordError( err.type === "network" ? `${ err.status }: ${ I18n.t( "user.fetchEditPassWordError" ) }` : err.err.toString() ) );
				dispatch( setIsLoadingEditPassWord( false ) );
			};
		} else
		{
			dispatch( setFetchEditPassWordError( I18n.t( "user.inputEditPassWordError" ) ) );
		};
	};
};

// 请求绑定账号信息
export function fetchBindAccount( callback )
{
	return async function( dispatch, getState )
	{
		const { user } = getState();

		if( ( user.bindAccountType ? user.accountEmailText : user.accountPhoneText ) && user.accountCodeText && !user.inputError[ user.bindAccountType ? "accountEmailText" : "accountPhoneText" ] )
		{
			try
			{

				const res = await fetchPost( "/user.php", { "提交": "账户认证", "认证方式": user.bindAccountType ? "邮箱" : "手机", "电话": user.bindAccountType ? user.accountEmailText : user.accountPhoneText, "验证码": user.accountCodeText } );

				if( res === "ok" )
				{
					callback()
					dispatch( clearAccountData() );
					dispatch( fetchAccountData() );
				} else
				{
					dispatch( setFetchBindAccountError( res ) );
				};
			} catch( err )
			{
				dispatch( setFetchBindAccountError( err.type === "network" ? `${ err.status }: ${ I18n.t( "user.fetchBindAccountError" ) }` : err.err.toString() ) );
			};
		} else
		{
			dispatch( setFetchBindAccountError( I18n.t( "user.inputBindAccountError" ) ) );
		};
	};
};

// 请求绑定信息
export function fetchAccountData()
{
	return async function( dispatch )
	{
		const res = await fetchPost( "/user.php", { "提交": "认证信息" } );

		if( isObject( res ) )
		{
			dispatch( setFetchAccountData( res ) );
		} else
		{
			dispatch( setFetchAccountData( {} ) );
		};
	};
};

// 请求用户查询数据
export function fetchUserQueryData()
{
	return async function( dispatch, getState )
	{
		const { user } = getState();
		const params = {
			"提交": user.queryTypeIndex === 0 ? "查询流水" : user.queryTypeIndex === 1 ? "OTC交易" : "",
			"流水类型": user.queryNavIndex === 0 ? "USDT" : user.queryNavIndex === 1 ? "ETUSD" : user.queryNavIndex === 2 ? "交易金" : user.queryNavIndex === 3 ? "SLBT" : user.queryNavIndex === 4 ? "代金券" : ""
		};
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

// 请求子账户数据
export function fetchSubAccountsData()
{
	return async function( dispatch )
	{
		dispatch( setSubAccountsData( [], true, null ) );
		try
		{
			const res = await fetchPost( "/user.php", { "提交": "GetChildren" } );
			if( res && isArray( res ) )
			{
				dispatch( setSubAccountsData( res, false, null ) );
			} else
			{
				dispatch( setSubAccountsData( [], false, null ) );
			};
		} catch( err )
		{
			dispatch( setSubAccountsData( [], false, err.type === "network" ? `${ err.status }: ${ I18n.t( "user.fetchSubAccountsError" ) }` : err.err.toString() ) );
		};
	};
};

// 解绑子账户
export function fetchSubAccountsUnbind( id, callback )
{
	return async function( dispatch )
	{
		try
		{
			const res = await fetchPost( "/user.php", { "提交": "UnbindChildren", "id": id } );
			if( res === "解绑成功" )
			{
				callback( I18n.t( "user.fetchUnbindSuccess" ) );
				dispatch( fetchSubAccountsData() );
			} else
			{
				callback( res.toString() );
			};
		} catch( err )
		{
			callback( err.type === "network" ? `${ err.status }: ${ I18n.t( "user.fetchUnbindError" ) }` : err.err.toString() );
		};
	};
};

// 绑定子账户
export function fetchBindSubAccount( callback )
{
	return async function( dispatch, getState )
	{

		const { user } = getState();

		if( user.subAccountText && user.subAccountPassWordText && !user.isLoadingBindSubAccount && [ user.inputError[ "subAccountText" ], user.inputError[ "subAccountPassWordText" ] ].every( item => item === false ) )
		{
			dispatch( setIsLoadingBindSubAccount( true ) );
			try
			{
				const res = await fetchPost( "/user.php", { "提交": "BindChildren", "username": user.subAccountText, "password": user.subAccountPassWordText } );
				if( res === "绑定成功" )
				{
					callback();
					dispatch( clearBindSubAccount() );
					dispatch( fetchSubAccountsData() );
				} else
				{
					dispatch( setFetchBindSubAccountError( res ) );
				};
				dispatch( setIsLoadingBindSubAccount( false ) );
			} catch( err )
			{
				dispatch( setFetchBindSubAccountError( err.type === "network" ? `${ err.status }: ${ I18n.t( "user.fetchBindSubaccountError" ) }` : err.err.toString() ) );
				dispatch( setIsLoadingBindSubAccount( false ) );
			};
		} else
		{
			dispatch( setFetchBindSubAccountError( I18n.t( "user.inputBindSubaccountError" ) ) );
		}
	};
};

// 请求一键领取数据
export function fetchSetHotkeyData()
{
	return async function( dispatch )
	{
		dispatch( setHotkeyData( [], true, null ) );
		try
		{
			const res = await fetchPost( "/user.php", { "提交": "OneClick" } );
			if( res )
			{
				const arr = res.split( "<br>" ).filter( item => item );
				dispatch( setHotkeyData( arr, false, null ) );
			} else
			{
				dispatch( setHotkeyData( [], false, null ) );
			};
		} catch( err )
		{
			dispatch( setHotkeyData( [], false, err.type === "network" ? `${ err.status }: ${ I18n.t( "user.fetchHotkeyDataError" ) }` : err.err.toString() ) );
		};
	};
};

// 请求资金归集数据
export function fetchSetSummarizeData()
{
	return async function( dispatch )
	{
		dispatch( setSummarizeData( [], true, null ) );
		try
		{
			const res = await fetchPost( "/user.php", { "提交": "CashSweep" } );
			if( res )
			{
				const arr = res.split( "<br>" ).filter( item => item );
				dispatch( setSummarizeData( arr, false, null ) );
			} else
			{
				dispatch( setSummarizeData( [], false, null ) );
			};
		} catch( err )
		{
			dispatch( setSummarizeData( [], false, err.type === "network" ? `${ err.status }: ${ I18n.t( "user.fetchSummarizeDataError" ) }` : err.err.toString() ) );
		};
	};
};

// 请求投资合同数据
export function fetchElectronicContractData()
{
	return async function( dispatch )
	{
		dispatch( setElectronicContractData( {}, null ) );
		try
		{
			const res = await fetchPost( "/user.php", { "提交": "ETU合同数据" } );
			if( res && isObject( res ) )
			{
				dispatch( setElectronicContractData( res, null ) );
			} else
			{
				dispatch( setElectronicContractData( {}, res.toString() ) );
			};
		} catch( err )
		{
			dispatch( setElectronicContractData( {}, err.type === "network" ? `${ err.status }: ${ I18n.t( "user.fetchElectronicContractDataError" ) }` : err.err.toString() ) );
		};
	};
};

// 请求实名认证信息
export function fetchAuthData()
{
	return async function( dispatch )
	{
		dispatch( setAuthData( {}, null ) );
		try
		{
			const res = await fetchPost( "/user.php", { "提交": "提交实名认证信息" } );
			if( res && isObject( res ) )
			{
				dispatch( setAuthData( res, null ) );
			} else
			{
				dispatch( setAuthData( {}, res.toString() ) );
			};
		} catch( err )
		{
			dispatch( setAuthData( {}, err.type === "network" ? `${ err.status }: ${ I18n.t( "auth.fetchAuthDataError" ) }` : err.err.toString() ) );
		};
	};
};