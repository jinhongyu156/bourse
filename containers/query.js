import React from "react";

import { View, Text, FlatList, RefreshControl, Keyboard, ActivityIndicator, TouchableOpacity, StyleSheet } from "react-native";

import I18n from "i18n-js";

import ActionSheet from "./../components/actionSheet.js";

import { AccordionItem } from "./../components/accordion.js";

// 导航 box 高度
const NAVBOXHEIGHT = 30;

// 操作区高度
const HANDLEBOXHEIGHT = 46;

// flatList row title 高度
const FLATLISTTITLEHEIGHT = 40;

// flatList content row 高度
const FLATLISCONTENTHEIGHT = 40;

const styles = StyleSheet.create( {
	container: { flex: 1, marginTop: 10, backgroundColor: "#F6F6F6" },
	navBox: { flexDirection: "row", height: NAVBOXHEIGHT, alignItems: "center", backgroundColor: "#F6F6F6" },
	navBoxItem: { flex: 1, height: NAVBOXHEIGHT, justifyContent: "center", alignItems: "center" },
	activeBgColor: { backgroundColor: "#696DAC" },
	activeColor: { color: "#FFFFFF" },
	inactiveBgColor: { backgroundColor: "#F0F0F0" },
	inactiveColor: { color: "#ACACBA" },

	flatListContainer: { flex: 1 },
	itemSeparator: { height: 1, backgroundColor: "#F6F6F6" },
	flatListTitle: { flexDirection: "row", alignItems: "center", height: FLATLISTTITLEHEIGHT, paddingHorizontal: 20, backgroundColor: "#FFFFFF" },
	flatListHeader: { borderBottomWidth: 1, borderColor: "#F6F6F6" },
	flatListTitleItem: { flex: 3, alignItems: "center" },
	flatListTitleItemStart: { flex: 8, alignItems: "flex-start" },
	flatListTitleItemEnd: { flex: 4, alignItems: "flex-end" },
	flatListTitleText: { fontSize: 12 },
	flatListContent: { paddingVertical: 10, paddingHorizontal: 20, justifyContent: "space-around", backgroundColor: "#F6F6F6" },
	flatListContentItem: { flexDirection: "row", height: FLATLISCONTENTHEIGHT, justifyContent: "space-between", alignItems: "center" },
	flatListContentKeyText: { fontSize: 12, color: "#9B9B9B" },
	flatListContentValueText: { fontSize: 12, color: "#AAAAAA" },

	handleBox: { height: HANDLEBOXHEIGHT, flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 24, backgroundColor: "#FFFFFF", borderTopWidth: 1, borderColor: "#F6F6F6" },
	handleInfo: { fontSize: 16, fontWeight: "bold" },
	handleBtn: { paddingHorizontal: 10, paddingVertical: 4, backgroundColor: "#696DAC" },
	handleBtnText: { color: "#FFFFFF" },

	errorBox: { height: 100, alignItems: "center", justifyContent: "center" },
	errorText: { fontSize: 16 },

} );

const ItemSeparator = React.memo( function()
{
	return <View style = { styles.itemSeparator } />;
} );

const ListError = React.memo( function( { error } )
{
	return <View style = { styles.errorBox }>
		<Text style = { styles.errorText }>{ error }</Text>
	</View>;
} );

const ListEmpty = React.memo( function()
{
	return <View style = { styles.errorBox }>
		<Text style = { styles.errorText }>{ I18n.t( "user.noDataText" ) }</Text>
	</View>;
} );

const Loading = React.memo( function()
{
	return <ActivityIndicator size = "small" color = "#696DAC" />;
} );

const ListHeader = React.memo( function( { queryTypeIndex } )
{
	if( queryTypeIndex === 0 )
	{
		return <View style = { [ styles.flatListTitle, styles.flatListHeader ] }>
			<View style = { [ styles.flatListTitleItem, styles.flatListTitleItemStart ] }>
				<Text>{ I18n.t( "user.statement" ) }</Text>
			</View>
			<View style = { styles.flatListTitleItem }>
				<Text>{ I18n.t( "user.amount" ) }</Text>
			</View>
			<View style = { [ styles.flatListTitleItem, styles.flatListTitleItemEnd ] }>
				<Text>{ I18n.t( "user.balance" ) }</Text>
			</View>
		</View>;
	};
	if( queryTypeIndex === 1 )
	{
		return <View style = { [ styles.flatListTitle, styles.flatListHeader ] }>
			<View style = { [ styles.flatListTitleItem, styles.flatListTitleItemStart ] }>
				<Text>{ I18n.t( "user.statement" ) }</Text>
			</View>
			<View style = { styles.flatListTitleItem }>
				<Text>{ I18n.t( "user.direction" ) }</Text>
			</View>
			<View style = { styles.flatListTitleItem }>
				<Text>{ I18n.t( "user.number" ) }</Text>
			</View>
			<View style = { [ styles.flatListTitleItem, styles.flatListTitleItemEnd ] }>
				<Text>{ I18n.t( "user.profit" ) }</Text>
			</View>
		</View>; 
	};
} );

