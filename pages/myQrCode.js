import React from "react";

import { View, Text, ImageBackground, StyleSheet, Dimensions } from "react-native";

import QRCode from "react-native-qrcode-svg";

import I18n from "i18n-js";

const SCREENWIDTH = Dimensions.get( "window" ).width;
const SCREENHEIGHT = Dimensions.get( "window" ).height;

const styles = StyleSheet.create( {
	container: { position: "absolute", top: 0, right: 0, bottom: 0, left: 0 },
	infoBox: { position: "absolute", top: SCREENHEIGHT * 0.2, left: SCREENWIDTH * 0.1, width: SCREENWIDTH * 0.8, height: SCREENHEIGHT * 0.5, paddingTop: 40, justifyContent: "space-around", alignItems: "center", backgroundColor: "#FFFFFF", borderRadius: 10 },
	hello: { fontSize: 22, color: "#FFFFFF", textAlign: "center", marginTop: "10%" },
	title: { fontSize: 20, fontWeight: "bold", textAlign: "center" },
	message: { fontSize: 16, textAlign: "center" },
} );

export default React.memo( function( props )
{
	return <ImageBackground source = { require( "./../images/my_code.jpg" ) } style = { styles.container }>
		<Text style = { styles.hello }>{ I18n.t( "user.header.tip1" ) }</Text>
		<View style = { styles.infoBox }>
			<QRCode size = { 180 } value = { props.route.params.id } />
			<Text style = { styles.title }>ID: { props.route.params.id }</Text>
			<Text style = { styles.message }>{ I18n.t( "user.header.tip2" ) }</Text>
		</View>
	</ImageBackground>;
} );
