import React from "react";

import { View, ScrollView, Text, ActivityIndicator, StyleSheet, Dimensions } from "react-native";

import Tab from "./../components/tab.js";

import TabBar from "./../containers/tabBar.js";

// 屏幕高度
const SCREENHEIGHT = Dimensions.get( "window" ).height;

// 选项卡导航高度
const TABBARHEIGHT = 50;

// 选项页头部高度
const TABITEMHEADERHEIGHT = 30;

// 选项页列表行高度
const TABITEMROWHEIGHT = 50;

// ScrollView 最大高度
const SCROLLVIEWHEIGHT = SCREENHEIGHT - 120 - 50 - TABBARHEIGHT;			// 头部: 120, 底部导航: 50, 选项卡高度: 50, 选项页头部高度: 30

const styles = StyleSheet.create( {
	container: { marginTop: 6 },
	tabBar: { height: TABBARHEIGHT, backgroundColor: "#FFFFFF" },
	// tabItemContainer: { flex: 1, maxHeight: SCROLLVIEWHEIGHT, height: SCROLLVIEWHEIGHT, backgroundColor: "red" },
	tabItemContainer: { backgroundColor: "red" },
	tabItemHeader: { flexDirection: "row", alignItems: "center", backgroundColor: "#F6F6F6", height: TABITEMHEADERHEIGHT, paddingHorizontal: 10 },
	tabItemRow: { flexDirection: "row", alignItems: "center", backgroundColor: "#FFFFFF", height: TABITEMROWHEIGHT, paddingHorizontal: 10 },
	tabItemHeaderText: { flex: 1, color: "#000000", textAlign: "center" },
	tabItemRowText: { flex: 1, color: "#777777", textAlign: "center" },
	errorBox: { height: 100, paddingHorizontal: 10, justifyContent: "center" },
	errorText: { color: "#F00" },

	noDataBox: { height: 100, justifyContent: "center", alignItems: "center" },
	noDataText: { color: "#777777" }
} );

// 列表行
const TabItemRow = React.memo( function( { data } )
{
	return <View style = { styles.tabItemRow }>
		<Text style = { styles.tabItemRowText }>{ data[ "流水方向" ] ? data[ "流水方向" ] : "-" }</Text>
		<Text style = { styles.tabItemRowText }>{ data[ "流水金额" ] ? data[ "流水金额" ] : "-" }</Text>
		<Text style = { styles.tabItemRowText }>{ data[ "用户余额" ] ? data[ "用户余额" ] : "-" }</Text>
		<Text style = { styles.tabItemRowText }>{ data[ "流水时间" ] ? data[ "流水时间" ] : "-" }</Text>
		<Text style = { styles.tabItemRowText }>{ data[ "备注" ] ? data[ "备注" ] : "-" }</Text>
	</View>
} );

// 列表头
const TabItemHeader = React.memo( function()
{
	return <View style = { styles.tabItemHeader }>
		<Text style = { styles.tabItemHeaderText }>流水方向</Text>
		<Text style = { styles.tabItemHeaderText }>流水金额</Text>
		<Text style = { styles.tabItemHeaderText }>用户余额</Text>
		<Text style = { styles.tabItemHeaderText }>流水时间</Text>
		<Text style = { styles.tabItemHeaderText }>备注</Text>
	</View>
} );

// 选项卡页
const TabItem = React.memo( function( { offEnabled, onEnabled, isloading, statementData, fecthStatementError } )
{
	if( fecthStatementError )
	{
		return <View style = { styles.errorBox }>
			<Text style = { styles.errorText }>{ fecthStatementError }</Text>
		</View>;
	};

	if( isloading && statementData.length === 0 )
	{
		return <ActivityIndicator size = "small" color = "#696DAC" />;
	};

	if( !isloading && statementData.length === 0 )
	{
		return <View style = { styles.noDataBox }>
			<Text style = { styles.noDataText }>未查询到数据</Text>
		</View>
	};

	if( !isloading && statementData.length )
	{
		const realHeight = statementData.length * TABITEMROWHEIGHT + TABITEMHEADERHEIGHT;

		const scrollViewHeight = ( realHeight > SCROLLVIEWHEIGHT ) ? SCROLLVIEWHEIGHT : realHeight;

		console.log( "scrollViewHeight", scrollViewHeight );

		return <View style = { { height: scrollViewHeight } }>
			<ScrollView
				stickyHeaderIndices = { [ 0 ] }
				showsVerticalScrollIndicator = { false }
				onTouchStart = { offEnabled }
				onTouchEnd = { onEnabled }
				onMomentumScrollEnd = { onEnabled }
			>
				<TabItemHeader />
				{
					statementData.map( function( item, index )
					{
						return <TabItemRow data = { item } key = { index } />
					} )
				}
			</ScrollView>
		</View>
	};
} );

export default React.memo( function Statement( { offEnabled, onEnabled, tabIndex, setTabIndex, isloading, statementData, fecthStatementError } )
{

	const renderTabBar = function( { tabs, activeTab, goToPage } )
	{
		return <TabBar tabs = { tabs } type = { "underline" } tabBarStyle = { styles.tabBar } activeTab = { activeTab } goToPage = { goToPage } />;
	};


	return <Tab
		renderTabBar = { renderTabBar }
		containerStyle = { styles.container }
		initialPage = { tabIndex }
		onChangeTab = { setTabIndex }
	>
		<TabItem
			tabLabel = { "积分" }
			offEnabled = { offEnabled }
			onEnabled = { onEnabled }
			isloading = { isloading }
			statementData = { statementData }
			fecthStatementError = { fecthStatementError }
		/>
		<TabItem
			tabLabel = { "ETUSD" }
			offEnabled = { offEnabled }
			onEnabled = { onEnabled }
			isloading = { isloading }
			statementData = { statementData }
			fecthStatementError = { fecthStatementError }
		/>
		<TabItem
			tabLabel = { "USDT" }
			offEnabled = { offEnabled }
			onEnabled = { onEnabled }
			isloading = { isloading }
			statementData = { statementData }
			fecthStatementError = { fecthStatementError }
		/>
		<TabItem
			tabLabel = { "交易金" }
			offEnabled = { offEnabled }
			onEnabled = { onEnabled }
			isloading = { isloading }
			statementData = { statementData }
			fecthStatementError = { fecthStatementError }
		/>
	</Tab>
} );