const Title = React.memo( function( { queryTypeIndex, direction, amount, balance, statement, number, profit } )
{
	if( queryTypeIndex === 0 )
	{
		return <View style = { styles.flatListTitle }>
			<View style = { [ styles.flatListTitleItem, styles.flatListTitleItemStart ] }>
				<Text style = { styles.flatListTitleText }>{ direction }</Text>
			</View>
			<View style = { styles.flatListTitleItem }>
				<Text style = { styles.flatListTitleText }>{ amount }</Text>
			</View>
			<View style = { [ styles.flatListTitleItem, styles.flatListTitleItemEnd ] }>
				<Text style = { styles.flatListTitleText }>{ balance }</Text>
			</View>
		</View>;
	};
	if( queryTypeIndex === 1 )
	{
		return <View style = { styles.flatListTitle }>
			<View style = { [ styles.flatListTitleItem, styles.flatListTitleItemStart ] }>
				<Text style = { styles.flatListTitleText }>{ statement }</Text>
			</View>
			<View style = { styles.flatListTitleItem }>
				<Text style = { styles.flatListTitleText }>{ direction }</Text>
			</View>
			<View style = { styles.flatListTitleItem }>
				<Text style = { styles.flatListTitleText }>{ number }</Text>
			</View>
			<View style = { [ styles.flatListTitleItem, styles.flatListTitleItemEnd ] }>
				<Text style = { styles.flatListTitleText }>{ profit }</Text>
			</View>
		</View>;
	};
} );

const Content = React.memo( function( { queryTypeIndex, time, orderId, note, openNumber, closeNumber, totalAmount, totalFee, openTime, closeTime } )
{
	if( queryTypeIndex === 0 )
	{
		return <View style = { styles.flatListContent }>
			<View style = { styles.flatListContentItem }>
				<Text style = { styles.flatListContentKeyText }>{ I18n.t( "user.time" ) }</Text>
				<Text style = { styles.flatListContentValueText }>{ time }</Text>
			</View>
			<View style = { styles.flatListContentItem }>
				<Text style = { styles.flatListContentKeyText }>{ I18n.t( "user.orderId" ) }</Text>
				<Text style = { styles.flatListContentValueText }>{ orderId }</Text>
			</View>
			<View style = { styles.flatListContentItem }>
				<Text style = { styles.flatListContentKeyText }>{ I18n.t( "user.note" ) }</Text>
				<Text style = { styles.flatListContentValueText }>{ note }</Text>
			</View>
		</View>;
	};
	if( queryTypeIndex === 1 )
	{
		return <View style = { styles.flatListContent }>
			<View style = { styles.flatListContentItem }>
				<Text style = { styles.flatListContentKeyText }>{ I18n.t( "user.orderId" ) }</Text>
				<Text style = { styles.flatListContentValueText }>{ orderId }</Text>
			</View>
			<View style = { styles.flatListContentItem }>
				<Text style = { styles.flatListContentKeyText }>{ I18n.t( "user.openNumber" ) }</Text>
				<Text style = { styles.flatListContentValueText }>{ openNumber }</Text>
			</View>
			<View style = { styles.flatListContentItem }>
				<Text style = { styles.flatListContentKeyText }>{ I18n.t( "user.closeNumber" ) }</Text>
				<Text style = { styles.flatListContentValueText }>{ closeNumber }</Text>
			</View>
			<View style = { styles.flatListContentItem }>
				<Text style = { styles.flatListContentKeyText }>{ I18n.t( "user.totalAmount" ) }</Text>
				<Text style = { styles.flatListContentValueText }>{ totalAmount }</Text>
			</View>
			<View style = { styles.flatListContentItem }>
				<Text style = { styles.flatListContentKeyText }>{ I18n.t( "user.totalFee" ) }</Text>
				<Text style = { styles.flatListContentValueText }>{ totalFee }</Text>
			</View>
			<View style = { styles.flatListContentItem }>
				<Text style = { styles.flatListContentKeyText }>{ I18n.t( "user.openTime" ) }</Text>
				<Text style = { styles.flatListContentValueText }>{ openTime }</Text>
			</View>
			<View style = { styles.flatListContentItem }>
				<Text style = { styles.flatListContentKeyText }>{ I18n.t( "user.closeTime" ) }</Text>
				<Text style = { styles.flatListContentValueText }>{ closeTime }</Text>
			</View>
		</View>;
	};
} );

