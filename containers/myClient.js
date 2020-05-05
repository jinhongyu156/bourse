import React from "react";

import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity, StyleSheet } from "react-native";

import I18n from "i18n-js";

// 选项页列表行高度
const ROWHEIGHT = 50;

// 选项页头部高度
const HEADERHEIGHT = 30;

// 操作区高度
const HANDLEBOXHEIGHT = 50;

const styles = StyleSheet.create( {
	container: { flex: 1, marginTop: 10, backgroundColor: "#F6F6F6" },
	row: { flexDirection: "row", alignItems: "center", backgroundColor: "#FFFFFF", height: ROWHEIGHT, paddingHorizontal: 10, marginTop: 1 },
	rowText: { flex: 1, color: "#777777", textAlign: "center" },

	header: { flexDirection: "row", alignItems: "center", backgroundColor: "#F6F6F6", height: HEADERHEIGHT, paddingHorizontal: 10 },
	headerText: { flex: 1, color: "#000000", textAlign: "center" },

	handleBox: { height: HANDLEBOXHEIGHT, flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 24, backgroundColor: "#FFFFFF", borderTopWidth: 1, borderColor: "#F6F6F6" },
	handleInfo: { fontSize: 16, fontWeight: "bold" },
	handleBtn: { paddingHorizontal: 10, paddingVertical: 6 },
	handleBtnText: { color: "#FFFFFF" },

	errorBox: { height: 100, alignItems: "center", justifyContent: "center" },
	errorText: { fontSize: 16, color: "#F00" },
	noDataText: { fontSize: 16, color: "#000000" },

	activeBgColor: { backgroundColor: "#696DAC" },
	inactiveBgColor: { backgroundColor: "#888888" }
} );

// 列表头
const Header = React.memo( function()
{
	return <View style = { styles.header }>
		<Text style = { styles.headerText }>ID</Text>
		<Text style = { styles.headerText }>USDT</Text>
		<Text style = { styles.headerText }>SLBT</Text>
		<Text style = { styles.headerText }>{ I18n.t( "user.trading" ) }</Text>
		<Text style = { styles.headerText }>{ I18n.t( "user.tailNumber" ) }</Text>
	</View>;
} );

// 列表行
const Row = React.memo( function( { rowData, onPress } )
{
	return <TouchableOpacity style = { styles.row } onPress = { () => onPress( rowData[ "id" ] ) }>
		<Text style = { styles.rowText }>{ rowData[ "id" ] ? rowData[ "id" ] : "-" }</Text>
		<Text style = { styles.rowText }>{ rowData[ "USDT" ] ? rowData[ "USDT" ] : "-" }</Text>
		<Text style = { styles.rowText }>{ rowData[ "SLBT" ] ? rowData[ "SLBT" ] : "-" }</Text>
		<Text style = { styles.rowText }>{ rowData[ "交易金" ] ? rowData[ "交易金" ] : "-" }</Text>
		<Text style = { styles.rowText }>{ rowData[ "电话" ] ? rowData[ "电话" ] : "-" }</Text>
	</TouchableOpacity>;
} );

export default React.memo( function MyClient( { id, data, loading, error, fetchData } )
{
	const idArr = React.useRef( [ id, id ] );

	const fetchCurrent = () => fetchData( idArr.current[ idArr.current.length - 1 ], idArr.current[ idArr.current.length - 2 ] );

	const fetchDown = React.useCallback( function( currentId )
	{
		idArr.current.push( currentId );
		fetchCurrent()
	}, [] );

	const fetchUp = React.useCallback( function()
	{
		idArr.current.pop();
		fetchCurrent();
	}, [] );

	React.useEffect( function()
	{
		fetchCurrent();
	}, [] );

	const disabled = loading || ( idArr.current.length === 2 );

	return <React.Fragment>
		<ScrollView style = { styles.container } showsVerticalScrollIndicator = { false } stickyHeaderIndices = { [ 0 ] }>
			<Header />
			{
				error ? <View style = { styles.errorBox }><Text style = { styles.errorText }>{ error }</Text></View>
				: ( loading && data.length === 0 ) ? <ActivityIndicator size = "small" color = "#696DAC" />
				: ( !loading && data.length === 0 ) ? <View style = { styles.errorBox }><Text style = { styles.noDataText }>{ I18n.t( "user.noDataText" ) }</Text></View>
				: ( !loading && data.length ) ? data.map( ( item, index ) => <Row key = { index } rowData = { item } onPress = { fetchDown } /> )
				: null
			}
		</ScrollView>
		<View style = { styles.handleBox }>
			<Text style = { styles.handleInfo }>ID: { idArr.current[ idArr.current.length - 1 ] }</Text>
			<TouchableOpacity style = { [ styles.handleBtn, disabled ? styles.inactiveBgColor : styles.activeBgColor ] } onPress = { fetchUp } disabled = { disabled }>
				<Text style = { styles.handleBtnText }>{ I18n.t( "user.goBack" ) }</Text>
			</TouchableOpacity>
		</View>
	</React.Fragment>;
} );
