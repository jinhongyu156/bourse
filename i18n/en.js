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
		trading: "Trading"
	},
	finance: {
		header: {
			tip: "Note: minimum exchange of 300 trading gold minimum investment",
			trading: "trading",
			hashrate: "hashrate",
			fetchGetBenefitsError: "Failure to collect proceeds",
			investETU: "investETU",
			investment: "Investment",
			benefits: "Get benefits"
		},
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
			noData: "No data was queried",
			fetchStatementError: "Failed to obtain flow data"
		}
	},
	contract: {
		header: {
			chart: "Charts"
		},
		trading: "Trading",
		buyUp: "Up",
		cashDeposit: "Deposit",
		NumberOfHand: "Hand",
		buyDown: "Down",
		btc: "BTC",
		gold: "GOLD",
		oil: "OIL",
		submitMessage: "Determine whether to close the position",
		cancel: "cancel",
		confirm: "confirm",
		closing: "closing",
		submitSuccess: "Submit Successfully",
		submitError: "Submit Failure",
		fetchDataError: "Data acquisition failure",

		time: "Warehousing time",
		orderId: "The order number",
		unsubscribe: "Entrusted to unsubscribe",
		currentValue: "The current value",
		amount: "The amount paid",
		serviceFee: "The service fee",
		buy: "Buy",
		sell: "Sell"
	},
	ctc: {
		name: "Name",
		unit: "Unit",
		number: "Number",
		total: "Total",
		type1: "Rushed to mention currencies",
		type2: "Trading currencies",

		price: "Price",
		charge: "Charge",
		mention: "Mention",
		buy: "Buy",
		sell: "Sell",
		turn: "Turn",

		fetchDataError: "Fail to get",

		sellSuccess: "Sell success",
		sellError: "Sell failure",
		buySuccess: "Buy success",
		buyError: "Buy success"
	},
	recharge: {
		copySuccess: "Copy Success",
		title: "Charge",
		address: "Address",
		placeholderAddress: "Please get address first",
		getAddress: "Get",
		copy: "Copy",
		placeholderNumber: "Please enter the charge amount",
		number: "Number",
		placeholderNote: "It is recommended to fill in the ID number of this platform",
		note: "Remark",
		submitText: "Submit",
		tip1: "1. The valid time of this coin charging address is 120 minutes ",
		tip2: "2. The current receipt address of the company is a one-time address. The address will be changed next time.",
		tip3: "3. Please be sure to click Submit after charging.",
		tip4: "4. If the bill doesn't arrive after 10 minutes, please call 18244444404 service hotline.",
		fetchAddressError: "Failed to get address",
		fetchSubmitError: "Top-up failure",
		fetchSubmitSuccess: "Top-up Success",
		submitError: "Please fill in the information correctly"
	},
	mention: {
		title: "Mention",
		usable: "Usable",
		address: "Address",
		number: "Number",
		fee: "Fee",
		password: "Password",

		placeholderAddress: "Please enter ethereum-based money",
		placeholderNumber: "Please enter the number of withdrawals",
		placeholderPassword: "Please enter money password",

		submitText: "Mention",
		tip1: "1: The service charge will be deducted from the balance",
		tip2: "2: Withdrawal time: 9:00 a.m. to 12:00 a.m., arrival time: within 72 hours after the withdrawal begins",
		tip3: "3: Fund password is account login password",
		tip4: "4: Please enter your ethereum based wallet address 0x",
		tip5: "5: The currency you currently choose is [ETH] please check whether it is the ETH currency wallet address. If you fill in the wrong will lead to the withdrawal of COINS, which has nothing to do with the platform. Please check carefully.",

		fetchUsableError: "Failed to obtain the available quantity",
		fetchSubmitError: "Mention money failed",
		fetchSubmitSuccess: "Mention money success",
		submitError1: "Please fill in the information correctly",
		submitError2: "The number of inputs must not be greater than the number available"
	},
	turn: {
		title: "Turn",
		number: "Number",
		account: "Account",
		password: "Password",

		placeholderNumber: "Please enter the amount of money transferred",
		placeholderAccount: "Please enter the ID number of the transfer",
		placeholderPassword: "Please enter the fund password",

		submitText: "Confirm",
		fetchSubmitError: "Transfer currency failure",
		fetchSubmitSuccess: "Turn money successfully",
		submitError: "Please fill in the information correctly"
	}
};
