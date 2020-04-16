import { ACTION_SET_STORAGETOREDUX_ISSYNC } from "./../actions/storageToRedux.js";

const defaultState = {
	isSync: false								// 是否已同步 AsyncStorage
};

export default function( state = defaultState, action )
{
	switch( action.type )
	{
		case ACTION_SET_STORAGETOREDUX_ISSYNC:
			return Object.assign( {}, state, { isSync: action.payload } );

		default:
			return state;
	};
};
