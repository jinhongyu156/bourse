import React from "react";

import { View, Text, ScrollView, ToastAndroid, ActivityIndicator, TouchableOpacity, StyleSheet } from "react-native";

import I18n from "i18n-js";

// 选项页列表行高度
const ROWHEIGHT = 50;

// 选项页头部高度
const HEADERHEIGHT = 30;

const styles = StyleSheet.create( {
	container: { flex: 1, marginTop: 10, backgroundColor: "#F6F6F6" },
	row: { flexDirection: "row", alignItems: "center", backgroundColor: "#FFFFFF", height: ROWHEIGHT, paddingHorizontal: 10, marginTop: 1 },
	rowText: { flex: 1, color: "#777777", textAlign: "center" },
	longText: { flex: 2 },
	btn: { flex: 1, alignItems: "center", justifyContent: "center" },
	btnText: { backgroundColor: "#696DAC", paddingHorizontal: 8, paddingVertical: 4, color: "#FFFFFF" },

	header: { flexDirection: "row", alignItems: "center", backgroundColor: "#F6F6F6", height: HEADERHEIGHT, paddingHorizontal: 10 },
	headerText: { flex: 1, color: "#000000", textAlign: "center" },

	errorBox: { height: 100, alignItems: "center", justifyContent: "center" },
	errorText: { fontSize: 16, color: "#F00" },
	noDataText: { fontSize: 16, color: "#000000" },
} );

// 列表头
const Header = React.memo( function()
{
	return <View style = { styles.header }>
		<Text style = { styles.headerText }>ID</Text>
		<Text style = { styles.headerText }>{ I18n.t( "user.name" ) }</Text>
		<Text style = { [ styles.headerText, styles.longText ] }>{ I18n.t( "user.account" ) }</Text>
		<Text style = { styles.headerText }>{ I18n.t( "user.operation" ) }</Text>
	</View>;
} );

// 列表行
const Row = React.memo( function( { rowData, onPress } )
{
	return <View style = { styles.row }>
		<Text style = { styles.rowText }>{ rowData[ "id" ] ? rowData[ "id" ] : "-" }</Text>
		<Text style = { styles.rowText }>{ rowData[ "姓名" ] ? rowData[ "姓名" ] : "-" }</Text>
		<Text style = { [ styles.rowText, styles.longText ] }>{ rowData[ "电话" ] ? rowData[ "电话" ] : "-" }</Text>
		<TouchableOpacity style = { styles.btn } onPress = { () => onPress( rowData[ "id" ] ) }>
			<Text style = { styles.btnText }>{ I18n.t( "user.unbind" ) }</Text>
		</TouchableOpacity>
	</View>;
} );

export default React.memo( function SubAccounts( { data, loading, error, unbind, fetchData } )
{
	React.useEffect( function()
	{
		fetchData();
	}, [] );

	const onPress = React.useCallback( function( id )
	{
		unbind( id, res => ToastAndroid.show( res, ToastAndroid.SHORT ) );
	}, [] );

	return <ScrollView style = { styles.container } showsVerticalScrollIndicator = { false } stickyHeaderIndices = { [ 0 ] }>
		<Header />
		{
			error ? <View style = { styles.errorBox }><Text style = { styles.errorText }>{ error }</Text></View>
			: ( loading && data.length === 0 ) ? <ActivityIndicator size = "small" color = "#696DAC" />
			: ( !loading && data.length === 0 ) ? <View style = { styles.errorBox }><Text style = { styles.noDataText }>{ I18n.t( "user.noDataText" ) }</Text></View>
			: ( !loading && data.length ) ? data.map( ( item, index ) => <Row key = { index } rowData = { item } onPress = { onPress } /> )
			: null
		}
	</ScrollView>;
} );
