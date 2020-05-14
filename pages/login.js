import React from "react";

import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, KeyboardAvoidingView } from "react-native";

import { CommonActions, useFocusEffect } from "@react-navigation/native";

import { bindActionCreators } from "redux";

import { connect } from "react-redux";

import I18n from "i18n-js";

import Input from "./../containers/input.js";
import CodeImage from "./../containers/codeImage.js";
import SubmitBtn from "./../containers/submit.js";
import TabBar from "./../containers/tabBar.js";

import Tab from "./../components/tab.js";
import ActionSheet from "./../components/actionSheet.js";

import { setLoginType, setInputText, showLanguageActionSheet, showThemeActionSheet, hideActionSheet, fetchImageCode, fetchLogin, clear } from "./../redux/actions/login.js";

// 屏幕高度
const SCREENHEIGHT = Dimensions.get( "window" ).height;

// LOGO 容器高
const ICONBOXHEIGHT = 130;

// LOGO 宽高
const ICONSIZE = 80;

// 输入框 icon 宽高
const INPUTICONSIZE = 30;

// 错误信息提示框 高
const ERRORBOXHEIGHT = 20;

// tab bar 高
const TABBARHEIGHT = 60;

// input box 高
const LISTITEMHEIGIT = 60;

// input box 宽
const LISTITEMWIDTH = Dimensions.get( "window" ).width * 0.8;

// 提交按钮高度
const SUBMITBTNHEIGHT = 50;

// 注册按钮高度
const REGISTERBTNHEIGHT = 40;

// 页面 padding
const PAGEMARGIN = Dimensions.get( "window" ).width * 0.2;

// used by KeyboardAvoidingView
const KEYBOARDVERTICALOFFSET = Dimensions.get( "window" ).height - ICONBOXHEIGHT - ERRORBOXHEIGHT - TABBARHEIGHT - LISTITEMHEIGIT * 3 - LISTITEMHEIGIT - SUBMITBTNHEIGHT - REGISTERBTNHEIGHT;

const styles = StyleSheet.create( {

	container: { flex: 1, alignItems: "center", backgroundColor: "#FEFEFE" },

	iconBox: { width: LISTITEMWIDTH, height: ICONBOXHEIGHT, justifyContent: "center", alignItems: "center" },
	icon: { width: ICONSIZE, height: ICONSIZE, borderColor: "#FFFFFF", borderRadius: 80, borderWidth: 2 },

	tabBox: { width: LISTITEMWIDTH, height: LISTITEMHEIGIT * 3 + TABBARHEIGHT },
	tabBar: { width: LISTITEMWIDTH, height: TABBARHEIGHT },

	textInputBox: { width: LISTITEMWIDTH, height: LISTITEMHEIGIT, justifyContent: "center" },
	textInput: { height: LISTITEMHEIGIT * 0.8 },
	textInputIcon: { width: INPUTICONSIZE, height: INPUTICONSIZE },
	codeTextInput: { flex: 2, height: LISTITEMHEIGIT * 0.8 },
	codeImageBtnBox: { flex: 1, alignItems: "center" },
	codeImageBtn: { width: LISTITEMWIDTH * 0.3, height: LISTITEMHEIGIT * 0.8 },

	forgotBox: { width: LISTITEMWIDTH, height: LISTITEMHEIGIT, paddingVertical: 14, alignItems: "flex-end", justifyContent: "flex-end" },
	forgotText: { fontSize: 14, color: "#666666", paddingLeft: 20, paddingTop: 10 },

	submitBtn: { width: LISTITEMWIDTH, height: SUBMITBTNHEIGHT },

	registerBox: { width: LISTITEMWIDTH, height: REGISTERBTNHEIGHT, justifyContent: "center", alignItems: "center" },
	registerText: { fontSize: 14, color: "#696DAC", paddingVertical: 10, paddingHorizontal: 40 },

	optionsBox: { width: LISTITEMWIDTH, paddingVertical: 14, marginTop: 20, flexDirection: "row", justifyContent: "space-between" },
	optionsText: { paddingVertical: 10 },

	errorBox: { width: LISTITEMWIDTH, height: ERRORBOXHEIGHT, justifyContent: "center" },
	errorColor: { color: "#F00" },

} );

