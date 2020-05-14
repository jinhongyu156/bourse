import React from "react";

import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

// 产品区高度
const PRODUCTHEIGHT = 80;

// 产品区 icon 宽高
const PRODUCTICONSIZE = 26;

const styles = StyleSheet.create( {
	container: { height: PRODUCTHEIGHT, flexDirection: "row", backgroundColor: "#FFFFFF", marginTop: 6, paddingHorizontal: 8 },
	item: { flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center", marginHorizontal: 6, marginVertical: 10, borderRadius: 10 },
	icon: { width: PRODUCTICONSIZE, height: PRODUCTICONSIZE },
	infoBox: { marginLeft: 10 },
	infoValue: { fontSize: 12 },

	activeTitle: { fontSize: 20, fontWeight: "bold" },
	inActiveTitle: { fontSize: 16, fontWeight: "normal" },

	upColor: { color: "#F4979D" },
	downColor: { color: "#96E89D" },
	normalColor: { color: "#000000" },

	inActiveBgColor: { backgroundColor: "#F8F8F8" },
	activeBgColor: { backgroundColor: "#E1E2F4" }
} );

const Item = function ( { name, price, isAvtive, onPress } )
{
	const prevPrice = React.useRef( price );
	const [ state, setState ] = React.useState( 0 )

	if( prevPrice.current !== price )
	{
		if( price > prevPrice.current )
		{
			setState( 1 );
		};
		if( price < prevPrice.current )
		{
			setState( -1 );
		};
		prevPrice.current = price;
	};

	const color = state > 0 ? styles.upColor : state < 0 ? styles.downColor : state.normalColor;
	const font = isAvtive ? styles.activeTitle : styles.inActiveTitle;
	const bgColor = isAvtive ? styles.activeBgColor : styles.inActiveBgColor;

	return <TouchableOpacity style = { [ styles.item, bgColor ] } onPress = { () => onPress( name ) }>
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
			<Text style = { [ font ] }>{ name }</Text>
			<Text style = { [ color, styles.infoValue ] }>{ price }</Text>
		</View>
	</TouchableOpacity>;
};

export default function ( { data, id, setId } )
{
	return <View style = { styles.container }>
	{
		data.map( function( item, index )
		{
			return <Item key = { item.name } name = { item.name } price = { item.newprice } isAvtive = { item.name === id } onPress = { setId } />;
		} )
	}
	</View>
};

