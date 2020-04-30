import React from "react";

import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import I18n from "i18n-js";

import ActionSheet from "./../components/actionSheet.js";

const styles = StyleSheet.create( {
	container: { flex: 1, marginTop: 10, backgroundColor: "#F6F6F6" },
	row: { height: 50, paddingHorizontal: 20, marginTop: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "#FFFFFF" },
	rowKeyText: { color: "#000000", fontSize: 14 },
	rowValueText: { color: "#333333", fontSize: 12, paddingTop: 5 }
} );


export default React.memo( function MyInfo( { id, vouchers, userLanguage, actionSheetData, isShowActionSheet, showLanguageActionSheet, hideActionSheet } )
{
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
		<ActionSheet { ...actionSheetData } hide = { hideActionSheet } isShow = { isShowActionSheet } />
	</React.Fragment>;
} );
