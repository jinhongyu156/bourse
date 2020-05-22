import I18n from "i18n-js";
import { ToastAndroid } from "react-native";

import { fetchPost, isObject } from "./../../javascripts/util.js";
import { intReg, passwordReg } from "./../../javascripts/regExp.js";

export const ACTION_SET_USDTMENTION_INPUTTEXT = "ACTION_SET_USDTMENTION_INPUTTEXT";
export const ACTION_SET_USDTMENTION_INPUTERROR = "ACTION_SET_USDTMENTION_INPUTERROR";
export const ACTION_SET_USDTMENTION_VALUATIONDATA = "ACTION_SET_USDTMENTION_VALUATIONDATA";
export const ACTION_SET_USDTMENTION_FETCHMENTIONSUBMIT = "ACTION_SET_USDTMENTION_FETCHMENTIONSUBMIT";
export const ACTION_SET_USDTMENTION_CLEAR = "ACTION_SET_USDTMENTION_CLEAR";

// 清空数据
export function clear()
{
	return { type: ACTION_SET_USDTMENTION_CLEAR };
};

// 设置 fetchMentionSubmitLoading, fetchMentionSubmitError
function setMentionSubmit( fetchMentionSubmitLoading, fetchMentionSubmitError )
{
	return { type: ACTION_SET_USDTMENTION_FETCHMENTIONSUBMIT, payload: { fetchMentionSubmitLoading, fetchMentionSubmitError } };
};

// 设置 valuationData, fetchValuationDataLoading, fetchValuationDataError
function setValuationData( valuationData, fetchValuationDataLoading, fetchValuationDataError )
{
	return { type: ACTION_SET_USDTMENTION_VALUATIONDATA, payload: { valuationData, fetchValuationDataLoading, fetchValuationDataError } };
};

// 设置 input 文本
export function setInputText( key, value )
{
	return function( dispatch, getState )
	{
		const { usdtMention } = getState();

		dispatch( { type: ACTION_SET_USDTMENTION_INPUTTEXT, payload: { [ key ]: value } } );
		if( key === "number" )
		{
			dispatch( { type: ACTION_SET_USDTMENTION_INPUTERROR, payload: Object.assign( {}, usdtMention.inputError, { number: !intReg.test( value ) } ) } );
		};
		if( key === "password" )
		{
			dispatch( { type: ACTION_SET_USDTMENTION_INPUTERROR, payload: Object.assign( {}, usdtMention.inputError, { password: !passwordReg.test( value ) } ) } );
		};
	};
};

// 请求估价
export function fetchValuation()
{
	return async function( dispatch, getState )
	{
		const { usdtMention } = getState();
		if ( usdtMention.number && Object.values( usdtMention.inputError ).every( item => item === false ) )
		{
			dispatch( setValuationData( usdtMention.valuationData, true, usdtMention.fetchValuationDataError ) );
			try
			{
				const res = await fetchPost( "/Recharge.php", { "卖出数量": usdtMention.number, "提交": "GetSellPirce" } );
				if( isObject( res ) )
				{
					if( res.code === 1 )
					{
						dispatch( setValuationData( res.data, false, null ) );
					} else
					{
						dispatch( setValuationData( usdtMention.valuationData, false, res.message ) );
					};
				} else
				{
					dispatch( setValuationData( usdtMention.valuationData, false, res.toString() ) );
				};
			} catch( err )
			{
				dispatch( setValuationData( usdtMention.valuationData, false, err.type === "network" ? `${ err.status }: ${ I18n.t( "usdtMention.fetchValuationDataError" ) }` : err.err.toString() ) );
			};
		} else
		{
			dispatch( setValuationData( usdtMention.valuationData, false, I18n.t( "usdtMention.inputValuationDataError" ) ) );
		};
	};
};

// 请求提现
export function fetchMentionSubmit()
{
	return async function( dispatch, getState )
	{
		const { usdtMention } = getState();

		if ( usdtMention.password && usdtMention.number && usdtMention.valuationData.unitPrice && Object.values( usdtMention.inputError ).every( item => item === false ) )
		{
			const params = { "提现数量": usdtMention.number, "资金密码": usdtMention.password, "当笔汇率": usdtMention.valuationData.unitPrice, "提交": "PaySell" };
			dispatch( setMentionSubmit( true, null ) );
			try
			{
				const res = await fetchPost( "/Recharge.php", params );
				if( isObject( res ) )
				{
					if( res.code === 1 )
					{
						dispatch( clear() );
						dispatch( setMentionSubmit( false, null ) );
						ToastAndroid.show( I18n.t( "usdtMention.fetchMentionSubmitSuccess" ), ToastAndroid.SHORT );
					} else
					{
						dispatch( setMentionSubmit( false, res.message ) );
					};
				} else
				{
					dispatch( setMentionSubmit( false, res.toString() ) );
				};
			} catch( err )
			{
				dispatch( setMentionSubmit( false, err.type === "network" ? `${ err.status }: ${ I18n.t( "usdtMention.fetchMentionSubmitError" ) }` : err.err.toString() ) );
			};
		} else
		{
			dispatch( setMentionSubmit( false, I18n.t( "usdtMention.inputMentionSubmitError" ) ) );
		};
	};
};