// logo
const Logo = React.memo( function()
{
	return <View style = { styles.iconBox }><Image style = { styles.icon } source = { require( "./../images/logo.png" ) } /></View>
} );

// 登录方式
const InputBox = React.memo( function( { theme, loginType, setInputText, phoneNumber, emailText, password, code, inputError, imageBlob, fetchImageCode, fetchImageError } )
{
	const phoneNumberOrEmailTextHasError = ( loginType === 0 && inputError[ "phoneNumber" ] ) || ( loginType === 1 && inputError[ "emailText" ] );
	const passwordHasError = inputError[ "password" ];
	const isPhoneNumber = loginType == 0;

	console.log( "InputBox", theme, typeof theme );

	const renderCodeImage = React.useCallback( function()
	{
		return imageBlob
			? <CodeImage
				imageBlob = { imageBlob }
				codeImageBtnBoxStyle = { styles.codeImageBtnBox }
				codeImageBtnStyle = { styles.codeImageBtn }
				errorColorStyle = { styles.errorColor }
				fetchImageError = { fetchImageError }
				fetchImageCode = { fetchImageCode }
			/>
			: null
	}, [ imageBlob, fetchImageError ] );

	const userIcon = React.useCallback( function()
	{
		return theme
			? <Image style = { styles.textInputIcon } source = { require( "./../images/input_account_icon_1.png" ) } />
			: <Image style = { styles.textInputIcon } source = { require( "./../images/input_account_icon.png" ) } />;
	}, [] );

	const passwordIcon = React.useCallback( function()
	{
		return theme
			? <Image style = { styles.textInputIcon } source = { require( "./../images/input_password_icon_1.png" ) } />
			: <Image style = { styles.textInputIcon } source = { require( "./../images/input_password_icon.png" ) } />;
	}, [] );

	return <React.Fragment>
		<Input
			index = { isPhoneNumber ? "phoneNumber" : "emailText" }
			value = { isPhoneNumber ? phoneNumber : emailText }
			placeholder = { isPhoneNumber ? I18n.t( "login.placeholder.phoneNumber" ) : I18n.t( "login.placeholder.email" ) }
			hasError = { phoneNumberOrEmailTextHasError }
			inputBoxStyle = { styles.textInputBox }
			inputStyle = { styles.textInput }
			setInputText = { setInputText }
			renderInputLeft = { userIcon }
		/>
		<Input
			index = { "password" }
			value = { password }
			placeholder = { I18n.t( "login.placeholder.password" ) }
			hasError = { passwordHasError }
			inputBoxStyle = { styles.textInputBox }
			inputStyle = { styles.textInput }
			setInputText = { setInputText }
			renderInputLeft = { passwordIcon }
		/>
		<Input
			index = { "code" }
			value = { code }
			placeholder = { I18n.t( "login.placeholder.code" ) }
			hasError = { false }
			inputBoxStyle = { styles.textInputBox }
			inputStyle = { styles.codeTextInput }
			setInputText = { setInputText }
			renderInputRight = { renderCodeImage }
		/>
	</React.Fragment>;
} );

