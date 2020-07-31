import React from "react";

import { View, Text, ScrollView, StyleSheet, Dimensions } from "react-native";

import { bindActionCreators } from "redux";

import { connect } from "react-redux";

import { fetchBindAccount, fetchAccountData, setBindAccountType, setInputText, clearAccountData } from "./../redux/actions/user.js";

import { sendBindAccountCode } from "./../redux/actions/sendCode.js";

import Toast from "react-native-root-toast";

import I18n from "i18n-js";

import Input from "./../containers/input.js";

import SubmitBtn from "./../containers/submit.js";

import TabBar from "./../containers/tabBar.js";

import Tab from "./../components/tab.js";

import SendCodeBtn from "./../containers/sendCode.js";

// input box 宽度
const INPUTBOXWIDTH = Dimensions.get( "window" ).width * 0.9;

// input box 高度
const INPUTBOXHEIGHT = 58;

// 提交按钮高度
const SUBMITBTNHEIGHT = 48

// error box 高度
const ERRORBOXHEIGHT = 24;

/*
const styles = StyleSheet.create( {
	modalContainer: { width: MODALWIDTH, height: MODALHEIGHT, borderRadius: 8, backgroundColor: "#FFFFFF" },
	modalOverlay: { position: "absolute", top: 0, right: 0, bottom: 0, left: 0, backgroundColor: "rgba( 0, 0, 0, 0.4 )" },
	modalWrapper: { flex: 1, justifyContent: "center", alignItems: "center" },
	modalTitle: { width: MODALWIDTH, height: MODALTITLEBOXHEIGHT, justifyContent: "center", alignItems: "center" },
	modalTitleText: { fontSize: 22 },
	modalInputBox: { width: MODALWIDTH, height: MODALINPUTHEIGHT, justifyContent: "space-around", alignItems: "center" },
	modalInputView: { flexDirection: "row", alignItems: "center" },
	modalTimeInfoText: { fontSize: 24, marginRight: 10 },

	modalInput: { fontSize: 18, textAlign: "center", width: MODALINPUTBOXWIDTH, height: MODALINPUTHEIGHT * 0.5, borderWidth: 1 },
	modalInputTip: { fontSize: 10, color: "#6D6E77" },
	modalOptionBox: { flexDirection: "row", width: MODALWIDTH, height: MODALOPTIONBOXHEIGHT},
	modalOptionBoxItem: { flex: 1, justifyContent: "center", alignItems: "center" },
	modalOptionBoxItemView: { height: MODALOPTIONBOXHEIGHT * 0.4, justifyContent: "center", borderRadius: 50, paddingHorizontal: 40 },
	modalOptionBoxItemText: { fontSize: 16, fontWeight: "bold" },
	modalCancelBtn: { color: "#88898A" },
	modalConfirmBtn: { color: "#FFFFFF" },

	modalCancelBtnView: { borderWidth: 1, borderColor: "#88898A" },
	modalConfirmBtnView: { backgroundColor: "#696DAC" },


	modalInfoBox: { width: MODALWIDTH, height: MODALINFOBOXHEIGHT, flexDirection: "row", justifyContent: "space-around", alignItems: "center" },
	modalInfoItem: { alignItems: "center" },
	modalInfoBoxText: { fontSize: 12, color: "#6D6E77" },

	correctBorderColor: { borderColor: "#ECECEC" },
	errorBorderColor: { borderColor: "#F00" },
	errorColor: { fontSize: 12, color: "#F00" }
} );

*/

const styles = StyleSheet.create( {
	container: { flex: 1, marginTop: 10, backgroundColor: "#FFFFFF" },
	itemBox: { flex: 1, alignItems: "center" },
	inputBoxStyle: { width: INPUTBOXWIDTH, height: INPUTBOXHEIGHT, justifyContent: "center" },
	inputStyle: { height: INPUTBOXHEIGHT * 0.9, fontSize: 14 },
	codeInputStyle: { flex: 1.5 },

	tabBar: { justifyContent: "space-around", height: 50, backgroundColor: "#FFFFFF" },

	submitBtn: { width: INPUTBOXWIDTH * 0.7, height: SUBMITBTNHEIGHT, marginTop: 50 },

	errorBox: { width: INPUTBOXWIDTH, height: ERRORBOXHEIGHT, justifyContent: "center" },
	errorText: { color: "#F00" }
} );

