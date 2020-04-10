import React from "react";

import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image, Dimensions } from "react-native";

import ScrollableTabView from "react-native-scrollable-tab-view";	// 颜色值未完成

// 图标宽高
const ICONSIZE = 80;

// tabBar 宽高
const TABBARHEIGHT = 80;

// input box 高
const LISTITEMHEIGIT = 76;

// input box 宽
const LISTITEMWIDTH = Dimensions.get( "window" ).width * 0.9;

const styles = StyleSheet.create( {

	container: { flex: 1, alignItems: "center", backgroundColor: "#FEFEFE" },
	icon: { width: ICONSIZE, height: ICONSIZE, borderColor: "#FFFFFF", borderRadius: 80, borderWidth: 2, marginVertical: 30 },

	tabBox: { height: LISTITEMHEIGIT * 2 + TABBARHEIGHT },
	tabBar: { width: LISTITEMWIDTH, height: TABBARHEIGHT, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
	tabBarItemText: { fontSize: 20 },

	textInputBox: { width: LISTITEMWIDTH, height: LISTITEMHEIGIT, justifyContent: "center" },
	textInput: { fontSize: 18, color: "#000000" },
	line: { height: 1, backgroundColor: "#DDDDDD" },
	loginBtn: { width: LISTITEMWIDTH, height: 50, alignItems:"center", justifyContent: "center", marginTop: 30, marginBottom: 20, borderRadius: 4 },
	loginBtnText: { fontSize: 18, fontWeight: "bold", color: "#FFFFFF" },
	options: { width: LISTITEMWIDTH, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
	optionsText: { fontSize: 16 },

	inactiveBgColor: { backgroundColor: "#888888" },
	activeBgColor: { backgroundColor: "#4AA7C3" },

	inactiveColor: { fontSize: 16, color: "#888888" },
	activeColor: { fontSize: 20, color: "#4AA7C3" }

} );

// 输入框
const Input = React.memo( function( { placeholder, isPassword = false } )
{
	return <TextInput style = { styles.textInput } placeholder = { placeholder } placeholderTextColor = { "#999999" } onChangeText = { text => {} } />;
} );

// 登录按钮
const SubmitBtn = React.memo( function( { onSubmit } ) {
	return <TouchableOpacity style = { [ styles.loginBtn, styles.inactiveBgColor ] } onPress = { onSubmit }>
		<Text style = { styles.loginBtnText }>登录</Text>
	</TouchableOpacity>;
} );

// 邮件登录方式
const MailLogin = React.memo( function() {
	return <View>
		<View style = { styles.textInputBox }>
			<Input placeholder = { "请输入电子邮箱" } />
			<View style = { styles.line } />
		</View>
		<View style = { styles.textInputBox }>
			<Input placeholder = { "请输入密码" } password = { true } />
			<View style = { styles.line } />
		</View>
	</View>;
} );

// 电话登录方式
const PhoneLogin = React.memo( function() {
	return <View>
		<View style = { styles.textInputBox }>
			<Input placeholder = { "请输入电话号码" } />
			<View style = { styles.line } />
		</View>
		<View style = { styles.textInputBox }>
			<Input placeholder = { "请输入密码" } password = { true } />
			<View style = { styles.line } />
		</View>
	</View>;
} );

// 选项卡导航栏
const TabBar = React.memo( function( { tabs, activeTab, goToPage } )
{
	const onPress = React.useCallback( i => goToPage( i ), [] );

	return <View style = { styles.tabBar }>
	{
		tabs.map( function( item, index )
		{
			return <TabBarItem
				key = { index }
				index = { index }
				title = { item }
				isActive = { activeTab == index }
				onPress = { onPress }
			/>;
		} )
	}
	</View>;

} );

// 选项卡项
const TabBarItem = React.memo( function( { index, title, isActive, onPress } )
{
	return <TouchableOpacity onPress = { () => onPress( index ) }>
		<Text style = { [ isActive ? styles.activeColor : styles.inactiveColor ] }>{ title }</Text>
	</TouchableOpacity>;
} );

export default React.memo( function Login( {} )
{
	return <View style = { styles.container }>
		<Image style = { styles.icon } source = { require( "./../images/logo.png" ) } />
		<View style = { styles.tabBox }>
			<ScrollableTabView renderTabBar = { () => <TabBar /> }>
				<PhoneLogin tabLabel = "电话号码登录" />
			    <MailLogin tabLabel = "邮箱登录" />
			</ScrollableTabView>
		</View>
		<SubmitBtn onSubmit = { () => {} } />
		<View style = { styles.options }>
			<TouchableOpacity><Text style = { styles.optionsText }>新用户</Text></TouchableOpacity>
			<TouchableOpacity><Text style = { styles.optionsText }>忘记密码</Text></TouchableOpacity>
		</View>
	</View>;
} );

