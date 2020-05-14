import React from "react";

import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

// counter input 高度
const COUNTERINPUTHEIGHT = 28;

const styles = StyleSheet.create( {
	counterContainer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
	counterItem: { height: COUNTERINPUTHEIGHT, justifyContent: "center", alignItems: "center" },
	counterViewItem: { flex: 2 },
	counterViewText: { width: "100%", height: COUNTERINPUTHEIGHT, textAlign: "center", fontSize: 10, paddingVertical: 0, backgroundColor: "#FFFFFF" },
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

export default Counter;
