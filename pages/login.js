import React from "react";

import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image, Dimensions } from "react-native";

import { bindActionCreators } from "redux";

import { connect } from "react-redux";

import I18n from "./../i18n/index.js";

import Tab from "./../components/tab.js";

import { sendCode, setLoginType, setInputText } from "./../redux/actions/login.js";
import { setLanguage } from "./../redux/actions/language.js";

// 图标宽高
const ICONSIZE = 80;

// tabBar 宽高
const TABBARHEIGHT = 60;

// input box 高
const LISTITEMHEIGIT = 60;

// input box 宽
const LISTITEMWIDTH = Dimensions.get( "window" ).width * 0.9;

const styles = StyleSheet.create( {

	container: { flex: 1, alignItems: "center", backgroundColor: "#FEFEFE" },
	icon: { width: ICONSIZE, height: ICONSIZE, borderColor: "#FFFFFF", borderRadius: 80, borderWidth: 2, marginVertical: 20 },

	tabBox: { width: LISTITEMWIDTH, height: LISTITEMHEIGIT * 3 + TABBARHEIGHT },
	tabBar: { width: LISTITEMWIDTH, height: TABBARHEIGHT, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },

	textInputBox: { width: LISTITEMWIDTH, height: LISTITEMHEIGIT, justifyContent: "center" },
	textInput: { fontSize: 16, color: "#000000" },
	codeTextInputBox: { flexDirection: "row", justifyContent: "space-between" },
	codeTextInput: { flex: 2 },
	sendCodeBtnContainer: { flex: 1 },
	sendCodeBtnBox: { flex: 1, alignItems: "flex-end", justifyContent: "center" },
	sendCodeBtn: { paddingVertical: 5, paddingHorizontal: 10 },
	sendCodeBtnText: { color: "#FFFFFF" },

	line: { height: 1, backgroundColor: "#DDDDDD" },
	loginBtn: { width: LISTITEMWIDTH, height: 50, alignItems:"center", justifyContent: "center", marginTop: 30, marginBottom: 20, borderRadius: 4 },
	loginBtnText: { fontSize: 18, fontWeight: "bold", color: "#FFFFFF" },
	options: { width: LISTITEMWIDTH, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
	optionsText: { fontSize: 14 },

	inactiveBgColor: { backgroundColor: "#888888" },
	activeBgColor: { backgroundColor: "#4AA7C3" },

	inactiveColor: { fontSize: 16, color: "#888888" },
	activeColor: { fontSize: 20, color: "#4AA7C3" },

	errorBgColor: { backgroundColor: "#F00" }

} );

// logo
const Logo = React.memo( function()
{
	console.log( "Logo re-render" )

	return <View>
		<Text>{ I18n.t( "login.sendCode" ) }</Text>
		<Image style = { styles.icon } source = { require( "./../images/logo.png" ) } />
	</View>
} );

// 输入框
const Input = React.memo( function( { setInputText, index, value, placeholder } )
{

	return <TextInput
		style = { [ styles.textInput, index === "code" ? styles.codeTextInput : {} ] }
		value = { value }
		secureTextEntry = { index === "password" }
		keyboardType = { ( index === "phoneNumber" || index === "code" ) ? "numeric" : index === "phoneNumber" ? "email-address" : index === "password" ? "default" : "default" }
		placeholder = { placeholder }
		placeholderTextColor = { "#999999" }
		onChangeText = { text => setInputText( index, text ) } />;

} );

// 发送验证码按钮
const SendCodeBtn = React.memo( function( { sendCode, countdown, sendCodeStatus } )
{
	const disabled = sendCodeStatus == 2 || sendCodeStatus == 0;
	const text = ( sendCodeStatus == 0 || sendCodeStatus == 1 ) ? I18n.t( "login.sendCode" ) : disabled ? `${ countdown } S` : sendCodeStatus == 3 ? I18n.t( "login.reSendCode" ) : "";		
	return <View style = { styles.sendCodeBtnBox }>
		<TouchableOpacity style = { [ styles.sendCodeBtn, disabled ? styles.inactiveBgColor : styles.activeBgColor ] } disabled = { disabled } onPress = { sendCode }>
			<Text style = { styles.sendCodeBtnText }>{ text }</Text>
		</TouchableOpacity>
	</View>;
} );

// 登录按钮
const SubmitBtn = React.memo( function( { onSubmit, setLanguage } ) {

	return <TouchableOpacity style = { [ styles.loginBtn, styles.inactiveBgColor ] } onPress = { () => {
		setLanguage( parseInt(Math.random() * 100) % 2 ? "zh" : "en" );
	} }>
		<Text style = { styles.loginBtnText }>{ I18n.t( "login.loginSubmitBtn" ) }</Text>
	</TouchableOpacity>;
} );
import store from "./../redux/store/index.js";

// 登录方式
const InputBox = React.memo( function( { loginType, sendCode, countdown, sendCodeStatus, setInputText, phoneNumber, emailText, password, code, inputError } ) {

	const hasError = ( loginType === 0 && inputError === "phoneNumber" ) || ( loginType === 1 && inputError === "emailText" );

	return <View>
		<View style = { styles.textInputBox }>
			{
				loginType === 0
					? <Input index = { "phoneNumber" } value = { phoneNumber } setInputText = { setInputText } placeholder = { I18n.t( "login.placeholder.phoneNumber" ) } />
					: <Input index = { "emailText" } value = { emailText } setInputText = { setInputText } placeholder = { I18n.t( "login.placeholder.email" ) } />
			}
			<View style = { [ styles.line, hasError ? styles.errorBgColor : {} ] } />
		</View>
		<View style = { styles.textInputBox }>
			<Input index = { "password" } value = { password } setInputText = { setInputText } placeholder = { I18n.t( "login.placeholder.password" ) } />
			<View style = { styles.line } />
		</View>
		<View style = { styles.textInputBox }>
			<View style = { styles.codeTextInputBox }>
				<Input index = { "code" } value = { code } setInputText = { setInputText } placeholder = { I18n.t( "login.placeholder.code" ) } />
				<View style = { styles.sendCodeBtnContainer }>
					<SendCodeBtn sendCode = { sendCode } countdown = { countdown } sendCodeStatus = { sendCodeStatus } />
				</View>
			</View>
			<View style = { styles.line } />
		</View>
	</View>;
} );

// 选项卡导航栏
const TabBar = React.memo( function( { tabs, activeTab, goToPage } )
{
	const onPress = React.useCallback( i => goToPage( i ), [] );

	return <View style = { styles.tabBar }>
	{
		tabs.map( function( item, index )
		{
			return <TabBarItem key = { index } index = { index } title = { item } isActive = { activeTab == index } onPress = { onPress } />;
		} )
	}
	</View>;

}, function( prevProps, nextProps )
{

	const activeTabChanged = prevProps.activeTab == nextProps.activeTab;
	const goToPageChanged = prevProps.goToPage == nextProps.goToPage;
	const tabsChanged = JSON.stringify( prevProps.tabs ) == JSON.stringify( nextProps.tabs );
	return activeTabChanged && goToPageChanged && tabsChanged;

} );

// 选项卡项
const TabBarItem = React.memo( function( { index, title, isActive, onPress } )
{

	return <TouchableOpacity onPress = { () => onPress( index ) }>
		<Text style = { [ isActive ? styles.activeColor : styles.inactiveColor ] }>{ title }</Text>
	</TouchableOpacity>;

} );

const Login = function( props )
{
	console.log( "re-render11111111" )
	const renderTabBar = React.useCallback( function( { tabs, activeTab, goToPage } )
	{
		return <TabBar tabs = { tabs } activeTab = { activeTab } goToPage = { goToPage } />
	}, [] );

	return <View style = { styles.container }>
		<Logo />
		<View style = { styles.tabBox }>
			<Tab
				tabBarPosition = "top"
				contentProps = { { pageMargin: Dimensions.get( "window" ).width * 0.1 } }
				renderTabBar = { renderTabBar }
				initialPage = { props.loginType }
				onChangeTab = { o => props.setLoginType( o.i ) }
			>
				<InputBox
					tabLabel = { I18n.t( "login.loginType.phoneNumber" ) }
					loginType = { props.loginType }
					sendCode = { props.sendCode }
					countdown = { props.countdown }
					sendCodeStatus = { props.sendCodeStatus }
					setInputText = { props.setInputText }

					phoneNumber = { props.phoneNumber }
					emailText = { props.emailText }
					password = { props.password }
					code = { props.code }
					inputError = { props.inputError }
				/>
				<InputBox
					tabLabel = { I18n.t( "login.loginType.email" ) }
					loginType = { props.loginType }
					sendCode = { props.sendCode }
					countdown = { props.countdown }
					sendCodeStatus = { props.sendCodeStatus }
					setInputText = { props.setInputText }

					phoneNumber = { props.phoneNumber }
					emailText = { props.emailText }
					password = { props.password }
					code = { props.code }
					inputError = { props.inputError }
				/>
			</Tab>
		</View>
		<SubmitBtn setLanguage = { props.setLanguage } />
		<View style = { styles.options }>
			<TouchableOpacity><Text style = { styles.optionsText }>{ I18n.t( "login.options.register" ) }</Text></TouchableOpacity>
			<TouchableOpacity><Text style = { styles.optionsText }>{ I18n.t( "login.options.forgetPassword" ) }</Text></TouchableOpacity>
		</View>
	</View>;

};

export default connect(
	function mapStateToProps( state, ownProps )
	{
		const loginData = state.login;
		const languageData = state.language;
		return {
			phoneNumber: loginData.phoneNumber,
			emailText: loginData.emailText,
			password: loginData.password,
			code: loginData.code,
			loginType: loginData.loginType,
			countdown: loginData.countdown,
			sendCodeStatus: loginData.sendCodeStatus,
			inputError: loginData.inputError,
			userLanguage: languageData.userLanguage
		};
	},
	function mapDispatchToProps( dispatch, ownProps )
	{
		return bindActionCreators( { sendCode, setLoginType, setInputText, setLanguage }, dispatch );
	}
)( Login );
