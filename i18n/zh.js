export default {
	bottomTabNavigator: {
		finance: "金融",
		contract: "合约",
		ctc: "币币",
		user: "用户"
	},
	login: {
		placeholder: { email: "请输入电子邮箱", phoneNumber: "请输入电话号码", password: "请输入密码", code: "请输入验证码" },
		loginType: { phoneNumber: "电话号码登录", email: "邮箱登录" },
		forgetPassword: "忘记密码 ?",
		register: "立即注册",
		loginSubmitBtn: "登录",

		fetchImageCodeError: "获取失败",
		fetchLoginError: "登录失败",
		inputError: "请将信息填写完整",

		actionSheetLanguageBtn: "语言设置",
		actionSheetLanguageTitle: "请选择语言",
		actionSheetLanguageMessage: "重置语言后将重启应用",
		actionSheetLanguageOptions: [ "中文", "英文", "取消" ],

		actionSheetThemeBtn: "主题设置",
		actionSheetThemeTitle: "请选择主题",
		actionSheetThemeOptions: [ "简约版", "科技版", "取消" ]
	},
	register: {
		placeholder: {
			email: "请输入电子邮箱", phoneNumber: "请输入电话号码", name: "请输入姓名", referee: "请输入推荐人",
			password: "请输入密码", newPassword: "请输入新密码",
			imageCode: "请输入图片验证码", code: "请输入设备验证码"
		},
		registerType: { phoneNumber: "电话号码注册", email: "邮箱注册" },
		findType: { phoneNumber: "通过电话号码", email: "通过邮箱" },
		login: "去登录",
		adviceNote: "用户协议(免责声明)",
		registerSubmitBtn: "注册",
		forgetSubmitBtn: "提交",
		disclaimer: "用户协议(免责声明)",

		inputError: "请将信息填写完整",
		fetchImageCodeError: "获取失败",
		fetchRegisterError: "注册失败",
	
		registerSuccess: "注册成功",
		findSuccess: "找回密码成功",
		loginNow: "现在就去登录 ?",
		cancel: "取消",
		confirm: "确定"

	},
	sendCode: {
		sendCode: "发送验证码",
		reSendCode: "重发验证码",
		sendCodeError: "发送验证码失败",
		info: "条件不满足无法发送"
	},
	header: {
		trading: "交易金",
	},
	finance: {
		quit: "再按一次退出应用",
		tip1: "存在新版本可以更新",
		tip2: "请更新以便获得更好的体验",
		confirm: "确定",
		header: {
			tip: "注: 最低兑换 300 交易金起投",
			trading: "交易金",
			hashrate: "算力",
			fetchGetBenefitsError: "领取收益失败",
			investETU: "投资ETU金融",
			investment: "投资",
			benefits: "领取收益"
		},
		exchange: {
			exchangeText: "兑换",
			cancelText: "取消",
			potintExchange: "积分兑换",

			exchangeSuccess: "兑换成功",
			exchangeFailure: "兑换失败",
			placeholder: "输入兑换数量",
			inputError: "请填写正确的金额",
			point: "积分",

			balance: "%{name}余额"
		},
		userInfo: {
			point: "积分余额",
			trading: "交易金",
			power: "算力",
			communityPerformance: "社区业绩",
			communityLevel: "社区等级",
			numberOfTeam: "团队人数",
			todayEarnings: "今日收益",
			yesterdayEarnings: "昨日收益",
			allEarnings: "累计收益"
		},
		statement: {
			direction: "流水方向",
			amount: "流水金额",
			balance: "用户余额",
			time: "流水时间",
			note: "备注",
			point: "积分",
			trading: "交易金",
			noData: "未查询到数据",
			fetchStatementError: "获取流水数据失败"
		}
	},
	contract: {
		header: {
			chart: "走势",
			recharge: "充值",
			withdrawal: "提现"
		},
		trading: "交易金",
		buyUp: "买涨",
		cashDeposit: "保证金",
		NumberOfHand: "手数",
		buyDown: "买跌",
		btc: "比特币",
		gold: "黄金",
		oil: "原油",
		submitMessage: "确定是否平仓",
		cancel: "取消",
		confirm: "确定",
		closing: "平仓",
		submitSuccess: "下单成功",
		submitError: "下单失败",
		fetchClosingSuccess: "平仓成功",
		fetchClosingError: "平仓失败",
		fetchDataError: "数据获取失败",

		time: "建仓时间",
		orderId: "订单号",
		unsubscribe: "委托退订",
		currentValue: "当前价值",
		amount: "已缴金额",
		serviceFee: "服务费",
		buy: "做多",
		sell: "做空"
	},
	ctc: {
		name: "名称",
		unit: "最新价",
		number: "数量",
		total: "价值",
		type1: "冲提币种",
		type2: "交易币种",

		price: "价值",
		charge: "充币",
		mention: "提币",
		buy: "买入",
		sell: "卖出",
		turn: "转币",

		fetchDataError: "获取失败",

		sellSuccess: "卖出成功",
		sellError: "卖出失败",
		buySuccess: "购买成功",
		buyError: "购买成功"
	},
	recharge: {
		copySuccess: "复制成功",
		title: "充币",
		address: "收币地址",
		placeholderAddress: "请先获取公司充币地址",
		getAddress: "获取",
		copy: "复制",
		placeholderNumber: "请输入充币数量",
		number: "充币数量",
		placeholderNote: "推荐填写本平台 ID 号",
		note: "转账备注",
		submitText: "我已充币",
		tip1: "1、本次充币地址有效时间120分钟",
		tip2: "2、当前公司收币地址为一次性地址，下次充币会变更地址，请勿重复使用",
		tip3: "3、充币后请务必点击<我已充币>",
		tip4: "4、确认充币入账后，如果十分钟依然未到账，请拨打18244444404服务热线",
		fetchAddressError: "获取地址失败",
		fetchSubmitError: "充值失败",
		fetchSubmitSuccess: "充值成功",
		submitError: "请正确的填写信息"
	},
	mention: {
		title: "提币",
		usable: "可用数量",
		address: "提币地址",
		number: "提币数量",
		fee: "服务费用",
		password: "资金密码",

		placeholderAddress: "请输入基于以太坊网络的钱包地址",
		placeholderNumber: "请输入提币数量",
		placeholderPassword: "请输入资金密码",

		submitText: "确认提币",
		tip1: "1: 服务费将在余额中扣除",
		tip2: "2: 提币时间上午9点至上午12点, 到账时间,提币开始计算72小时之内",
		tip3: "3: 资金密码为账户登录密码",
		tip4: "4: 提币地址请输入基于以太坊网络的钱包地址0x开头",
		tip5: "5: 您当前所选币种为[%{name}]请核对是否是%{name}币种钱包地址，如填写错误会导致提币流失，与平台无关。请仔细核对",

		fetchUsableError: "获取可用数量失败",
		fetchSubmitError: "提币失败",
		fetchSubmitSuccess: "提币成功",
		submitError1: "请正确的填写信息",
		submitError2: "输入数量不能大于可用数量"
	},
	usdtRecharge: {
		title: "充值( USDT )",
		fetchOrderDataError: "查询订单错误",
		usdtPrice: "当前报价",
		rechargeNumber: "充值数量",
		rechargeNumberPlaceholder: "请输入充值数量",

		rechargeType: "充值方式",
		rechargeTypeActionSheetTitle: "请选择充值方式",
		rechargeTypeActionSheetMessage: "选择后将以该方式进行充值",
		rechargeTypeActionSheetOptions: [ "银行卡", "取消" ],
		bank: "银行卡",
		other: "其他",
		submitText: "提交",
		countdownText: "请在 %{seconds} 秒内完成付款",
		noticePaid: "通知已付款",
		fetchNoticePaidError: "通知已付款请求失败",
		inputNoticePaidError: "T请正确的填写信息",
		fetchRechargeSubmitError: "获取订单数据失败",
		inputRechargeSubmitError: "请正确的填写信息",

		orderId: "交易号",
		state: "状态",
		bankName: "银行名称",
		accountTitle: "账户名称",
		account: "银行账号",
		amount: "付款金额",
		currency: "币种",
		drawee: "付款人",
		draweePlaceholder: "请填写付款人",
		copy: "复制",
		rechargeAgain: "继续充值",
		copySuccess: "复制成功",
		state0tip: "待支付",
		state1tip: "已支付, 等待放币",
		state2tip: "已放币, 等待审核",
		state3tip: "充值完成",
		state4tip: "充值已被取消",

		tip1: "单笔最高不能超过 4.9 万人民币",
		tip2: "最低充值 20 USDT",
		tip3: "只能输入整数的充值数量",

		tip4: "转账时请勿填写任何备注信息! 否则可能导致账户被冻结, 造成的损失平台概不负责",
		tip5: "请在转账时, 填写正确的转账金额, 若金额不正确, 会导致充值失败",
		tip6: "请正确付款后, 填写付款人送出"
	},
	turn: {
		title: "转币",
		number: "转币数量",
		account: "转入账号",
		password: "资金密码",

		placeholderNumber: "请输入转币数量",
		placeholderAccount: "请输入转入的 ID 号",
		placeholderPassword: "请输入资金密码",

		submitText: "确认转币",
		fetchSubmitError: "转币失败",
		fetchSubmitSuccess: "转币成功",
		submitError: "请正确的填写信息"
	},
	user: {
		header: {
			chart: "推广码",
			theme: "主题",
			tip1: "欢迎注册香港数字",
			tip2: "注册免费赠送10USDT"
		},
		myClient: "我的客户",
		myInfo: "我的信息",
		editPassword: "登录密码",
		query: "查询",
		subAccounts: "子账户列表",
		bindSubaccount: "绑定子账号",
		hotkey: "一键领取",
		summarize: "资金归集",
		downloadCenter: "下载中心",
		introduction: "公司介绍",
		contract: "投资合同",
		repo: "矿机回购",
		userCenter: "用户中心",
		systemCenter: "系统中心",
		newbieGuide: "新手指南",
		vouchers: "代金券",
		language: "语言",
		logout: "退出登录",

		trading: "交易金",
		tailNumber: "尾号",
		noDataText: "未查询到数据",
		goBack: "返回上一级",

		fetchUserDetailDataError: "获取用户数据失败",
		fetchMyClientDataError: "获取客户数据失败",

		oldPasswordPlaceholder: "请输入旧密码",
		oldPassword: "旧密码",
		newPasswordPlaceholder: "请输入新密码",
		newPassword: "新密码",
		confirmPassWordPlaceholder: "请重复输入新密码",
		confirmPassWord: "确认密码",
		editPasswordSubmit: "提交",
		fetchEditPassWordError: "修改密码失败",
		fetchEditPassWordSuccess: "修改密码成功",
		inputEditPassWordError: "请将信息填写完整",

		actionSheetTitle: "请选择查询方式",
		queryStatement: "查询流水",
		otc: "OTC交易",
		c2c: "C2C交易",
		switch: "切换",
		cancel: "取消",

		statement: "流水",
		amount: "金额",
		balance: "余额",
		direction: "方向",
		number: "数量",
		profit: "盈亏",

		openNumber: "建仓点数",
		closeNumber: "平仓点数",
		totalAmount: "总金额",
		totalFee: "总手续费",
		openTime: "建仓时间",
		closeTime: "平仓时间",

		time: "时间",
		orderId: "订单号",
		note: "备注",

		fetchUserQueryDataError: "查询用户数据失败",

		name: "姓名",
		account: "账号",
		operation: "操作",
		unbind: "解绑",

		fetchSubAccountsError: "查询子账户数据失败",
		fetchUnbindError: "解除绑定失败",
		fetchUnbindSuccess: "解除绑定成功",

		subAccountText: "子账户账号",
		subAccountPassWordText: "子账户密码",
		subAccountTextPlaceholder: "请输入子账户账号",
		subAccountPassWordTextPlaceholder: "请输入子账户密码",
		bindSubaccountSubmit: "绑定",
		fetchBindSubaccountSuccess: "绑定成功",
		fetchBindSubaccountError: "绑定失败",
		inputBindSubaccountError: "请将信息填写完整",

		fetchHotkeyDataError: "一键领取数据获取失败",
		fetchSummarizeDataError: "资金归集数据获取失败",
		fetchElectronicContractDataError: "投资合同数据获取失败",
		introductionP1: "香港数字资产有限公司于2018年9月在香港荃湾沙嘴道嘉达环球中心成立, 公司配备专业的数字资产技术开发团队、顶尖的数字货币现货与合约交易团队、权威的金融分析师与风控团队、成熟的矿机组装与软件开发团队等.",
		introductionP2: "公司主要经营业务有数字资产交易运营、国际大宗商品合约交易、实体矿机技术服务及销售等.同时香港数字资产有限公司也是唯一家拥有国资背景的顶尖涉足数字资产的有限公司.",
		downloadSuccess: "下载成功",
		noContract: "未进行投资",
		wait: "请稍等",
		version: "版"
	},
	chart: {
		noDataText: "未查询到数据",
		fetchOrderListDataError: "获取列表数据失败",
		fetchUserDetailDataError: "获取用户数据失败",
		fetchUserOrderListDataError: "获取用户委托单失败",
		fetchKLineDataError: "获取 K 线数据失败",
		fetchCancelUserOrderSuccess: "撤单成功",
		fetchCancelUserOrderError: "撤单失败",
		fetchOrderSubmitSuccess: "下单成功",
		fetchOrderSubmitInputError: "请将信息填写完整",
		fetchOrderSubmitError: "下单失败",

		buy: "买入",
		sell: "卖出",
		marketBuy: "市价买入",
		priceBuy: "限价买入",
		marketSell: "市价卖出",
		priceSell: "限价卖出",

		orderParamsTip: "以市场成交价为准",
		price: "价格",
		pricePlaceholder: "请输入价格",
		number: "数量",
		numberPlaceholder: "请输入数量",
		poundage: "手续费",
		buyFree: "买入免费",

		entrustNumber: "委托数量",
		entrustPrice: "委托单价",
		entrustDirection: "委托方向",
		operation: "操作",
		dealNumber: "成交数量",
		dealPrice: "成交单价",
		dealDirection: "成交方向",
		state: "状态",

		cancel: "撤单",
		complete: "完成",

		currentEntrust: "当前委托",
		historyEntrust: "历史委托"
	},
	floatAction: {
		etuDynamic: "ETU动态",
		etuNotice: "ETU公告",
		companyDynamic: "中外矿业动态",
		transactionInformation: "交易资讯",
		fetchDataError: "获取数据失败",
		noDataText: "暂无记录",
	}
};




