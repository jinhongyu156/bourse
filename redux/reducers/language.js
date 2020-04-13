import { ACTION_SET_USERLANGUAGE, ACTION_SET_ISSYNC } from "./../actions/language.js";

const defaultState = {
	userLanguage: null,							// 由用户选择的语言包
	isSync: false								// 是否已同步 AsyncStorage
};

export default function( state = defaultState, action )
{
	switch( action.type )
	{
		case ACTION_SET_USERLANGUAGE:
			return Object.assign( {}, state, { userLanguage: action.payload } );
		case ACTION_SET_ISSYNC:
			return Object.assign( {}, state, { isSync: true } );
		default:
			return state;

	};
};