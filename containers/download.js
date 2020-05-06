import React from "react";

import { View, Text, ToastAndroid, TouchableOpacity, StyleSheet } from "react-native";

import QRCode from "react-native-qrcode-svg";

import I18n from "i18n-js";

const RNFS = require( "react-native-fs" );

const styles = StyleSheet.create( {
	container: { flex: 1, backgroundColor: "#FFFFFF", alignItems: "center", justifyContent: "center" },
	text: { fontSize: 16, color: "#000000", paddingVertical: 20 },
	copyrightBox: { backgroundColor: "#FFFFFF", alignItems: "center", paddingVertical: 10 },
	copyrightText: { fontSize: 12, color: "#000" }
} );

export default React.memo( function()
{
	const onPressAndroid = React.useCallback( function()
	{
		ToastAndroid.show( I18n.t( "user.wait" ), ToastAndroid.SHORT );
		RNFS.downloadFile( { fromUrl: "http://ca.slb.one/app.apk", toFile: `${ RNFS.ExternalDirectoryPath }/${ ( ( Math.random() * 1000 ) | 0 ) }.apk` } ).promise.then( res => {
			ToastAndroid.show( I18n.t( "user.downloadSuccess" ), ToastAndroid.SHORT );
		} );
	}, [] );

	return <React.Fragment>
		<View style = { styles.container } contentContainerStyle = { styles.contentContainer } showsVerticalScrollIndicator = { false }>
			<QRCode size = { 120 } value = "http://ca.slb.one/appdown.php" color = { "#696DAC" } />
			<Text style = { styles.text }>香港数字</Text>
		</View>
		<View style = { styles.copyrightBox }>
			<Text style = { styles.copyrightText }>Copyright © 香港数字  All Rights Reserved</Text>
		</View>
	</React.Fragment>;
} );
