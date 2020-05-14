import React from "react";

import { View, Text, ToastAndroid, ScrollView, Keyboard, StyleSheet, Dimensions } from "react-native";

import I18n from "i18n-js";

import { useFocusEffect } from '@react-navigation/native';

import Input from "./../containers/input.js";
import SubmitBtn from "./../containers/submit.js";

// input box 宽度
const INPUTBOXWIDTH = Dimensions.get( "window" ).width * 0.9;

// input box 高度
const INPUTBOXHEIGHT = 58;

// 提交按钮高度
const SUBMITBTNHEIGHT = 42

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

export default React.memo( function EditPassword( { oldPassWord, newPassWord, confirmPassWord, loading, fetchError, inputError, setInputText, submit } )
{
	const bindSubmit = React.useCallback( function()
	{
		return submit( () => ToastAndroid.show( I18n.t( "user.fetchEditPassWordSuccess" ), ToastAndroid.SHORT ) );
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
			index = { "oldPassWord" }
			value = { oldPassWord }
			placeholder = { I18n.t( "user.oldPasswordPlaceholder" ) }
			disabled = { false }
			hasError = { inputError[ "oldPassWord" ] }
			inputBoxStyle = { styles.inputBoxStyle }
			inputStyle = { styles.inputStyle }
			setInputText = { setInputText }
			renderInputLeft = { () => <Text>{ I18n.t( "user.oldPassword" ) }: </Text> }
		/>
		<Input
			index = { "newPassWord" }
			value = { newPassWord }
			placeholder = { I18n.t( "user.newPasswordPlaceholder" ) }
			disabled = { false }
			hasError = { inputError[ "newPassWord" ] }
			inputBoxStyle = { styles.inputBoxStyle }
			inputStyle = { styles.inputStyle }
			setInputText = { setInputText }
			renderInputLeft = { () => <Text>{ I18n.t( "user.newPassword" ) }: </Text> }
		/>
		<Input
			index = { "confirmPassWord" }
			value = { confirmPassWord }
			placeholder = { I18n.t( "user.confirmPassWordPlaceholder" ) }
			disabled = { false }
			hasError = { inputError[ "confirmPassWord" ] }
			inputBoxStyle = { styles.inputBoxStyle }
			inputStyle = { styles.inputStyle }
			setInputText = { setInputText }
			renderInputLeft = { () => <Text>{ I18n.t( "user.confirmPassWord" ) }: </Text> }
		/>
		<SubmitBtn
			title = { I18n.t( "user.editPasswordSubmit" ) }
			submitBtnStyle = { styles.submitBtn }
			loading = { loading }
			onSubmit = { bindSubmit }
		/>
	</ScrollView>;
} );
