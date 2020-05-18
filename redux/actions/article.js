import { fetchPost, isArray } from "./../../javascripts/util.js";
/* action type */
export const ACTION_SET_ARTICLE_DATA = "ACTION_SET_ARTICLE_DATA";

/* action create */
// 设置 data, error, loading
function setData( data, loading, error )
{
	return { type: ACTION_SET_ARTICLE_DATA, payload: { data, error, loading } };
};

// 请求数据
export function fetchData( index )
{
	return async function( dispatch )
	{
		dispatch( setData( [], true, null ) );
		try
		{
			const res = await fetchPost( "/user.php", { "提交": "news", "status": index } );
			console.log( "res", res );
			if( res && isArray( res ) )
			{
				dispatch( setData( res, false, null ) )
			} else
			{
				dispatch( setData( [], false, null ) );
			};
		} catch( err )
		{
			console.log( "err", err );
			dispatch( setData( [], false, err.type === "network" ? `${ err.status }: ${ I18n.t( "floatAction.fetchDataError" ) }` : err.err.toString() ) );
		};
	};
};