import React from "react";

import { ScrollView, Text, Image, StyleSheet, Dimensions } from "react-native";

import I18n from "i18n-js";

const SCREENWIDTH = Dimensions.get( "window" ).width;

const IMAGEHEIGHT = 200;

const PADDING = 20;

const styles = StyleSheet.create( {
	container: { flex: 1, backgroundColor: "#FFFFFF" },
	contentContainer: { padding: PADDING },
	image: { height: IMAGEHEIGHT, width: SCREENWIDTH - PADDING * 2, marginVertical: PADDING },
	text: { fontSize: 16 }
} );

export default React.memo( function()
{
	return <ScrollView style = { styles.container } contentContainerStyle = { styles.contentContainer } showsVerticalScrollIndicator = { false }>
		<Text style = { styles.text }>&emsp;&emsp;{ I18n.t( "user.introductionP1" ) }</Text>
		<Image style = { styles.image } source = { require( "./../images/introduction_1.jpg" ) } />
		<Text style = { styles.text }>&emsp;&emsp;{ I18n.t( "user.introductionP2" ) }</Text>
		<Image style = { styles.image } source = { require( "./../images/introduction_2.jpg" ) } />
	</ScrollView>;
} );
