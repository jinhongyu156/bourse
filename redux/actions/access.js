import I18n from "i18n-js";

import { fetchPost, isObject } from "./../../javascripts/util.js";
import { numberReg, passwordReg } from "./../../javascripts/regExp.js";

/* action type */
export const ACTION_SET_ACCESS_USABLE = "ACTION_SET_ACCESS_USABLE";
export const ACTION_SET_ACCESS_ADDRESS = "ACTION_SET_ACCESS_ADDRESS";
export const ACTION_SET_ACCESS_INPUTTEXT = "ACTION_SET_ACCESS_INPUTTEXT";
export const ACTION_SET_ACCESS_INPUTERROR = "ACTION_SET_ACCESS_INPUTERROR";
export const ACTION_SET_ACCESS_ISLOADING = "ACTION_SET_ACCESS_ISLOADING";
export const ACTION_SET_ACCESS_FETCHSUBMITERROR = "ACTION_SET_ACCESS_FETCHSUBMITERROR";
export const ACTION_SET_ACCESS_CLEAR = "ACTION_SET_ACCESS_CLEAR";

/* action create */
// 设置地址和获取地址错误信息
function setAddress( address, fetchAddressError )
{
	return { type: ACTION_SET_ACCESS_ADDRESS, payload: { address, fetchAddressError } };
};

// 设置可用数量和获取可用数量错误信息
function setUsable( usable, fetchUsableError )
{
	return { type: ACTION_SET_ACCESS_USABLE, payload: { usable, fetchUsableError } };
};

// 设置是否正在提交数据 isLoading
function setIsLoading( isLoading )
{
	return { type: ACTION_SET_ACCESS_ISLOADING, payload: isLoading };
};

// 设置提交错误属性 fetchSubmitError
function setFetchSubmitError( fetchSubmitError )
{
	return { type: ACTION_SET_ACCESS_FETCHSUBMITERROR, payload: fetchSubmitError };
};

// 清空数据
export function clear()
{
	return { type: ACTION_SET_ACCESS_CLEAR };
};

// 设置 input 文本
export function setInputText( key, value )
{
	return function( dispatch, getState )
	{
		const { access } = getState();
		dispatch( { type: ACTION_SET_ACCESS_INPUTTEXT, payload: { [ key ]: value } } );
		if( key === "number" )
		{
			dispatch( { type: ACTION_SET_ACCESS_INPUTERROR, payload: Object.assign( {}, access.inputError, { number: !numberReg.test( value ) } ) } );
			dispatch( { type: ACTION_SET_ACCESS_INPUTTEXT, payload: { fee: Number( value ) * 0.03 } } );
		};
		if( key === "password" )
		{
			dispatch( { type: ACTION_SET_ACCESS_INPUTERROR, payload: Object.assign( {}, access.inputError, { password: !passwordReg.test( value ) } ) } );
		};
		if( key === "account" )
		{
			dispatch( { type: ACTION_SET_ACCESS_INPUTERROR, payload: Object.assign( {}, access.inputError, { account: !numberReg.test( value ) } ) } );
		};
	};
};

// 请求可用数据
export function fetchUsable( coin )
{
	return async function( dispatch )
	{
		try
		{
			const res = await fetchPost( "/otc.php", { "提交": "获取提币信息", "提币类型": coin } );
			console.log( "res", res );
			if( isObject( res ) && res[ coin ] )
			{
				dispatch( setUsable( res[ coin ], null ) );
			} else
			{
				dispatch( setUsable( "", res.toString() ) );
			};
		} catch( err )
		{
			console.log( "err", err );
			dispatch( setUsable( "", err.type === "network" ? `${ err.status }: ${ I18n.t( "mention.fetchUsableError" ) }` : err.err.toString() ) );
		};
	};
};

