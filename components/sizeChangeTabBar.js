import React from "react";

import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const styles = StyleSheet.create( {

	tabBar: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
	inactiveColor: { fontSize: 16, color: "#888888" },
	activeColor: { fontSize: 18, fontWeight: "bold", color: "#696DAC" }

} );

// 选项卡项
const TabBarItem = React.memo( function( { index, title, isActive, onPress } )
{
	return <TouchableOpacity onPress = { () => onPress( index ) }>
		<Text style = { [ isActive ? styles.activeColor : styles.inactiveColor ] }>{ title }</Text>
	</TouchableOpacity>;

} );


// 选项卡导航栏
const TabBar = React.memo( function( { tabs, tabBarStyle, activeTab, goToPage } )
{
	const onPress = React.useCallback( i => goToPage( i ), [] );

	return <View style = { [ styles.tabBar, tabBarStyle ] }>
	{
		tabs.map( function( item, index )
		{
			const isActive = activeTab === index;
			return <TabBarItem key = { index } index = { index } title = { item } isActive = { isActive } onPress = { onPress } />;
		} )
	}
	</View>;

}, function( prevProps, nextProps )
{
	const activeTabChanged = prevProps.activeTab == nextProps.activeTab;
	const goToPageChanged = prevProps.goToPage == nextProps.goToPage;
	const tabsChanged = JSON.stringify( prevProps.tabs ) == JSON.stringify( nextProps.tabs );
	return activeTabChanged && goToPageChanged && tabsChanged;

} );

export default TabBar;
