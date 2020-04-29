import {
	ACTION_SET_USER_TABINDEX1, ACTION_SET_USER_TABINDEX2,
	ACTION_SET_USER_USERDETAILDATA,
	ACTION_SET_USER_MYCLIENTDATA
} from "./../actions/user.js";

const defaultState = {
	tabIndex1: 0,										// 0: 用户中心; 1: 系统中心; 2: 新手指南
	tabIndex2: 0,										// if( tabIndex1 === 0 ) 0: 我的客户; 1: 我的信息; 2: 登录密码修改
														// if( tabIndex1 === 1 ) 0: 子账户列表; 1: 绑定子账户; 2: 一件领取; 3: 资金归集
														// if( tabIndex1 === 1 ) 0: 下载中心; 1: 公司介绍; 2: 投资合同; 3: 矿机回购

	userDetailData: {},									// 用户详细数据
	fetchUserDetailDataError: null,						// 用户详细数据请求错误

	myClientData: [],									// 我的客户数据
	isLoadingMyClientData: false,						// 是否正在加载我的客户数据
	fetchMyClientDataError: null						// 用户我的客户数据请求错误
};


export default function( state = defaultState, action )
{
	switch( action.type )
	{
		case ACTION_SET_USER_TABINDEX1:
			return Object.assign( {}, state, { tabIndex1: action.payload } );

		case ACTION_SET_USER_TABINDEX2:
			return Object.assign( {}, state, { tabIndex2: action.payload } );

		case ACTION_SET_USER_USERDETAILDATA:
			return Object.assign( {}, state, action.payload );

		case ACTION_SET_USER_MYCLIENTDATA:
			return Object.assign( {}, state, action.payload );

		default:
			return state;
	};
};
