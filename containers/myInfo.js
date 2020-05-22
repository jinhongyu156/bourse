import React from "react";

import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";

import { useNavigation, CommonActions } from "@react-navigation/native";

import SubmitBtn from "./../containers/submit.js";

import I18n from "i18n-js";

import ActionSheet from "./../components/actionSheet.js";

// 提交按钮宽度
const SUBMITBTNWIDTH = Dimensions.get( "window" ).width * 0.9;

// 提交按钮高度
const SUBMITBTNHEIGHT = 46


const styles = StyleSheet.create( {
	container: { flex: 1, marginTop: 10, backgroundColor: "#F6F6F6" },
	row: { height: 50, paddingHorizontal: 20, marginTop: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "#FFFFFF" },
	centerRow: { justifyContent: "center" },
	rowKeyText: { color: "#000000", fontSize: 14 },
	rowValueText: { color: "#333333", fontSize: 12, paddingTop: 5 },

	logoutBtnBox: { height: 100, backgroundColor: "#F6F6F6", alignItems: "center" },
	logoutBtn: { width: SUBMITBTNWIDTH * 0.8, height: SUBMITBTNHEIGHT * 0.8, marginVertical: 10 },
} );


export default React.memo( function MyInfo( { id, vouchers, userLanguage, actionSheetData, isShowActionSheet, showLanguageActionSheet, hideActionSheet, isLogin, hasCard, bankName, fetchData, logout } )
{
	const navigation = useNavigation();
	isLogin || navigation.dispatch( CommonActions.reset( { index: 0, routes: [ { name: "Login" } ] } ) );

	React.useEffect( function()
	{
		fetchData();
	}, [] )

	const goToMyBankCard = React.useCallback( function()
	{
		navigation.push( "MyBankCard" );
	}, [] );

	const goToHistory = React.useCallback( function()
	{
		navigation.push( "History" );
	}, [] );

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
			<TouchableOpacity style = { styles.row } onPress = { goToMyBankCard }>
				<Text style = { styles.rowKeyText }>{ I18n.t( "myBankCard.title" ) }</Text>
				<Text style = { styles.rowValueText }>{ hasCard ? bankName : I18n.t( "user.notBound" ) }</Text>
			</TouchableOpacity>
			<TouchableOpacity style = { styles.row } onPress = { goToHistory }>
				<Text style = { styles.rowKeyText }>{ I18n.t( "user.history" ) }</Text>
				<Text style = { styles.rowValueText }></Text>
			</TouchableOpacity>
			<TouchableOpacity style = { styles.row } onPress = { showLanguageActionSheet }>
				<Text style = { styles.rowKeyText }>{ I18n.t( "user.language" ) }</Text>
				<Text style = { styles.rowValueText }>{ userLanguage }</Text>
			</TouchableOpacity>
		</View>
		<View style = { styles.logoutBtnBox }>
			<SubmitBtn title = { I18n.t( "user.logout" ) } submitBtnStyle = { styles.logoutBtn } onSubmit = { logout } />
		</View>
		<ActionSheet { ...actionSheetData } hide = { hideActionSheet } isShow = { isShowActionSheet } />
	</React.Fragment>;
} );
