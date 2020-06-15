import React from "react";

import { View, Text, ScrollView, Keyboard, StyleSheet, Dimensions } from "react-native";

import Toast from "react-native-root-toast";

import I18n from "i18n-js";

import Input from "./../containers/input.js";
import SubmitBtn from "./../containers/submit.js";

// input box 宽度
const INPUTBOXWIDTH = Dimensions.get( "window" ).width * 0.9;

// input box 高度
const INPUTBOXHEIGHT = 58;

// 提交按钮高度
const SUBMITBTNHEIGHT = 48

// error box 高度
const ERRORBOXHEIGHT = 24;

const styles = StyleSheet.create( {
	container: { flex: 1, marginTop: 10, backgroundColor: "#FFFFFF" },
	contentContainerStyle: { alignItems: "center" },
	inputBoxStyle: { width: INPUTBOXWIDTH, height: INPUTBOXHEIGHT, justifyContent: "center" },
	inputStyle: { height: INPUTBOXHEIGHT * 0.9, fontSize: 14 },

	submitBtn: { width: INPUTBOXWIDTH * 0.7, height: SUBMITBTNHEIGHT, marginTop: 50 },

	errorBox: { width: INPUTBOXWIDTH, height: ERRORBOXHEIGHT, justifyContent: "center" },
	errorText: { color: "#F00" }
} );

export default React.memo( function BindSubAccount( { subAccountText, subAccountPassWordText, loading, fetchError, inputError, setInputText, submit } )
{
	const bindSubmit = React.useCallback( function()
	{
		return submit( () => Toast.show( I18n.t( "user.fetchBindSubaccountSuccess" ) ) );
	}, [] );
	return <ScrollView
		style = { styles.container }
		contentContainerStyle = { styles.contentContainerStyle }
		showsVerticalScrollIndicator = { false }
		keyboardDismissMode = { "on-drag" }
		onScrollBeginDrag = { Keyboard.dismiss }
	>
		<View style = { styles.errorBox }>
			{ fetchError ? <Text style = { styles.errorText }>{ fetchError }</Text> : null }
		</View>
		<Input
			index = { "subAccountText" }
			value = { subAccountText }
			placeholder = { I18n.t( "user.subAccountTextPlaceholder" ) }
			hasError = { inputError[ "subAccountText" ] }
			inputBoxStyle = { styles.inputBoxStyle }
			inputStyle = { styles.inputStyle }
			setInputText = { setInputText }
			renderInputLeft = { () => <Text>{ I18n.t( "user.subAccountText" ) }: </Text> }
		/>
		<Input
			index = { "subAccountPassWordText" }
			value = { subAccountPassWordText }
			placeholder = { I18n.t( "user.subAccountPassWordTextPlaceholder" ) }
			hasError = { inputError[ "subAccountPassWordText" ] }
			inputBoxStyle = { styles.inputBoxStyle }
			inputStyle = { styles.inputStyle }
			setInputText = { setInputText }
			renderInputLeft = { () => <Text>{ I18n.t( "user.subAccountPassWordText" ) }: </Text> }
		/>
		<SubmitBtn
			title = { I18n.t( "user.bindSubaccountSubmit" ) }
			submitBtnStyle = { styles.submitBtn }
			loading = { loading }
			onSubmit = { bindSubmit }
		/>
	</ScrollView>;
} );
