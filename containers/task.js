import React from "react";

import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from "react-native";

import I18n from "i18n-js";

// 头部高度
const HEADER_HEIGHT = 84;

// 列表高度
const LIST_HEIGHT = 70;

// 列表图标大小
const LIST_ICON_SIZE = 40;

const styles = StyleSheet.create( {
	container: { flex: 1, backgroundColor: "#FFFFFF" },
	header: { height: HEADER_HEIGHT, justifyContent: "space-around", paddingHorizontal: 24, borderBottomWidth: 6, borderColor: "#F5F5F5" },
	headerText: { fontSize: 18, fontWeight: "bold" },

	progressBox: { flexDirection: "row", alignItems: "center" },
	progressText: { fontSize: 12, color: "#10122A" },
	progress: { flex: 1, height: 6, marginHorizontal: 6, borderRadius: 40, flexDirection: "row" },
	progressItem: { flex: 1 },
	activeProgressItem: { backgroundColor: "#FFB629" },
	inActiveProgressItem: { backgroundColor: "#CDD0EA" },

	listBox: { flex: 1, backgroundColor: "#F5F5F5" },
	listItem: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", height: LIST_HEIGHT, backgroundColor: "#FFFFFF", marginBottom: 2, paddingHorizontal: 24 },
	listItemImg: { width: LIST_ICON_SIZE, height: LIST_ICON_SIZE },
	listItemTextBox: { flex: 1, paddingHorizontal: 10 },
	listItemText1: { fontSize: 16, fontWeight: "bold", color: "#000000", marginVertical: 2 },
	listItemText2: { fontSize: 11, color: "#999999", marginVertical: 2 },

	// btn: { paddingHorizontal: 16, paddingVertical: 6, borderRadius: 40 },
	activeBtn: { color: "#FFB629" },
	inActiveBtn: { color: "#6A6DAC" },

} );

const ProgressItem = React.memo( function( { index, progress } )
{
	return <View style = { [ styles.progressItem, index < progress ? styles.activeProgressItem : styles.inActiveProgressItem ] } />
} );

const Progress = React.memo( function( { progress, total } )
{
	return <View style = { styles.progressBox }>
		<Text style = { styles.progressText }>{ I18n.t( "classroom.task.schedule" ) }( { progress } / { total } )</Text>
		<View style = { styles.progress }>
		{
			new Array( total ).fill( 0 ).map( function( item, index )
			{
				return <ProgressItem key = { index } index = { index } progress = { progress } />
			} )
		}
		</View>
	</View>;
} );

const ListItem = React.memo( function( { index, item } )
{
	return <View style = { styles.listItem }>
		<Image style = { styles.listItemImg } source = { item.image } />
		<View style = { styles.listItemTextBox }>
			<Text style = { styles.listItemText1 }>{ item.title }</Text>
			<Text style = { styles.listItemText2 }>{ item.title }</Text>
		</View>
		<Text style = { item.value == 1 ? styles.activeBtn : styles.inActiveBtn }>{ item.value == 1 ? I18n.t( "classroom.task.completed" ) : I18n.t( "classroom.task.unfinished" ) }</Text>
	</View>;
} );


const List = React.memo( function( { data } )
{
	return <ScrollView style = { styles.listBox }>
	{
		[
			{ title: I18n.t( "classroom.task.dividend" ), value: data[ "挖矿分红" ], image: require( "./../images/taskItem1.png" ) },
			{ title: I18n.t( "classroom.task.tradingDig" ), value: data[ "交易挖矿" ], image: require( "./../images/taskItem2.png" ) },
			{ title: I18n.t( "classroom.task.commissions" ), value: data[ "交易佣金" ], image: require( "./../images/taskItem2.png" ) },
			{ title: I18n.t( "classroom.task.mining" ), value: data[ "旗下交易挖矿" ], image: require( "./../images/taskItem3.png" ) },
			{ title: I18n.t( "classroom.task.contracts" ), value: data[ "旗下交易佣金" ], image: require( "./../images/taskItem4.png" ) },
			{ title: I18n.t( "classroom.task.sales" ), value: data[ "团队销售矿机" ], image: require( "./../images/taskItem5.png" ) }
		].map( function( item, index )
		{
			return <ListItem key = { index } index = { index } item = { item } />
		} )
	}
	</ScrollView>;
} );

const Header = React.memo( function( { progress, total } )
{
	return <View style = { styles.header }>
		<Text style = { styles.headerText }>{ I18n.t( "classroom.task.today" ) }</Text>
		<Progress progress = { progress } total = { total } />
	</View>;
} );

export default React.memo( function( { progress, total, data } )
{
	return <View style = { styles.container }>
		<Header progress = { progress } total = { total } />
		<List data = { data } />
	</View>;
} );

