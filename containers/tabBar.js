import React from "react";

import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const TABBARITEMICONSIZE = 28;

const globalStyles = StyleSheet.create( {
	tabBar: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" }
} );

const checkboxStyles = StyleSheet.create( {
	tabBarItem: { flexDirection: "row", alignItems: "center" },
	tabBarItemText: { fontSize: 16, color: "#888888" },
	tabBarItemIcon: { width: TABBARITEMICONSIZE, height: TABBARITEMICONSIZE, marginRight: 10 }
} );

const underlineStyles = {
	tabBarItem: { flex: 1, alignItems: "center" },
	tabBarItemLine: { width: 40, height: 4, marginTop: 6, backgroundColor: "#696DAC" },
	tabBarItemText: { fontSize: 16 },
	active: { color: "#696DAC", fontWeight: "bold" },
	inactive: { color: "#888888" }
};

// 选项卡项: 带有 checkBox 效果
const CheckBoxTabBarItem = React.memo( function( { index, title, isActive, onPress } )
{
	return <TouchableOpacity style = { checkboxStyles.tabBarItem } onPress = { () => onPress( index ) }>
		{
			isActive
				? <Image style = { checkboxStyles.tabBarItemIcon } source = { require( "./../images/tabbar_active.png" ) } />
				: <Image style = { checkboxStyles.tabBarItemIcon } source = { require( "./../images/tabbar_inactive.png" ) } />
		}
		<Text style = { checkboxStyles.tabBarItemText }>{ title }</Text>
	</TouchableOpacity>;

} );

// 选项卡项: 带有下划线效果
const UnderlineTabBarItem = React.memo( function( { index, title, isActive, onPress } )
{
	return <TouchableOpacity style = { underlineStyles.tabBarItem } onPress = { () => onPress( index ) }>
		<Text style = { [ underlineStyles.tabBarItemText, isActive ? underlineStyles.active : underlineStyles.inactive ] }>{ title }</Text>
		{
			isActive
				? <View style = { underlineStyles.tabBarItemLine } />
				: null
		}
	</TouchableOpacity>;
} );


// 选项卡导航栏
const TabBar = React.memo( function( { tabs, type, tabBarStyle, activeTab, goToPage } )
{
	const onPress = React.useCallback( i => goToPage( i ), [] );

	return <View style = { [ globalStyles.tabBar, tabBarStyle ] }>
	{
		tabs.map( function( item, index )
		{
			const isActive = activeTab === index;
			return type === "checkBox"
				? <CheckBoxTabBarItem key = { index } index = { index } title = { item } isActive = { isActive } onPress = { onPress } />
			: type === "underline"
				? <UnderlineTabBarItem key = { index } index = { index } title = { item } isActive = { isActive } onPress = { onPress } />
			: null
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
