import React from "react";

import { View, TextInput, StyleSheet } from "react-native";

const PLACEHOLDERTEXTCOLOR = "#999999";

const styles = StyleSheet.create( {

	textInput: { flex: 1, fontSize: 16, color: "#000000", paddingLeft: 14 },
	inputRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
	line: { height: 1, backgroundColor: "#DDDDDD" },
	errorBgColor: { backgroundColor: "#F00" },

	inactiveColor: { color: "#999999" },
	activeColor: { color: "#000000" }


} );

/**
 * [description]		受控组件: 输入框
 * @index				{string}		[description] input.type				// 1: phoneNumber, 2: code, 3: password
 * @value				{string}		[description] input.value
 * @placeholder			{string}		[description] input.placeholder
 * @hasError			{bool}			[description] input.value hasError
 * @disabled			{bool}			[description] input.disabled
 * @inputBoxStyle		{Object}		[description] inputbox.style
 * @inputStyle			{[Object]}		[description] input.style
 * @setInputText		{function}		[description] set input.value
 * @renderInputRight	{function}		[description] index == code && props render
 * @renderInputLeft		{function}		[description] props render lineImageLeft
 * @return				{ele}			[description]
 **/

export default React.memo( function( { index, value, placeholder, hasError, disabled, inputBoxStyle, inputStyle, renderInputRight, renderInputLeft, setInputText, multiline } )
{
	const keyboardType = ( index === "phoneNumber" || index === "referee" || index === "number" || index === "account" || index === "rechargeNumber" ) ? "numeric"
		: ( index === "password" || index === "newPassword" || index === "newPassWord" || index === "confirmPassWord" ) ? "default"
		: index === "emailText" ? "email-address"
		: "default";
	const isPassword = index === "password" || index === "newPassword" || index === "newPassWord" || index === "confirmPassWord";
	const isCode = index === "code" || index === "imageCode";

	return <View style = { inputBoxStyle }>
		<View style = { styles.inputRow }>
			{ renderInputLeft && renderInputLeft() }
			<TextInput
				style = { [ styles.textInput, inputStyle, disabled ? styles.inactiveColor : styles.activeColor ] }
				value = { value }
				editable = { !disabled }
				multiline = { multiline }
				secureTextEntry = { isPassword }
				keyboardType = { keyboardType }
				placeholder = { placeholder }
				placeholderTextColor = { PLACEHOLDERTEXTCOLOR }
				onChangeText = { text => setInputText( index, text ) } />
			{ renderInputRight && renderInputRight() }
		</View>
		<View style = { [ styles.line, hasError ? styles.errorBgColor : {} ] } />
	</View>

} );
