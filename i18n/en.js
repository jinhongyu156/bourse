export default {
	bottomTabNavigator: {
		finance: "Finance",
		contract: "Contract",
		ctc: "Ctc",
		user: "User"
	},
	login: {
		placeholder: {
			email: "Please enter email address", phoneNumber: "Please enter your mobile phone number",
			password: "Please enter your password", code: "Please enter the code"
		},
		loginType: { phoneNumber: "Telephone number login", email: "Email login" },
		forgetPassword: "Forgot password",
		register: "I'm a new user",
		loginSubmitBtn: "Login",

		fetchImageCodeError: "failed get code",
		fetchLoginError: "login failed",
		inputError: "please complete the information",

		actionSheetBtn: "Language Settings",
		actionSheetTitle: "Please select language",
		actionSheetMessage: "The application is restarted after the language is reset",
		actionSheetOptions: [ "Chinese", "English", "Cancel" ]
	},
	register: {
		placeholder: {
			email: "Please enter email address", phoneNumber: "Please enter your mobile phone number",
			name: "Please enter your name", referee: "Please enter your referee",
			password: "Please enter your password", newPassword: "Please enter your new password",
			imageCode: "Please enter your image code", code: "Please enter the code"
		},
		registerType: { phoneNumber: "Telephone number register", email: "Email register" },
		findType: { phoneNumber: "Find by telephone number", email: "Find by email" },
		login: "login",
		adviceNote: "advice note",
		registerSubmitBtn: "register",
		forgetSubmitBtn: "submit",
		disclaimer: "User Agreement (Disclaimer)",

		inputError: "please complete the information",
		fetchImageCodeError: "failed get code",
		fetchRegisterError: "failed get register",

		registerSuccess: "Register Success",
		findSuccess: "Find Password Success",
		loginNow: "Login Now ?",
		cancel: "cancel",
		confirm: "confirm"
	},
	sendCode: {
		sendCode: "Send code",
		reSendCode: "Resend code",
		sendCodeError: "failed to send verification code",
		info: "cannot send if condition is not satisfied"
	},
	header: {
		trading: "Trading",
		investment: "investment",
		benefits: "Get the benefits"
	},
	finance: {
		exchange: {
			exchangeText: "Exchange",
			cancelText: "Cancel",
			potintExchange: "Potint Exchange",

			exchangeSuccess: "Exchange successful",
			exchangeFailure: "Exchange Failure",
			placeholder: "Input quantity",
			inputError: "Please fill in the correct amount",
			point: "Point",


			balance: "%{name} balance"
		},
		userInfo: {
			point: "Point",
			trading: "Trading",
			power: "Power",
			communityPerformance: "Performance",
			communityLevel: "Level",
			numberOfTeam: "Number of Team",
			todayEarnings: "Today earnings",
			yesterdayEarnings: "Yesterday Earnings",
			allEarnings: "All Earnings"
		},
		statement: {
			direction: "Direction",
			amount: "Amount",
			balance: "Balance",
			time: "Time",
			note: "Note",
			point: "Point",
			trading: "Trading",
			noData: "No data was queried"
		}
	}
};
