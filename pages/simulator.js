import React from "react";

import { View, Text, Image, TouchableOpacity, ScrollView, RefreshControl, Dimensions, Keyboard, StyleSheet } from "react-native";

import { bindActionCreators } from "redux";

import { connect } from "react-redux";

import I18n from "i18n-js";

import Tab from "./../components/tab.js";

import Header from "./../containers/simulatorHeader.js";
import TabBar from "./../containers/tabBar.js";
import Product from "./../containers/product.js";
import ProductHandle from "./../containers/productHandle.js";
import Notice from "./../containers/notice.js";
import Order from "./../containers/order.js";
import SimulatorOrder from "./../containers/simulatorOrder.js";

import { setProductId, setCount, fetchSimulatorData, fetchSimulatorSubmit, fetchSimulatorClosing, closeWs } from "./../redux/actions/simulator.js";
import { fetchRanking } from "./../redux/actions/ranking.js";


// 头部操作 icon 宽高
const HEADERHANDLESIZE = 32;

// 选项卡导航高度
const TABBARHEIGHT = 38;

// 选项卡导航宽度
const TABBARWIDTH = Dimensions.get( "window" ).width;

const styles = StyleSheet.create( {
	container: { flex: 1, backgroundColor: "#F6F6F6" },
	headerRightViewItem: { alignItems: "center", justifyContent: "flex-end", marginLeft: 10 },
	headerRightViewItemImage: { width: HEADERHANDLESIZE, height: HEADERHANDLESIZE },
	headerRightViewItemText: { fontSize: 12, color: "#FFFFFF" },

	tab: { flex: 1, backgroundColor: "#F6F6F6" },
	tabBarBox: { width: TABBARWIDTH, height: TABBARHEIGHT },
	tabBar: { position: "absolute", top: 0, left: 0, right: 0, height: TABBARHEIGHT, backgroundColor: "#FFFFFF" },

	errorBox: { height: 100, justifyContent: "center", alignItems: "center" },
	errorText: { fontSize: 16 }
} );


const Simulator = React.memo( function ( props )
{

	React.useEffect( () => {
		props.navigation.addListener( "focus", () => {
			props.fetchSimulatorData();
			props.fetchRanking();
		} );
		props.navigation.addListener( "blur", () => {
			closeWs();
		} );
	}, [ props.navigation ] );

	const renderTabBar = React.useCallback( function( { tabs, activeTab, goToPage } )
	{
		return <View style = { styles.tabBarBox }>
			<TabBar tabs = { tabs } type = { "underline" } tabBarStyle = { styles.tabBar } fontSize = { 12 } activeStyle = { "#696DAC" } activeTab = { activeTab } goToPage = { goToPage } />
		</View>
	}, [] );

	const goToSimulatorMention = React.useCallback( function()
	{
		props.navigation.push( "SimulatorAccess", { type: "mention", name: "模拟USDT" } );
	}, [] );

	const goToSimulatorRecharge = React.useCallback( function()
	{
		props.navigation.push( "SimulatorAccess", { type: "recharge", name: "模拟USDT" } );
	}, [] );

	return <View style = { styles.container }>
		<Header logoKey = { 2 } simulatorUsdtInfo = { props.userDetailData[ "模拟USDT" ] }>
			<TouchableOpacity style = { styles.headerRightViewItem } onPress = { goToSimulatorMention }>
				<Image style = { styles.headerRightViewItemImage } source = { require( "./../images/withdrawal_simulator.png" ) } />
				<Text style = { styles.headerRightViewItemText }>{ "提币" }</Text>
			</TouchableOpacity>
			<TouchableOpacity style = { styles.headerRightViewItem } onPress = { goToSimulatorRecharge }>
				<Image style = { styles.headerRightViewItemImage } source = { require( "./../images/recharge_simulator.png" ) } />
				<Text style = { styles.headerRightViewItemText }>{ "充币" }</Text>
			</TouchableOpacity>
		</Header>
		{
			props.fetchDataError
				? <View style = { styles.errorBox }>
					<Text style = { styles.errorText }>{ props.fetchDataError }</Text>
				</View>
				: <ScrollView
					keyboardDismissMode = { "on-drag" }
					onScrollBeginDrag = { Keyboard.dismiss }
					showsVerticalScrollIndicator = { false }
					refreshControl = { <RefreshControl refreshing = { props.isloading } onRefresh = {  props.fetchSimulatorData } /> }
				>
					<Product data = { props.contractData } id = { props.productId } setId = { props.setProductId } />
					<Notice />
					<ProductHandle data = { props.currentProduct } setCount = { props.setCount } submit = { props.fetchSimulatorSubmit } />
					
					<Tab renderTabBar = { renderTabBar } containerStyle = { styles.tab }>
						<Order tabLabel = { I18n.t( "simulator.myTitle" ) } data = { props.userOrderData } submit = { props.fetchSimulatorClosing } />
						<SimulatorOrder tabLabel = { I18n.t( "simulator.masterTitle" ) } data = { props.masterOrderData } noMaster = { props.targetId == 0 } />
					</Tab>
				</ScrollView>
		}

	</View>
} );

export default connect(
	function mapStateToProps( state, ownProps )
	{
		const simulatorData = state.simulator;
		const rankingData = state.ranking;

		return {
			targetId: rankingData.targetId,

			productId: simulatorData.productId,
			fetchDataError: simulatorData.fetchDataError,
			contractData: simulatorData.contractData,
			isloading:  simulatorData.isloading,
			currentProduct: simulatorData.currentProduct,
			userOrderData: simulatorData.userOrderData,
			masterOrderData: simulatorData.masterOrderData,
			userDetailData: simulatorData.userDetailData
		};
	},
	function mapDispatchToProps( dispatch, ownProps )
	{
		return bindActionCreators( { setProductId, setCount, fetchRanking, fetchSimulatorData, fetchSimulatorSubmit, fetchSimulatorClosing }, dispatch );
	}
)( Simulator );


