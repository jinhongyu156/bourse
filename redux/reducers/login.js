import { ACTION_SET_ISLOADING } from "./../actions/login.js";

const defaultState = {
	isLoading: false,							// 是否正在登录
};

export default function( state = defaultState, action )
{
	switch( action.type )
	{
		default:
			return state;

	};
};