import { fetchPost, isObject } from "./../../javascripts/util.js";

/* action type */
export const ACTIONS_SET_CLASSROOM_DATA = "ACTIONS_SET_CLASSROOM_DATA";
export const ACTIONS_SET_CLASSROOM_LOADING = "ACTIONS_SET_CLASSROOM_LOADING";

// 获取课堂数据
export function getData()
{
	return async function( dispatch, getState )
	{
		const { classroom } = getState();

		dispatch( { type: ACTIONS_SET_CLASSROOM_LOADING, payload: true } );
		try
		{
			const res = await fetchPost( "/user.php", { "提交": "任务督导" } );

			if( isObject( res ) )
			{
				dispatch( { type: ACTIONS_SET_CLASSROOM_DATA, payload: res } );
			} else
			{
				dispatch( { type: ACTIONS_SET_CLASSROOM_DATA, payload: {} } );
			};

			dispatch( { type: ACTIONS_SET_CLASSROOM_LOADING, payload: false } );

		} catch( err )
		{
			dispatch( { type: ACTIONS_SET_CLASSROOM_LOADING, payload: false } );
		};
	};
};