const Login = function( props )
{
	console.log( "Login", props.theme );
	// componentWillUnmount
	useFocusEffect(
		React.useCallback( function()
		{
			return props.clear;
		}, [] )
	);

	props.isLogin && props.navigation.dispatch( CommonActions.reset( { index: 0, routes: [ { name: "TabNavigator" } ] } ) );

	const renderTabBar = React.useCallback( function( { tabs, activeTab, goToPage } )
	{
		return <TabBar
			type = { "checkBox" }
			tabs = { tabs }
			tabBarStyle = { styles.tabBar }
			activeTab = { activeTab }
			goToPage = { goToPage }
		/>
	}, [] );

	const gotoRegister = React.useCallback( function()
	{
		props.navigation.push( "Register", { type: "register" } );
	}, [] );

	const gotoForget = React.useCallback( function()
	{
		props.navigation.push( "Register", { type: "forget" } );
	}, [] );

	return <KeyboardAvoidingView style = { styles.container } behavior = "position" keyboardVerticalOffset = { -KEYBOARDVERTICALOFFSET }>
		<Logo />
		<View style = { styles.errorBox }><Text style = { styles.errorColor }>{ props.fetchLoginError }</Text></View>
		<Tab
			width = { LISTITEMWIDTH }
			containerStyle = { styles.tabBox }
			renderTabBar = { renderTabBar }
			onChangeTab = { props.setLoginType }
		>
			<InputBox
				tabLabel = { I18n.t( "login.loginType.phoneNumber" ) }
				theme = { props.theme }
				loginType = { props.loginType }
				setInputText = { props.setInputText }

				phoneNumber = { props.phoneNumber }
				emailText = { props.emailText }
				password = { props.password }
				code = { props.code }
				inputError = { props.inputError }

				imageBlob = { props.imageBlob }
				fetchImageCode = { props.fetchImageCode }
				fetchImageError = { props.fetchImageError }
			/>
			<InputBox
				tabLabel = { I18n.t( "login.loginType.email" ) }
				theme = { props.theme }
				loginType = { props.loginType }
				setInputText = { props.setInputText }

				phoneNumber = { props.phoneNumber }
				emailText = { props.emailText }
				password = { props.password }
				code = { props.code }
				inputError = { props.inputError }

				imageBlob = { props.imageBlob }
				fetchImageCode = { props.fetchImageCode }
				fetchImageError = { props.fetchImageError }
			/>
		</Tab>
		<View style = { styles.forgotBox }>
			<TouchableOpacity onPress = { gotoForget }>
				<Text style = { styles.forgotText }>{ I18n.t( "login.forgetPassword" ) }</Text>
			</TouchableOpacity>
		</View>
		<SubmitBtn
			title = { I18n.t( "login.loginSubmitBtn" ) }
			submitBtnStyle = { styles.submitBtn }
			loading = { props.isLoading }
			onSubmit = { props.fetchLogin }
		/>
		<View style = { styles.registerBox }>
			<TouchableOpacity onPress = { gotoRegister }>
				<Text style = { styles.registerText }>{ I18n.t( "login.register" ) }</Text>
			</TouchableOpacity>
		</View>
		<View style = { styles.optionsBox }>
			<TouchableOpacity onPress = { props.showLanguageActionSheet }>
				<Text style = { styles.optionsText }>{ I18n.t( "login.actionSheetLanguageBtn" ) }</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress = { props.showThemeActionSheet }>
				<Text style = { styles.optionsText }>{ I18n.t( "login.actionSheetThemeBtn" ) }</Text>
			</TouchableOpacity>
		</View>
		<ActionSheet
			{ ...props.actionSheetData }
			hide = { props.hideActionSheet }
			isShow = { props.isShowActionSheet }
		/>
	</KeyboardAvoidingView>;

};

export default connect(
	function mapStateToProps( state, ownProps )
	{
		const loginData = state.login;

		const themeData = state.theme;

		return {
			theme: themeData.theme,
			phoneNumber: loginData.phoneNumber,
			emailText: loginData.emailText,
			password: loginData.password,
			code: loginData.code,
			loginType: loginData.loginType,
			isLoading: loginData.isLoading,
			inputError: loginData.inputError,
			imageBlob: loginData.imageBlob,
			isLogin: loginData.isLogin,
			isShowActionSheet: loginData.isShowActionSheet,
			actionSheetData: loginData.actionSheetData,
			fetchLoginError: loginData.fetchLoginError,
			fetchImageError: loginData.fetchImageError

		};
	},
	function mapDispatchToProps( dispatch, ownProps )
	{
		return bindActionCreators( { setLoginType, setInputText, showLanguageActionSheet, showThemeActionSheet, hideActionSheet, fetchImageCode, fetchLogin, clear }, dispatch );
	}
)( Login );
