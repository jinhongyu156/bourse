import React from "react";

import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

import Toast from "react-native-root-toast";

import Counter from "./../components/counter.js";

import I18n from "i18n-js";

// 行的高度
const ROWHEIGHT = 80;

const styles = StyleSheet.create( {
	container: { flex: 1 },

	row: { height: ROWHEIGHT, flexDirection: "row", alignItems: "center", backgroundColor: "#FFFFFF", marginBottom: 2 },
	item: { height: ROWHEIGHT * 0.68, justifyContent: "space-between" },
	verticalCenterItem: { justifyContent: "center" },
	horizontalCenterItem: { alignItems: "center" },
	btn: { width: 54, height: 54, borderRadius: 54, alignItems: "center", justifyContent: "center" },
	plusBtn: { backgroundColor: "#696DAC" },
	minusBtn: { backgroundColor: "#CDCFDE" },
	plusBtnText: { fontWeight: "bold", color: "#FFFFFF" },
	minusBtnText: { fontWeight: "bold", color: "#22244D" },
	counterBox: { width: "90%" },
	col10Text: { fontSize: 16, marginTop: -2, color: "#000000" },
	col11Text: { fontSize: 12, color: "#9D9D9D" },
	col20Text: { fontSize: 14, color: "#82818C" },
	col21Text: { fontSize: 12, color: "#9D9D9D" },
	col30Text: { fontSize: 12, color: "#000000", fontWeight: "bold" }
} );


const Row = function( { count, setCount, code, total, msg, submit } )
{
	const bindSetCount = React.useCallback( function( text )
	{
		setCount( text, code );
	}, [ code ] );

	const bindSubmit = React.useCallback( function( direction )
	{
		submit( { code, count, direction }, res => Toast.show( res ) )
	}, [ code, count ] )

	return <View style = { styles.row }>
		<View style = { [ styles.item, styles.verticalCenterItem, styles.horizontalCenterItem, { flex: 12 } ] }>
			<TouchableOpacity style = { [ styles.btn, styles.plusBtn ] } onPress = { () => bindSubmit( "up" ) }>
				<Text style = { styles.plusBtnText }>{ I18n.t( "contract.buyUp" ) }</Text>
			</TouchableOpacity>
		</View>
		<View style = { [ styles.item,  { flex: 12 } ] }>
			<Text style = { styles.col10Text }>{ code }</Text>
			<Text style = { styles.col11Text }>{ msg }</Text>
		</View>
		<View style = { [ styles.item,  { flex: 7 } ] }>
			<Text style = { styles.col20Text }>{ I18n.t( "contract.cashDeposit" ) }</Text>
			<Text style = { styles.col21Text }>{ I18n.t( "contract.NumberOfHand" ) }</Text>
		</View>
		<View style = { [ styles.item, styles.horizontalCenterItem, { flex: 12 } ] }>
			<Text style = { styles.col30Text }>{ total }</Text>
			<View style = { styles.counterBox }>
				<Counter count = { count } setCount = { bindSetCount } />
			</View>
		</View>
		<View style = { [ styles.item, styles.verticalCenterItem, styles.horizontalCenterItem, { flex: 12 } ] }>
			<TouchableOpacity style = { [ styles.btn, styles.minusBtn ] } onPress = { () => bindSubmit( "down" ) }>
				<Text style = { styles.minusBtnText }>{ I18n.t( "contract.buyDown" ) }</Text>
			</TouchableOpacity>
		</View>
	</View>;
};

export default function( { data, setCount, submit } )
{
	return <View style = { styles.container }>
	{
		data.map( function( item, index )
		{
			return <Row key = { index } count = { item.count } setCount = { setCount } code = { item.code } total = { item.total } msg = { item.msg } submit = { submit } />;
		} )
	}
	</View>;
};

