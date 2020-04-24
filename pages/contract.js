import React from "react";

import { View, Text, Image, ImageBackground, ScrollView, ActivityIndicator, Dimensions, Keyboard, StyleSheet } from "react-native";

import { bindActionCreators } from "redux";

import { connect } from "react-redux";

import I18n from "i18n-js";

import Tab from "./../components/tab.js";

import Header from "./../containers/header.js";
import TabBar from "./../containers/tabBar.js";
import Product from "./../containers/product.js";
import ProductHandle from "./../containers/productHandle.js";
import Notice from "./../containers/notice.js";

import { setTabIndex, setProductId, setCount, fetchContractData } from "./../redux/actions/contract.js";

// 头部操作 icon 宽高
const HEADERHANDLESIZE = 36;

// 选项卡导航高度
const TABBARHEIGHT = 66;

// 选项卡导航宽度
const TABBARWIDTH = Dimensions.get( "window" ).width;

const styles = StyleSheet.create( {
	container: { flex: 1 },
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

const Content = function ( { tabIndex, productId, setProductId, setCount, contractData, currentProduct } )
{
	return <ScrollView
		stickyHeaderIndices = { [ 1 ] }
		keyboardDismissMode = { "on-drag" }
		onScrollBeginDrag = { Keyboard.dismiss }
		showsVerticalScrollIndicator = { false }
		// refreshControl = { <RefreshControl refreshing = { props.isloadingUserDetailData } onRefresh = { fetchData } /> }
	>
		<Product data = { contractData } id = { productId } setId = { setProductId } />
		<Notice />
		<ProductHandle id = { productId } tabIndex = { tabIndex } data = { currentProduct } setCount = { setCount } />
	</ScrollView>;
};

const Contract = React.memo( function ( props )
{
	React.useEffect( function()
	{
		props.fetchContractData();
	}, [] );

	// console.log( "props", props );

	const renderTabBar = React.useCallback( function( { tabs, activeTab, goToPage } )
	{
		return <ImageBackground source = { require( "./../images/header.png" ) } style = { styles.tabBarBox }>
			<View style = { styles.tabBarPlaceHolder } />
			<TabBar tabs = { tabs } type = { "underline" } tabBarStyle = { styles.tabBar } activeTab = { activeTab } goToPage = { goToPage } />
		</ImageBackground>
	}, [] );

	return <View style = { styles.container }>
		<Header usdtInfo = { "" } tradingInfo = { "" } slbtInfo = { "" }>
			<View style = { styles.headerRightViewItem }>
				<Image style = { styles.headerRightViewItemImage } source = { require( "./../images/chart.png" ) } />
				<Text style = { styles.headerRightViewItemText }>{ I18n.t( "contract.header.chart" ) }</Text>
			</View>
		</Header>
		{
			props.fetchDataError
				? <View style = { styles.errorBox }>
					<Text style = { styles.errorText }>{ props.fetchDataError }</Text>
				</View>
				: <Tab locked = { true } animation = { false } renderTabBar = { renderTabBar } containerStyle = { styles.tab } initialPage = { props.tabIndex } onChangeTab = { props.setTabIndex }>
					<Content
						tabLabel = { "USDT" }
						tabIndex = { props.tabIndex }
						productId = { props.productId }
						setCount = { props.setCount }
						setProductId = { props.setProductId }
						contractData = { props.contractData }
						currentProduct = { props.currentProduct }
					/>
					<Content
						tabLabel = { I18n.t( "contract.trading" ) }
						tabIndex = { props.tabIndex }
						productId = { props.productId }
						setCount = { props.setCount }
						setProductId = { props.setProductId }
						contractData = { props.contractData }
						currentProduct = { props.currentProduct }
					/>
					<Content
						tabLabel = { "SLBT" }
						tabIndex = { props.tabIndex }
						productId = { props.productId }
						setCount = { props.setCount }
						setProductId = { props.setProductId }
						contractData = { props.contractData }
						currentProduct = { props.currentProduct }
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
			currentProduct: contractData.currentProduct,
			userOrderData: contractData.userOrderData,
			userDetailData: contractData.userDetailData
		};
	},
	function mapDispatchToProps( dispatch, ownProps )
	{
		return bindActionCreators( { setTabIndex, setProductId, setCount, fetchContractData }, dispatch );
	}
)( Contract );


