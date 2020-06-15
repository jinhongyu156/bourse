import React from "react";

import { View, Text, TextInput, ScrollView, RefreshControl, ActivityIndicator, TouchableOpacity, Dimensions, StyleSheet } from "react-native";

import Toast from "react-native-root-toast";

import { LineChart, YAxis, XAxis, Grid } from "react-native-svg-charts"

import { bindActionCreators } from "redux";

import { connect } from "react-redux";

import {
	setHeaderDropdownIndex, setOrderParamsTabIndex, setOrderParamsDropdownIndex, setUserOrderListTabIndex, setInputText,
	fetchOrderList, fetchUserDetailData, fetchUserOrderListData, fetchCancelUserOrder, fetchOrderSubmit, fetchKline
} from "./../redux/actions/chart.js";

import Icon from "react-native-vector-icons/FontAwesome";

import I18n from "i18n-js";

import Tab from "./../components/tab.js";
import Dropdown from "./../components/dropdown.js";

import TabBar from "./../containers/tabBar.js";
import SubmitBtn from "./../containers/submit.js";

// 屏幕高度
const SCREENHEIGHT = Dimensions.get( "window" ).height;

// 头部高度
const HEADERHEIGHT = 78;

// 头部返回按钮宽度
const GOBACKBOXWIDTH = 80;

// dropdown btn 宽度
const HEADERDROPDOWNBUTTONWIDTH = 130;

// dropdown row 高度
const HEADERDROPDOWNROWHEIGHT = 40;

// userInfo 高度
const USERINFOBOXHEIGHT = 80;

// order 头部高度
const ORDERHEADERHEIGHT = 30;

// order(params) 行 高度
const ORDERPARAMSROWHEIGHT = 50;

// order(params) dropdown btn 宽度
const ORDERPARAMSDROPDOWNBUTTONWIDTH = 100;

// order(params) row 高度
const ORDERPARAMSDROPDOWNROWHEIGHT = 40;

// order(params) 提交按钮高度
const ORDERPARAMSSUBMITBOXHEIGHT = 80;

// 用户委托单 tab bar 选项卡导航高度
const USERORDERLISTTABBARHEIGHT = 40;

// 用户委托单 tab 数据 row 的高度
const USERORDERLISTROWHEIGHT = 30;

// 用户委托单 tab 最大高度
const USERORDERLISTHEIGHT = USERORDERLISTROWHEIGHT * 5;

// 图标高度
const CHARTBOXHEIGHT = 280;

