import I18n from "i18n-js";
import Toast from "react-native-root-toast";

import { fetchPost, isObject } from "./../../javascripts/util.js";
import { intReg, passwordReg } from "./../../javascripts/regExp.js";
export const ACTION_SET_MYBANKCARD_HASCARD = "ACTION_SET_MYBANKCARD_HASCARD";
export const ACTION_SET_MYBANKCARD_INPUTTEXT = "ACTION_SET_MYBANKCARD_INPUTTEXT";
export const ACTION_SET_MYBANKCARD_SETBANKLISTDATA = "ACTION_SET_MYBANKCARD_SETBANKLISTDATA";
export const ACTION_SET_MYBANKCARD_INPUTERROR = "ACTION_SET_MYBANKCARD_INPUTERROR";
export const ACTION_SET_MYBANKCARD_ISSHOWBANKSELECTOR = "ACTION_SET_MYBANKCARD_ISSHOWBANKSELECTOR";
export const ACTION_SET_MYBANKCARD_BINDCARD = "ACTION_SET_MYBANKCARD_BINDCARD";
export const ACTION_SET_MYBANKCARD_UNBINDCARD = "ACTION_SET_MYBANKCARD_UNBINDCARD";
export const ACTION_SET_MYBANKCARD_CARDDATA = "ACTION_SET_MYBANKCARD_CARDDATA";

// 设置 hasCard
function setHasCard( hasCard )
{
	return { type: ACTION_SET_MYBANKCARD_HASCARD, payload: hasCard };
}

// 设置 fetchCardDataLoading, fetchCardDataError
function setCardData( fetchCardDataLoading, fetchCardDataError )
{
	return { type: ACTION_SET_MYBANKCARD_CARDDATA, payload: { fetchCardDataLoading, fetchCardDataError } };
};

// 设置 fetchBindCardLoading, fetchBindCardError
function setBindCard( fetchBindCardLoading, fetchBindCardError )
{
	return { type: ACTION_SET_MYBANKCARD_BINDCARD, payload: { fetchBindCardLoading, fetchBindCardError } };
};

// 设置 fetchUnBindCardLoading, fetchUnBindCardError
function setUnBindCard( fetchUnBindCardLoading, fetchUnBindCardError )
{
	return { type: ACTION_SET_MYBANKCARD_UNBINDCARD, payload: { fetchUnBindCardLoading, fetchUnBindCardError } };
};

// 设置 bankListData, fetchBankListDataLoading, fetchBankListDataError
function setBankListData( bankListData, fetchBankListDataLoading, fetchBankListDataError )
{
	return { type: ACTION_SET_MYBANKCARD_SETBANKLISTDATA, payload: { bankListData, fetchBankListDataLoading, fetchBankListDataError } };
};

// 设置 input 文本
export function setInputText( key, value )
{
	return function( dispatch, getState )
	{
		const { myBankCard } = getState();

		dispatch( { type: ACTION_SET_MYBANKCARD_INPUTTEXT, payload: { [ key ]: value } } );
		if( key === "bankCardNumber" )
		{
			dispatch( { type: ACTION_SET_MYBANKCARD_INPUTERROR, payload: Object.assign( {}, myBankCard.inputError, { bankCardNumber: !intReg.test( value ) } ) } );
		};
	};
};

// 关闭城市选择器
export function hideBankSelector()
{
	return { type: ACTION_SET_MYBANKCARD_ISSHOWBANKSELECTOR, payload: false };
};

// 打开城市选择器
export function showBankSelector()
{
	return { type: ACTION_SET_MYBANKCARD_ISSHOWBANKSELECTOR, payload: true };
};

// 设置当前银行
export function setCurrentBank( id, name )
{
	return function ( dispatch, getState )
	{
		dispatch( hideBankSelector() );
		dispatch( { type: ACTION_SET_MYBANKCARD_INPUTTEXT, payload: { bankId: id, bankName: name } } );
	};
};

// 搜索 BankList
export function searchBankList( params )
{
	return function( dispatch, getState )
	{
		const { myBankCard } = getState();
		dispatch( setBankListData( myBankCard.bankListData, true, null ) );
		const newBankListData = myBankCard.bankListData.map( item => Object.assign( {}, item, { display: item.bankName.includes( params.searchText ) } ) );
		dispatch( setBankListData( newBankListData, false, null ) );
	};
};

