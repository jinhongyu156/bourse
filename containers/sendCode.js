import React from "react";

import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import I18n from "i18n-js";

const styles = StyleSheet.create( {

	sendCodeBtnBox: { flex: 1, alignItems: "flex-end", justifyContent: "center" },
	sendCodeBtn: { paddingVertical: 5, paddingHorizontal: 10 },
	sendCodeBtnText: { color: "#FFFFFF" },

	inactiveBgColor: { backgroundColor: "#888888" },
	activeBgColor: { backgroundColor: "#696DAC" }

} );


// 发送验证码按钮
export default React.memo( function( { sendCode, countdown, sendCodeStatus } )
{
	const disabled = sendCodeStatus == 2 || sendCodeStatus == 0;
	const text = ( sendCodeStatus == 0 || sendCodeStatus == 1 ) ? I18n.t( "sendCode.sendCode" ) : disabled ? `${ countdown } S` : sendCodeStatus == 3 ? I18n.t( "sendCode.reSendCode" ) : "";

	return <View style = { styles.sendCodeBtnBox }>
		<TouchableOpacity
			style = { [ styles.sendCodeBtn, disabled ? styles.inactiveBgColor : styles.activeBgColor ] }
			disabled = { disabled }
			onPress = { sendCode }
		>
			<Text style = { styles.sendCodeBtnText }>{ text }</Text>
		</TouchableOpacity>
	</View>;
} );