const styles = StyleSheet.create( {
	container: { flex: 1, backgroundColor: "#F6F6F6" },
	header: { height: HEADERHEIGHT, flexDirection: "row", alignItems: "flex-end", paddingHorizontal: 10, paddingVertical: 10, backgroundColor: "#FFFFFF" },
	headerGobackBox: { width: GOBACKBOXWIDTH },
	headerDropdownContainer: { flex: 1, alignItems: "center" },

	headerDropdownBox: { marginRight: GOBACKBOXWIDTH },
	headerDropdownButton: { width: HEADERDROPDOWNBUTTONWIDTH, height: 30, flexDirection: "row", justifyContent: "center", alignItems: "center", borderColor: "#E9E9E9", borderWidth: 1, borderRadius: 40 },
	headerDropdownButtonText: { marginRight: 8 },
	headerDropdown: { width: HEADERDROPDOWNBUTTONWIDTH, height: HEADERDROPDOWNROWHEIGHT * 2, marginTop: 2, backgroundColor: "#F6F6F6" },
	headerDropdownRow: { height: HEADERDROPDOWNROWHEIGHT, paddingHorizontal: 10, justifyContent: "center" },
	headerDropdownRowText: { fontSize: 14 },

	userInfoBox: { flexDirection: "row", alignItems: "center", backgroundColor: "#FFFFFF", height: USERINFOBOXHEIGHT },
	userInfoItem: { flex: 1, alignItems: "center" },
	userInfoItemLine: { borderColor: "#F6F6F6", borderRightWidth: 2 },
	userInfoItemTitleText: { fontSize: 18, fontWeight: "bold", color: "#000000" },
	userInfoItemValueText: { fontSize: 12, fontWeight: "normal", color: "#828282" },

	orderBox: { height: ORDERPARAMSROWHEIGHT * 3 + ORDERPARAMSSUBMITBOXHEIGHT + ORDERHEADERHEIGHT, flexDirection: "row", backgroundColor: "#FFFFFF", marginTop: 6 },
	orderItem: { flex: 1 },
	orderItemLine: { borderColor: "#E9E9E9", borderRightWidth: 1 },

	orderParamsHeader: { height: ORDERHEADERHEIGHT, flexDirection: "row", borderColor: "#E9E9E9", borderBottomWidth: 1 },
	orderParamsHeaderBtn: { flex: 1, height: ORDERHEADERHEIGHT, justifyContent: "center", alignItems: "center" },
	orderParamsHeaderBuyBtnText: { color: "#8DE192" },
	orderParamsHeaderSellBtnText: { color: "#F49BA0" },
	orderParamsHeaderBtnActive: { backgroundColor: "#FFFFFF" },
	orderParamsHeaderBtnInActive: { backgroundColor: "#F6F6F6" },
	orderParamsDropdownBox: { height: ORDERPARAMSROWHEIGHT, paddingHorizontal: 10, justifyContent: "center" },
	orderParamsDropdown: { width: ORDERPARAMSDROPDOWNBUTTONWIDTH, height: ORDERPARAMSDROPDOWNROWHEIGHT * 2, marginTop: 2, backgroundColor: "#F6F6F6" },
	orderParamsDropdownRow: { height: ORDERPARAMSDROPDOWNROWHEIGHT, paddingHorizontal: 10, justifyContent: "center" },
	orderParamsDropdownRowText: { fontSize: 12 },
	orderParamsDropdownBtn: { width: ORDERPARAMSDROPDOWNBUTTONWIDTH, height: ORDERPARAMSROWHEIGHT * 0.6, flexDirection: "row", justifyContent: "center", alignItems: "center", borderColor: "#E9E9E9", borderWidth: 1, borderRadius: 40 },
	orderParamsDropdownBtnText: { color: "#000000", marginRight: 8, fontSize: 12 },
	orderParamsTipBox: { paddingHorizontal: 10, height: ORDERPARAMSROWHEIGHT, justifyContent: "center" },
	orderParamsInputBox: { flexDirection: "row", paddingHorizontal: 10, height: ORDERPARAMSROWHEIGHT, justifyContent: "center", alignItems: "center" },
	orderParamsInputLabel: { marginRight: 6 },
	orderParamsInput: { backgroundColor: "#F6F6F6", flex: 1, height: ORDERPARAMSROWHEIGHT * 0.7, paddingHorizontal: 10, paddingVertical: 0 },
	orderParamsInputError: { borderColor: "#F00", borderWidth: 1 },
	orderParamsSubmitBox: { height: ORDERPARAMSSUBMITBOXHEIGHT, paddingHorizontal: 10, justifyContent: "center" },
	orderParamsSubmit: { height: ORDERPARAMSSUBMITBOXHEIGHT * 0.45, paddingHorizontal: 10, justifyContent: "center" },
	orderParamsSubmitText: { fontSize: 14 },
	orderParamsSubmitTipText: { fontSize: 10, marginTop: 4, color: "#949494", textAlign: "center" },

	orderListHeader: { height: ORDERHEADERHEIGHT, paddingHorizontal: 6, flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderColor: "#E9E9E9", borderBottomWidth: 1 },
	orderListBox: { flex: 1 },
	orderListBuyBox: { flex: 1, justifyContent: "flex-end", paddingHorizontal: 10 },
	orderListBuyRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 1 },
	orderListBuyRowText: { color: "#F49BA0" },

	orderListLine: { height: 1, backgroundColor: "#F6F6F6", marginHorizontal: 10 },

	orderListSellBox: { flex: 1, justifyContent: "flex-start", paddingHorizontal: 10 },
	orderListSellRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 1 },
	orderListSellRowText: { color: "#8DE192" },

	userOrderListBox: { marginTop: 6 },
	userOrderListTabBar: { height: USERORDERLISTTABBARHEIGHT, backgroundColor: "#FFFFFF" },
	userOrderList: { height: USERORDERLISTHEIGHT },
	userOrderListRow: { flexDirection: "row", height: USERORDERLISTROWHEIGHT, alignItems: "center", paddingHorizontal: 10, marginTop: 1, backgroundColor: "#FFFFFF" },
	userOrderListHeaderRow: { flexDirection: "row", height: USERORDERLISTROWHEIGHT, alignItems: "center", paddingHorizontal: 10 },

	userOrderListRowItemFlex1: { flex: 1 },
	userOrderListRowItemFlex2: { flex: 2 },
	userOrderListRowItemEnd: { flex: 1, alignItems: "flex-end" },
	userOrderListRowItemBtn: { flex: 1, alignItems: "center", backgroundColor: "#696DAC" },
	userOrderListRowItemBtnText: { color: "#FFFFFF" },

	chartBox: { paddingHorizontal: 20, height: CHARTBOXHEIGHT, marginTop: 6, backgroundColor: "#FFFFFF" },
	chartTipBox: { height: 50, justifyContent: "center", alignItems: "center" },
	chartTipText: { fontSize: 20 },
	chartTipMessage: { fontSize: 12, color: "#949494" },
	chart: { flex: 1, flexDirection: "row" },

	errorBox: { height: 100, paddingHorizontal: 10, justifyContent: "center" },
	errorText: { color: "#F00" },
	noDataBox: { height: 100, justifyContent: "center", alignItems: "center" },
	noDataText: { color: "#777777" },

} );

