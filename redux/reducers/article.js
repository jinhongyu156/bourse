import { ACTION_SET_ARTICLE_DATA } from "./../actions/article.js";

const defaultState = {
	data: [],
	loading: false,
	error: null
};

export default function( state = defaultState, action )
{
	switch( action.type )
	{
		case ACTION_SET_ARTICLE_DATA:
			return Object.assign( {}, state, action.payload );

		default:
			return state;

	};
};