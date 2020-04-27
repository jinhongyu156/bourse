import React from "react";

import { View, Image, Text, TouchableOpacity, ActivityIndicator, SectionList, StyleSheet } from "react-native";

import { bindActionCreators } from "redux";

import { connect } from "react-redux";

import { fetchData } from "./../redux/actions/ctc.js";

import Counter from "./../components/counter.js";
import { AccordionItem } from "./../components/accordion.js";

import I18n from "i18n-js";

import Header from "./../containers/header.js";
import Notice from "./../containers/notice.js";

// 头部操作 icon 宽高
const HEADERHANDLESIZE = 36;

// 列表行高度
const ROWHEIGHT = 60;

// 列表操作区高度
const ROWCONTENTHEIGHT = 180;

// 分割线高度
const ROW_SEPARATOR_HEIGHT = 1;

// 列表 icon 宽高
const ROWIMAGESIZE = 30;

// icon 对应关系
const IMAGESMAP = {
	"USDT": require( "./../images/USDT.png" ),
	"ETUSD": require( "./../images/ETUSD.png" ),
	"ETH": require( "./../images/ETH.png" ),
	"SLBT": require( "./../images/SLBT.png" ),
	"BTC": require( "./../images/btc.png" ),
	"DASH": require( "./../images/DASH.png" ),
	"ZEC": require( "./../images/ZEC.png" ),
	"LTC": require( "./../images/LTC.png" ),
	"NEO": require( "./../images/NEO.png" ),
	"XMR": require( "./../images/XMR.png" ),
	"OMG": require( "./../images/OMG.png" ),
	"EOS": require( "./../images/EOS.png" ),
	"XRP": require( "./../images/XRP.png" )
};
const styles = StyleSheet.create( {

	container: { flex: 1, backgroundColor: "#F6F6F6" },
	headerRightViewItem: { alignItems: "center", justifyContent: "flex-end", marginLeft: 10 },
	headerRightViewItemImage: { width: HEADERHANDLESIZE, height: HEADERHANDLESIZE },
	headerRightViewItemText: { fontSize: 12, color: "#FFFFFF" },

	sectionRowBox: { height: ROWHEIGHT, flexDirection: "row", alignItems: "center", paddingHorizontal: 12, backgroundColor: "#FFFFFF" },

	ListHeaderItemFirst: { alignItems: "flex-start" },
	ListHeaderItemEnd: { alignItems: "flex-end" },

	sectionRowItem: { flex: 1, alignItems: "center" },
	sectionRowItemImage: { width: ROWIMAGESIZE, height: ROWIMAGESIZE, marginRight: 6 },
	sectionRowItemHorizontal: { flexDirection: "row" },
	sectionRowItemFirst: { justifyContent: "flex-start" },
	sectionRowItemEnd: { alignItems: "flex-end" },
	sectionRowItemTitleText: { fontSize: 16, fontWeight: "bold" },
	sectionRowItemUnitText: { fontSize: 14, fontWeight: "bold" },
	sectionRowItemNumberText: { fontSize: 14, fontWeight: "bold" },
	sectionRowItemTotalText: { fontSize: 12, color: "#BABABA" },
	sectionRowItemSeparator: { height: ROW_SEPARATOR_HEIGHT, backgroundColor: "#F4F4F5" },
	sectionSeparator: { height: ROW_SEPARATOR_HEIGHT, backgroundColor: "#FFFFFF" },

	sectionRowContentBox: { height: ROWCONTENTHEIGHT, paddingVertical: 10, paddingHorizontal: 20, justifyContent: "space-around" },
	sectionRowContentItem: { flexDirection: "row", alignItems: "center" },
	sectionRowContentItemAround: { justifyContent: "space-around" },
	sectionRowContentItemRight: { width: 180, marginLeft: 20 },
	sectionRowContentBtn: { backgroundColor: "#696DAC", paddingVertical: 6, paddingHorizontal: 20 },
	sectionRowContentBtnText: { color: "#FFFFFF" },

	sectionHeaderBox: { height: ROWHEIGHT, justifyContent: "center", paddingHorizontal: 12, backgroundColor: "#FFFFFF" },
	sectionHeaderText: { fontSize: 16 },

	errorBox: { height: 100, alignItems: "center", justifyContent: "center" },
	errorText: { color: "#F00" }
} );

const ListHeader = React.memo( function()
{
	return <View style = { styles.sectionRowBox }>
		<View style = { [ styles.sectionRowItem, styles.ListHeaderItemFirst ] }><Text>{ I18n.t( "ctc.name" ) }</Text></View>
		<View style = { styles.sectionRowItem }><Text>{ I18n.t( "ctc.unit" ) }</Text></View>
		<View style = { styles.sectionRowItem }><Text>{ I18n.t( "ctc.number" ) }</Text></View>
		<View style = { [styles.sectionRowItem, styles.ListHeaderItemEnd ] }><Text>{ I18n.t( "ctc.total" ) }</Text></View>
	</View>;
} );

