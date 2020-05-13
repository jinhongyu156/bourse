import React from "react";

import { View, Text, ScrollView, ActivityIndicator, RefreshControl, StyleSheet } from "react-native";

import I18n from "i18n-js";

const styles = StyleSheet.create( {
	container: { flex: 1, marginTop: 10, backgroundColor: "#F6F6F6" },
	rowBox: { backgroundColor: "#FFFFFF", height: 46, paddingHorizontal: 20, justifyContent: "center", marginTop: 1 },

	errorBox: { height: 100, alignItems: "center", justifyContent: "center" },
	errorText: { fontSize: 16, color: "#F00" },
	noDataText: { fontSize: 16, color: "#000000" }
} );

const Row = React.memo( function( { text } )
{
	return <View style = { styles.rowBox }>
		<Text>{ text }</Text>
	</View>;
} );

export default React.memo( function ShowText( { data, loading, error, fetchData } )
{
	React.useEffect( function()
	{
		fetchData();
	}, [] );

	return <ScrollView style = { styles.container } showsVerticalScrollIndicator = { false } refreshControl = { <RefreshControl refreshing = { loading } onRefresh = { fetchData } /> }>
	{
		error ? <View style = { styles.errorBox }><Text style = { styles.errorText }>{ error }</Text></View>
		: ( loading && data.length === 0 ) ? <ActivityIndicator size = "small" color = "#696DAC" />
		: ( !loading && data.length === 0 ) ? <View style = { styles.errorBox }><Text style = { styles.noDataText }>{ I18n.t( "user.noDataText" ) }</Text></View>
		: ( !loading && data.length ) ? data.map( ( item, index ) => <Row key = { index } text = { item } /> )
		: null
	}
	</ScrollView>;
} );
