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
	infoValue: { fontSize: 12 },

	activeTitle: { fontSize: 20, fontWeight: "bold" },
	inActiveTitle: { fontSize: 16, fontWeight: "normal" },

	upColor: { color: "#F4979D" },
	downColor: { color: "#96E89D" },
	normalColor: { color: "#000000" }
} );

const Item = React.memo( function ( { name, price, isAvtive, onPress } )
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
			<Text style = { [ font ] }>{ name }</Text>
			<Text style = { [ color, styles.infoValue ] }>{ price }</Text>
		</View>
	</TouchableOpacity>;
} );

export default React.memo( function ( { data, id, setId } )
{
	return <View style = { styles.container }>
	{
		data.map( function( item, index )
		{
			return <Item key = { item.name } name = { item.name } price = { item.newprice } isAvtive = { item.name === id } onPress = { setId } />;
		} )
	}
	</View>
} );