const options = [ "ETUSD / USDT", "SLBT / USDT" ];

const Header = React.memo( function( { onSelect, goBack } )
{

	const dropdownButton = React.useCallback( function( buttonText )
	{
		return <View style = { styles.headerDropdownButton }>
			<Text style = { styles.headerDropdownButtonText }>{ buttonText }</Text>
			<Icon name = "caret-down" size = { 18 } color = "#000000" />
		</View>;
	}, [] );

	return <View style = { styles.header } >
		<TouchableOpacity style = { styles.headerGobackBox } onPress = { goBack }>
			<Icon name = "angle-left" size = { 30 } color = "#000000" />
		</TouchableOpacity>
		<View style = { styles.headerDropdownContainer }>
			<View style = { styles.headerDropdownBox }>
				<Dropdown
					options = { options }
					hasStatusBar = { true }
					dropdownStyle = { styles.headerDropdown }
					rowStyle = { styles.headerDropdownRow }
					rowTextStyle = { styles.headerDropdownRowText }
					renderButton = { dropdownButton }
					onSelect = { onSelect }
				/>
			</View>
		</View>
	</View>;
} );

const UserInfo = React.memo( function( { usdtInfo, etusdInfo, slbtInfo } )
{
	return <View style = { styles.userInfoBox }>
		<View style = { [ styles.userInfoItem, styles.userInfoItemLine ] }>
			<Text style = { styles.userInfoItemTitleText }>{ usdtInfo }</Text>
			<Text style = { styles.userInfoItemValueText }>USDT</Text>
		</View>
		<View style = { [ styles.userInfoItem, styles.userInfoItemLine ] }>
			<Text style = { styles.userInfoItemTitleText }>{ etusdInfo }</Text>
			<Text style = { styles.userInfoItemValueText }>ETUSD</Text>
		</View>
		<View style = { styles.userInfoItem }>
			<Text style = { styles.userInfoItemTitleText }>{ slbtInfo }</Text>
			<Text style = { styles.userInfoItemValueText }>SLBT</Text>
		</View>
	</View>;
} );


