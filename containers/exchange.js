import React from "react";

import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

import I18n from "i18n-js";

// 兑换操作容器高度
const EXCHANGEHEIGHT = 110;

// 兑换操作项目 icon 宽高
const EXCHANGEICONSIZE = 62;

const styles = StyleSheet.create( {
	container: { flexDirection: "row", marginTop: 6, height: EXCHANGEHEIGHT, backgroundColor: "#FFFFFF" },
	exchangeItem: { flex: 1, justifyContent: "space-around", alignItems: "center" },
	exchangeIcon: { width: EXCHANGEICONSIZE, height: EXCHANGEICONSIZE },
	exchangeItemText: { color: "#777777" }
} );


export default React.memo( function Exchange( { showModal } )
{
	return <View style = { styles.container }>
		<TouchableOpacity style = { styles.exchangeItem } onPress = { () => showModal( "USD兑换ETU" ) }>
			<Image style = { styles.exchangeIcon } source = { require( "./../images/usdt_to_etu.png" ) } />
			<React.Fragment>
				<Text style = { styles.exchangeItemText }>USDT { I18n.t( "finance.exchange.exchangeText" ) }</Text>
				<Text style = { styles.exchangeItemText }>ETU</Text>
			</React.Fragment>
		</TouchableOpacity>
		<TouchableOpacity style = { styles.exchangeItem } onPress = { () => showModal( "积分兑USDT" ) }>
			<Image style = { styles.exchangeIcon } source = { require( "./../images/point_to_usdt.png" ) } />
			<React.Fragment>
				<Text style = { styles.exchangeItemText }>{ I18n.t( "finance.exchange.potintExchange" ) }</Text>
				<Text style = { styles.exchangeItemText }>USDT</Text>
			</React.Fragment>
		</TouchableOpacity>
		<TouchableOpacity style = { styles.exchangeItem } onPress = { () => showModal( "积分兑ETUSD" ) }>
			<Image style = { styles.exchangeIcon } source = { require( "./../images/point_to_etusd.png" ) } />
			<React.Fragment>
				<Text style = { styles.exchangeItemText }>{ I18n.t( "finance.exchange.potintExchange" ) }</Text>
				<Text style = { styles.exchangeItemText }>ETUSD</Text>
			</React.Fragment>
		</TouchableOpacity>
	</View>;
} );
