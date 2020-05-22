import React from "react";

import { View, Image, Text, TouchableOpacity, ToastAndroid, ActivityIndicator, SectionList, RefreshControl, StyleSheet } from "react-native";

import { bindActionCreators } from "redux";

import { connect } from "react-redux";

import { fetchData, fetchSell, fetchBuy, setCount } from "./../redux/actions/ctc.js";

import Counter from "./../components/counter.js";
import { AccordionItem } from "./../components/accordion.js";

import I18n from "i18n-js";

import Header from "./../containers/header.js";
import Notice from "./../containers/notice.js";

// 头部操作 icon 宽高
const HEADERHANDLESIZE = 32;

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
	sectionRowItemHeaderText: { fontSize: 16, fontWeight: "bold" },
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

	sectionRowContentBox: { paddingVertical: 10, paddingHorizontal: 20, justifyContent: "space-around" },
	sectionRowContentType0Box: { height: ROWCONTENTHEIGHT / 3 },
	sectionRowContentType1Box: { height: ROWCONTENTHEIGHT },
	sectionRowContentItem: { flexDirection: "row", alignItems: "center" },
	sectionRowContentItemAround: { justifyContent: "space-around" },
	sectionRowContentItemRight: { width: 180, marginLeft: 20 },
	sectionRowContentBtn: { backgroundColor: "#696DAC", paddingVertical: 6, paddingHorizontal: 20 },
	sectionRowContentBtnText: { color: "#FFFFFF" },

	sectionHeaderBox: { height: ROWHEIGHT, justifyContent: "center", paddingHorizontal: 12, backgroundColor: "#FFFFFF" },
	sectionHeaderText: { fontSize: 16 },

	upColor: { color: "#F4979D" },
	downColor: { color: "#96E89D" },
	normalColor: { color: "#000000" },

	errorBox: { height: 100, alignItems: "center", justifyContent: "center" },
	errorText: { color: "#F00" },
} );

const ListHeader = React.memo( function()
{
	return <View style = { styles.sectionRowBox }>
		<View style = { [ styles.sectionRowItem, styles.ListHeaderItemFirst ] }>
			<Text style = { styles.sectionRowItemHeaderText }>{ I18n.t( "ctc.name" ) }</Text>
		</View>
		<View style = { styles.sectionRowItem }>
			<Text style = { styles.sectionRowItemHeaderText }>{ I18n.t( "ctc.unit" ) }</Text>
		</View>
		<View style = { styles.sectionRowItem }>
			<Text style = { styles.sectionRowItemHeaderText }>{ I18n.t( "ctc.number" ) }</Text>
		</View>
		<View style = { [styles.sectionRowItem, styles.ListHeaderItemEnd ] }>
			<Text style = { styles.sectionRowItemHeaderText }>{ I18n.t( "ctc.total" ) }</Text>
		</View>
	</View>;
} );

const SectionRowTitle = React.memo( function( { title, number, unit, total, unitRate, totalRate } )
{
	const unitPrev = React.useRef( unit );
	const [ state, setState ] = React.useState( 0 )

	if( unitPrev.current !== unit )
	{
		if( unit > unitPrev.current )
		{
			setState( 1 );
		};
		if( unit < unitPrev.current )
		{
			setState( -1 );
		};
		unitPrev.current = unit;
	};

	const color = state > 0 ? styles.upColor : state < 0 ? styles.downColor : state.normalColor;

	return <View style = { styles.sectionRowBox }>
		<View style = { [ styles.sectionRowItem, styles.sectionRowItemHorizontal, styles.sectionRowItemFirst ] }>
			<Image style = { styles.sectionRowItemImage } source = { IMAGESMAP[ title ] } />
			<Text style = { styles.sectionRowItemTitleText }>{ title }</Text>
		</View>
		<View style = { styles.sectionRowItem }>
			<Text style = { styles.sectionRowItemUnitText }>${ unit }</Text>
			<Text style = { [ styles.sectionRowItemTotalText, color ] }>￥{ unitRate }</Text>
		</View>
		<View style = { styles.sectionRowItem }>
			<Text style = { styles.sectionRowItemNumberText }>{ number }</Text>
			<Text style = { styles.sectionRowItemTotalText }>-</Text>
		</View>
		<View style = { [ styles.sectionRowItem, styles.sectionRowItemEnd ] }>
			<Text style = { styles.sectionRowItemUnitText }>${ total }</Text>
			<Text style = { styles.sectionRowItemTotalText }>￥{ totalRate }</Text>
		</View>
	</View>;
} );

