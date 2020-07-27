import { ACTIONS_SET_CLASSROOM_DATA, ACTIONS_SET_CLASSROOM_LOADING } from "./../actions/classroom.js";

const defaultState = { data: {}, loading: false };

export default function( state = defaultState, action )
{
	switch( action.type )
	{

		case ACTIONS_SET_CLASSROOM_DATA:
			return Object.assign( {}, state, { data: action.payload } );

		case ACTIONS_SET_CLASSROOM_LOADING:
			return Object.assign( {}, state, { loading: action.payload } );

		default:
			return state;

	};
};
