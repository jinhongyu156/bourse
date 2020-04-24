import React from "react";

import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

import I18n from "i18n-js";

// 行的高度
const ROWHEIGHT = 76;

// counter input 高度
const COUNTERINPUTHEIGHT = 28;

const styles = StyleSheet.create( {
	container: { flex: 1, marginTop: 6 },

	row: { height: ROWHEIGHT, flexDirection: "row", alignItems: "center", backgroundColor: "#FFFFFF", marginBottom: 2 },
	item: { height: ROWHEIGHT * 0.7, justifyContent: "space-between" },
	verticalCenterItem: { justifyContent: "center" },
	horizontalCenterItem: { alignItems: "center" },
	btn: { paddingVertical: 12, paddingHorizontal: 20, borderRadius: 20 },
	plusBtn: { backgroundColor: "#696DAC" },
	minusBtn: { backgroundColor: "#CDCFDE" },
	plusBtnText: { fontWeight: "bold", color: "#FFFFFF" },
	minusBtnText: { fontWeight: "bold", color: "#22244D" },
	col10Text: { fontSize: 18, marginTop: -4, color: "#000000" },
	col11Text: { fontSize: 12, color: "#9D9D9D" },
	col20Text: { fontSize: 14, color: "#82818C" },
	col21Text: { fontSize: 12, color: "#9D9D9D" },
	col30Text: { fontSize: 12, color: "#585862" },

	counterContainer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
	counterItem: { height: COUNTERINPUTHEIGHT, justifyContent: "center", alignItems: "center" },
	counterViewItem: { flex: 2, backgroundColor: "#FFFFFF" },
	counterViewText: { height: COUNTERINPUTHEIGHT, fontSize: 10, paddingVertical: 0 },
	counterHandleItem: { flex: 1, backgroundColor: "#D8D8D8" },
	counterHandleText: { fontSize: 14 }
} );

const Counter = React.memo( function( { count, setCount } )
{
	return <View style = { styles.counterContainer }>
		<TouchableOpacity style = { [ styles.counterItem, styles.counterHandleItem ] } disabled = { count - 1 === 0 } onPress = { () => setCount( String( Number( count ) - 1 ) ) } >
			<Text style = { styles.counterHandleText }>-</Text>
		</TouchableOpacity>
		<View style = { [ styles.counterItem, styles.counterViewItem ] }>
			<TextInput style = { styles.counterViewText } value = { String( count ) } keyboardType = { "numeric" } onChangeText = { setCount } />
		</View>
		<TouchableOpacity style = { [ styles.counterItem, styles.counterHandleItem ] } disabled = { false } onPress = { () => setCount( String( Number( count ) + 1 ) ) }>
			<Text style = { styles.counterHandleText }>+</Text>
		</TouchableOpacity>
	</View>
} );

const Row = React.memo( function( { id, index, count, setCount, code, float, price } )
{

	/*const col30Message = ( id === "BTC" ? getNum( String( count * ( float * price ) / 20 ), 2 )
		: id === "GOLD" ? getNum( String( count * ( float * price ) / 100 ), 2 )
		: id === "OIL" ? getNum( String( count * ( float * price ) / 50 ), 2 )
		: "" ).concat( index === 0 ? "USDT"
			: index === 1 ? I18n.t( "contract.trading" )
			: index === 2 ? "SLBT"
			: ""
		);

	const col1message = code.replace( id, id === "BTC" ? I18n.t( "contract.btc" )
		: id === "GOLD" ? I18n.t( "contract.gold" )
		: id === "OIL" ? I18n.t( "contract.oil" )
		: ""
	);*/
	const _setCount = React.useCallback( function( count )
	{
		setCount( count, code );
	} );

	return <View style = { styles.row }>
		<View style = { [ styles.item, styles.verticalCenterItem, styles.horizontalCenterItem, { flex: 12 } ] }>
			<TouchableOpacity style = { [ styles.btn, styles.plusBtn ] }>
				<Text style = { styles.plusBtnText }>{ I18n.t( "contract.buyUp" ) }</Text>
			</TouchableOpacity>
		</View>
		<View style = { [ styles.item,  { flex: 13 } ] }>
			<Text style = { styles.col10Text }>{ code }</Text>
			<Text style = { styles.col11Text }>1</Text>
		</View>
		<View style = { [ styles.item,  { flex: 8 } ] }>
			<Text style = { styles.col20Text }>{ I18n.t( "contract.cashDeposit" ) }</Text>
			<Text style = { styles.col21Text }>{ I18n.t( "contract.NumberOfHand" ) }</Text>
		</View>
		<View style = { [ styles.item, styles.horizontalCenterItem, { flex: 12 } ] }>
			<Text style = { styles.col30Text }>1</Text>
			<Counter count = { count } setCount = { _setCount } />
		</View>
		<View style = { [ styles.item, styles.verticalCenterItem, styles.horizontalCenterItem, { flex: 12 } ] }>
			<TouchableOpacity style = { [ styles.btn, styles.minusBtn ] }>
				<Text style = { styles.minusBtnText }>{ I18n.t( "contract.buyDown" ) }</Text>
			</TouchableOpacity>
		</View>
	</View>;
} );

export default function( { id, tabIndex, setCount, data } )
{
	console.log( 'data', data );
	return <View style = { styles.container }>
	{
		data.map( function( item, index )
		{
			return <Row key = { index } index = { tabIndex } id = { id } count = { item.count } setCount = { setCount } code = { item.code } float = { Number( item[ "波动盈亏" ] ) } price = { item.price } />;
		} )
	}
	</View>;
};
