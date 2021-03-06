import { ACTION_SET_ACCESS_COIN, ACTION_SET_ACCESS_USABLE, ACTION_SET_ACCESS_ADDRESS, ACTION_SET_ACCESS_INPUTTEXT, ACTION_SET_ACCESS_INPUTERROR, ACTION_SET_ACCESS_ISLOADING, ACTION_SET_ACCESS_FETCHSUBMITERROR, ACTION_SET_ACCESS_ACTIONSHEETDATA, ACTION_SET_ACCESS_ACCOUNTINDEX, ACTION_SET_ACCESS_CLEAR } from "./../actions/access.js";

const defaultState = {
	coin: "",															// 当前币种
	usable: "",															// 可用数量
	address: "",														// 地址
	account: "",														// 转入账号 Id
	phone: "",															// 转入账号 电话
	code: "",															// 提币验证码
	number: "",															// 数量
	fee: 0,																// 服务费
	note: "",															// 备注
	password: "",														// 密码
	inputError: {},														// 输入是否存在错误

	accountIndex: null,													// 当前选中的账户验证方式
	actionSheetData: {},												// 账户信息弹出数据
	isShowActionSheet: false,											// 是否显示 actionSheet

	isLoading: false,													// 是否正在提交
	fetchAddressError: null,											// 获取地址错误
	fetchUsableError: null,												// 获取可用数量错误
	fetchSubmitError: null												// 提交错误
};


export default function( state = defaultState, action )
{
	switch( action.type )
	{
		case ACTION_SET_ACCESS_COIN:
			return Object.assign( {}, state, { coin: action.payload } );

		case ACTION_SET_ACCESS_USABLE:
			return Object.assign( {}, state, { usable: action.payload.usable, fetchUsableError: action.payload.fetchUsableError } );

		case ACTION_SET_ACCESS_ADDRESS:
			return Object.assign( {}, state, { address: action.payload.address, fetchAddressError: action.payload.fetchAddressError } );

		case ACTION_SET_ACCESS_INPUTTEXT:
			return Object.assign( {}, state, action.payload );

		case ACTION_SET_ACCESS_INPUTERROR:
			return Object.assign( {}, state, { inputError: action.payload } );

		case ACTION_SET_ACCESS_ISLOADING:
			return Object.assign( {}, state, { isLoading: action.payload } );

		case ACTION_SET_ACCESS_FETCHSUBMITERROR:
			return Object.assign( {}, state, { fetchSubmitError: action.payload } );

		case ACTION_SET_ACCESS_ACCOUNTINDEX:
			return Object.assign( {}, state, { accountIndex: action.payload } );

		case ACTION_SET_ACCESS_ACTIONSHEETDATA:
			return Object.assign( {}, state, action.payload );

		case ACTION_SET_ACCESS_CLEAR:
			console.log( "clear", Object.assign( {}, state, defaultState ) );
			return Object.assign( {}, state, defaultState );

		default:
			return state;
	};
};
