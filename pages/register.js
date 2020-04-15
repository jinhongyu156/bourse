import React from "react";

import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, ScrollView, Keyboard, KeyboardAvoidingView } from "react-native";

import { useFocusEffect } from "@react-navigation/native";

import { bindActionCreators } from "redux";

import { connect } from "react-redux";

import I18n from "./../i18n/index.js";

import Input from "./../containers/input.js";
import CodeImage from "./../containers/codeImage.js";
import SendCodeBtn from "./../containers/sendCode.js";

import Tab from "./../components/tab.js";
import SubmitBtn from "./../components/submit.js";
import TabBar from "./../components/sizeChangeTabBar.js";

import { setRegisterType, setInputText, fetchImageCode, clear } from "./../redux/actions/register.js";
import { sendCode } from "./../redux/actions/sendCode.js";

// 错误信息提示框 高
const ERRORBOXHEIGHT = 20;

// tabBar 宽高
const TABBARHEIGHT = 60;

// input box 高
const LISTITEMHEIGIT = 60;

// input box 宽
const LISTITEMWIDTH = Dimensions.get( "window" ).width * 0.8;

// 提交按钮高度
const SUBMITBTNHEIGHT = 50;

// 登录按钮高度
const LOGINBTNHEIGHT = 40;

// 页面 padding
const PAGEMARGIN =  Dimensions.get( "window" ).width * 0.2;

// used by KeyboardAvoidingView
// const KEYBOARDVERTICALOFFSET = Dimensions.get( "window" ).height - ICONBOXHEIGHT - ERRORBOXHEIGHT - TABBARHEIGHT - LISTITEMHEIGIT * 3 - LISTITEMHEIGIT - SUBMITBTNHEIGHT - REGISTERBTNHEIGHT;

const styles = StyleSheet.create( {

	container: { flex: 1, alignItems: "center", backgroundColor: "#FEFEFE" },

	tabBox: { width: LISTITEMWIDTH, height: LISTITEMHEIGIT * 7 + TABBARHEIGHT },
	tabBar: { width: LISTITEMWIDTH, height: TABBARHEIGHT },

	textInputBox: { width: LISTITEMWIDTH, height: LISTITEMHEIGIT, justifyContent: "center" },
	textInput: { height: LISTITEMHEIGIT * 0.8 },
	codeTextInput: { flex: 2, height: LISTITEMHEIGIT * 0.8 },
	codeImageBtnBox: { flex: 1, alignItems: "center" },
	codeImageBtn: { width: LISTITEMWIDTH * 0.3, height: LISTITEMHEIGIT * 0.8 },

	adviceNoteBox: { width: LISTITEMWIDTH, height: LISTITEMHEIGIT, paddingVertical: 14, alignItems: "flex-end", justifyContent: "flex-end" },
	adviceNoteText: { fontSize: 14, color: "#666666" },

	submitBtn: { width: LISTITEMWIDTH, height: SUBMITBTNHEIGHT },

	loginBox: { width: LISTITEMWIDTH, height: LOGINBTNHEIGHT, justifyContent: "center", alignItems: "center" },
	loginText: { fontSize: 14, color: "#696DAC" },

	errorBox: { width: LISTITEMWIDTH, height: ERRORBOXHEIGHT, justifyContent: "center" },
	errorColor: { color: "#F00" },
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
		return <CodeImage
			imageBlob = { imageBlob }
			codeImageBtnBoxStyle = { styles.codeImageBtnBox }
			codeImageBtnStyle = { styles.codeImageBtn }
			errorColorStyle = { styles.errorColor }
			fetchImageError = { fetchImageError }
			fetchImageCode = { fetchImageCode }
		/>;
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
		<Input
			index = { "name" }
			value = { name }
			placeholder = { I18n.t( "register.placeholder.name" ) }
			hasError = { inputError[ "name" ] }
			disabled = { false }
			inputBoxStyle = { styles.textInputBox }
			inputStyle = { styles.textInput }
			setInputText = { setInputText }
		/>
		<Input
			index = { "referee" }
			value = { referee }
			placeholder = { I18n.t( "register.placeholder.referee" ) }
			hasError = { inputError[ "referee" ] }
			disabled = { false }
			inputBoxStyle = { styles.textInputBox }
			inputStyle = { styles.textInput }
			setInputText = { setInputText }
		/>
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
			index = { "newPassword" }
			value = { newPassword }
			placeholder = { I18n.t( "register.placeholder.newPassword" ) }
			hasError = { inputError[ "newPassword" ] }
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

	const onChangeTab = React.useCallback( function( o ) {
		props.setRegisterType( o.i )
	}, [] );

	const gotoLogin = React.useCallback( function()
	{
		props.navigation.navigate( "Login" );
	} );

	return <View style = { styles.container }>
		<ScrollView
			showsVerticalScrollIndicator = { false }
			keyboardDismissMode = { "on-drag" }							// 无效
			onScrollBeginDrag = { Keyboard.dismiss }					// 暂且用该方法使其滑动时关闭键盘
		>
			<React.Fragment>
				<View style = { styles.errorBox }>
					<Text style = { styles.errorColor }>{ props.fetchLoginError }</Text>
				</View>
				<View style = { styles.tabBox }>
					<Tab
						contentProps = { { pageMargin: PAGEMARGIN } }
						renderTabBar = { renderTabBar }
						initialPage = { props.registerType }
						onChangeTab = { onChangeTab }
					>
						<InputBox
							tabLabel = { props.route.params.type === "register" ? I18n.t( "register.registerType.phoneNumber" ) : I18n.t( "register.findType.phoneNumber" ) }
							registerType = { props.registerType }
							setInputText = { props.setInputText }

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
							tabLabel = { props.route.params.type === "register" ? I18n.t( "register.registerType.email" ) : I18n.t( "register.findType.email" ) }
							registerType = { props.registerType }
							setInputText = { props.setInputText }

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
				</View>
				{
					props.route.params.type === "register"
						? <View style = { styles.adviceNoteBox }>
							<TouchableOpacity onPress = { gotoLogin }>
								<Text style = { styles.adviceNoteText }>{ I18n.t( "register.adviceNote" ) }</Text>
							</TouchableOpacity>
						</View>
						: <View style = { styles.adviceNoteBox } />
				}
				<SubmitBtn
					title = { props.route.params.type === "register" ? I18n.t( "register.registerSubmitBtn" ) : I18n.t( "register.forgetSubmitBtn" ) }
					submitBtnStyle = { styles.submitBtn }
					loading = { false }
					onSubmit = { () => {} }
				/>
				<View style = { styles.loginBox }>
					<TouchableOpacity onPress = { gotoLogin }>
						<Text style = { styles.loginText }>{ I18n.t( "register.login" ) }</Text>
					</TouchableOpacity>
				</View>
			</React.Fragment>
		</ScrollView>
	</View>
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
			imageCode: registerData.imageCode,
			code: registerData.code,
			inputError: registerData.inputError,
			registerType: registerData.registerType,

			imageBlob: registerData.imageBlob,
			fetchImageError: registerData.fetchImageError,

			sendCodeStatus: sendCodeData.sendCodeStatus,
			countdown: sendCodeData.countdown
		};
	},
	function mapDispatchToProps( dispatch, ownProps )
	{
		return bindActionCreators( { setRegisterType, setInputText, sendCode, fetchImageCode, clear }, dispatch );
	}
)( Register );
