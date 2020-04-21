import React from "react";

import { View, Text, ScrollView, StyleSheet } from "react-native";

import { bindActionCreators } from "redux";

import { connect } from "react-redux";

import { setTabIndex, fetchStatement, wsNotice } from "./../redux/actions/finance.js";

import Header from "./../containers/header.js";
import Notice from "./../containers/notice.js";
import Exchange from "./../containers/exchange.js";
import UserInfo from "./../containers/userInfo.js";
import Statement from "./../containers/statement.js";

const styles = StyleSheet.create( {
	container: { flex: 1, backgroundColor: "#F6F6F6" }
} );

const Finance = function ( props )
{
	React.useEffect( function()
	{
		console.log( "发送请求" );
		props.fetchStatement();
		props.wsNotice();
	}, [] );

	return <React.Fragment>
		<Header />
		<View style = { styles.container }>
			<ScrollView showsVerticalScrollIndicator = { false }>
				<Notice msg = { props.noticeMessage } />
				<Exchange />
				<UserInfo />
				<Statement
					tabIndex = { props.tabIndex }
					setTabIndex = { props.setTabIndex }
					isloading = { props.isloading }
					statementData = { props.statementData }
					fecthStatementError = { props.fecthStatementError }
				/>
			</ScrollView>
			
		</View>
	</React.Fragment>
};

export default connect(
	function mapStateToProps( state, ownProps )
	{
		const financeData = state.finance;

		return {
			tabIndex: financeData.tabIndex,
			isloading: financeData.isloading,
			statementData: financeData.statementData,
			fecthStatementError: financeData.fecthStatementError,

			noticeMessage: financeData.noticeMessage
		};
	},
	function mapDispatchToProps( dispatch, ownProps )
	{
		return bindActionCreators( { setTabIndex, fetchStatement, wsNotice }, dispatch );
	}
)( Finance );
