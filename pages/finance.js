import React from "react";

import { View, Text, ScrollView, RefreshControl, StyleSheet } from "react-native";

import { bindActionCreators } from "redux";

import { connect } from "react-redux";

import { setTabIndex, fetchStatement, fetchUserDetailData, showExchangeModal, hideExchangeModal, setModalText } from "./../redux/actions/finance.js";

import Header from "./../containers/header.js";
import Exchange from "./../containers/exchange.js";
import UserInfo from "./../containers/userInfo.js";
import Statement from "./../containers/statement.js";

const styles = StyleSheet.create( {
	container: { flex: 1, backgroundColor: "#F6F6F6" }
} );

const Finance = function ( props )
{
	console.log( "Finance re-render", props );
	const fetchData = React.useCallback( function()
	{
		console.log( "发送请求" );
		props.fetchStatement();
		props.fetchUserDetailData();
	}, [] );

	React.useEffect( function()
	{
		fetchData();
	}, [] );

	return <React.Fragment>
		<Header />
		<View style = { styles.container }>
			<ScrollView
				showsVerticalScrollIndicator = { false }
				refreshControl = { <RefreshControl refreshing = { props.isloadingUserDetailData } onRefresh = { fetchData } /> }
			>
				<Exchange
					modalData = { props.modalData }
					callback = { fetchData }
					setModalText = { props.setModalText }
					showModal = { props.showExchangeModal }
					hideModal = { props.hideExchangeModal }
				/>
				<UserInfo />
				<Statement
					tabIndex = { props.tabIndex }
					setTabIndex = { props.setTabIndex }
					isloading = { props.isloadingStatementData }
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
			statementData: financeData.statementData,
			fecthStatementError: financeData.fecthStatementError,
			isloadingStatementData: financeData.isloadingStatementData,

			userDetailData: financeData.userDetailData,
			isloadingUserDetailData: financeData.isloadingUserDetailData,

			modalData: financeData.modalData
		};
	},
	function mapDispatchToProps( dispatch, ownProps )
	{
		return bindActionCreators( { setTabIndex, fetchStatement, fetchUserDetailData, showExchangeModal, hideExchangeModal, setModalText }, dispatch );
	}
)( Finance );



