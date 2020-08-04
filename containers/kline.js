import React from "react";

import { View, Text, StyleSheet } from "react-native";

import { WebView } from "react-native-webview";

const styles = StyleSheet.create( {
	container: { height: 300, flexDirection: "row", alignItems: "center", marginTop: 10 },
	webView: { flex: 1 }
} );


export default React.memo( function( props )
{
	return <View style = { styles.container }>
		<WebView style = { styles.webView } source = { { uri: `http://ca.slb.one/kline.html?type=${ props.type }` } } />
	</View>
} );
// 