const Row = React.memo( function( { item, queryTypeIndex } )
{
	return <AccordionItem
		index = { item.id }
		expanded = { [] }
		renderTitle = { () => <Title
			queryTypeIndex = { queryTypeIndex }
			direction = { queryTypeIndex === 0 ? item[ "流水方向" ] : ( item[ "产品方向" ] === "0" ? "购买" : "卖出" ) }
			amount = { item[ "流水金额" ] }
			balance = { item[ "用户余额" ] }
			statement = { `${ item[ "产品代码" ] }: ${ item[ "建仓点数" ] } -> ${ item[ "平仓点数" ] }` }
			number = { item[ "购买数量" ] }
			profit = { item[ "平仓盈亏" ] }
		/> }
		renderContent = { () => <Content
			queryTypeIndex = { queryTypeIndex }
			time = { item[ "流水时间" ] }
			orderId = { item[ "订单号" ] }
			note = { item[ "备注" ] }
			openNumber = { item[ "建仓点数" ] }
			closeNumber = { item[ "平仓点数" ] }
			totalAmount = { item[ "总金额" ] }
			totalFee = { item[ "总手续费" ] }
			openTime = { item[ "建仓时间" ] }
			closeTime = { item[ "平仓时间" ] }
		/> }
	/>;
} );

export default React.memo( function Query( { data, loading, error, queryNavIndex, queryTypeIndex, setQueryNavIndex, isShowActionSheet, actionSheetData, showQueryTypeIndexActionSheet, hideActionSheet, fetchData } )
{
	React.useEffect( function()
	{
		fetchData();
	}, [] );

	const queryTypeText = queryTypeIndex === 0 ? I18n.t( "user.queryStatement" ) : queryTypeIndex === 1 ? I18n.t( "user.otc" ) : "";

	return <View style = { styles.container }>
		<View style = { styles.navBox }>
		{
			[ "USDT", "ETUSD", I18n.t( "user.trading" ), "SLBT", I18n.t( "user.vouchers" ) ].map( function( item, index, array )
			{
				const bgColor = queryNavIndex === index ? styles.activeBgColor : styles.inactiveBgColor;
				const color = queryNavIndex === index ? styles.activeColor : styles.inactiveColor;
				return <TouchableOpacity key = { item } style = { [ styles.navBoxItem, bgColor ] } onPress = { () => setQueryNavIndex( index ) }>
					<Text style = { styles.activeColor, color }>{ item }</Text>
				</TouchableOpacity>;
			} )
		}
		</View>
		<ListHeader queryTypeIndex = { queryTypeIndex } />
		<FlatList
			data = { data }
			style = { styles.flatListContainer }
			keyboardDismissMode = { "on-drag" }
			onScrollBeginDrag = { Keyboard.dismiss }
			renderItem = { ( { item, index } ) => <Row item = { item } queryTypeIndex = { queryTypeIndex } /> }
			ListEmptyComponent = { () => error ? <ListError error = { error } /> : loading ? <Loading /> : <ListEmpty /> }
			ItemSeparatorComponent = { () => <ItemSeparator /> }
			showsVerticalScrollIndicator = { false }
			refreshControl = { <RefreshControl refreshing = { loading } onRefresh = { fetchData } /> }
			keyExtractor = { ( item, index ) => String( index ) }
		/>
		<View style = { styles.handleBox }>
			<Text style = { styles.handleInfo }>{ queryTypeText }</Text>
			<TouchableOpacity style = { styles.handleBtn } onPress = { showQueryTypeIndexActionSheet }>
				<Text style = { styles.handleBtnText }>{ I18n.t( "user.switch" ) }</Text>
			</TouchableOpacity>
		</View>
		<ActionSheet { ...actionSheetData } hide = { hideActionSheet } isShow = { isShowActionSheet } />
	</View>;
} );
