import React from "react";

import { View, Text, StyleSheet } from "react-native";

import { CommonActions } from "@react-navigation/native";

import { logout } from "./../redux/actions/login.js";

import { bindActionCreators } from "redux";

import { connect } from "react-redux";

const styles = StyleSheet.create( {
	container: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: "#FFFFFF" },
} );

const User =  React.memo( function( props )
{
	props.isLogin || props.navigation.dispatch( CommonActions.reset( { index: 0, routes: [ { name: "Login" } ] } ) );

	return <View style = { styles.container }>
		<Text onPress = { props.logout }>退出</Text>
	</View>;
} );

export default connect(
	function mapStateToProps( state, ownProps )
	{
		const loginData = state.login;

		return {
			isLogin: loginData.isLogin
		};
	},
	function mapDispatchToProps( dispatch, ownProps )
	{
		return bindActionCreators( { logout }, dispatch );
	}
)( User );