// 获取所有银行列表
export function fetchBankList()
{
	return function ( dispatch, getState )
	{
		const { myBankCard } = getState();

		if( myBankCard.bankListData && myBankCard.bankListData.length )
		{
			dispatch( setBankListData( myBankCard.bankListData, false, null ) );
		} else
		{
			dispatch( setBankListData( [], true, null ) );

			fetch( "http://18.177.24.213:63339/banks?country=cn" ).then( response => response.json() ).then( res =>
			{
				if( res.code === 1 )
				{
					dispatch( setBankListData( res.data.map( item => Object.assign( {}, item, { display: true } ) ), false, null ) );
				} else
				{
					dispatch( setBankListData( [], false, res.message ) );
				};
			} ).catch( function( err )
			{
				dispatch( setBankListData( [], false, err.toString() ) );
			} );
		};
	}
};

// 请求 CardData
export function fetchCardData()
{
	return async function( dispatch, getState )
	{
		try
		{
			const res = await fetchPost( "/Recharge.php", { "提交": "GetBankCard" } );

			if( isObject( res ) && res[ "银行卡" ] )
			{
				const arr = res[ "银行卡" ].split( "|" ).length === 3 ? res[ "银行卡" ].split( "|" ) : [ "", "", "" ];
				const data = { bankId: arr[ 0 ], bankCardNumber: arr[ 1 ], bankName: arr[ 2 ], bankDeposit: res[ "开户支行" ] };

				dispatch( { type: ACTION_SET_MYBANKCARD_INPUTTEXT, payload: data } );
				dispatch( setHasCard( !Object.values( data ).every( item => item === "" ) ) );
				dispatch( setCardData( false, null ) );
			} else
			{
				dispatch( setHasCard( false ) );
				dispatch( setCardData( false, res.toString() ) );
			};
		} catch( err )
		{
			dispatch( setCardData( false, err.type === "network" ? `${ err.status }: ${ I18n.t( "myBankCard.fetchCardDataError" ) }` : err.err.toString() ) );
		};
	};
};

// 请求绑卡
export function fetchBindCard()
{
	return async function( dispatch, getState )
	{
		const { myBankCard } = getState();

		if ( myBankCard.bankId && myBankCard.bankName && myBankCard.bankCardNumber && myBankCard.bankDeposit && Object.values( myBankCard.inputError ).every( item => item === false ) )
		{
			const params = { "提交": "AddBankCard", "bankId": myBankCard.bankId, "accountName": myBankCard.bankName, "accountNo": myBankCard.bankCardNumber, "branchName": myBankCard.bankDeposit };
			dispatch( setBindCard( true, null ) );
			try
			{
				const res = await fetchPost( "/Recharge.php", params );
				if( res === "绑定成功" )
				{
					dispatch( setBindCard( false, null ) );
					dispatch( fetchCardData() );
					Toast.show( I18n.t( "myBankCard.fetchBindCardSuccess" ) );
				} else
				{
					dispatch( setBindCard( false, res.toString() ) );
				};
			} catch( err )
			{
				dispatch( setBindCard( false, err.type === "network" ? `${ err.status }: ${ I18n.t( "myBankCard.fetchBindCardError" ) }` : err.err.toString() ) );
			};
		} else
		{
			dispatch( setBindCard( false, I18n.t( "myBankCard.inputBindCardError" ) ) );
		};
	};
};

// 请求解绑
export function fetchUnBindCard()
{
	return async function( dispatch, getState )
	{
		dispatch( setUnBindCard( true, null ) );
		try
		{
			const res = await fetchPost( "/Recharge.php", { "提交": "DelBankCard" } );

			if( res === "解绑成功" )
			{
				dispatch( setUnBindCard( false, null ) );
				dispatch( fetchCardData() );
				Toast.show( I18n.t( "myBankCard.fetchUnBindCardSuccess" ) );
			} else
			{
				dispatch( setUnBindCard( false, res.toString() ) );
			};
			
		} catch( err )
		{
			dispatch( setUnBindCard( false, err.type === "network" ? `${ err.status }: ${ I18n.t( "myBankCard.fetchUnBindCardError" ) }` : err.err.toString() ) );
		};
	};
};