const Order = React.memo( function( { tabIndex, dropdownIndex, changeTab, onSelect, fetchData, data, loading, error, submit, number, price, inputError, setInputText } )
{
	const tabIndexArr = [ I18n.t( "chart.buy" ), I18n.t( "chart.sell" ) ];

	const options = tabIndex === 0 ? [ I18n.t( "chart.marketBuy" ), I18n.t( "chart.priceBuy" ) ] : [ I18n.t( "chart.marketSell" ), I18n.t( "chart.priceSell" ) ];

	const bindSubmit = React.useCallback( function()
	{
		return submit( res => Toast.show( res ) );
	}, [] )

	const dropdownButton = React.useCallback( function( buttonText )
	{
		return <View style = { styles.orderParamsDropdownBtn }>
			<Text style = { styles.orderParamsDropdownBtnText }>{ buttonText }</Text>
			<Icon name = "caret-down" size = { 12 } color = "#000000" />
		</View>;
	}, [] );

	return <View style = { styles.orderBox }>
		<View style = { [ styles.orderItem, styles.orderItemLine ] }>
			<View style = { styles.orderParamsHeader }>
			{
				tabIndexArr.map( function( item, index )
				{
					const textStyle = index === 0 ? styles.orderParamsHeaderBuyBtnText : styles.orderParamsHeaderSellBtnText;
					const viewStyle = [ styles.orderParamsHeaderBtn, index === 0 ? styles.orderItemLine : {}, tabIndex === index ? styles.orderParamsHeaderBtnActive : styles.orderParamsHeaderBtnInActive ];
					return <TouchableOpacity key = { index } style = { viewStyle } onPress = { () => changeTab( index ) }>
						<Text style = { textStyle }>{ item }</Text>
					</TouchableOpacity>;
				} )
			}
			</View>
			<View style = { styles.orderParamsDropdownBox }>
				<Dropdown options = { options } hasStatusBar = { true } dropdownStyle = { styles.orderParamsDropdown } rowTextStyle = { styles.orderParamsDropdownRowText } rowStyle = { styles.orderParamsDropdownRow } renderButton = { dropdownButton } onSelect = { onSelect } />
			</View>
			{
				dropdownIndex === 0 ? <View style = { styles.orderParamsTipBox }><Text>{ I18n.t( "chart.orderParamsTip" ) }</Text></View>
				: dropdownIndex === 1 ? <View style = { styles.orderParamsInputBox }>
					<Text style = { styles.orderParamsInputLabel }>{ I18n.t( "chart.price" ) }: </Text>
					<TextInput style = { [ styles.orderParamsInput, inputError[ "price" ] ? styles.orderParamsInputError : {} ] } value = { price } keyboardType = { "numeric" } placeholder = { I18n.t( "chart.pricePlaceholder" ) } onChangeText = { text => setInputText( "price", text ) } />
				</View>
				: null
			}
			<View style = { styles.orderParamsInputBox }>
				<Text style = { styles.orderParamsInputLabel }>{ I18n.t( "chart.number" ) }: </Text>
				<TextInput style = { [ styles.orderParamsInput, inputError[ "number" ] ? styles.orderParamsInputError : {} ] } value = { number } keyboardType = { "numeric" } placeholder = { I18n.t( "chart.numberPlaceholder" ) } onChangeText = { text => setInputText( "number", text ) } />
			</View>
			<View style = { styles.orderParamsSubmitBox }>
				<SubmitBtn title = { tabIndexArr[ tabIndex ] } submitBtnStyle = { styles.orderParamsSubmit } submitBtnTextStyle = { styles.orderParamsSubmitText } loading = { false } onSubmit = { bindSubmit } />
				<Text style = { styles.orderParamsSubmitTipText }>{ I18n.t( "chart.poundage" ) }: { I18n.t( "chart.buyFree" ) }, { I18n.t( "chart.sell" ) } 5%</Text>
			</View>
		</View>
		<View style = { styles.orderItem }>
			<View style = { styles.orderListHeader }>
				<Text>{ I18n.t( "chart.price" ) } USDT</Text>
				<Text>{ I18n.t( "chart.number" ) }</Text>
			</View>
			<TouchableOpacity style = { styles.orderListBox } onPress = { fetchData }>
			{
				error
					? <View style = { styles.errorBox }><Text style = { styles.errorText }>{ error }</Text></View>
				: ( loading === false && Object.keys( data ).length === 0 )
					? <View style = { styles.noDataBox }><Text style = { styles.noDataText }>{ I18n.t( "chart.noDataText" ) }</Text></View>
				: ( loading === true && Object.keys( data ).length === 0 )
					? <ActivityIndicator size = "small" color = "#696DAC" />
				: <React.Fragment>
					<View style = { styles.orderListBuyBox }>
					{
						data.buy.map( function( item, index )
						{
							return <View key = { index } style = { styles.orderListBuyRow }>
								<Text style = { styles.orderListBuyRowText }>{ item[ "单价" ] }</Text>
								<Text style = { styles.orderListBuyRowText }>{ item[ "数量" ] }</Text>
							</View>;
						} )
					}
					</View>
					<View style = { styles.orderListLine } />
					<View style = { styles.orderListSellBox }>
					{
						data.sell.map( function( item, index )
						{
							return <View key = { index } style = { styles.orderListSellRow }>
								<Text style = { styles.orderListSellRowText }>{ item[ "单价" ] }</Text>
								<Text style = { styles.orderListSellRowText }>{ item[ "数量" ] }</Text>
							</View>;
						} )
					}
					</View>
				</React.Fragment>
			}
			</TouchableOpacity>
		</View>
	</View>;
} );

