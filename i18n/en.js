export default {
	bottomTabNavigator: {
		finance: "Finance",
		contract: "Contract",
		simulator: "Simulator",
		classroom: "Classroom",
		ctc: "Ctc",
		user: "User"
	},
	login: {
		title: "Login",
		placeholder: {
			account: "Please enter account( 6-digit length )",
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

		actionSheetLanguageBtn: "Language Settings",
		actionSheetLanguageTitle: "Please select language",
		actionSheetLanguageMessage: "The application is restarted after the language is reset",
		actionSheetLanguageOptions: [ "Chinese", "English", "Cancel" ],

		actionSheetThemeBtn: "Theme Settings",
		actionSheetThemeTitle: "Please select theme",
		actionSheetThemeOptions: [ "Contracted", "Science and Technology", "Cancel" ]
	},
	register: {
		title: "Register",
		placeholder: {
			account: "Please enter your account( 6-digit length )",
			email: "Please enter email address", phoneNumber: "Please enter your mobile phone number",
			name: "Please enter your name", referee: "Please enter your referee",
			password: "Please enter your password", newPassword: "Please enter your new password", confirmPassword: "Please enter your password again",
			imageCode: "Please enter your image code", code: "Please enter the code"
		},
		registerType: { phoneNumber: "Telephone number", email: "Email" },
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
		simulatorUsdt: "Simulator USDT",
	},
	classroom: {
		tabItem: {
			task: "Task",
			encyclopedia: "Encyclopedia"
		},
		task: {
			schedule: "Task schedule",
			today: "Today's task",

			dividend: "Dividend",
			tradingDig: "Trading Dig",
			commissions: "Commissions",
			mining: "Mining",
			contracts: "Contracts",
			sales: "Sales",

			unfinished: "Unfinished",
			completed: "Completed"
		},
		encyclopedia: {
			answer: "Answer:",
			noDataText: "No data has been queried",
			title: "ETU Encyclopedia"
		}
	},
	finance: {
		title: "Index",
		quit: "Press again to exit the application",
		tip1: "There is a new version that can be updated",
		tip2: "Please update for a better experience",
		tip3: "Update the content",
		confirm: "Confirm",
		header: {
			tip: "Note: minimum exchange of 300 trading gold minimum investment",
			trading: "trading",
			hashrate: "hashrate",
			fetchGetBenefitsError: "Failure to collect proceeds",
			fetchQusetionError: "Q&a request failed",
			investETU: "investETU",
			investment: "Earnings",
			benefits: "Benefits"
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
			numberOfTeam: "Team Number",
			todayEarnings: "Today earnings",
			yesterdayEarnings: "Yesterday Earnings",
			allEarnings: "All Earnings",
			allInvest: "All Invest"
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
		},
		question: {
			tip1: "1: Receive daily income and answer random encyclopedia questions",
			tip2: "2: If you answer correctly, you can get profits. If not, you can answer again",
			cancel: "Cancel",
			submit: "Submit",
			wrong: "Wrong"
		}
	},
	contract: {
		header: {
			chart: "Charts",
			recharge: "Recharge",
			usdtRecharge: "USDT Re",
			usdtWithdrawal: "USDT Wi",
			withdrawal: "Withdrawal"
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
		fetchClosingSuccess: "Unwind success",
		fetchClosingError: "Unwind failure",
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
		chainName: "ChainName",

		placeholderNumber: "Please enter the charge amount",
		number: "Number",
		placeholderNote: "Please enter the charge Note",
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
		code: "Code",
		authType: "Auth Type",

		placeholderAddress: "Please enter ethereum-based money",
		placeholderCode: "Please enter a verification code",
		placeholderNumber: "Please enter the number of withdrawals",
		placeholderPassword: "Please enter money password",
		noAccountTip: "ou have not attached a phone or email address",
		actionSheetAccountTitle: "Please select your authentication method",
		actionSheetAccountMessage: "Once selected, it is validated in this manner",
		cancel: "Cancel",

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
	myBankCard: {
		title: "Bank card",
		noDataText: "No data was queried",
		placeholderSearch: "Type the bank name to search for the bank",
		back: "Back",
		placeholderBankName: "Please click select bank",
		bankName: "BankName",
		placeholderUsername: "Please enter the user name",
		username: "Username",
		placeholderBankDeposit: "Please enter your account branch",
		bankDeposit: "BankDeposit",
		placeholderBankCardNumber: "Please enter your bank card number",
		bankCardNumber: "BankCardNumber",
		placeholderPassword: "Please enter the user password",
		password: "Password",
		bind: "Bind",
		unBind: "UnBind",
		fetchBindCardError: "The request to bind the card failed",
		inputBindCardError: "Please fill in the information correctly",
		fetchCardDataError: "Failed to obtain bank card data",
		fetchUnBindCardError: "Unbundling failure",
		fetchUnBindCardSuccess: "Unbundling success",
		fetchBindCardSuccess: "Binding success"
	},
	history: {
		title: "History",
		tabText1: "Recharge",
		tabText2: "Mention",
		amount: "Amount",
		number: "Number",
		createTime: "CreateTime",
		order: "Order",
		type: "Type",
		endTime: "EndTime",
		noDataText: "No data was queried",
		state: "State",
		state0Tip: "For the payment",
		state1Tip: "Paid, to be released",
		state2Tip: "Has put the coin",
		state3Tip: "Has been completed",
		state4Tip: "Has been cancelled",
		rate: "Rate",
		submitText: "Confirm to put money",
		fetchSubmitError: "An error occurred requesting the release of currency",
		fetchHistoryDataError: "Error getting history"
	},
	usdtMention: {
		title: "Mention( USDT )",
		fetchValuationDataError: "Request valuation error",
		inputValuationDataError: "Please fill in the information correctly",
		usable: "Usable",
		placeholderNumber: "Please enter the withdrawal amount",
		password: "Password",
		placeholderPassword: "Please enter your withdrawal password",
		number: "Amount",
		nextText: "Next step",
		amount: "Amount",
		currency: "Currency",
		number: "Number",
		unitPrice: "UnitPrice",
		bankCard: "Bank Card",
		notBoundTip: "You haven't bank card yet",
		bind: "Bind",
		submitText: "Mention",
		fetchMentionSubmitError: "Error requesting withdrawal",
		inputMentionSubmitError: "Please fill in the information correctly",
		fetchMentionSubmitSuccess: "Withdrawal success"
	},
	usdtRecharge: {
		title: "Recharge( USDT )",
		fetchOrderDataError: "Query to see if there is an order error",
		usdtPrice: "Price",
		rechargeNumber: "Recharge Number",
		rechargeNumberPlaceholder: "Please enter the amount of recharge",

		rechargeType: "Recharge Type",
		rechargeTypeActionSheetTitle: "Please select the recharge method",
		rechargeTypeActionSheetMessage: "After selection, you will recharge in this way",
		rechargeTypeActionSheetOptions: [ "Bank card", "Cancel" ],
		bank: "Bank card",
		submitText: "Submit",
		countdownText: "Please complete payment within %{seconds} s",
		noticePaid: "Notice Paid",
		fetchNoticePaidError: "The request for notification of payment failed",
		inputNoticePaidError: "The request for notification of payment failed",
		fetchRechargeSubmitError: "Failed to obtain order data",
		inputRechargeSubmitError: "Please fill in the information correctly",

		orderId: "OrderId",
		state: "State",
		bankName: "Bank",
		accountTitle: "Title",
		account: "Account",
		amount: "Amount",
		currency: "Currency",
		drawee: "Drawee",
		draweePlaceholder: "Please fill in the payer",
		copy: "Copy",
		rechargeAgain: "Again",
		copySuccess: "Copy Success",

		state0tip: "Waiting payment",
		state1tip: "Waiting release",
		state2tip: "Waiting approval",
		state3tip: "Recharge complete",
		state4tip: "cancelled",

		tip1: "A single transaction cannot exceed 200000 RMB",
		tip2: "The minimum top-up value is 20 USDT",
		tip3: "You can only enter the number of integer recharge",

		tip4: "Please do not fill in any remarks when transferring money! Otherwise, the account may be frozen and the platform is not responsible for the loss",
		tip5: "Please fill in the correct transfer amount when transferring money. If the amount is not correct, the recharge will fail",
		tip6: "Please pay correctly after filling in the payer send out",

		tip7: "Screenshot save the transfer receipt",
		tip8: "Recharge time: 10 am to 12 PM every day"

	},
	turn: {
		title: "Turn",
		number: "Number",
		account: "Account ID",
		phone: "Account",
		password: "Password",

		placeholderNumber: "Please enter the amount of money transferred",
		placeholderAccount: "Please enter the ID number of the transfer",
		placeholderPhone: "Please enter the account you transferred to",
		placeholderPassword: "Please enter the fund password",

		submitText: "Confirm",
		fetchSubmitError: "Transfer currency failure",
		fetchSubmitSuccess: "Turn money successfully",
		submitError: "Please fill in the information correctly"
	},
	user: {
		header: {
			chart: "Code",
			theme: "Theme",
			tip1: "Welcome to register Hong Kong digital",
			tip2: "Sign up for a free 10USDT",
			myQrCodeTitle: "my Qr Code"
		},
		myClient: "My Client",
		myInfo: "My Info",
		editPassword: "Edit",
		query: "Query",
		subAccounts: "Sub",
		bindSubaccount: "Bind",
		bindAccount: "Auth",
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
		version: "Version",
		update: "A new version is available for update",


		logout: "Logout",

		trading: "Trading",
		millWorkForce: "Mill Work Force",
		teamTrading: "Team Trading",
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
		fetchBindAccountError: "Binding message failed",
		inputBindAccountError: "Please complete the information",
		fetchBindAccountSuccess: "Binding message successful",
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
		accountPhoneText: "Phone",
		accountEmailText: "Email",
		code: "Code",
		subAccountTextPlaceholder: "Please enter the subaccount number",
		subAccountPassWordTextPlaceholder: "Please enter the subaccount password",

		accountPhonePlaceholder: "Please enter your account number",
		accountEmailPlaceholder: "Please enter your account email",
		codePlaceholder: "Please enter a verification code",

		bindSubaccountSubmit: "Bind",
		bindAccountSubmit: "Submit",
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
		version: "version",
		notBound: "Not Bound",
		history: "History"
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
	},
	floatAction: {
		etuDynamic: "Etu Dynamic",
		etuNotice: "ETU Notice",
		companyDynamic: "Co Dynamic",
		transactionInformation: "Serive News",
		fetchDataError: "Failed to get data",
		noDataText: "No data was queried",
	},
	auth: {
		title: "Auth",
		fetchAuthDataError: "Failed to obtain real-name authentication information"
	},
	camera: {
		pageTitle: "Camera",
		successTitle: "Identify the content",
		confirm: "Confirm",
		entry: "Scan",
		title: "Permission to use camera",
		message: "We need your permission to use your camera",
		buttonPositive: "Ok",
		buttonNegative: "Cancel"
	},
	activity: {
		title: "Activity Title"
	},
	ranking: {
		title: "Ranking",
		number: "Number",
		amount: "Amount",
		odds: "Odds",
		cancel: "Cancel",
		focus: "Focus",
		index: "Index",
		fetchRankingError: "Failed to get ranking data",
		fetchFocusError: "Focus on superior failures",
		fetchCancelError: "Untying master fails"
	},
	simulator: {
		fetchSimulatorDataError: "The request for mock data failed",
		fetchSimulatorSubmitError: "The request simulated a purchase failure",
		fetchSimulatorClosingError: "The request to simulate closing failed",
		fetchSimulatorSubmitSuccess: "Request to simulate successful purchase",
		fetchSimulatorClosingSuccess: "Request simulated closing successfully",
		masterTitle: "Master Order",
		myTitle: "My Order",
		noData: "No data was queried",
		noFocuMasterInfo: "You're not paying attention to any great players",
		focuMaster: "Focus on master",
		queryTitle: "S-Query",
		submit: "Submit"

	}
};












