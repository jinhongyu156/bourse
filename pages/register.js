import React from "react";

import { View, Text, Alert, TouchableOpacity, StyleSheet, Image, Dimensions, ScrollView, Keyboard, KeyboardAvoidingView } from "react-native";

import { useFocusEffect } from "@react-navigation/native";

import { bindActionCreators } from "redux";

import { connect } from "react-redux";

import I18n from "i18n-js";

import Input from "./../containers/input.js";
import CodeImage from "./../containers/codeImage.js";
import SendCodeBtn from "./../containers/sendCode.js";
import SubmitBtn from "./../containers/submit.js";
import TabBar from "./../containers/tabBar.js";

import Tab from "./../components/tab.js";
import CheckBox from "./../components/checkBox.js";

import { setRegisterType, setInputText, toggleAgree, fetchImageCode, fetchRegister, clear } from "./../redux/actions/register.js";
import { sendCode } from "./../redux/actions/sendCode.js";

// 屏幕高度
const SCREENHEIGHT = Dimensions.get( "window" ).height;

// 错误信息提示框 高
const ERRORBOXHEIGHT = 30;

// tabBar 宽高
const TABBARHEIGHT = 60;

// input box 高
const LISTITEMHEIGIT = 56;

// input box 宽
const LISTITEMWIDTH = Dimensions.get( "window" ).width * 0.8;

// 提交按钮高度
const SUBMITBTNHEIGHT = 50;

// 登录按钮高度
const LOGINBTNHEIGHT = 40;

const styles = StyleSheet.create( {

	container: { flex: 1, alignItems: "center", backgroundColor: "#FEFEFE" },

	tabBox: { width: LISTITEMWIDTH },
	tabBar: { width: LISTITEMWIDTH, height: TABBARHEIGHT },

	textInputBox: { width: LISTITEMWIDTH, height: LISTITEMHEIGIT, justifyContent: "center" },
	textInput: { height: LISTITEMHEIGIT * 0.8 },
	codeTextInput: { flex: 2, height: LISTITEMHEIGIT * 0.8 },
	codeImageBtnBox: { flex: 1, alignItems: "center" },
	codeImageBtn: { width: LISTITEMWIDTH * 0.3, height: LISTITEMHEIGIT * 0.8 },

	adviceNoteBox: { width: LISTITEMWIDTH, height: LISTITEMHEIGIT, paddingVertical: 14, flexDirection: "row", alignItems: "flex-end", justifyContent: "flex-end" },
	adviceNoteText: { fontSize: 14, paddingLeft: 10, paddingTop: 10 },

	submitBtn: { width: LISTITEMWIDTH, height: SUBMITBTNHEIGHT },

	loginBox: { width: LISTITEMWIDTH, height: LOGINBTNHEIGHT, justifyContent: "center", alignItems: "center" },
	loginText: { fontSize: 14, color: "#696DAC", paddingVertical: 10, paddingHorizontal: 40 },

	inactiveColor: { color: "#666666" },
	activeColor: { color: "#696DAC" },

	errorBox: { width: LISTITEMWIDTH, minHeight: ERRORBOXHEIGHT, maxHeight: ERRORBOXHEIGHT * 4, justifyContent: "center" },
	errorColor: { fontSize: 12, color: "#F00" },
} );