const UserOrderTabItemHeader = React.memo( function( { index } )
{
	if( index === 0 )
	{
		return <View style = { styles.userOrderListHeaderRow }>
			<View style = { styles.userOrderListRowItemFlex2 }><Text>{ I18n.t( "chart.entrustNumber" ) }</Text></View>
			<View style = { styles.userOrderListRowItemFlex2 }><Text>{ I18n.t( "chart.entrustPrice" ) }</Text></View>
			<View style = { styles.userOrderListRowItemFlex1 }><Text>{ I18n.t( "chart.entrustDirection" ) }</Text></View>
			<View style = { styles.userOrderListRowItemEnd }><Text>{ I18n.t( "chart.operation" ) }</Text></View>
		</View>;
	};

	if( index === 1 )
	{
		return <View style = { styles.userOrderListHeaderRow }>
			<View style = { styles.userOrderListRowItemFlex2 }><Text>{ I18n.t( "chart.dealNumber" ) }</Text></View>
			<View style = { styles.userOrderListRowItemFlex2 }><Text>{ I18n.t( "chart.dealPrice" ) }</Text></View>
			<View style = { styles.userOrderListRowItemFlex1 }><Text>{ I18n.t( "chart.dealDirection" ) }</Text></View>
			<View style = { styles.userOrderListRowItemEnd }><Text>{ I18n.t( "chart.state" ) }</Text></View>
		</View>;
	};
} );