const Item = React.memo( function( { text, accountCodeText, type, data, fetchError, inputError, sendCodeStatus, setInputText, renderCode, sendCodeError, submit } )
{
	return <View style = { styles.itemBox }>
		<View style = { styles.errorBox }>
			{ fetchError ? <Text style = { styles.errorText }>{ fetchError }</Text> : null }
			{ sendCodeError ? <Text style = { styles.errorText }>{ sendCodeError }</Text> : null }
		</View>
		<Input
			index = { type == "phone" ? "accountPhoneText" : "accountEmailText" }
			value = { data[ type == "phone" ? "电话" : "邮箱" ] ? data[ type == "phone" ? "电话" : "邮箱" ] : text }
			disabled = { data[ type == "phone" ? "电话" : "邮箱" ] || ( sendCodeStatus == 2 ) }
			placeholder = { type == "phone" ? I18n.t( "user.accountPhonePlaceholder" ) : I18n.t( "user.accountEmailPlaceholder" ) }
			hasError = { inputError[ type == "phone" ? "accountPhoneText" : "accountEmailText" ] }
			inputBoxStyle = { styles.inputBoxStyle }
			inputStyle = { styles.inputStyle }
			setInputText = { setInputText }
			renderInputLeft = { () => <Text>{ type == "phone" ? I18n.t( "user.accountPhoneText" ) : I18n.t( "user.accountEmailText" ) }: </Text> }
		/>
		{
			data[ type == "phone" ? "电话" : "邮箱" ]
				? null
				: <Input
					index = { "accountCodeText" }
					value = { accountCodeText }
					placeholder = { I18n.t( "user.codePlaceholder" ) }
					hasError = { false }
					inputBoxStyle = { styles.inputBoxStyle }
					inputStyle = { [ styles.inputStyle, styles.codeInputStyle ] }
					setInputText = { setInputText }
					renderInputLeft = { () => <Text>{ I18n.t( "user.code" ) }: </Text> }
					renderInputRight = { renderCode }
				/>
		}
		{
			data[ type == "phone" ? "电话" : "邮箱" ]
				? null
				: <SubmitBtn
					title = { I18n.t( "user.bindAccountSubmit" ) }
					submitBtnStyle = { styles.submitBtn }
					loading = { false }
					onSubmit = { submit }
				/>
		}
	</View>;
} )

const BindAccount = function( { navigation, accountPhoneText, accountEmailText, accountCodeText, data, fetchError, inputError, fetchData, setInputText, onChangeTab, sendCode, sendCodeError, sendCodeStatus, countdown, clear, submit } )
{
	React.useEffect( () => {
		navigation.addListener( "focus", () => {
			fetchData();
		} );
		navigation.addListener( "blur", () => {
			clear();
		} );

	}, [ navigation ] );

	const renderTabBar = React.useCallback( function( { tabs, activeTab, goToPage } )
	{
		return <TabBar tabs = { tabs } type = { "default" } tabBarStyle = { styles.tabBar } activeTab = { activeTab } goToPage = { goToPage } />;
	}, [] );

	const renderCode = React.useCallback( function()
	{
		return <SendCodeBtn sendCode = { sendCode } countdown = { countdown } sendCodeStatus = { sendCodeStatus } />
	}, [ sendCodeStatus, countdown ] );

	const bindSubmit = React.useCallback( function()
	{
		return submit( () => Toast.show( I18n.t( "user.fetchBindAccountSuccess" ) ) );
	}, [] );

	return <Tab containerStyle = { styles.container } renderTabBar = { renderTabBar } onChangeTab = { onChangeTab }>
		<Item
			tabLabel = { I18n.t( "user.accountPhoneText" ) }
			text = { accountPhoneText }
			accountCodeText = { accountCodeText }
			type = { "phone" }
			data = { data }
			fetchError = { fetchError }
			inputError = { inputError }
			sendCodeStatus = { sendCodeStatus }
			setInputText = { setInputText }
			sendCodeError = { sendCodeError }
			renderCode = { renderCode }
			submit = { bindSubmit }
		/>
		<Item
			tabLabel = { I18n.t( "user.accountEmailText" ) }
			text = { accountEmailText }
			accountCodeText = { accountCodeText }
			type = { "email" }
			data = { data }
			fetchError = { fetchError }
			inputError = { inputError }
			sendCodeStatus = { sendCodeStatus }
			setInputText = { setInputText }
			sendCodeError = { sendCodeError }
			renderCode = { renderCode }
			submit = { bindSubmit }
		/>
	</Tab>;
};

export default connect(
	function mapStateToProps( state, ownProps )
	{
		const userData = state.user;
		const sendCodeData = state.sendCode;
		return {
			data: userData.accountData, accountPhoneText: userData.accountPhoneText, accountEmailText: userData.accountEmailText, accountCodeText: userData.accountCodeText,
			fetchError: userData.fetchBindAccountError, inputError: userData.inputError,

			sendCodeStatus: sendCodeData.sendCodeStatus, countdown: sendCodeData.countdown, sendCodeError: sendCodeData.sendCodeError
		};
	},
	function mapDispatchToProps( dispatch, ownProps )
	{
		return bindActionCreators( { submit: fetchBindAccount, setInputText: setInputText, fetchData: fetchAccountData, onChangeTab: setBindAccountType, sendCode: sendBindAccountCode, clear: clearAccountData }, dispatch );
	}
)( BindAccount );

