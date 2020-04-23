import React from "react";

import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

import { numberReg } from "./../javascripts/regExp.js";

// 行的高度
const ROWHEIGHT = 76;

// counter 宽度
const COUNTERWIDTH = 90;

// counter input 高度
const COUNTERINPUTHEIGHT = 28;

const styles = StyleSheet.create( {
	container: { flex: 1, marginTop: 6 },

	row: { height: ROWHEIGHT, flexDirection: "row", justifyContent: "space-around", alignItems: "center", backgroundColor: "#FFFFFF", marginBottom: 2 },
	item: { height: ROWHEIGHT * 0.7, justifyContent: "space-between" },
	verticalCenterItem: { justifyContent: "center" },
	horizontalCenterItem: { alignItems: "center" },
	btn: { paddingVertical: 12, paddingHorizontal: 18, borderRadius: 20 },
	plusBtn: { backgroundColor: "#696DAC" },
	minusBtn: { backgroundColor: "#CDCFDE" },
	plusBtnText: { fontWeight: "bold", color: "#FFFFFF" },
	minusBtnText: { fontWeight: "bold", color: "#22244D" },
	col10Text: { fontSize: 20, marginTop: -4, color: "#000000" },
	col11Text: { fontSize: 12, color: "#9D9D9D" },
	col20Text: { fontSize: 14, color: "#82818C" },
	col21Text: { fontSize: 12, color: "#9D9D9D" },
	col30Text: { fontSize: 14, color: "#585862" },

	counterContainer: { width: COUNTERWIDTH, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
	counterItem: { height: COUNTERINPUTHEIGHT, justifyContent: "center", alignItems: "center", backgroundColor: "red" },
	counterViewItem: { flex: 2, backgroundColor: "#FFFFFF" },
	counterViewText: { height: COUNTERINPUTHEIGHT, fontSize: 10, paddingVertical: 0 },
	counterHandleItem: { flex: 1, backgroundColor: "#D8D8D8" },
	counterHandleText: { fontSize: 14 }
} );

const Counter = React.memo( function()
{
	const [ count, setCount ] = React.useState( 1 );

	return <View style = { styles.counterContainer }>
		<TouchableOpacity style = { [ styles.counterItem, styles.counterHandleItem ] } disabled = { count - 1 === 0 } onPress = { () => setCount( c => c - 1 ) } >
			<Text style = { styles.counterHandleText }>-</Text>
		</TouchableOpacity>
		<View style = { [ styles.counterItem, styles.counterViewItem ] }>
			<TextInput
				style = { styles.counterViewText }
				value = { String( count ) }
				keyboardType = { "numeric" }
				onChangeText = { text => numberReg.test( text ) && setCount( text ) } />
		</View>
		<TouchableOpacity style = { [ styles.counterItem, styles.counterHandleItem ] } disabled = { false } onPress = { () => setCount( c => c + 1 ) }>
			<Text style = { styles.counterHandleText }>+</Text>
		</TouchableOpacity>
	</View>
} );

const Row = React.memo( function()
{
	return <View style = { styles.row }>
		<View style = { [ styles.item, styles.verticalCenterItem ] }>
			<TouchableOpacity style = { [ styles.btn, styles.plusBtn ] }>
				<Text style = { styles.plusBtnText }>买涨</Text>
			</TouchableOpacity>
		</View>
		<View style = { styles.item }>
			<Text style = { styles.col10Text }>BTC0.01</Text>
			<Text style = { styles.col11Text }>比特币0.01</Text>
		</View>
		<View style = { styles.item }>
			<Text style = { styles.col20Text }>保证金</Text>
			<Text style = { styles.col21Text }>手数</Text>
		</View>
		<View style = { [ styles.item, styles.horizontalCenterItem ] }>
			<Text style = { styles.col30Text }>0.001 USDT</Text>
			<Counter />
		</View>
		<View style = { [ styles.item, styles.verticalCenterItem ] }>
			<TouchableOpacity style = { [ styles.btn, styles.minusBtn ] }>
				<Text style = { styles.minusBtnText }>买跌</Text>
			</TouchableOpacity>
		</View>
	</View>
} );

export default React.memo( function( { data } )
{
	console.log( data );
	return <View style = { styles.container }>
	{
		data.map( function( item, index )
		{
			return <Row key = { index } />
		} )
	}
	</View>;
} );
