import React from "react";

import { View, Text, TouchableOpacity, Image, ImageBackground, StyleSheet, Dimensions } from "react-native";

import Notice from "./notice.js";

import I18n from "i18n-js";

// 头部高度
const HEADERHEIGHT = 120;

// 头部宽度
const HEADERWIDTH = Dimensions.get( "window" ).width;

// 头部垂直高度
const HEADERPADDINGVERTICAL = 20;

// 头部水平高度
const PADDINGHORIZONTAL = 26

// 头部 LOGO 宽高
const HEADERLOGOSIZE = HEADERHEIGHT - HEADERPADDINGVERTICAL * 2;

// 头部操作 icon 宽高
const HEADERHANDLESIZE = HEADERHEIGHT - HEADERPADDINGVERTICAL * 4;

const styles = StyleSheet.create( {

	headerBackground: { width: HEADERWIDTH, height: HEADERHEIGHT, flexDirection: "row", justifyContent: "center", resizeMode: "cover", paddingHorizontal: PADDINGHORIZONTAL, paddingVertical: HEADERPADDINGVERTICAL },
	headerLeftView: { flex: 1, flexDirection: "row", justifyContent: "flex-start" },
	headerRightView: { flex: 1, flexDirection: "row", justifyContent: "flex-end" },

	headerLeftViewLogo: { flex: 1, width: HEADERLOGOSIZE, height: HEADERLOGOSIZE },
	headerLeftViewInfo: { flex: 1, justifyContent: "flex-end", marginLeft: 10 },
	headerLeftViewInfoText: { paddingVertical: 2, color: "#FFFFFF" },

	headerRightViewItem: { alignItems: "center", justifyContent: "flex-end", marginLeft: 10 },
	headerRightViewItemImage: { width: HEADERHANDLESIZE, height: HEADERHANDLESIZE },
	headerRightViewItemText: { color: "#FFFFFF" },
} );

export default React.memo( function Header( { usdt, trading, slbt } )
{
	console.log( "Header re-render" );
	return <React.Fragment>
		<ImageBackground source = { require( "./../images/header.png" ) } style = { styles.headerBackground }>
			<View style = { styles.headerLeftView }>
				<Image style = { styles.headerLeftViewLogo } source = { require( "./../images/logo.png" ) } />
				<View style = { styles.headerLeftViewInfo }>
					<Text style = { styles.headerLeftViewInfoText }>USDT: { usdt }</Text>
					<Text style = { styles.headerLeftViewInfoText }>{ I18n.t( "header.trading" ) }: { trading }</Text>
					<Text style = { styles.headerLeftViewInfoText }>SLBT: { slbt }</Text>
				</View>
			</View>
			<View style = { styles.headerRightView }>
				<TouchableOpacity style = { styles.headerRightViewItem }>
					<Image style = { styles.headerRightViewItemImage } source = { require( "./../images/invest_etu.png" ) } />
					<Text style = { styles.headerRightViewItemText }>{ I18n.t( "header.investment" ) } ETU</Text>
				</TouchableOpacity>
				<TouchableOpacity style = { styles.headerRightViewItem }>
					<Image style = { styles.headerRightViewItemImage } source = { require( "./../images/get_benefits.png" ) } />
					<Text style = { styles.headerRightViewItemText }>{ I18n.t( "header.benefits" ) }</Text>
				</TouchableOpacity>
			</View>
		</ImageBackground>
		<Notice />
	</React.Fragment>
} );

