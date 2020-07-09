import React from "react";

import { View, FlatList, Text, Alert, TouchableOpacity, StyleSheet } from "react-native";

import { useNavigation } from "@react-navigation/native";

import Toast from "react-native-root-toast";

import I18n from "i18n-js";

import SubmitBtn from "./../containers/submit.js";

import { Accordion } from "./../components/accordion.js";

// 订单标题行的高度
const ACCORDIONTITLEHEIGTH = 50;

// 订单内容行的高度
const ACCORDIONCONTENTITEMHEIGHT = 36;

// 平仓按钮高度
const SUBMITBTNHEIGHT = 40

const styles = StyleSheet.create( {

	container: { marginTop: 6, flex: 1 },

	row: { marginVertical: 1, height: ACCORDIONTITLEHEIGTH, flexDirection: "row", justifyContent: "space-around", alignItems: "center", backgroundColor: "#FFFFFF" },

	submitBtn: { width: "80%", height: SUBMITBTNHEIGHT, marginVertical: 10, alignSelf: "center" },

	col10Text: { fontSize: 14, color: "#4E4C58" },
	col11View: { flexDirection: "row" },
	col11Text: { fontSize: 12, color: "#9D9D9D" },

	upColor: { color: "#F4979D" },
	downColor: { color: "#96E89D" },
	normalColor: { color: "#9D9D9D" },

	col50Text: { fontSize: 14, color: "#F4979D" },
	col51Text: { fontSize: 12, color: "#96E89D" },

	noDataBox: { height: 100, justifyContent: "center", alignItems: "center" },
	noDataText: { color: "#777777" },

	btn: { backgroundColor: "#696DAC", color: "#FFFFFF", fontSize: 12, paddingHorizontal: 10, paddingVertical: 4, marginTop: 10 }
} );

const Row = React.memo( function( { open, index, data } )
{
	const prevPrice = React.useRef( data[ "newprice" ] );
	const [ state, setState ] = React.useState( 0 )

	if( prevPrice.current !== data[ "newprice" ] )
	{
		if( data[ "newprice" ] > prevPrice.current )
		{
			setState( 1 );
		};
		if( data[ "newprice" ] < prevPrice.current )
		{
			setState( -1 );
		};
		prevPrice.current = data[ "newprice" ];
	};

	const color = state > 0 ? styles.upColor : state < 0 ? styles.downColor : state.normalColor;

	return <View style = { styles.row }>
		<View>
			<Text style = { styles.col10Text }>{ data[ "产品代码" ] }</Text>
			<View style = { styles.col11View }>
				<Text style = { styles.col11Text }>{ data[ "建仓点数" ] } -></Text>
				<Text style = { [ styles.col11Text, color ] }>{ data[ "newprice" ] }</Text>
			</View>
		</View>
		<React.Fragment>
			<Text style = { data[ "产品方向" ] === "0" ? styles.upColor : styles.downColor }>
				{ data[ "产品方向" ] === "0" ? I18n.t( "contract.buy" ) : I18n.t( "contract.sell" ) }
			</Text>
		</React.Fragment>
		<React.Fragment>
			<Text>{ data[ "购买数量" ] }</Text>
		</React.Fragment>
		<React.Fragment>
			<Text style = { Number( data[ "profit" ] ) > 0 ? styles.upColor : styles.downColor }>{ data[ "profit" ] }</Text>
		</React.Fragment>
		<View>
			<Text style = { styles.col50Text }>{ data[ "止盈价" ] }</Text>
			<Text style = { styles.col51Text }>{ data[ "止损价" ] }</Text>
		</View>
	</View>;
} );

const NoMaster = React.memo( function( { onPress } )
{
	return <View style = { styles.noDataBox }>
		<Text style = { styles.noDataText }>{ I18n.t( "simulator.noFocuMasterInfo" ) }</Text>
		<Text style = { styles.btn } onPress = { onPress }>{ I18n.t( "simulator.focuMaster" ) }</Text>
	</View>
} );

const Nodata = React.memo( function()
{
	return <View style = { styles.noDataBox }>
		<Text style = { styles.noDataText }>{ I18n.t( "simulator.noData" ) }</Text>
	</View>
} );

export default function( { data, noMaster } )
{
	const navigation = useNavigation();

	const goToRanking = React.useCallback( function()
	{
		navigation.push( "Ranking" );
	}, [] );
	return noMaster
		? <NoMaster onPress = { goToRanking } />
		: <FlatList
			data = { data }
			style = { styles.container }
			renderItem = { ( { item, index } ) => <Row key = { item.id } data = { item } /> }
			ListEmptyComponent = { () => <Nodata /> }
			showsVerticalScrollIndicator = { false }
			keyExtractor = { ( item, index ) => String( index ) }
		/>
};