const UserOrderTabItemRow = React.memo( function( { index, item, cancel } )
{
	const bindCancel = React.useCallback( function()
	{
		cancel( item[ "订单号" ], res => Toast.show( res ) );
	}, [] );

	return <View style = { [ styles.userOrderListRow ] }>
		<View style = { styles.userOrderListRowItemFlex2 }><Text>{ item[ "数量" ] }</Text></View>
		<View style = { styles.userOrderListRowItemFlex2 }><Text>{ item[ "单价" ] }</Text></View>
		<View style = { styles.userOrderListRowItemFlex1 }><Text>{ item[ "买卖方向" ] }</Text></View>
		{
			index === 0 ? <TouchableOpacity style = { styles.userOrderListRowItemBtn } onPress = { bindCancel }>
				<Text style = { styles.userOrderListRowItemBtnText }>{ I18n.t( "chart.cancel" ) }</Text>
			</TouchableOpacity>
			: index === 1 ? <View style = { styles.userOrderListRowItemEnd }><Text>{ I18n.t( "chart.complete" ) }</Text></View>
			: null
		}
	</View>;
} );

const UserOrderTabItem = React.memo( function( { index, loading, data, error, cancel } )
{
	if( error )
	{
		<View style = { styles.errorBox }>
			<Text style = { styles.errorText }>{ error }</Text>
		</View>;
	};

	if( loading && data.length === 0 )
	{
		return <ActivityIndicator size = "small" color = "#696DAC" />;
	};

	if( !loading && data.length === 0 )
	{
		return <View style = { styles.noDataBox }>
			<Text style = { styles.noDataText }>{ I18n.t( "chart.noDataText" ) }</Text>
		</View>;
	};

	if( !loading && data.length )
	{
		return <React.Fragment>
			<UserOrderTabItemHeader index = { index } />
			<ScrollView style = { styles.userOrderList } showsVerticalScrollIndicator = { false } nestedScrollEnabled = { true }>
				{
					data.map( function( item, i )
					{
						return <UserOrderTabItemRow key = { i } item = { item } index = { index } cancel = { cancel } />
					} )
				}
			</ScrollView>
		</React.Fragment>
	};
} );


const UserOrderList = React.memo( function( { index, setTabIndex, data, loading, error, cancel } )
{
	const renderTabBar = React.useCallback( function( { tabs, activeTab, goToPage } )
	{
		return <TabBar tabs = { tabs } type = { "underline" } tabBarStyle = { styles.userOrderListTabBar } activeTab = { activeTab } goToPage = { goToPage } />;
	}, [] );

	return <Tab renderTabBar = { renderTabBar } containerStyle = { styles.userOrderListBox } onChangeTab = { setTabIndex }>
		<UserOrderTabItem tabLabel = { I18n.t( "chart.currentEntrust" ) } index = { index } loading = { loading } data = { data } error = { error } cancel = { cancel } />
		<UserOrderTabItem tabLabel = { I18n.t( "chart.historyEntrust" ) } index = { index } loading = { loading } data = { data } error = { error } cancel = { cancel } />
	</Tab>
} );

const Line = React.memo( function( { index, data, loading, error } )
{
	if( error )
	{
		<View style = { styles.errorBox }>
			<Text style = { styles.errorText }>{ error }</Text>
		</View>;
	};

	if( loading )
	{
		return <ActivityIndicator size = "small" color = "#696DAC" />;
	};

	if( data.length )
	{
		const ydata = data.map( item => item[ 1 ] );
		const xdata = data.map( item => item[ 0 ] );

		return <View style = { styles.chartBox }>
			<View style = { styles.chartTipBox }>
				<Text style = { styles.chartTipText }>{ options[ index ] }</Text>
				<Text style = { styles.chartTipMessage }>{ xdata[ 0 ] }~{ xdata[ xdata.length - 1 ] }</Text>
			</View>
			<View style = { styles.chart }>
				<YAxis
					data = { ydata }
					contentInset = { { top: 20, bottom: 20 } }
					svg = { { fill: "#8C8B8F", fontSize: 10 } }
				/>
				<LineChart
					data = { ydata }
					svg = { { stroke: "#696DAC" } }
					style = { { flex: 1, marginLeft: 16 } }
					contentInset = { { top: 20, bottom: 20, left: 20 } }
				>
					<Grid />
				</LineChart>
			</View>
			<XAxis
				style = { { marginTop: 10, marginLeft: 16 } }
				data = { ydata }
				formatLabel = { ( value, index ) => xdata[ index ] }
				contentInset = { { top: 20, bottom: 20, left: 36, right: 30 } }
				svg = { { fill: "#8C8B8F", fontSize: 10 } }
			/>
		</View>;
	};
} );

