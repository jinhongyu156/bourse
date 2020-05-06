import {
	ACTION_SET_USER_TABINDEX1, ACTION_SET_USER_TABINDEX2,
	ACTION_SET_USER_USERDETAILDATA,
	ACTION_SET_USER_MYCLIENTDATA,
	ACTION_SET_USER_INPUTTEXT, ACTION_SET_USER_INPUTERROR, ACTION_SET_USER_ISLOADINGEDITPASSWORD, ACTION_SET_USER_FETCHEDITPASSWORDERROR, ACTION_SET_USER_CLEAREDITPASSWORD,
	ACTION_SET_USER_QUERYNAVINDEX, ACTION_SET_USER_QUERYTYPEINDEX, ACTION_SET_USER_ISSHOWACTIONSHEET, ACTION_SET_USER_USERQUERYDATA,
	ACTION_SET_USER_SUBACCOUNTSDATA, ACTION_SET_USER_ISLOADINGBINDSUBACCOUNT, ACTION_SET_USER_FETCHBINDSUBACCOUNTERROR, ACTION_SET_USER_CLEARBINDSUBACCOUNT,
	ACTION_SET_USER_HOTKEYDATA, ACTION_SET_USER_SUMMARIZEDATA, ACTION_SET_USER_ELECTRONICCONTRACTDATA
} from "./../actions/user.js";

const defaultState = {
	tabIndex1: 0,										// 0: 用户中心; 1: 系统中心; 2: 新手指南
	tabIndex2: 0,										// if( tabIndex1 === 0 ) 0: 我的客户; 1: 我的信息; 2: 登录密码修改; 3: 查询
														// if( tabIndex1 === 1 ) 0: 子账户列表; 1: 绑定子账户; 2: 一件领取; 3: 资金归集
														// if( tabIndex1 === 1 ) 0: 下载中心; 1: 公司介绍; 2: 投资合同; 3: 矿机回购

	userDetailData: {},									// 用户详细数据
	fetchUserDetailDataError: null,						// 用户详细数据请求错误

	myClientData: [],									// 我的客户数据
	isLoadingMyClientData: false,						// 是否正在加载我的客户数据
	fetchMyClientDataError: null,						// 用户我的客户数据请求错误

	oldPassWord: "",									// 旧密码
	newPassWord: "",									// 新密码
	confirmPassWord: "",								// 确认密码
	isLoadingEditPassWord: false,						// 是否正在修改密码
	fetchEditPassWordError: null,						// 修改密码请求错误
	inputError: {},										// 修改密码输入错误

	queryNavIndex: 0,									// 0: USDT; 1: ETUST, 2: 交易金, 3: SLBT, 4: 代金券
	queryTypeIndex: 0,									// 0: 查询流水, 1: OTC交易
	isShowActionSheet: false,							// 是否打开 actionSheet
	actionSheetData: {},								// actionSheet 数据
	userQueryData: [],									// 用户查询的数据
	isLoadingUserQueryData: false,						// 是否正在加载用户查询的数据
	fetchUserQueryDataError: null,						// 用户查询的数据请求失败

	subAccountsData: [],								// 子账户数据
	isLoadingSubAccountsData: false,					// 是否正在请求子账户数据
	fetchSubAccountsError: null,						// 请求子账户数据错误

	subAccountText: "",									// 绑定子账户输入的子账户账号文本
	subAccountPassWordText: "",							// 绑定子账户输入的子账户密码文本
	isLoadingBindSubAccount: false,						// 是否正在绑定子账户
	fetchBindSubAccountError: null,						// 绑定子账户请求失败

	hotkeyData: [],										// 一键领取数据
	isLoadingHotkeyData: false,							// 是否正在加载一键领取数据
	fetchHotkeyDataError: null,							// 一键领取数据请求失败

	summarizeData: [],									// 资金归集数据
	isLoadingSummarizeData: false,						// 是否正在加载资金归集数据
	fetchSummarizeDataError: null,						// 资金归集数据请求失败

	electronicContractData: {},							// 电子合同数据
	fetchElectronicContractDataError: null				// 电子合同数据请求失败

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

		case ACTION_SET_USER_INPUTTEXT:
			return Object.assign( {}, state, action.payload );

		case ACTION_SET_USER_INPUTERROR:
			return Object.assign( {}, state, { inputError: action.payload } );

		case ACTION_SET_USER_ISLOADINGEDITPASSWORD:
			return Object.assign( {}, state, { isLoadingEditPassWord: action.payload } );

		case ACTION_SET_USER_FETCHEDITPASSWORDERROR:
			return Object.assign( {}, state, { fetchEditPassWordError: action.payload } );

		case ACTION_SET_USER_CLEAREDITPASSWORD:
			return Object.assign( {}, state, { oldPassWord: "", newPassWord: "", confirmPassWord: "", isLoadingEditPassWord: false, fetchEditPassWordError: null, inputError: {} } )

		case ACTION_SET_USER_QUERYNAVINDEX:
			return Object.assign( {}, state, { queryNavIndex: action.payload } );

		case ACTION_SET_USER_QUERYTYPEINDEX:
			return Object.assign( {}, state, { queryTypeIndex: action.payload } );

		case ACTION_SET_USER_ISSHOWACTIONSHEET:
			return Object.assign( {}, state, { isShowActionSheet: action.payload.isShowActionSheet, actionSheetData: action.payload.actionSheetData } );

		case ACTION_SET_USER_USERQUERYDATA:
			return Object.assign( {}, state, action.payload );

		case ACTION_SET_USER_SUBACCOUNTSDATA:
			return Object.assign( {}, state, action.payload );

		case ACTION_SET_USER_ISLOADINGBINDSUBACCOUNT:
			return Object.assign( {}, state, { isLoadingBindSubAccount: action.payload } );

		case ACTION_SET_USER_FETCHBINDSUBACCOUNTERROR:
			return Object.assign( {}, state, { fetchBindSubAccountError: action.payload } );

		case ACTION_SET_USER_CLEARBINDSUBACCOUNT:
			return Object.assign( {}, state, { subAccountText: "", subAccountPassWordText: "", isLoadingBindSubAccount: false, fetchBindSubAccountError: null, inputError: {} } );

		case ACTION_SET_USER_HOTKEYDATA:
			return Object.assign( {}, state, action.payload );

		case ACTION_SET_USER_SUMMARIZEDATA:
			return Object.assign( {}, state, action.payload );

		case ACTION_SET_USER_ELECTRONICCONTRACTDATA:
			return Object.assign( {}, state, action.payload );

		default:
			return state;
	};
};