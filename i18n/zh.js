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
		investment: "投资",
		benefits: "领取收益"
	},
	finance: {
		exchange: {
			exchangeText: "兑换",
			potintExchange: "积分兑换"
		},
		userInfo: {
			point: "积分金额",
			trading: "交易金",
			power: "算力",
			communityPerformance: "社区业绩",
			communityLevel: "社区等级",
			numberOfTeam: "团队人数",
			todayEarnings: "今日收益",
			yesterdayEarnings: "昨日等级",
			allEarnings: "累计收益"
		}
	}
};

