import React from "react";

import { View, Text, StyleSheet } from "react-native";

import Tab from "./../components/tab.js";

import TabBar from "./../containers/tabBar.js";

const styles = StyleSheet.create( {
	container: { marginTop: 6 },
	tabBar: { paddingVertical: 18, backgroundColor: "#FFFFFF" },
} );

const TabItem = React.memo( function( isloading, statementData, fecthStatementError )
{
	return <View>
		<Text>123</Text>
	</View>
} );

export default React.memo( function Statement( { tabIndex, setTabIndex, isloading, statementData, fecthStatementError } )
{
	const onChangeTab = React.useCallback( function( o )
	{
		setTabIndex( o.i );
	}, [] );

	const renderTabBar = React.useCallback( function( { tabs, activeTab, goToPage } )
	{
		return <TabBar tabs = { tabs } type = { "underline" } tabBarStyle = { styles.tabBar } activeTab = { activeTab } goToPage = { goToPage } />;
	}, [] );

	return <View style = { styles.container }>
		<Tab renderTabBar = { renderTabBar } initialPage = { tabIndex } onChangeTab = { onChangeTab }>

			<TabItem
				tabLabel = { "积分" }
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
				tabLabel = { "交易金" }
				isloading = { isloading }
				statementData = { statementData }
				fecthStatementError = { fecthStatementError }
			/>
		</Tab>
	</View>;
} );