// 注册方式
const InputBox = React.memo( function( {
	pageType, registerType, setInputText, phoneNumber, emailText, name, referee, password, newPassword, code, imageCode, inputError,
	sendCode, countdown, sendCodeStatus,
	imageBlob, fetchImageError, fetchImageCode
} ) {
	const phoneNumberOrEmailTextHasError = ( registerType === 0 && inputError[ "phoneNumber" ] ) || ( registerType === 1 && inputError[ "emailText" ] );

	const disabled = sendCodeStatus === 2;
	const isPhoneNumber = registerType == 0;

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
			: null;
	}, [ imageBlob, fetchImageError ] );

	const renderCode = React.useCallback( function()
	{
		return <SendCodeBtn sendCode = { sendCode } countdown = { countdown } sendCodeStatus = { sendCodeStatus } />
	}, [ sendCodeStatus, countdown ] );

	return <React.Fragment>
		<Input
			index = { isPhoneNumber ? "phoneNumber" : "emailText" }
			value = { isPhoneNumber ? phoneNumber : emailText }
			placeholder = { isPhoneNumber ? I18n.t( "register.placeholder.phoneNumber" ) : I18n.t( "register.placeholder.email" ) }
			hasError = { phoneNumberOrEmailTextHasError }
			disabled = { disabled }
			inputBoxStyle = { styles.textInputBox }
			inputStyle = { styles.textInput }
			setInputText = { setInputText }
		/>
		{
			pageType === "register"
				? <Input
					index = { "name" }
					value = { name }
					placeholder = { I18n.t( "register.placeholder.name" ) }
					hasError = { inputError[ "name" ] }
					disabled = { false }
					inputBoxStyle = { styles.textInputBox }
					inputStyle = { styles.textInput }
					setInputText = { setInputText }
				/>
				: null
		}
		<Input
			index = { "password" }
			value = { password }
			placeholder = { I18n.t( "register.placeholder.password" ) }
			hasError = { inputError[ "password" ] }
			disabled = { false }
			inputBoxStyle = { styles.textInputBox }
			inputStyle = { styles.textInput }
			setInputText = { setInputText }
		/>
		<Input
			index = { pageType === "register" ? "referee" : "newPassword" }
			value = { pageType === "register" ? referee : newPassword }
			placeholder = { pageType === "register" ? I18n.t( "register.placeholder.referee" ) : I18n.t( "register.placeholder.newPassword" ) }
			hasError = { pageType === "register" ? inputError[ "referee" ] : inputError[ "newPassword" ] }
			disabled = { false }
			inputBoxStyle = { styles.textInputBox }
			inputStyle = { styles.textInput }
			setInputText = { setInputText }
		/>
		<Input
			index = { "imageCode" }
			value = { imageCode }
			placeholder = { I18n.t( "register.placeholder.imageCode" ) }
			hasError = { false }
			disabled = { false }
			inputBoxStyle = { styles.textInputBox }
			inputStyle = { styles.codeTextInput }
			setInputText = { setInputText }
			renderInputRight = { renderCodeImage }
		/>
		<Input
			index = { "code" }
			value = { code }
			placeholder = { I18n.t( "register.placeholder.code" ) }
			hasError = { false }
			disabled = { false }
			inputBoxStyle = { styles.textInputBox }
			inputStyle = { styles.codeTextInput }
			setInputText = { setInputText }
			renderInputRight = { renderCode }
		/>
	</React.Fragment>;
} );