const SectionRowTitle = React.memo( function( { title, number, unit, total, unitRate, totalRate } )
{
	return <View style = { styles.sectionRowBox }>
		<View style = { [ styles.sectionRowItem, styles.sectionRowItemHorizontal, styles.sectionRowItemFirst ] }>
			<Image style = { styles.sectionRowItemImage } source = { IMAGESMAP[ title ] } />
			<Text style = { styles.sectionRowItemTitleText }>{ title }</Text>
		</View>
		<View style = { styles.sectionRowItem }>
			<Text style = { styles.sectionRowItemUnitText }>${ unit }</Text>
			<Text style = { styles.sectionRowItemTotalText }>￥{ unitRate }</Text>
		</View>
		<View style = { styles.sectionRowItem }>
			<Text style = { styles.sectionRowItemNumberText }>{ number }</Text>
		</View>
		<View style = { [ styles.sectionRowItem, styles.sectionRowItemEnd ] }>
			<Text style = { styles.sectionRowItemUnitText }>${ total }</Text>
			<Text style = { styles.sectionRowItemTotalText }>￥{ totalRate }</Text>
		</View>
	</View>;
} );

const SectionRowContent = React.memo( function( { type, title, goTorecharge } )
{
	return <View style = { styles.sectionRowContentBox }>
		<View style = { styles.sectionRowContentItem }>
			<Text>{ I18n.t( "ctc.number" ) }: </Text>
			<View style = { styles.sectionRowContentItemRight }>
				<Counter count = { 1 } setCount = { () => {} } />
			</View>
		</View>
		<View style = { styles.sectionRowContentItem }>
			<Text>{ I18n.t( "ctc.price" ) }: </Text>
			<Text style = { styles.sectionRowContentItemRight }>100.346</Text>
		</View>
		<View style = { [ styles.sectionRowContentItem, styles.sectionRowContentItemAround ] }>
			<TouchableOpacity style = { styles.sectionRowContentBtn } onPress = { () => type ? () => {} : goTorecharge( title ) }>
				<Text style = { styles.sectionRowContentBtnText }>{ type ? I18n.t( "ctc.sell" ) :I18n.t( "ctc.charge" ) }</Text>
			</TouchableOpacity>
			<TouchableOpacity style = { styles.sectionRowContentBtn }>
				<Text style = { styles.sectionRowContentBtnText }>{ type ? I18n.t( "ctc.buy" ) : I18n.t( "ctc.mention" ) }</Text>
			</TouchableOpacity>
			<TouchableOpacity style = { styles.sectionRowContentBtn }>
				<Text style = { styles.sectionRowContentBtnText }>{ I18n.t( "ctc.turn" ) }</Text>
			</TouchableOpacity>
		</View>
	</View>;
} );

const SectionRow = React.memo( function( { type, title, number, unit, total, unitRate, totalRate, goTorecharge } )
{
	return <AccordionItem
		index = { title }
		expanded = { [] }
		renderTitle = { () => <SectionRowTitle title = { title } number = { number } unit = { unit } total = { total } unitRate = { unitRate } totalRate = { totalRate } /> }
		renderContent = { () => <SectionRowContent type = { type } title = { title } goTorecharge = { goTorecharge } /> }
	/>;
} );

const SectionHeader = React.memo( function( { title } )
{
	return <View style = { styles.sectionHeaderBox }>
		<Text style = { styles.sectionHeaderText }>{ title }:</Text>
	</View>;
} );

const ListLoading = React.memo( function()
{
	return <ActivityIndicator size = "large" color = "#696DAC" />;
} );

const ListError = React.memo( function( { fetchError } )
{
	return <View style = { styles.errorBox }>
		<Text style = { styles.errorText }>{ fetchError }</Text>
	</View>;
} );

const ItemSeparator = React.memo( function()
{
	return <View style = { styles.sectionRowItemSeparator } />;
} );

const SectionSeparator = React.memo( function()
{
	return <View style = { styles.sectionSeparator } />;
} );

const Ctc = React.memo( function( props )
{
	React.useEffect( function()
	{
		props.fetchData();
	}, [] );

	const goTorecharge = React.useCallback( function( title )
	{
		props.navigation.push( "Recharge", { name: title } )
	}, [] );

	// console.log( "props", props );

	return <View style = { styles.container }>
		<Header usdtInfo = { "" } tradingInfo = { "" } slbtInfo = { "" }>
			<View style = { styles.headerRightViewItem }>
				<Image style = { styles.headerRightViewItemImage } source = { require( "./../images/chart.png" ) } />
				<Text style = { styles.headerRightViewItemText }>{ I18n.t( "contract.header.chart" ) }</Text>
			</View>
		</Header>
		<Notice />
		<SectionList
			sections = { props.data }
			stickySectionHeadersEnabled = { true }
			showsVerticalScrollIndicator = { false }
			ListHeaderComponent = { () => <ListHeader /> }
			ItemSeparatorComponent = { () => <ItemSeparator /> }
			SectionSeparatorComponent = { () => <SectionSeparator /> }
			renderItem = { ( { item, index } ) => <SectionRow
				key = { index }
				type = { item.type }
				title = { item.key }
				number = { item.number }
				unit = { item.unit }
				total = { item.total }
				unitRate = { item.unitRate }
				totalRate = { item.totalRate }
				goTorecharge = { goTorecharge }
			/> }
			renderSectionHeader = { ( { section: { title } } ) => <SectionHeader title = { title } /> }
			ListEmptyComponent = { () => props.fetchLoading ? <ListLoading /> : <ListError fetchError = { props.fetchError } /> }
			keyExtractor = { ( item, index ) => item.key + index }
		/>
	</View>
} );


export default connect(
	function mapStateToProps( state, ownProps )
	{
		const ctcData = state.ctc;
		return {
			data: ctcData.data,
			fetchLoading: ctcData.fetchLoading,
			fetchError: ctcData.fetchError
		};
	},
	function mapDispatchToProps( dispatch, ownProps )
	{
		return bindActionCreators( { fetchData }, dispatch );
	}
)( Ctc );


