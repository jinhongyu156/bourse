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
		quit: "Press again to exit the application",
		tip1: "There is a new version that can be updated",
		tip2: "Please update for a better experience",
		confirm: "Confirm",
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
		tip5: "5: The currency you currently choose is [%{name}] please check whether it is the %{name} currency wallet address. If you fill in the wrong will lead to the withdrawal of COINS, which has nothing to do with the platform. Please check carefully.",

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
	},
	user: {
		header: {
			chart: "Code",
			tip1: "Welcome to register Hong Kong digital",
			tip2: "Sign up for a free 10USDT"
		},
		myClient: "My Client",
		myInfo: "My Info",
		editPassword: "Edit Password",
		query: "Query",
		subAccounts: "Sub",
		bindSubaccount: "Bind",
		hotkey: "Hotkey",
		summarize: "Summarize",
		downloadCenter: "Download",
		introduction: "Introduction",
		contract: "Contract",
		repo: "Repo",
		userCenter: "User",
		systemCenter: "System",
		newbieGuide: "Guide",
		vouchers: "Vouchers",
		language: "Language",
		logout: "Logout",

		trading: "Trading",
		tailNumber: "Tail",
		noDataText: "No data was queried",
		goBack: "Go Back",

		fetchUserDetailDataError: "Failed to retrieve user data",
		fetchMyClientDataError: "Failed to obtain customer data",

		oldPasswordPlaceholder: "Please enter the old password",
		oldPassword: "Old password",
		newPasswordPlaceholder: "Please enter a new password",
		newPassword: "New password",
		confirmPassWordPlaceholder: "Please repeat the new password",
		confirmPassWord: "Confirm password",
		editPasswordSubmit: "submit",
		fetchEditPassWordError: "Password change failed",
		fetchEditPassWordSuccess: "Password changed successfully",
		inputEditPassWordError: "Please complete the information",

		actionSheetTitle: "Please select the query mode",
		queryStatement: "Statement",
		otc: "OTC",
		c2c: "C2C",
		switch: "Switch",
		cancel: "Cancel",

		statement: "Statement",
		amount: "Amount",
		balance: "Balance",
		direction: "Direction",
		number: "Number",
		profit: "Profit",

		openNumber: "OpenNumber",
		closeNumber: "CloseNumber",
		totalAmount: "TotalAmount",
		totalFee: "TotalFee",
		openTime: "OpenTime",
		closeTime: "CloseTime",

		time: "Time",
		orderId: "OrderId",
		note: "Note",

		fetchUserQueryDataError: "Failed to query user data",
		name: "Name",
		account: "Account",
		operation: "Operation",
		unbind: "Unbind",

		fetchSubAccountsError: "Query for subaccount data failed",
		fetchUnbindError: "Unbinding failure",
		fetchUnbindSuccess: "Unbind successfully",

		subAccountText: "Subaccount",
		subAccountPassWordText: "Password",
		subAccountTextPlaceholder: "Please enter the subaccount number",
		subAccountPassWordTextPlaceholder: "Please enter the subaccount password",
		bindSubaccountSubmit: "Bind",
		fetchBindSubaccountSuccess: "Binding success",
		fetchBindSubaccountError: "Binding failure",
		inputBindSubaccountError: "Please complete the information",

		fetchHotkeyDataError: "Hotkey fetch data failed",
		fetchSummarizeDataError: "Fund collection data acquisition failed",
		fetchElectronicContractDataError: "Failed to obtain investment contract data",
		introductionP1: "Hong Kong digital assets co., LTD. In Hong Kong in September 2018, tsuen wan, spit jiada universal center was founded, the company equipped with professional digital assets technology development team, the top spot and contract trading team, digital currency authority and the risk control team, mature financial analyst unit is installed with a software development team, etc.",
		introductionP2: "The main business of the company is digital asset trading operation, international bulk commodity contract trading, physical mining machinery technical services and sales, etc. At the same time, Hong Kong digital asset limited is the only company with a state-backed background in the top digital assets.",
		downloadSuccess: "Download Success",
		noContract: "You haven't invested",
		wait: "Please wait a moment",
		version: "version"
	},
	chart: {
		noDataText: "No data was queried",
		fetchOrderListDataError: "Failed to get list data",
		fetchUserDetailDataError: "Failed to retrieve user data",
		fetchUserOrderListDataError: "Failed to obtain user's order",
		fetchKLineDataError: "Failed to get k-line data",
		fetchCancelUserOrderSuccess: "Its success",
		fetchCancelUserOrderError: "Its failure",
		fetchOrderSubmitSuccess: "Place an order successfully",
		fetchOrderSubmitInputError: "Please complete the information",
		fetchOrderSubmitError: "Place the order failed",

		buy: "Buy",
		sell: "Sell",
		marketBuy: "MarketBuy",
		priceBuy: "PriceBuy",
		marketSell: "MarketSell",
		priceSell: "PriceSell",

		orderParamsTip: "Subject to the market price",
		price: "Price",
		pricePlaceholder: "Please enter price",
		number: "Number",
		numberPlaceholder: "Please enter quantity",
		poundage: "Poundage",
		buyFree: "Buy For Free",

		entrustNumber: "EntrustNumber",
		entrustPrice: "EntrustPrice",
		entrustDirection: "EntrustDir",
		operation: "Operation",
		dealNumber: "DealNumber",
		dealPrice: "DealPrice",
		dealDirection: "DealDir",
		state: "State",

		cancel: "Cancel",
		complete: "Complete",

		currentEntrust: "Current",
		historyEntrust: "History"
	}
};


