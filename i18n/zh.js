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

		actionSheetBtn: "语言设置",
		actionSheetTitle: "请选择语言",
		actionSheetMessage: "重置语言后将重启应用",
		actionSheetOptions: [ "中文", "英文", "取消" ]
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
			chart: "走势"
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
		submitSuccess: "提交成功",
		submitError: "提交失败",
		fetchDataError: "数据获取失败",

		time: "建仓时间",
		orderId: "订单号",
		unsubscribe: "委托退订",
		currentValue: "当前价值",
		amount: "已缴金额",
		serviceFee: "服务费",
		buy: "购买",
		sell: "出售"
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

		placeholderAddress: "请输入基于以太坊网络的钱",
		placeholderNumber: "请输入提币数量",
		placeholderPassword: "请输入资金密码",

		submitText: "确认提币",
		tip1: "1: 服务费将在余额中扣除",
		tip2: "2: 提币时间上午9点至上午12点, 到账时间,提币开始计算72小时之内",
		tip3: "3: 资金密码为账户登录密码",
		tip4: "4: 提币地址请输入基于以太坊网络的钱包地址0x开头",
		tip5: "5: 您当前所选币种为[ETH]请核对是否是ETH币种钱包地址，如填写错误会导致提币流失，与平台无关。请仔细核对",

		fetchUsableError: "获取可用数量失败",
		fetchSubmitError: "提币失败",
		fetchSubmitSuccess: "提币成功",
		submitError1: "请正确的填写信息",
		submitError2: "输入数量不能大于可用数量"
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
	}
};
