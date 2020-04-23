import React from "react";

import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

// 产品区高度
const PRODUCTHEIGHT = 80;

// 产品区 icon 宽高
const PRODUCTICONSIZE = 26;

const styles = StyleSheet.create( {
	container: { height: PRODUCTHEIGHT, flexDirection: "row", alignItems: "center", justifyContent: "space-around", backgroundColor: "#FFFFFF", marginVertical: 6 },
	item: { flexDirection: "row", alignItems: "center" },
	icon: { width: PRODUCTICONSIZE, height: PRODUCTICONSIZE },
	infoBox: { marginLeft: 10 },
	infoTitle: { fontSize: 20 },
	infoValue: { fontSize: 12 },
} );

const Item = React.memo( function ( { name, price, onPress } )
{
	return <TouchableOpacity style = { styles.item } onPress = { () => onPress( name ) }>
		{
			name === "BTC"
				? <Image style = { styles.icon } source = { require( "./../images/btc.png" ) } />
			: name === "GOLD"
				? <Image style = { styles.icon } source = { require( "./../images/gold.png" ) } />
			: name === "OIL"
				? <Image style = { styles.icon } source = { require( "./../images/oil.png" ) } />
			: null
		}
		<View style = { styles.infoBox }>
			<Text style = { styles.infoTitle }>{ name }</Text>
			<Text style = { styles.infoValue }>{ price }</Text>
		</View>
	</TouchableOpacity>;
} );

export default React.memo( function ( { contractData, setProductId } )
{
	return <View style = { styles.container }>
	{
		contractData.map( function( item, index )
		{
			return <Item key = { item.name } name = { item.name } price = { item.newprice } onPress = { setProductId } />;
		} )
	}
	</View>
} );

