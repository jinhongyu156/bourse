export default {
	bottomTabNavigator: [ "金融", "合约", "币币", "用户" ],
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

		inputError: "请将信息填写完整",
		fetchImageCodeError: "获取失败",
		fetchRegisterError: "注册失败"

	},
	sendCode: {
		sendCode: "发送验证码",
		reSendCode: "重发验证码",
		sendCodeError: "发送验证码失败",
		info: "条件不满足无法发送"
	}
};
