import React from "react";

import { View, Text, Image, ImageBackground, TouchableOpacity, ScrollView, RefreshControl, Dimensions, Keyboard, StyleSheet } from "react-native";

import { bindActionCreators } from "redux";

import { connect } from "react-redux";

import I18n from "i18n-js";

import Tab from "./../components/tab.js";

import Header from "./../containers/header.js";
import TabBar from "./../containers/tabBar.js";
import Product from "./../containers/product.js";
import ProductHandle from "./../containers/productHandle.js";
import Notice from "./../containers/notice.js";
import Order from "./../containers/order.js";

import { setTabIndex, setProductId, setCount, fetchContractData, fetchSubmit, fetchClosing, closeWs } from "./../redux/actions/contract.js";

// 头部操作 icon 宽高
const HEADERHANDLESIZE = 32;

// 选项卡导航高度
const TABBARHEIGHT = 66;

// 选项卡导航宽度
const TABBARWIDTH = Dimensions.get( "window" ).width;

const styles = StyleSheet.create( {
	container: { flex: 1, backgroundColor: "#F6F6F6" },
	headerRightViewItem: { alignItems: "center", justifyContent: "flex-end", marginLeft: 10 },
	headerRightViewItemImage: { width: HEADERHANDLESIZE, height: HEADERHANDLESIZE },
	headerRightViewItemText: { fontSize: 12, color: "#FFFFFF" },

	tabBarBox: { width: TABBARWIDTH, height: TABBARHEIGHT },
	tabBar: { position: "absolute", top: 0, left: 0, right: 0, height: TABBARHEIGHT, borderRadius: 40, backgroundColor: "#FFFFFF" },

	tabBarPlaceHolder: { position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: "#F6F6F6", height: TABBARHEIGHT * 0.5 },
	tab: { flex: 1, backgroundColor: "#F6F6F6" },

	errorBox: { height: 100, justifyContent: "center", alignItems: "center" },
	errorText: { fontSize: 16 }
} );

const Content = function ( { productId, setProductId, setCount, contractData, currentProduct, userOrderData, fetchData, loading, fetchSubmit, fetchClosing } )
{
	return <ScrollView
		keyboardDismissMode = { "on-drag" }
		onScrollBeginDrag = { Keyboard.dismiss }
		showsVerticalScrollIndicator = { false }
		refreshControl = { <RefreshControl refreshing = { loading } onRefresh = { fetchData } /> }
	>
		<Product data = { contractData } id = { productId } setId = { setProductId } />
		<Notice />
		<ProductHandle data = { currentProduct } setCount = { setCount } submit = { fetchSubmit } />
		<Order data = { userOrderData } submit = { fetchClosing } />
	</ScrollView>;
};

const Contract = React.memo( function ( props )
{
	// React.useEffect( function()
	// {
	// 	props.fetchContractData();
	// }, [] );

	React.useEffect( () => {
		props.navigation.addListener( "focus", () => {
			props.fetchContractData();
		} );
		props.navigation.addListener( "blur", () => {
			closeWs();
		} );
	}, [ props.navigation ] );

	const goToChart = React.useCallback( function()
	{
		props.navigation.push( "Chart" );
	}, [] );

	const renderTabBar = React.useCallback( function( { tabs, activeTab, goToPage } )
	{
		return <ImageBackground source = { require( "./../images/header.png" ) } style = { styles.tabBarBox }>
			<View style = { styles.tabBarPlaceHolder } />
			<TabBar tabs = { tabs } type = { "underline" } tabBarStyle = { styles.tabBar } activeStyle = { "#000000" } activeTab = { activeTab } goToPage = { goToPage } />
		</ImageBackground>
	}, [] );

	return <View style = { styles.container }>
		<Header logoKey = { 2 } usdtInfo = { props.userDetailData[ "USDT" ] } tradingInfo = { props.userDetailData[ "交易金" ] } slbtInfo = { props.userDetailData[ "SLBT" ] }>
			<TouchableOpacity style = { styles.headerRightViewItem } onPress = { goToChart }>
				<Image style = { styles.headerRightViewItemImage } source = { require( "./../images/chart.png" ) } />
				<Text style = { styles.headerRightViewItemText }>{ I18n.t( "contract.header.chart" ) }</Text>
			</TouchableOpacity>
		</Header>
		{
			props.fetchDataError
				? <View style = { styles.errorBox }>
					<Text style = { styles.errorText }>{ props.fetchDataError }</Text>
				</View>
				: <Tab locked = { true } animation = { false } renderTabBar = { renderTabBar } containerStyle = { styles.tab } onChangeTab = { props.setTabIndex }>
					<Content
						tabLabel = { "USDT" }
						productId = { props.productId }
						setCount = { props.setCount }
						setProductId = { props.setProductId }
						contractData = { props.contractData }
						currentProduct = { props.currentProduct }
						userOrderData = { props.userOrderData }
						fetchData = { props.fetchContractData }
						loading = { props.isloading }
						fetchSubmit = { props.fetchSubmit }
						fetchClosing = { props.fetchClosing }
					/>
					<Content
						tabLabel = { I18n.t( "contract.trading" ) }
						productId = { props.productId }
						setCount = { props.setCount }
						setProductId = { props.setProductId }
						contractData = { props.contractData }
						currentProduct = { props.currentProduct }
						userOrderData = { props.userOrderData }
						fetchData = { props.fetchContractData }
						loading = { props.isloading }
						fetchSubmit = { props.fetchSubmit }
						fetchClosing = { props.fetchClosing }
					/>
					<Content
						tabLabel = { "SLBT" }
						productId = { props.productId }
						setCount = { props.setCount }
						setProductId = { props.setProductId }
						contractData = { props.contractData }
						currentProduct = { props.currentProduct }
						userOrderData = { props.userOrderData }
						fetchData = { props.fetchContractData }
						loading = { props.isloading }
						fetchSubmit = { props.fetchSubmit }
						fetchClosing = { props.fetchClosing }
					/>
				</Tab>
		}
	</View>
} );

export default connect(
	function mapStateToProps( state, ownProps )
	{
		const contractData = state.contract;
		return {
			tabIndex: contractData.tabIndex,
			productId: contractData.productId,
			fetchDataError: contractData.fetchDataError,
			contractData: contractData.contractData,
			isloading:  contractData.isloading,
			currentProduct: contractData.currentProduct,
			userOrderData: contractData.userOrderData,
			userDetailData: contractData.userDetailData
		};
	},
	function mapDispatchToProps( dispatch, ownProps )
	{
		return bindActionCreators( { setTabIndex, setProductId, setCount, fetchContractData, fetchSubmit, fetchClosing }, dispatch );
	}
)( Contract );


