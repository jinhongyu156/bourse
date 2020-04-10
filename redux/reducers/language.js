import { ACTION_SET_LANGUAGE } from "./../actions/language.js";

const defaultState = {
	language: 1,							// 中文: 1, 英文: 2
};

export default function( state = defaultState, action )
{
	switch( action.type )
	{
		case ACTION_SET_LANGUAGE:
			return Object.assign( {}, state, { language: action.payload } );

		default:
			return state;

	};
};