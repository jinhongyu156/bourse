import React from "react";

import { View, TextInput, StyleSheet } from "react-native";

const PLACEHOLDERTEXTCOLOR = "#999999";

const styles = StyleSheet.create( {

	textInput: { flex: 1, fontSize: 16, color: "#000000", paddingLeft: 14 },
	inputRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
	line: { height: 1, backgroundColor: "#DDDDDD" },
	errorBgColor: { backgroundColor: "#F00" }

} );

/**
 * [description]		受控组件: 输入框
 * @index				{string}		[description] input.type				// 1: phoneNumber, 2: code, 3: password
 * @value				{string}		[description] input.value
 * @placeholder			{string}		[description] input.placeholder
 * @hasError			{bool}			[description] input.value hasError
 * @inputBoxStyle		{Object}		[description] inputbox.style
 * @inputStyle			{[Object]}		[description] input.style
 * @setInputText		{function}		[description] set input.value
 * @renderCodeImage		{function}		[description] index == code && props render
 * @renderlineImageLeft	{function}		[description] props render lineImageLeft
 * @return				{ele}			[description]
 **/

export default React.memo( function( { index, value, placeholder, hasError, inputBoxStyle, inputStyle, renderCodeImage, renderlineImageLeft, setInputText } )
{
	const keyboardType = index === "phoneNumber" ? "numeric" : index === "emailText" ? "email-address" : index === "password" ? "default" : "default"
	const isPassword = index === "password";
	const isCode = index === "code";

	return <View style = { inputBoxStyle }>
		
		<View style = { styles.inputRow }>
			{ renderlineImageLeft && renderlineImageLeft() }
			<TextInput
				style = { [ styles.textInput, inputStyle, index === "code" ? styles.codeTextInput : {} ] }
				value = { value }
				secureTextEntry = { isPassword }
				keyboardType = { keyboardType }
				placeholder = { placeholder }
				placeholderTextColor = { PLACEHOLDERTEXTCOLOR }
				onChangeText = { text => setInputText( index, text ) } />
			{ isCode && renderCodeImage && renderCodeImage() }
		</View>
		<View style = { [ styles.line, hasError ? styles.errorBgColor : {} ] } />
	</View>

} );
