import Ws from "./../../javascripts/ws.js";
import { fetchPost, isObject, getNum, objectValueGetNum } from "./../../javascripts/util.js";

import I18n from "i18n-js";
/* action type */
export const ACTIONS_SET_CTC_FETCHSTATE = "ACTIONS_SET_CTC_FETCHSTATE";
export const ACTIONS_SET_CTC_DATA = "ACTIONS_SET_CTC_DATA";
export const ACTIONS_SET_CTC_FETCHLOADING = "ACTIONS_SET_CTC_FETCHLOADING";
export const ACTIONS_SET_CTC_RATE = "ACTIONS_SET_CTC_RATE";
let ws = null;

let keys = [ "USDT", "ETUSD", "ETH", "SLBT", "BTC", "DASH", "ZEC", "LTC", "NEO", "XMR", "OMG", "EOS", "XRP" ];

/* action create */
// 设置 data, fetchLoading, fetchError
function setFetchState( data, fetchLoading, fetchError )
{
	return { type: ACTIONS_SET_CTC_FETCHSTATE, payload: { data, fetchLoading, fetchError } };
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

// 设置 rate
function setRate( rate )
{
	return { type: ACTIONS_SET_CTC_RATE, payload: rate };
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

				const isNeed = keys.some( item => res.includes( item ) );

				function getNewData()
				{
					const { ctc } = getState();
					const newData = ctc.data.slice( 0 );

					outerloop: for ( let i = newData.length - 1; i >= 0; i-- )
					{
						innerloop: for ( let j = newData[ i ][ "data" ].length - 1; j >= 0; j-- )
						{
							if( newData[ i ][ "data" ][ j ].key === resArr[ 0 ] )
							{
								if( resArr[ 0 ] === "SLBT" )
								{
									newData[ i ][ "data" ][ j ][ "unit" ] = getNum( String( Number( resArr[ 1 ] ) ), 6 );
									newData[ i ][ "data" ][ j ][ "unitRate" ] = getNum( String( Number( resArr[ 1 ] ) * Number( ctc.rate ) ), 6 );
									console.log( "kkkkkkkkkkk", ctc.rate, resArr[ 0 ] );
								} else
								{
									newData[ i ][ "data" ][ j ][ "unit" ] = getNum( resArr[ 1 ], 2 );
									newData[ i ][ "data" ][ j ][ "unitRate" ] = getNum( String( Number( resArr[ 1 ] ) * Number( ctc.rate ) ), 2 );
								};

								newData[ i ][ "data" ][ j ][ "total" ] = getNum( String( Number( resArr[ 1 ] ) * Number( newData[ i ][ "data" ][ j ][ "number" ] ) ), 2 );
								newData[ i ][ "data" ][ j ][ "totalRate" ] = getNum( String( Number( resArr[ 1 ] ) * Number( newData[ i ][ "data" ][ j ][ "number" ] ) * Number( ctc.rate ) ), 2 );
								break outerloop;
							};
						};
					};

					return newData;
				};

				if( resArr[ 0 ] === "USDCNH" )
				{
					console.log( "=============----------------------=========>", resArr[ 0 ] )
					dispatch( setRate( resArr[ 1 ] ) );
					dispatch( setData( getNewData() ) );

				};


				if( isNeed )
				{
					console.log( "======================>", resArr[ 0 ] )
					dispatch( setData( getNewData() ) );
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
						{ key: "USDT", number: obj[ "USDT" ], type: 0, unit: 0, total: 0 }, { key: "ETUSD", number: obj[ "ETUSD" ], type: 0, unit: 0, total: 0 },
						{ key: "ETH", number: obj[ "ETH" ], type: 0, unit: 0, total: 0 }, { key: "SLBT", number: obj[ "SLBT" ], type: 0, unit: 0, total: 0 }
					]
				}, {
					title: I18n.t( "ctc.type2" ),
					data: [
						{ key: "BTC", number: obj[ "BTC" ], type: 1, unit: 0, total: 0 }, { key: "DASH", number: obj[ "DASH" ], type: 1, unit: 0, total: 0 },
						{ key: "ZEC", number: obj[ "ZEC" ], type: 1, unit: 0, total: 0 }, { key: "LTC", number: obj[ "LTC" ], type: 1, unit: 0, total: 0 },
						{ key: "NEO", number: obj[ "NEO" ], type: 1, unit: 0, total: 0 }, { key: "XMR", number: obj[ "XMR" ], type: 1, unit: 0, total: 0 },
						{ key: "OMG", number: obj[ "OMG" ], type: 1, unit: 0, total: 0 }, { key: "EOS", number: obj[ "EOS" ], type: 1, unit: 0, total: 0 },
						{ key: "XRP", number: obj[ "XRP" ], type: 1, unit: 0, total: 0 }
					]
				} ];
				dispatch( setFetchState( data, false, null ) );
				dispatch( wsData() );
			} else
			{
				dispatch( setFetchState( [], false, res ) );
			};

		} catch( err )
		{
			console.log( "err", err );
			dispatch( setFetchState( [], false, err.type === "network" ? `${ err.status }: ${ I18n.t( "ctc.fetchDataError" ) }` : err.err.toString() ) );
		};
	};
};
