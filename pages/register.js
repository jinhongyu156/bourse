import React from "react";

import { View, ScrollView, Text, TouchableOpacity, StyleSheet, Image, Keyboard, Dimensions } from "react-native";

import { useFocusEffect } from "@react-navigation/native";

import { bindActionCreators } from "redux";

import { connect } from "react-redux";

import I18n from "./../i18n/index.js";

import Tab from "./../components/tab.js";
import Input from "./../components/input.js";
import SubmitBtn from "./../components/submit.js";
import TabBar from "./../components/sizeChangeTabBar.js";
import SendCodeBtn from "./../components/sendCode.js";

import { setRegisterType, setInputText, clear } from "./../redux/actions/register.js";
import { sendCode } from "./../redux/actions/sendCode.js";

// 图标宽高
const ICONSIZE = 80;

// tabBar 宽高
const TABBARHEIGHT = 60;

// input box 高
const LISTITEMHEIGIT = 60;

// input box 宽
const LISTITEMWIDTH = Dimensions.get( "window" ).width * 0.8;

// 页面 padding
const PAGEMARGIN =  Dimensions.get( "window" ).width * 0.2;

const styles = StyleSheet.create( {

	container: { flex: 1, alignItems: "center", backgroundColor: "#FEFEFE" },

	tabBox: { width: LISTITEMWIDTH, height: LISTITEMHEIGIT * 6 + TABBARHEIGHT },
	tabBar: { width: LISTITEMWIDTH, height: TABBARHEIGHT },

	textInputBox: { width: LISTITEMWIDTH, height: LISTITEMHEIGIT, justifyContent: "center" },
	codeTextInput: { flex: 2 },
	codeImageBtnContainer: { flex: 1, backgroundColor: "blue" },

	submitBtn: { width: LISTITEMWIDTH, height: 50, marginVertical: 16 },

	adviceNoteBox: { width: LISTITEMWIDTH, marginTop: 30, alignItems: "flex-end" },
	adviceNoteText: { fontSize: 14, color: "#666666" },

	loginBox: { width: LISTITEMWIDTH, alignItems: "center", marginTop: 10 },
	loginText: { fontSize: 14, color: "#696DAC" }

} );


// codeImage
const CodeImage = React.memo( function()
{
	return <View style = { styles.codeImageBtnContainer }>
		<Text>123</Text>
	</View>
} );


// 注册方式
const InputBox = React.memo( function( {
	registerType, setInputText, phoneNumber, emailText, name, referee, password, code, imageCode, inputError,
	sendCode, countdown, sendCodeStatus
} ) {

	const hasError = ( registerType === 0 && inputError === "phoneNumber" ) || ( registerType === 1 && inputError === "emailText" );

	const disabled = sendCodeStatus === 2;
	const isPhoneNumber = registerType == 0;

	const renderCodeImage = React.useCallback( function()
	{
		return <CodeImage />;
	}, [] );

	const renderCode = React.useCallback( function()
	{
		return <SendCodeBtn sendCode = { sendCode } countdown = { countdown } sendCodeStatus = { sendCodeStatus } />
	}, [ sendCodeStatus, countdown ] );

	return <React.Fragment>
		<Input
			index = { isPhoneNumber ? "phoneNumber" : "emailText" }
			value = { isPhoneNumber ? phoneNumber : emailText }
			placeholder = { isPhoneNumber ? I18n.t( "register.placeholder.phoneNumber" ) : I18n.t( "register.placeholder.email" ) }
			hasError = { hasError }
			disabled = { disabled }
			inputBoxStyle = { styles.textInputBox }
			setInputText = { setInputText }
		/>
		<Input
			index = { "name" }
			value = { name }
			placeholder = { I18n.t( "register.placeholder.name" ) }
			hasError = { false }
			disabled = { disabled }
			inputBoxStyle = { styles.textInputBox }
			setInputText = { setInputText }
		/>
		<Input
			index = { "referee" }
			value = { referee }
			placeholder = { I18n.t( "register.placeholder.referee" ) }
			hasError = { false }
			disabled = { disabled }
			inputBoxStyle = { styles.textInputBox }
			setInputText = { setInputText }
		/>
		<Input
			index = { "password" }
			value = { password }
			placeholder = { I18n.t( "register.placeholder.password" ) }
			hasError = { false }
			disabled = { disabled }
			inputBoxStyle = { styles.textInputBox }
			setInputText = { setInputText }
		/>
		<Input
			index = { "imageCode" }
			value = { imageCode }
			placeholder = { I18n.t( "register.placeholder.imageCode" ) }
			hasError = { false }
			disabled = { disabled }
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
			disabled = { disabled }
			inputBoxStyle = { styles.textInputBox }
			inputStyle = { styles.codeTextInput }
			setInputText = { setInputText }
			renderInputRight = { renderCode }
		>
		</Input>
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

	return <ScrollView
		showsVerticalScrollIndicator = { false }
		contentContainerStyle = { styles.container }
		keyboardDismissMode = { "on-drag" }							// 无效
		onScrollBeginDrag = { Keyboard.dismiss }					// 暂且用该方法使其滑动时关闭键盘
	>
		<React.Fragment>
			<View style = { styles.tabBox }>
				<Tab
					contentProps = { { pageMargin: PAGEMARGIN } }
					renderTabBar = { renderTabBar }
					initialPage = { props.registerType }
					onChangeTab = { onChangeTab }
				>
					<InputBox
						tabLabel = { I18n.t( "register.registerType.phoneNumber" ) }
						registerType = { props.registerType }
						setInputText = { props.setInputText }

						phoneNumber = { props.phoneNumber }
						emailText = { props.emailText }
						name = { props.name }
						referee = { props.referee }
						password = { props.password }
						code = { props.code }
						imageCode = { props.imageCode }
						inputError = { props.inputError }

						sendCode = { props.sendCode }
						countdown = { props.countdown }
						sendCodeStatus = { props.sendCodeStatus }
					/>
					<InputBox
						tabLabel = { I18n.t( "register.registerType.email" ) }
						registerType = { props.registerType }
						setInputText = { props.setInputText }

						phoneNumber = { props.phoneNumber }
						emailText = { props.emailText }
						name = { props.name }
						referee = { props.referee }
						password = { props.password }
						code = { props.code }
						imageCode = { props.imageCode }
						inputError = { props.inputError }

						sendCode = { props.sendCode }
						countdown = { props.countdown }
						sendCodeStatus = { props.sendCodeStatus }
					/>
				</Tab>
			</View>
			<View style = { styles.adviceNoteBox }>
				<TouchableOpacity onPress = { gotoLogin }>
					<Text style = { styles.adviceNoteText }>{ I18n.t( "register.adviceNote" ) }</Text>
				</TouchableOpacity>
			</View>
			<SubmitBtn submitBtnStyle = { styles.submitBtn } title = { I18n.t( "register.registerSubmitBtn" ) } />
			<View style = { styles.loginBox }>
				<TouchableOpacity onPress = { gotoLogin }>
					<Text style = { styles.loginText }>{ I18n.t( "register.login" ) }</Text>
				</TouchableOpacity>
			</View>
		</React.Fragment>
	</ScrollView>;

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

			sendCodeStatus: sendCodeData.sendCodeStatus,
			countdown: sendCodeData.countdown
		};
	},
	function mapDispatchToProps( dispatch, ownProps )
	{
		return bindActionCreators( { setRegisterType, setInputText, sendCode, clear }, dispatch );
	}
)( Register );
