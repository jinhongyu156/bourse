import Ws from "./../../javascripts/ws.js";
import { fetchPost, isObject, getNum, objectValueGetNum } from "./../../javascripts/util.js";
import { numberReg } from "./../../javascripts/regExp.js";
import I18n from "i18n-js";
/* action type */
export const ACTIONS_SET_CTC_FETCHSTATE = "ACTIONS_SET_CTC_FETCHSTATE";
export const ACTIONS_SET_CTC_DATA = "ACTIONS_SET_CTC_DATA";
export const ACTIONS_SET_CTC_ORIGINALDATA = "ACTIONS_SET_CTC_ORIGINALDATA";
export const ACTIONS_SET_CTC_FETCHLOADING = "ACTIONS_SET_CTC_FETCHLOADING";
export const ACTIONS_SET_CTC_RATE = "ACTIONS_SET_CTC_RATE";
let ws = null;

let keys = [ "USDT", "ETUSD", "ETH", "SLBT", "BTC", "DASH", "ZEC", "LTC", "NEO", "XMR", "OMG", "EOS", "XRP" ];

/* action create */
// 设置 data, fetchLoading, fetchError
function setFetchState( id, data, fetchLoading, fetchError )
{
	return { type: ACTIONS_SET_CTC_FETCHSTATE, payload: { id, data, fetchLoading, fetchError } };
};

// 设置 fetchLoading
function setFetchLoading( fetchLoading )
{
	return { type: ACTIONS_SET_CTC_FETCHLOADING, payload: fetchLoading };
};

// 设置 data
function setData( data )
{
	return { type: ACTIONS_SET_CTC_DATA, payload: data };
};

// 设置原始数据
function setOriginalData( originalData )
{
	return { type: ACTIONS_SET_CTC_ORIGINALDATA, payload: originalData };
};

// 设置 rate
function setRate( rate )
{
	return { type: ACTIONS_SET_CTC_RATE, payload: rate };
};

// 设置 data 中 text 属性
export function setCount( key, text )
{
	return function( dispatch, getState )
	{
		const { ctc } = getState();
		const newData = ctc.data.slice( 0 );

		for ( let i = newData[ 1 ][ "data" ].length - 1; i >= 0; i-- )
		{
			if( newData[ 1 ][ "data" ][ i ][ "key" ] === key )
			{
				const count = numberReg.test( text ) ? text : "1";
				newData[ 1 ][ "data" ][ i ][ "count" ] = count;
				newData[ 1 ][ "data" ][ i ][ "price" ] = getNum( String( Number( count ) * Number( newData[ 1 ][ "data" ][ i ][ "unit" ] ) ), 3 );
				break;
			};
		};
		dispatch( setData( newData ) );
	};
};

// ws price
function wsData()
{
	return function( dispatch, getState )
	{
		if( ws ) return;

		ws = new Ws( "ws://tcp.slb.one:9595/", {
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
				const resArr = res.split( "," );
				const isUSDCNH = resArr[ 0 ] === "USDCNH";
				const isNeed = keys.some( item => res.includes( item ) );

				if( isUSDCNH )
				{
					dispatch( setRate( Number( resArr[ 1 ] ) ) );
					const { ctc } = getState();
					const newData = ctc.data.slice( 0 );

					for ( let i = newData.length - 1; i >= 0; i-- )
					{
						for ( let j = newData[ i ][ "data" ].length - 1; j >= 0; j-- )
						{
							const unit = Number( newData[ i ][ "data" ][ j ][ "unit" ] );
							const number = Number( newData[ i ][ "data" ][ j ][ "number" ] );
							const fixed = newData[ i ][ "data" ][ j ][ "key" ] === "SLBT" ? 6 : 2;

							newData[ i ][ "data" ][ j ][ "unitRate" ] = getNum( String( unit * ctc.rate ), fixed );
							newData[ i ][ "data" ][ j ][ "totalRate" ] = getNum( String( unit * number * ctc.rate ), 2 );

							if( i === 1 )
							{
								newData[ i ][ "data" ][ j ][ "price" ] = getNum( String( unit * Number( newData[ i ][ "data" ][ j ][ "count" ] ) ), 3 );
							};
						};
					};
					dispatch( setData( newData ) );
				};
				if( isNeed )
				{
					const { ctc } = getState();
					const newData = ctc.data.slice( 0 );

					outerloop: for ( let i = newData.length - 1; i >= 0; i-- )
					{
						innerloop: for ( let j = newData[ i ][ "data" ].length - 1; j >= 0; j-- )
						{
							if( newData[ i ][ "data" ][ j ].key === resArr[ 0 ] )
							{
								const unit = Number( resArr[ 1 ] );
								const number = Number( newData[ i ][ "data" ][ j ][ "number" ] );
								const fixed = resArr[ 0 ] === "SLBT" ? 6 : 2;

								newData[ i ][ "data" ][ j ][ "unit" ] = getNum( String( unit ), fixed );
								newData[ i ][ "data" ][ j ][ "unitRate" ] = getNum( String( unit * ctc.rate ), fixed );

								newData[ i ][ "data" ][ j ][ "total" ] = getNum( String( unit * number ), 2 );
								newData[ i ][ "data" ][ j ][ "totalRate" ] = getNum( String( unit * number * ctc.rate ), 2 );

								if( i === 1 )
								{
									newData[ i ][ "data" ][ j ][ "price" ] = getNum( String( unit * Number( newData[ i ][ "data" ][ j ][ "count" ] ) ), 3 );
								};

								break outerloop;
							};
						};
					};
					dispatch( setData( newData ) );
				};
			}
		} );
		ws.initWebSocket();
	};
};

