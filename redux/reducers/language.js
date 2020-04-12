import { ACTION_SET_USERLANGUAGE } from "./../actions/language.js";

const defaultState = {
	userLanguage: null,							// 由用户选择的语言包
};

export default function( state = defaultState, action )
{
	switch( action.type )
	{
		case ACTION_SET_USERLANGUAGE:
			console.log( "haha" )
			return Object.assign( {}, state, { userLanguage: action.payload } );
		default:
			return state;

	};
};