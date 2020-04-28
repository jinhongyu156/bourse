import { ACTIONS_SET_CTC_FETCHSTATE, ACTIONS_SET_CTC_DATA, ACTIONS_SET_CTC_ORIGINALDATA, ACTIONS_SET_CTC_FETCHLOADING, ACTIONS_SET_CTC_RATE } from "./../actions/ctc.js";

const defaultState = {
	id: "",
	data: [],
	originalData: {},
	rate: 0,
	fetchLoading: false,
	fetchError: null
};

export default function( state = defaultState, action )
{
	switch( action.type )
	{
		case ACTIONS_SET_CTC_FETCHSTATE:
			return Object.assign( {}, state, { id: action.payload.id, data: action.payload.data, fetchLoading: action.payload.fetchLoading, fetchError: action.payload.fetchError } );

		case ACTIONS_SET_CTC_DATA:
			return Object.assign( {}, state, { data: action.payload } );

		case ACTIONS_SET_CTC_ORIGINALDATA:
			return Object.assign( {}, state, { originalData: action.payload } );

		case ACTIONS_SET_CTC_FETCHLOADING:
			return Object.assign( {}, state, { fetchLoading: action.payload } );

		case ACTIONS_SET_CTC_RATE:
			return Object.assign( {}, state, { rate: action.payload } );

		default:
			return state;
	};
};
