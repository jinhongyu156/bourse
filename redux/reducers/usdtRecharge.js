import {
	ACTION_SET_USDTRECHARGE_ISSHOWPREVSTATE, ACTION_SET_USDTRECHARGE_ORDERDATA,
	ACTION_SET_USDTRECHARGE_INPUTTEXT, ACTION_SET_USDTRECHARGE_INPUTERROR, ACTION_SET_USDTRECHARGE_ISSHOWACTIONSHEET,
	ACTION_SET_USDTRECHARGE_FETCHRECHARGESUBMIT, ACTION_SET_USDTRECHARGE_FETCHNOTICEPAID
} from "./../actions/usdtRecharge.js";

const defaultState = {
	isShowPrevState: null,								// 是否显示上一个订单的状态

	orderData: {},										// 请求成功的订单数据; 订单的状态 -1: 不存在订单; 0: 待支付; 1: 已支付; 2: 已放币; 3: 完成; 4: 订单已取消
	fetchOrderDataLoading: false,						// 是否正在请求上个订单
	fetchOrderDataError: null,							// 上个订单请求错误

	rechargeType: 0,									// 充值方式 0: 银行卡
	actionSheetData: {},								// 充值方式 actionSheet 所需数据
	isShowActionSheet: false,							// 是否打开充值方式 actionSheet

	rechargeNumber: "",									// 充值数量
	drawee: "",											// 付款人
	inputError: {},										// 输入是否存在错误

	fetchRechargeSubmitLoading: false,					// 是否正在发送充值提交请求
	fetchRechargeSubmitError: null,						// 充值提交请求错误

	fetchNoticePaidLoading: false,						// 是否正在发送已完成付款操作请求
	fetchNoticePaidError: null							// 已完成付款操作请求错误
};

export default function( state = defaultState, action )
{
	switch( action.type )
	{
		case ACTION_SET_USDTRECHARGE_ISSHOWPREVSTATE:
			return Object.assign( {}, state, { isShowPrevState: action.payload } );

		case ACTION_SET_USDTRECHARGE_ORDERDATA:
			return Object.assign( {}, state, action.payload );

		case ACTION_SET_USDTRECHARGE_INPUTTEXT:
			return Object.assign( {}, state, action.payload );

		case ACTION_SET_USDTRECHARGE_INPUTERROR:
			return Object.assign( {}, state, { inputError: action.payload } );

		case ACTION_SET_USDTRECHARGE_ISSHOWACTIONSHEET:
			return Object.assign( {}, state, action.payload );

		case ACTION_SET_USDTRECHARGE_FETCHRECHARGESUBMIT:
			return Object.assign( {}, state, action.payload );

		case ACTION_SET_USDTRECHARGE_FETCHNOTICEPAID:
			return Object.assign( {}, state, action.payload );

		default:
			return state;
	};
};


