import React from "react";

import { View, Text, StyleSheet } from "react-native";

import QRCode from "react-native-qrcode-svg";

import I18n from "i18n-js";

const RNFS = require( "react-native-fs" );

const styles = StyleSheet.create( {
	/*
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
	modalOptionBox: { flexDirection: "row", width: MODALWIDTH, height: MODALOPTIONBOXHEIGHT },
	modalOptionBoxItem: { flex: 1, justifyContent: "center", alignItems: "center" },
	modalOptionBoxItemText: { fontSize: 16, fontWeight: "bold", borderRadius: 50, paddingVertical: 10, paddingHorizontal: 40 },
	modalCancelBtn: { color: "#88898A", borderWidth: 1, borderColor: "#88898A" },
	modalConfirmBtn: { color: "#FFFFFF", backgroundColor: "#696DAC" },
	modalInfoBox: { width: MODALWIDTH, height: MODALINFOBOXHEIGHT, flexDirection: "row", justifyContent: "space-around", alignItems: "center" },
	modalInfoItem: { alignItems: "center" },
	modalInfoBoxText: { fontSize: 12, color: "#6D6E77" },

	correctBorderColor: { borderColor: "#ECECEC" },
	errorBorderColor: { borderColor: "#F00" },
	errorColor: { fontSize: 12, color: "#F00" }
	*/
	container: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#FFFFFF" },
	text: { fontSize: 22, paddingVertical: 10 },
	qrCode: { flex: 2, justifyContent: "center" },
	tip: { flex: 1, justifyContent: "center", alignItems: "center" }
} );

export default React.memo( function( props )
{
	console.log( "props", props );
	return <View style = { styles.container } contentContainerStyle = { styles.contentContainer } showsVerticalScrollIndicator = { false }>
		<Text style = { styles.text }>ID: { props.route.params.id }</Text>
		<Text style = { styles.text }>{ I18n.t( "user.header.tip1" ) }</Text>
		<Text style = { styles.text }>{ I18n.t( "user.header.tip2" ) }</Text>
	</View>;
} );
