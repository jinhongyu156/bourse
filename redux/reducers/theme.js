import { ACTION_SET_THEME_THEME } from "./../actions/theme.js";

const defaultState = {
	theme: null
};

export default function( state = defaultState, action )
{
	switch( action.type )
	{
		case ACTION_SET_THEME_THEME:
			return Object.assign( {}, state, { theme: action.payload } );

		default:
			return state;
	};
};

