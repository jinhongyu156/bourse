import React from "react";

import { View, Text, ImageBackground, StyleSheet, Dimensions } from "react-native";

const SCREENWIDTH = Dimensions.get( "window" ).width;

import I18n from "i18n-js";

const styles = StyleSheet.create( {
	container: { flex: 1 },
	infoBox: { width: SCREENWIDTH * 0.5, height: "18%", justifyContent: "space-around", position: "absolute", top: "54%", left: "25%" },
	hello: { fontSize: 22, color: "#FFFFFF", textAlign: "center", marginTop: "10%" },
	title: { fontSize: 20, fontWeight: "bold", textAlign: "center" },
	message: { fontSize: 16, textAlign: "center" },
} );

export default React.memo( function( props )
{
	return <ImageBackground source = { require( "./../images/my_code.png" ) } style = { styles.container }>
		<Text style = { styles.hello }>{ I18n.t( "user.header.tip1" ) }</Text>
		<View style = { styles.infoBox }>
			<Text style = { styles.title }>ID: { props.route.params.id }</Text>
			<Text style = { styles.message }>{ I18n.t( "user.header.tip2" ) }</Text>
		</View>
	</ImageBackground>;
} );
