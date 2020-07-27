import React from "react";

import { View, Text, Image, TouchableOpacity, ScrollView, BackHandler, Linking, Alert, RefreshControl, StyleSheet, Dimensions } from "react-native";

import { getData } from "./../redux/actions/classroom.js";

import Toast from "react-native-root-toast";

import { bindActionCreators } from "redux";

import { connect } from "react-redux";

import Tab from "./../components/tab.js";
import TabBar from "./../containers/tabBar.js";
import Task from "./../containers/task.js";
import Encyclopedia from "./../containers/encyclopedia.js";

import I18n from "i18n-js";

// 头部高度
const HEADER_HEIGHT = 56;

// 选项卡导航高度
const TABBARHEIGHT = 60;

// 选项卡导航宽度
const TABBARWIDTH = Dimensions.get( "window" ).width;

const styles = StyleSheet.create( {
	container: { flex: 1, backgroundColor: "#FFFFFF", paddingTop: 28 },
	header: { justifyContent: "center", height: HEADER_HEIGHT, borderBottomWidth: 4, borderColor: "#F5F5F5", paddingHorizontal: HEADER_HEIGHT / 3.141421 },
	headerText: { fontSize: 18, fontWeight: "bold" },

	tab: { flex: 1, backgroundColor: "#F6F6F6" },
	tabBarBox: { width: TABBARWIDTH, height: TABBARHEIGHT },
	tabBar: { position: "absolute", top: 0, left: 0, right: 0, height: TABBARHEIGHT, backgroundColor: "#FFFFFF" },
} );

const Classroom = function ( props )
{
	React.useEffect( () => {
		props.navigation.addListener( "focus", () => {
			props.getData();
		} );
	}, [ props.navigation ] );

	const total = React.useMemo( function()
	{
		return Object.keys( props.data ).length;
	}, [ props.data, total ] );

	const progress = React.useMemo( function()
	{
		return total
			? Object.values( props.data ).reduce( function( prev, cur )
			{
				return prev + cur;
			} )
			: 0;
	}, [ props.data ] );

	const renderTabBar = React.useCallback( function( { tabs, activeTab, goToPage } )
	{
		return <View style = { styles.tabBarBox }>
			<TabBar tabs = { tabs } type = { "background" } tabBarStyle = { styles.tabBar } fontSize = { 12 } activeStyle = { "#696DAC" } activeTab = { activeTab } goToPage = { goToPage } />
		</View>
	}, [] );

	return <View style = { styles.container }>
		<View style = { styles.header }>
			<Text style = { styles.headerText }>{ I18n.t( "bottomTabNavigator.classroom" ) }</Text>
		</View>
		<Tab renderTabBar = { renderTabBar } containerStyle = { styles.tab }>
			<Task tabLabel = { I18n.t( "classroom.tabItem.task" ) } progress = { progress } total = { total } data = { props.data } />
			<Encyclopedia tabLabel = { I18n.t( "classroom.tabItem.encyclopedia" ) } />
		</Tab>
	</View>;
};

export default connect(
	function mapStateToProps( state, ownProps )
	{
		const classroomData = state.classroom;

		return {
			data: classroomData.data,
			loading: classroomData.loading
		};
	},
	function mapDispatchToProps( dispatch, ownProps )
	{
		return bindActionCreators( { getData }, dispatch );
	}
)( Classroom );



