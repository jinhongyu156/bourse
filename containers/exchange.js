import React from "react";

import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

import I18n from "i18n-js";

// 兑换操作容器高度
const EXCHANGEHEIGHT = 130;

// 兑换操作项目 icon 宽高
const EXCHANGEICONSIZE = 60;

const styles = StyleSheet.create( {
	container: { flexDirection: "row", justifyContent: "space-around", alignItems: "center", marginTop: 6, height: EXCHANGEHEIGHT, backgroundColor: "#FFFFFF" },
	exchangeItem: { flex: 1, justifyContent: "center", alignItems: "center" },
	exchangeIcon: { width: EXCHANGEICONSIZE, height: EXCHANGEICONSIZE, marginBottom: 10 },
	exchangeItemText: { fontSize: 16, color: "#777777" }
} );

export default React.memo( function Exchange( { msg } )
{
	return <View style = { styles.container }>
		<TouchableOpacity style = { styles.exchangeItem }>
			<Image style = { styles.exchangeIcon } source = { require( "./../images/usdt_to_etu.png" ) } />
			<Text style = { styles.exchangeItemText }>USDT { I18n.t( "finance.exchange.exchangeText" ) }</Text>
			<Text style = { styles.exchangeItemText }>ETU</Text>
		</TouchableOpacity>
		<TouchableOpacity style = { styles.exchangeItem }>
			<Image style = { styles.exchangeIcon } source = { require( "./../images/point_to_usdt.png" ) } />
			<Text style = { styles.exchangeItemText }>{ I18n.t( "finance.exchange.potintExchange" ) }</Text>
			<Text style = { styles.exchangeItemText }>USDT</Text>
		</TouchableOpacity>
		<TouchableOpacity style = { styles.exchangeItem }>
			<Image style = { styles.exchangeIcon } source = { require( "./../images/point_to_etusd.png" ) } />
			<Text style = { styles.exchangeItemText }>{ I18n.t( "finance.exchange.potintExchange" ) }</Text>
			<Text style = { styles.exchangeItemText }>ETUSD</Text>
		</TouchableOpacity>
	</View>;
} );
