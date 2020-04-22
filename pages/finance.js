import React from "react";

import { View, Text, ScrollView, RefreshControl, StyleSheet } from "react-native";

import { bindActionCreators } from "redux";

import { connect } from "react-redux";

import { setTabIndex, fetchStatement, fetchUserDetailData, showExchangeModal, hideModal, setModalText } from "./../redux/actions/finance.js";

import Header from "./../containers/header.js";
import Exchange from "./../containers/exchange.js";
import UserInfo from "./../containers/userInfo.js";
import Statement from "./../containers/statement.js";

const styles = StyleSheet.create( {
	container: { flex: 1, backgroundColor: "#F6F6F6" }
} );

const Finance = function ( props )
{
	const fetchData = function()
	{
		console.log( "发送请求" );
		props.fetchStatement();
		props.fetchUserDetailData();
	};

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
					modalVisible = { props.modalVisible }
					modalData = { props.modalData }
					modalInputText = { props.modalInputText }
					setModalText = { props.setModalText }
					showModal = { props.showExchangeModal }
					hideModal = { props.hideModal }
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

			modalInputText: financeData.modalInputText,
			modalVisible: financeData.modalVisible,
			modalData: financeData.modalData
		};
	},
	function mapDispatchToProps( dispatch, ownProps )
	{
		return bindActionCreators( { setTabIndex, fetchStatement, fetchUserDetailData, showExchangeModal, hideModal, setModalText }, dispatch );
	}
)( Finance );