// 请求 ctc 数据
export function fetchData()
{
	return async function( dispatch, getState )
	{
		const { ctc } = getState();
		if( ctc.fetchLoading ) return;
		try
		{
			dispatch( setFetchLoading( true ) );
			const res = await fetchPost( "/new_heyue.php", { "提交": "返回用户货币数量" } );
			console.log( "res", res );

			if( isObject( res ) )
			{
				const obj = objectValueGetNum( res, keys, 3 );

				const data = [ {
					title: I18n.t( "ctc.type1" ),
					data: [
						{ key: "USDT", number: obj[ "USDT" ], type: 0, unit: 0, total: 0, count: "1", price: "0" },
						{ key: "ETUSD", number: obj[ "ETUSD" ], type: 0, unit: 0, total: 0, count: "1", price: "0" },
						{ key: "ETH", number: obj[ "ETH" ], type: 0, unit: 0, total: 0, count: "1", price: "0" },
						{ key: "SLBT", number: obj[ "SLBT" ], type: 0, unit: 0, total: 0, count: "1", price: "0" }
					]
				}, {
					title: I18n.t( "ctc.type2" ),
					data: [
						{ key: "BTC", number: obj[ "BTC" ], type: 1, unit: 0, total: 0, count: "1", price: "0" },
						{ key: "DASH", number: obj[ "DASH" ], type: 1, unit: 0, total: 0, count: "1", price: "0" },
						{ key: "ZEC", number: obj[ "ZEC" ], type: 1, unit: 0, total: 0, count: "1", price: "0" },
						{ key: "LTC", number: obj[ "LTC" ], type: 1, unit: 0, total: 0, count: "1", price: "0" },
						{ key: "NEO", number: obj[ "NEO" ], type: 1, unit: 0, total: 0, count: "1", price: "0" },
						{ key: "XMR", number: obj[ "XMR" ], type: 1, unit: 0, total: 0, count: "1", price: "0" },
						{ key: "OMG", number: obj[ "OMG" ], type: 1, unit: 0, total: 0, count: "1", price: "0" },
						{ key: "EOS", number: obj[ "EOS" ], type: 1, unit: 0, total: 0, count: "1", price: "0" },
						{ key: "XRP", number: obj[ "XRP" ], type: 1, unit: 0, total: 0, count: "1", price: "0" }
					]
				} ];
				dispatch( setFetchState( res.id, data, false, null ) );
				dispatch( setOriginalData( objectValueGetNum( res, [ "USDT", "SLBT", "ETUSD" ], 3 ) ) );
				dispatch( wsData() );
			} else
			{
				dispatch( setFetchState( "", [], false, res ) );
			};

		} catch( err )
		{
			console.log( "err", err );
			dispatch( setFetchState( "", [], false, err.type === "network" ? `${ err.status }: ${ I18n.t( "ctc.fetchDataError" ) }` : err.err.toString() ) );
		};
	};
};

// 请求卖出
export function fetchSell( params, callback )
{
	return async function( dispatch )
	{
		try
		{
			const res = await fetchPost( "/kuang.php", { "提交": "销售数字货币", "销售货币类型": params.coin, "销售数量": params.number } );
			console.log( "res", res );
			if( res === "销售成功" )
			{
				callback( I18n.t( "ctc.sellSuccess" ) );
				dispatch( fetchData() );
			} else
			{
				callback( res );
			};
		} catch( err )
		{
			console.log( "err", err );
			callback( err.type === "network" ? `${ err.status }: ${ I18n.t( "ctc.sellError" ) }` : err.err.toString() );
		};
	};
};

// 请求购买
export function fetchBuy( params, callback )
{
	return async function( dispatch )
	{
		try
		{
			const res = await fetchPost( "/otc.php", { "提交": "兑换产品", "产品名称": params.coin, "购买数量": params.number } );
			console.log( "res", res );
			if( res === "ok" )
			{
				callback( I18n.t( "ctc.buySuccess" ) );
				dispatch( fetchData() );
			} else
			{
				callback( res );
			};
		} catch( err )
		{
			console.log( "err", err );
			callback( err.type === "network" ? `${ err.status }: ${ I18n.t( "ctc.buyError" ) }` : err.err.toString() );
		};
	};
};
