import React from "react";

import { View, Text, Image, ImageBackground, StyleSheet, Dimensions } from "react-native";

import I18n from "i18n-js";

// 头部高度
export const HEADERHEIGHT = 100;

// 头部宽度
const HEADERWIDTH = Dimensions.get( "window" ).width;

// 头部垂直 padding
const HEADERPADDINGVERTICAL = 20;

// 头部水平 padding
const HEADERPADDINGHORIZONTAL = 10;

// 头部 LOGO 宽高
const HEADERLOGOSIZE = 60;

const styles = StyleSheet.create( {

	headerBackground: { width: HEADERWIDTH, height: HEADERHEIGHT, flexDirection: "row", justifyContent: "center", resizeMode: "cover", paddingHorizontal: HEADERPADDINGHORIZONTAL, paddingVertical: HEADERPADDINGVERTICAL },
	headerLeftView: { flex: 3, flexDirection: "row", alignItems: "flex-end", justifyContent: "flex-start" },
	headerRightView: { flex: 2, flexDirection: "row", justifyContent: "flex-end" },

	headerLeftViewLogo: { width: HEADERLOGOSIZE, height: HEADERLOGOSIZE },
	headerLeftViewInfo: { flex: 1, justifyContent: "flex-end", marginLeft: 10 },
	headerLeftViewInfoText: { fontSize: 12, paddingVertical: 2, color: "#FFFFFF" }

} );

export default React.memo( function Header( { children, usdtInfo, tradingInfo, etusdInfo, slbtInfo } )
{
	return <ImageBackground source = { require( "./../images/header.png" ) } style = { styles.headerBackground }>
		<View style = { styles.headerLeftView }>
			<Image style = { styles.headerLeftViewLogo } source = { require( "./../images/logo.png" ) } />
			<View style = { styles.headerLeftViewInfo }>
				<Text style = { styles.headerLeftViewInfoText }>USDT: { usdtInfo }</Text>
				{
					( etusdInfo && tradingInfo )
						? <React.Fragment>
							<Text style = { styles.headerLeftViewInfoText }>{ I18n.t( "header.trading" ) }: { tradingInfo }</Text>
							<Text style = { styles.headerLeftViewInfoText }>ETUSD: { etusdInfo }</Text>
						</React.Fragment>
					: tradingInfo
						? <Text style = { styles.headerLeftViewInfoText }>{ I18n.t( "header.trading" ) }: { tradingInfo }</Text>
					: etusdInfo
						? <Text style = { styles.headerLeftViewInfoText }>ETUSD: { etusdInfo }</Text>
					: null
				}
				{
					slbtInfo
						? <Text style = { styles.headerLeftViewInfoText }>SLBT: { slbtInfo }</Text>
						: null
				}
			</View>
		</View>
		<View style = { styles.headerRightView }>
			{ children }
		</View>
	</ImageBackground>;
} );