const Chart = function( props )
{

	const refresh = React.useCallback( function()
	{
		props.fetchUserDetailData();
		props.fetchOrderList();
		props.fetchUserOrderListData();
		props.fetchKline();
	}, [] );

	React.useEffect( function()
	{
		refresh();
	}, [] );

	React.useEffect( function()
	{
		props.navigation.setOptions( { header: () => <Header onSelect = { props.setHeaderDropdownIndex } goBack = { props.navigation.goBack } /> } )
	}, [] );

	return <ScrollView style = { styles.container } showsVerticalScrollIndicator = { false } refreshControl = { <RefreshControl refreshing = { false } onRefresh = { refresh } /> }>
		<UserInfo
			usdtInfo = { props.userDetailData[ "USDT" ] }
			etusdInfo = { props.userDetailData[ "ETUSD" ] }
			slbtInfo = { props.userDetailData[ "SLBT" ] }
		/>
		<Order
			tabIndex = { props.orderParamsTabIndex }
			dropdownIndex = { props.orderParamsDropdownIndex }
			changeTab = { props.setOrderParamsTabIndex }
			onSelect = { props.setOrderParamsDropdownIndex }

			fetchData = { props.fetchOrderList }
			data = { props.orderListData }
			loading = { props.loadingOrderListData }
			error = { props.fetchOrderListDataError }
			submit = { props.fetchOrderSubmit }

			number = { props.number }
			price = { props.price }
			inputError = { props.inputError }
			setInputText = { props.setInputText }
		/>
		<UserOrderList
			index = { props.userOrderListTabIndex }
			setTabIndex = { props.setUserOrderListTabIndex }
			data = { props.userOrderListData }
			loading = { props.loadingUserOrderListData }
			error = { props.fetchUserOrderListDataError }
			cancel = { props.fetchCancelUserOrder }
		/>
		<Line
			index = { props.headerDropdownIndex }
			data = { props.kLineData }
			loading = { props.loadingKLineData }
			error = { props.fetchKLineDataError }
		/>
	</ScrollView>;
};

export default connect(
	function mapStateToProps( state, ownProps )
	{
		const chartData = state.chart;

		return {
			headerDropdownIndex: chartData.headerDropdownIndex,
			orderParamsDropdownIndex: chartData.orderParamsDropdownIndex,
			orderParamsTabIndex: chartData.orderParamsTabIndex,
			userOrderListTabIndex: chartData.userOrderListTabIndex,

			orderListData: chartData.orderListData,
			loadingOrderListData: chartData.loadingOrderListData,
			fetchOrderListDataError: chartData.fetchOrderListDataError,

			userDetailData: chartData.userDetailData,
			fetchUserDetailDataError: chartData.fetchUserDetailDataError,

			userOrderListData: chartData.userOrderListData,
			loadingUserOrderListData: chartData.loadingUserOrderListData,
			fetchUserOrderListDataError: chartData.fetchUserOrderListDataError,

			number: chartData.number,
			price: chartData.price,
			inputError: chartData.inputError,

			kLineData: chartData.kLineData,
			loadingKLineData: chartData.loadingKLineData,
			fetchKLineDataError: chartData.fetchKLineDataError
		};
	},
	function mapDispatchToProps( dispatch, ownProps )
	{
		return bindActionCreators( {
			setHeaderDropdownIndex, setOrderParamsTabIndex, setOrderParamsDropdownIndex, setUserOrderListTabIndex, setInputText,
			fetchOrderList, fetchUserDetailData, fetchUserOrderListData, fetchCancelUserOrder, fetchOrderSubmit, fetchKline
		}, dispatch );
	}
)( Chart );