// 请求地址数据
export function fetchAddress()
{
	return async function( dispatch )
	{
		try
		{
			const res = await fetchPost( "/otc.php", { "提交": "获取公司钱包地址" } );
			console.log( "res", res );
			if( isObject( res ) && res[ "钱包地址" ] )
			{
				dispatch( setAddress( res[ "钱包地址" ], null ) );
			} else
			{
				dispatch( setAddress( "", res.toString() ) );
			};
		} catch( err )
		{
			console.log( "err", err );
			dispatch( setAddress( "", err.type === "network" ? `${ err.status }: ${ I18n.t( "recharge.fetchAddressError" ) }` : err.err.toString() ) );
		};
	};
};

// 请求充值
export function fetchRechargeSubmit( coin, callback )
{
	return async function( dispatch, getState )
	{
		const { access } = getState();
		if( Object.values( access.inputError ).every( item => item === false ) && access.address && access.number )
		{
			dispatch( setIsLoading( true ) );
			const params = { "提交": "充币", "钱包地址": access.address, "充币备注": access.note, "充币数量": access.number, "充币类型": coin };
			try
			{
				const res = await fetchPost( "/otc.php", params );
				console.log( "res", res );
				if( res === "ok" )
				{
					callback();
					dispatch( setIsLoading( false ) );
				} else
				{
					dispatch( setFetchSubmitError( res ) );
					dispatch( setIsLoading( false ) );
				};
			} catch( err )
			{
				console.log( "err", err );
				dispatch( setFetchSubmitError( err.type === "network" ? `${ err.status }: ${ I18n.t( "recharge.fetchSubmitError" ) }` : err.err.toString() ) );
				dispatch( setIsLoading( false ) );
			};
		} else
		{
			dispatch( setFetchSubmitError( I18n.t( "recharge.submitError" ) ) );
		};
	};
};

// 请求提币
export function fetchMentionSubmit( coin, callback )
{
	return async function( dispatch, getState )
	{
		const { access } = getState();

		if( Object.values( access.inputError ).every( item => item === false ) && access.usable && access.address && access.number && access.password )
		{
			if( Number( access.number ) < Number( access.usable ) )
			{
				dispatch( setIsLoading( true ) );
				const params = { "提交": "提币", "提币类型": coin, "提币数量": access.number, "提币地址": access.address, "资金密码": access.password };
				try
				{
					const res = await fetchPost( "/otc.php", params );
					console.log( "res", res );
					if( res === "成功" )
					{
						callback();
						dispatch( setIsLoading( false ) );
					} else
					{
						dispatch( setFetchSubmitError( res ) );
						dispatch( setIsLoading( false ) );
					};
				} catch( err )
				{
					console.log( "err", err );
					dispatch( setFetchSubmitError( err.type === "network" ? `${ err.status }: ${ I18n.t( "mention.fetchSubmitError" ) }` : err.err.toString() ) );
					dispatch( setIsLoading( false ) );
				};
			} else
			{
				dispatch( setFetchSubmitError( I18n.t( "mention.submitError2" ) ) );
			};
		} else
		{
			dispatch( setFetchSubmitError( I18n.t( "mention.submitError1" ) ) );
		};
	};
};

// 请求转币
export function fetchTurnSubmit( coin, callback )
{
	return async function( dispatch, getState )
	{
		const { access } = getState();
		if( Object.values( access.inputError ).every( item => item === false ) && access.account && access.number && access.password )
		{
			dispatch( setIsLoading( true ) );
			const params = { "提交": "转币", "转币数量": access.number, "转币类型": coin, "转入账号": access.account, "资金密码": access.password };
			try
			{
				const res = await fetchPost( "/otc.php", params );
				console.log( "res", res );
				if( res === "成功" )
				{
					callback();
					dispatch( setIsLoading( false ) );
				} else
				{
					dispatch( setFetchSubmitError( res ) );
					dispatch( setIsLoading( false ) );
				};
			} catch( err )
			{
				console.log( "err", err );
				dispatch( setFetchSubmitError( err.type === "network" ? `${ err.status }: ${ I18n.t( "turn.fetchSubmitError" ) }` : err.err.toString() ) );
				dispatch( setIsLoading( false ) );
			};
		} else
		{
			dispatch( setFetchSubmitError( I18n.t( "turn.submitError" ) ) );
		};
	};
};