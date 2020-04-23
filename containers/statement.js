import React from "react";

import { View, ScrollView, Text, ActivityIndicator, StyleSheet, Dimensions } from "react-native";

import I18n from "i18n-js";

import Tab from "./../components/tab.js";

import TabBar from "./../containers/tabBar.js";

import { HEADERHEIGHT } from "./header.js";
import { NOTICEHEIGHT } from "./notice.js";

// 屏幕高度
const SCREENHEIGHT = Dimensions.get( "window" ).height;

// 选项卡导航高度
const TABBARHEIGHT = 50;

// 选项页头部高度
const TABITEMHEADERHEIGHT = 30;

// 选项页列表行高度
const TABITEMROWHEIGHT = 50;

// ScrollView 最大高度
const SCROLLVIEWHEIGHT = SCREENHEIGHT - HEADERHEIGHT - NOTICEHEIGHT - TABITEMROWHEIGHT - TABITEMHEADERHEIGHT - 50;

const styles = StyleSheet.create( {
	container: { marginTop: 6 },
	tabBar: { height: TABBARHEIGHT, backgroundColor: "#FFFFFF" },
	tabItemContainer: { backgroundColor: "#F6F6F6" },
	tabItemScrollView: { flex: 1 },
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
		<Text style = { styles.tabItemHeaderText }>{ I18n.t( "finance.statement.direction" ) }</Text>
		<Text style = { styles.tabItemHeaderText }>{ I18n.t( "finance.statement.amount" ) }</Text>
		<Text style = { styles.tabItemHeaderText }>{ I18n.t( "finance.statement.balance" ) }</Text>
		<Text style = { styles.tabItemHeaderText }>{ I18n.t( "finance.statement.time" ) }</Text>
		<Text style = { styles.tabItemHeaderText }>{ I18n.t( "finance.statement.note" ) }</Text>
	</View>
} );

// 选项卡页
const TabItem = React.memo( function( { isloading, statementData, fecthStatementError } )
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
			<Text style = { styles.noDataText }>{ I18n.t( "finance.statement.noData" ) }</Text>
		</View>
	};

	if( !isloading && statementData.length )
	{
		const realHeight = statementData.length * TABITEMROWHEIGHT + TABITEMHEADERHEIGHT;

		const scrollViewHeight = ( realHeight > SCROLLVIEWHEIGHT ) ? SCROLLVIEWHEIGHT : realHeight;

		return <View style = { [ styles.tabItemContainer, { height: scrollViewHeight } ] }>
			<TabItemHeader />
			<ScrollView
				style = { styles.tabItemScrollView }
				showsVerticalScrollIndicator = { false }
				nestedScrollEnabled = { true }							// 嵌套滚动( Android 属性, ios 默认支持 )
			>
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

export default React.memo( function Statement( { tabIndex, setTabIndex, isloading, statementData, fecthStatementError } )
{
	const renderTabBar = React.useCallback( function( { tabs, activeTab, goToPage } )
	{
		return <TabBar tabs = { tabs } type = { "underline" } tabBarStyle = { styles.tabBar } activeTab = { activeTab } goToPage = { goToPage } />;
	}, [] );

	return <Tab
		renderTabBar = { renderTabBar }
		containerStyle = { styles.container }
		initialPage = { tabIndex }
		onChangeTab = { setTabIndex }
	>
		<TabItem
			tabLabel = { I18n.t( "finance.statement.point" ) }
			isloading = { isloading }
			statementData = { statementData }
			fecthStatementError = { fecthStatementError }
		/>
		<TabItem
			tabLabel = { "ETUSD" }
			isloading = { isloading }
			statementData = { statementData }
			fecthStatementError = { fecthStatementError }
		/>
		<TabItem
			tabLabel = { "USDT" }
			isloading = { isloading }
			statementData = { statementData }
			fecthStatementError = { fecthStatementError }
		/>
		<TabItem
			tabLabel = { I18n.t( "finance.statement.trading" ) }
			isloading = { isloading }
			statementData = { statementData }
			fecthStatementError = { fecthStatementError }
		/>
	</Tab>
} );

