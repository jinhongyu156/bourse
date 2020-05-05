import React from "react";

import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";

import { useNavigation, CommonActions } from "@react-navigation/native";

import SubmitBtn from "./../containers/submit.js";

import I18n from "i18n-js";

import ActionSheet from "./../components/actionSheet.js";

// 提交按钮宽度
const SUBMITBTNWIDTH = Dimensions.get( "window" ).width * 0.9;

// 提交按钮高度
const SUBMITBTNHEIGHT = 48


const styles = StyleSheet.create( {
	container: { flex: 1, marginTop: 10, backgroundColor: "#F6F6F6" },
	row: { height: 50, paddingHorizontal: 20, marginTop: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "#FFFFFF" },
	centerRow: { justifyContent: "center" },
	rowKeyText: { color: "#000000", fontSize: 14 },
	rowValueText: { color: "#333333", fontSize: 12, paddingTop: 5 },

	logoutBtnBox: { backgroundColor: "#F6F6F6", alignItems: "center" },
	logoutBtn: { width: SUBMITBTNWIDTH, height: SUBMITBTNHEIGHT, marginVertical: 10 },
} );


export default React.memo( function MyInfo( { id, vouchers, userLanguage, actionSheetData, isShowActionSheet, showLanguageActionSheet, hideActionSheet, isLogin, logout } )
{
	const navigation = useNavigation();
	isLogin || navigation.dispatch( CommonActions.reset( { index: 0, routes: [ { name: "Login" } ] } ) );
	console.log( "isLogin, logout", isLogin, logout );

	return <React.Fragment>
		<View style = { styles.container }>
			<TouchableOpacity style = { styles.row }>
				<Text style = { styles.rowKeyText }>ID</Text>
				<Text style = { styles.rowValueText }>{ id }</Text>
			</TouchableOpacity>
			<TouchableOpacity style = { styles.row }>
				<Text style = { styles.rowKeyText }>{ I18n.t( "user.vouchers" ) }</Text>
				<Text style = { styles.rowValueText }>{ vouchers }</Text>
			</TouchableOpacity>
			<TouchableOpacity style = { styles.row } onPress = { showLanguageActionSheet }>
				<Text style = { styles.rowKeyText }>{ I18n.t( "user.language" ) }</Text>
				<Text style = { styles.rowValueText }>{ userLanguage }</Text>
			</TouchableOpacity>
			<TouchableOpacity style = { styles.row }>
				<Text style = { styles.rowKeyText }>主题</Text>
				<Text style = { styles.rowValueText }>正在开发</Text>
			</TouchableOpacity>
		</View>
		<View style = { styles.logoutBtnBox }>
			<SubmitBtn title = { I18n.t( "user.logout" ) } submitBtnStyle = { styles.logoutBtn } onSubmit = { logout } />
		</View>
		<ActionSheet { ...actionSheetData } hide = { hideActionSheet } isShow = { isShowActionSheet } />
	</React.Fragment>;
} );