const SectionRowContent = React.memo( function( { type, title, goToAccess, price, count, setCount, fetchSell, fetchBuy } )
{
	const bindSetCount = React.useCallback( function( text )
	{
		setCount( title, text );
	}, [ title ] );

	return <View style = { [ styles.sectionRowContentBox, type ? styles.sectionRowContentType1Box : styles.sectionRowContentType0Box ] }>
		{
			type
				? <React.Fragment>
					<View style = { styles.sectionRowContentItem }>
						<Text>{ I18n.t( "ctc.number" ) }: </Text>
						<View style = { styles.sectionRowContentItemRight }>
							<Counter count = { count } setCount = { bindSetCount } />
						</View>
					</View>
					<View style = { styles.sectionRowContentItem }>
						<Text>{ I18n.t( "ctc.price" ) }: </Text>
						<Text style = { styles.sectionRowContentItemRight }>{ price }</Text>
					</View>
				</React.Fragment>
				: null
		}
		<View style = { [ styles.sectionRowContentItem, styles.sectionRowContentItemAround ] }>
			<TouchableOpacity style = { styles.sectionRowContentBtn } onPress = { () => type
				? fetchSell( { coin: title, number: count }, res => ToastAndroid.show( res, ToastAndroid.SHORT ) )
				: goToAccess( "recharge", title )
			}>
				<Text style = { styles.sectionRowContentBtnText }>{ type ? I18n.t( "ctc.sell" ) :I18n.t( "ctc.charge" ) }</Text>
			</TouchableOpacity>
			<TouchableOpacity style = { styles.sectionRowContentBtn } onPress = { () => type
				? fetchBuy( { coin: title, number: count }, res => ToastAndroid.show( res, ToastAndroid.SHORT ) )
				: goToAccess( "mention", title )
			}>
				<Text style = { styles.sectionRowContentBtnText }>{ type ? I18n.t( "ctc.buy" ) : I18n.t( "ctc.mention" ) }</Text>
			</TouchableOpacity>
			<TouchableOpacity style = { styles.sectionRowContentBtn } onPress = { () => goToAccess( "turn", title ) }>
				<Text style = { styles.sectionRowContentBtnText }>{ I18n.t( "ctc.turn" ) }</Text>
			</TouchableOpacity>
		</View>
	</View>;
} );

const SectionRow = React.memo( function( { type, title, number, count, price, unit, total, unitRate, totalRate, goToAccess, setCount, fetchSell, fetchBuy } )
{
	return <AccordionItem
		index = { title }
		expanded = { [] }
		renderTitle = { () => <SectionRowTitle title = { title } number = { number } unit = { unit } total = { total } unitRate = { unitRate } totalRate = { totalRate } /> }
		renderContent = { () => <SectionRowContent type = { type } title = { title } goToAccess = { goToAccess } price = { price } count = { count } setCount = { setCount } fetchSell = { fetchSell } fetchBuy = { fetchBuy } /> }
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

	const goToAccess = React.useCallback( function( type, title )
	{
		props.navigation.push( "Access", { type: type, name: title } );
	}, [] );

	const goToUsdtRecharge = React.useCallback( function()
	{
		if( props.data.length && props.data[ 0 ].data.filter( c => c.key === "USDT" ).length )
		{
			props.navigation.push( "UsdtRecharge", { usdtPrice: props.data[ 0 ].data.filter( c => c.key === "USDT" )[ 0 ].unitRate } );
		} else
		{
			return;
		};
	}, [ props.data ] );

	// const goToUsdtMention = React.useCallback( function()
	// {
	// 	props.navigation.push( "UsdtMention", { usdtInfo: props.originalData[ "USDT" ] } );
	// }, [ props.originalData ] );


	return <View style = { styles.container }>
		<Header usdtInfo = { props.originalData[ "USDT" ] } etusdInfo = { props.originalData[ "ETUSD" ] } slbtInfo = { props.originalData[ "SLBT" ] }>
		<TouchableOpacity style = { styles.headerRightViewItem } onPress = { goToUsdtRecharge }>
				<Image style = { styles.headerRightViewItemImage } source = { require( "./../images/recharge.png" ) } />
				<Text style = { styles.headerRightViewItemText }>{ I18n.t( "contract.header.recharge" ) }</Text>
			</TouchableOpacity>
			<TouchableOpacity style = { styles.headerRightViewItem } onPress = { () => goToAccess( "recharge", "USDT" ) }>
				<Image style = { styles.headerRightViewItemImage } source = { require( "./../images/usdt_recharge.png" ) } />
				<Text style = { styles.headerRightViewItemText }>{ I18n.t( "contract.header.usdtRecharge" ) }</Text>
			</TouchableOpacity>
			<TouchableOpacity style = { styles.headerRightViewItem } onPress = { () => goToAccess( "mention", "USDT" ) }>
				<Image style = { styles.headerRightViewItemImage } source = { require( "./../images/usdt_withdrawal.png" ) } />
				<Text style = { styles.headerRightViewItemText }>{ I18n.t( "contract.header.usdtWithdrawal" ) }</Text>
			</TouchableOpacity>
		</Header>
		<Notice />
		<SectionList
			sections = { props.fetchLoading ? [] : props.data }
			stickySectionHeadersEnabled = { true }
			showsVerticalScrollIndicator = { false }
			ListHeaderComponent = { () => <ListHeader /> }
			ItemSeparatorComponent = { () => <ItemSeparator /> }
			SectionSeparatorComponent = { () => <SectionSeparator /> }
			refreshControl = { <RefreshControl refreshing = { props.fetchLoading } onRefresh = { props.fetchData } /> }
			renderItem = { ( { item, index } ) => <SectionRow
				key = { index }
				type = { item.type }
				title = { item.key }
				number = { item.number }
				count = { item.count }
				price = { item.price }
				unit = { item.unit }
				total = { item.total }
				unitRate = { item.unitRate }
				totalRate = { item.totalRate }
				goToAccess = { goToAccess }
				setCount = { props.setCount }
				fetchSell = { props.fetchSell }
				fetchBuy = { props.fetchBuy }
			/> }
			renderSectionHeader = { ( { section: { title } } ) => <SectionHeader title = { title } /> }
			ListEmptyComponent = { () => <ListError fetchError = { props.fetchError } /> }
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
			originalData: ctcData.originalData,
			fetchLoading: ctcData.fetchLoading,
			fetchError: ctcData.fetchError
		};
	},
	function mapDispatchToProps( dispatch, ownProps )
	{
		return bindActionCreators( { fetchData, fetchSell, fetchBuy, setCount }, dispatch );
	}
)( Ctc );


