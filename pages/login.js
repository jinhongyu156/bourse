import React from "react";

import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, KeyboardAvoidingView } from "react-native";

import { useFocusEffect } from "@react-navigation/native";

import { bindActionCreators } from "redux";

import { connect } from "react-redux";

import Icon from "react-native-vector-icons/FontAwesome5";

import I18n from "i18n-js";

import Input from "./../containers/input.js";
import CodeImage from "./../containers/codeImage.js";

import Tab from "./../components/tab.js";
import SubmitBtn from "./../components/submit.js";
import TabBar from "./../components/sizeChangeTabBar.js";
import ActionSheet from "./../components/actionSheet.js";

import { setLoginType, setInputText, showLanguageActionSheet, hideActionSheet, fetchImageCode, fetchLogin, clear } from "./../redux/actions/login.js";

// LOGO 容器高
const ICONBOXHEIGHT = 140;

// LOGO 宽高
const ICONSIZE = 80;

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
const PAGEMARGIN =  Dimensions.get( "window" ).width * 0.2;

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
	codeTextInput: { flex: 2, height: LISTITEMHEIGIT * 0.8 },
	codeImageBtnBox: { flex: 1, alignItems: "center" },
	codeImageBtn: { width: LISTITEMWIDTH * 0.3, height: LISTITEMHEIGIT * 0.8 },

	forgotBox: { width: LISTITEMWIDTH, height: LISTITEMHEIGIT, paddingVertical: 14, alignItems: "flex-end", justifyContent: "flex-end" },
	forgotText: { fontSize: 14, color: "#666666" },

	submitBtn: { width: LISTITEMWIDTH, height: SUBMITBTNHEIGHT },

	registerBox: { width: LISTITEMWIDTH, height: REGISTERBTNHEIGHT, justifyContent: "center", alignItems: "center" },
	registerText: { fontSize: 14, color: "#696DAC" },

	optionsBox: { width: LISTITEMWIDTH, paddingVertical: 14, flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" },
	optionsText: { paddingVertical: 10 },

	errorBox: { width: LISTITEMWIDTH, height: ERRORBOXHEIGHT, justifyContent: "center" },
	errorColor: { color: "#F00" },

} );

// logo
const Logo = React.memo( function()
{

	return <View style = { styles.iconBox }>
		<Image style = { styles.icon } source = { require( "./../images/logo.png" ) } />
	</View>
} );

// 登录方式
const InputBox = React.memo( function( { loginType, setInputText, phoneNumber, emailText, password, code, inputError, imageBlob, fetchImageCode, fetchImageError } )
{
	const phoneNumberOrEmailTextHasError = ( loginType === 0 && inputError[ "phoneNumber" ] ) || ( loginType === 1 && inputError[ "emailText" ] );
	const passwordHasError = inputError[ "password" ];
	const isPhoneNumber = loginType == 0;

	const renderCodeImage = React.useCallback( function()
	{
		return <CodeImage
			imageBlob = { imageBlob }
			codeImageBtnBoxStyle = { styles.codeImageBtnBox }
			codeImageBtnStyle = { styles.codeImageBtn }
			errorColorStyle = { styles.errorColor }
			fetchImageError = { fetchImageError }
			fetchImageCode = { fetchImageCode }
		/>
	}, [ imageBlob, fetchImageError ] );

	const userIcon = React.useCallback( function()
	{
		return <Icon name = "user" color = { "#888888" } size = { 18 } />
	}, [] );

	const passwordIcon = React.useCallback( function()
	{
		return <Icon name = "lock" color = { "#888888" } size = { 18 } />
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
		>
		</Input>
	</React.Fragment>;
} );

const Login = function( props )
{
	// componentWillUnmount
	useFocusEffect(
		React.useCallback( function()
		{
			return function()
			{
				props.clear();
			};
		}, [] )
	);

	const renderTabBar = React.useCallback( function( { tabs, activeTab, goToPage } )
	{
		return <TabBar tabs = { tabs } tabBarStyle = { styles.tabBar } activeTab = { activeTab } goToPage = { goToPage } />
	}, [] );

	const onChangeTab = React.useCallback( function( o )
	{
		props.setLoginType( o.i );
	}, [] );

	const gotoRegister = React.useCallback( function()
	{
		props.navigation.push( "Register", { type: "register" } );
	} );

	const gotoForget = React.useCallback( function()
	{
		props.navigation.push( "Register", { type: "forget" } );
	} );

	return <KeyboardAvoidingView style = { styles.container } behavior = "position" keyboardVerticalOffset = { -KEYBOARDVERTICALOFFSET }>
		<React.Fragment>
			<Logo />
			<View style = { styles.errorBox }>
				<Text style = { styles.errorColor }>{ props.fetchLoginError }</Text>
			</View>
			<View style = { styles.tabBox }>
				<Tab
					contentProps = { { pageMargin: PAGEMARGIN } }
					renderTabBar = { renderTabBar }
					initialPage = { props.loginType }
					onChangeTab = { onChangeTab }
				>
					<InputBox
						tabLabel = { I18n.t( "login.loginType.phoneNumber" ) }
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
			</View>
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
					<Text style = { styles.optionsText }>{ I18n.t( "login.actionSheetBtn" ) }</Text>
				</TouchableOpacity>
				<TouchableOpacity>
					<Text style = { styles.optionsText }>主题选择(功能尚未完成)</Text>
				</TouchableOpacity>
			</View>
			<ActionSheet
				{ ...props.actionSheetData }
				hide = { props.hideActionSheet }
				isShow = { props.isShowActionSheet }
			/>
		</React.Fragment>
	</KeyboardAvoidingView>;

};

export default connect(
	function mapStateToProps( state, ownProps )
	{
		const loginData = state.login;

		return {
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
		return bindActionCreators( { setLoginType, setInputText, showLanguageActionSheet, hideActionSheet, fetchImageCode, fetchLogin, clear }, dispatch );
	}
)( Login );
