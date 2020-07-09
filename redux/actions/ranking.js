import I18n from "i18n-js";
import Toast from "react-native-root-toast";
import { fetchPost, isObject, isArray, isJSON } from "./../../javascripts/util.js";

/* action type */
export const ACTION_SET_RANKING_STATE = "ACTION_SET_RANKING_STATE";

// 设置 selfId, targetId, data, loading, error
function setRankingState( selfId, targetId, data, loading, error )
{
	return { type: ACTION_SET_RANKING_STATE, payload: { selfId, targetId, data, loading, error } };
};

// 排行榜数据请求
export function fetchRanking()
{
	return async function( dispatch, getState )
	{
		const { ranking } = getState();
		dispatch( setRankingState( ranking.selfId, ranking.targetId, ranking.data, true, null ) );

		Promise.all( [
			new Promise( function( resolve, reject )
			{
				fetch( "http://ca.slb.one/moni.php", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" }, body: "提交=获取高手id" } ).then( response => response.status === 200
					? response.text()
					: reject( { type: "network", status: response.status } )
				).then( res => isJSON( String( res ) )
					? resolve( JSON.parse( String( res ) ) )
					: resolve( res )
				);
			} ),
			new Promise( function( resolve, reject )
			{
				fetch( "http://data.bifx.com/Ranking.php", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" } } ).then( response => response.status === 200
					? response.text()
					: reject( { type: "network", status: response.status } )
				).then( res => isJSON( String( res ) )
					? resolve( JSON.parse( String( res ) ) )
					: resolve( res )
				);
			} )
		] ).then( res => {
			dispatch( setRankingState( res[ 0 ].id, res[ 0 ].gs, res[ 1 ], false, null ) )
		} ).catch( err => {
			dispatch( setRankingState( null, null, [], false, err.type === "network" ? `${ err.status }: ${ I18n.t( "ranking.fetchRankingError" ) }` : err.toString() ) );
		} );
	};
};

// 绑定高手
export function fetchFocus( gsid, type )
{
	return async function( dispatch )
	{
		if( type === "ETU" )
		{
			try
			{
				const res = await fetchPost( "/user.php", { "提交": "绑定高手", gsid: gsid } );
				dispatch( fetchRanking() );
				Toast.show( res );
			} catch( err )
			{
				Toast.show( err.type === "network" ? `${ err.status }: ${ I18n.t( "ranking.fetchFocusError" ) }` : err.toString() );
			};
		}
		
	};
};


// 解绑操作
export function fetchCancel( type )
{
	return async function( dispatch )
	{
		try
		{
			const res = await fetchPost( "/user.php", { "提交": "解绑高手" } );
			dispatch( fetchRanking() );
			Toast.show( res );
		} catch( err )
		{
			Toast.show( err.type === "network" ? `${ err.status }: ${ I18n.t( "ranking.fetchCancelError" ) }` : err.toString() );
		};
	};
};