const Register = function( props )
{

	// componentWillUnmount
	useFocusEffect(
		React.useCallback( function()
		{
			return props.clear;
		}, [] )
	);

	const pageType = props.route.params.type;

	const renderTabBar = React.useCallback( function( { tabs, activeTab, goToPage } )
	{
		return <TabBar tabs = { tabs } type = { "checkBox" } tabBarStyle = { styles.tabBar } activeTab = { activeTab } goToPage = { goToPage } />
	}, [] );

	const gotoLogin = React.useCallback( function()
	{
		props.navigation.navigate( "Login" );
	}, [] );

	const gotoDisclaimer = React.useCallback( function()
	{
		props.navigation.push( "Disclaimer" );
	}, [] );

	const fetchRegister = React.useCallback( function()
	{
		props.fetchRegister( pageType, function()
		{
			Alert.alert(
				pageType === "register" ? I18n.t( "register.registerSuccess" ) : I18n.t( "register.findSuccess" ),
				I18n.t( "register.loginNow" ),
				[
					{ text: I18n.t( "register.cancel" ), style: "cancel", onPress: props.clear },
					{ text: I18n.t( "register.confirm" ), onPress: gotoLogin }
				],
				{ cancelable: false }
			);
		} );
	}, [ pageType ] );

	return <View style = { styles.container }>
		<ScrollView
			showsVerticalScrollIndicator = { false }
			keyboardDismissMode = { "on-drag" }							// 无效
			onScrollBeginDrag = { Keyboard.dismiss }					// 暂且用该方法使其滑动时关闭键盘
		>
			<View style = { styles.errorBox }>
				{ props.fetchRegisterError ? <Text style = { styles.errorColor }>{ props.fetchRegisterError }</Text> : null }
				{ props.sendCodeError ? <Text style = { styles.errorColor }>{ props.sendCodeError }</Text> : null }
			</View>
			<Tab
				width = { LISTITEMWIDTH }
				containerStyle = { [ styles.tabBox, { height: LISTITEMHEIGIT * ( pageType === "register" ? 6 : 5 ) + TABBARHEIGHT } ] }
				renderTabBar = { renderTabBar }
				initialPage = { props.registerType }
				onChangeTab = { props.setRegisterType }
			>
				<InputBox
					tabLabel = { pageType === "register" ? I18n.t( "register.registerType.phoneNumber" ) : I18n.t( "register.findType.phoneNumber" ) }
					registerType = { props.registerType }
					setInputText = { props.setInputText }

					pageType = { pageType }
					phoneNumber = { props.phoneNumber }
					emailText = { props.emailText }
					name = { props.name }
					referee = { props.referee }
					password = { props.password }
					newPassword = { props.newPassword }
					code = { props.code }
					imageCode = { props.imageCode }
					inputError = { props.inputError }

					imageBlob = { props.imageBlob }
					fetchImageCode = { props.fetchImageCode }
					fetchImageError = { props.fetchImageError }

					sendCode = { props.sendCode }
					countdown = { props.countdown }
					sendCodeStatus = { props.sendCodeStatus }
				/>
				<InputBox
					tabLabel = { pageType === "register" ? I18n.t( "register.registerType.email" ) : I18n.t( "register.findType.email" ) }
					registerType = { props.registerType }
					setInputText = { props.setInputText }

					pageType = { pageType }
					phoneNumber = { props.phoneNumber }
					emailText = { props.emailText }
					name = { props.name }
					referee = { props.referee }
					password = { props.password }
					newPassword = { props.newPassword }
					code = { props.code }
					imageCode = { props.imageCode }
					inputError = { props.inputError }

					imageBlob = { props.imageBlob }
					fetchImageCode = { props.fetchImageCode }
					fetchImageError = { props.fetchImageError }

					sendCode = { props.sendCode }
					countdown = { props.countdown }
					sendCodeStatus = { props.sendCodeStatus }
				/>
			</Tab>
			{
				pageType === "register"
					? <View style = { styles.adviceNoteBox }>
						<CheckBox
							isChecked = { props.agree }
							checkedCheckBoxColor = { "#696DAC" }
							uncheckedCheckBoxColor = { "#888888" }
							onClick = { props.toggleAgree }
						/>
						<Text
							style = { [ styles.adviceNoteText, props.agree ? styles.activeColor : styles.inactiveColor ] }
							onPress = { gotoDisclaimer }
						>
							{ I18n.t( "register.adviceNote" ) }
						</Text>
					</View>
					: <View style = { styles.adviceNoteBox } />
			}
			<SubmitBtn
				title = { pageType === "register" ? I18n.t( "register.registerSubmitBtn" ) : I18n.t( "register.forgetSubmitBtn" ) }
				submitBtnStyle = { styles.submitBtn }
				loading = { props.isLoading }
				onSubmit = { fetchRegister }
			/>
			<View style = { styles.loginBox }>
				<TouchableOpacity onPress = { gotoLogin }>
					<Text style = { styles.loginText }>{ I18n.t( "register.login" ) }</Text>
				</TouchableOpacity>
			</View>
		</ScrollView>

	</View>;
};

export default connect(
	function mapStateToProps( state, ownProps )
	{
		const registerData = state.register;
		const sendCodeData = state.sendCode;

		return {
			name: registerData.name,
			referee: registerData.referee,
			phoneNumber: registerData.phoneNumber,
			emailText: registerData.emailText,
			password: registerData.password,
			newPassword: registerData.newPassword,
			imageCode: registerData.imageCode,
			code: registerData.code,
			agree: registerData.agree,
			inputError: registerData.inputError,
			registerType: registerData.registerType,
			isLoading: registerData.isLoading,

			imageBlob: registerData.imageBlob,
			fetchImageError: registerData.fetchImageError,
			fetchRegisterError: registerData.fetchRegisterError,

			sendCodeStatus: sendCodeData.sendCodeStatus,
			countdown: sendCodeData.countdown,
			sendCodeError: sendCodeData.sendCodeError
		};
	},
	function mapDispatchToProps( dispatch, ownProps )
	{
		return bindActionCreators( { setRegisterType, setInputText, toggleAgree, sendCode, fetchImageCode, fetchRegister, clear }, dispatch );
	}
)( Register );
