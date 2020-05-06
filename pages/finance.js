import React from "react";

import { View, Text, Image, TouchableOpacity, ScrollView, ToastAndroid, BackHandler, Linking, RefreshControl, StyleSheet } from "react-native";

import { bindActionCreators } from "redux";

import { connect } from "react-redux";

import { getVersion, setTabIndex, fetchStatement, fetchUserDetailData, showExchangeModal, hideExchangeModal, setModalText, fetchGetBenefits } from "./../redux/actions/finance.js";

import I18n from "i18n-js";

import Header from "./../containers/header.js";
import Notice from "./../containers/notice.js";
import Exchange from "./../containers/exchange.js";
import UserInfo from "./../containers/userInfo.js";
import Statement from "./../containers/statement.js";
import ModalCard from "./../containers/modalCard.js";

// 头部操作 icon 宽高
const HEADERHANDLESIZE = 36;

const styles = StyleSheet.create( {
	container: { flex: 1, backgroundColor: "#F6F6F6" },
	headerRightViewItem: { alignItems: "center", justifyContent: "flex-end", marginLeft: 10 },
	headerRightViewItemImage: { width: HEADERHANDLESIZE, height: HEADERHANDLESIZE },
	headerRightViewItemText: { fontSize: 12, color: "#FFFFFF" }
} );

const Finance = function ( props )
{
	console.log( "Finance re-render" );
	const fetchData = React.useCallback( function()
	{
		console.log( "发送请求" );
		props.fetchStatement();
		props.fetchUserDetailData();
		props.getVersion();
	}, [] );

	console.log( "props", props );

	React.useEffect( () => {
		let lastTime = null;
		function onBack()
		{
			if ( lastTime && lastTime + 1000 > Date.now() ) {
				BackHandler.exitApp();
				return false;
			} else {
				lastTime = Date.now();
				ToastAndroid.show( I18n.t( "finance.quit" ), ToastAndroid.SHORT)
				return true;
			};
			return true;
		};
		BackHandler.addEventListener( "hardwareBackPress", onBack );
		return () => {
			BackHandler.removeEventListener( "hardwareBackPress", onBack );
		}
	}, [] );

	const upDate = React.useCallback( function()
	{
		Linking.openURL( "http://ca.slb.one/appdown.php" );
	}, [] );

	React.useEffect( function()
	{
		fetchData();
	}, [] );

	return <React.Fragment>
		<Header usdtInfo = { props.userDetailData[ "USDT" ] } tradingInfo = { props.userDetailData[ "交易金" ] } slbtInfo = { props.userDetailData[ "SLBT" ] }>
			<React.Fragment>
				<TouchableOpacity style = { styles.headerRightViewItem } onPress = { () => props.showExchangeModal( "投资ETU金融" ) }>
					<Image style = { styles.headerRightViewItemImage } source = { require( "./../images/invest_etu.png" ) } />
					<Text style = { styles.headerRightViewItemText }>{ I18n.t( "finance.header.investment" ) } ETU</Text>
				</TouchableOpacity>
				<TouchableOpacity style = { styles.headerRightViewItem } onPress = { () => props.fetchGetBenefits( res => ToastAndroid.show( res, ToastAndroid.SHORT ) ) }>
					<Image style = { styles.headerRightViewItemImage } source = { require( "./../images/get_benefits.png" ) } />
					<Text style = { styles.headerRightViewItemText }>{ I18n.t( "finance.header.benefits" ) }</Text>
				</TouchableOpacity>
			</React.Fragment>
		</Header>
		<Notice />
		<View style = { styles.container }>
			<ScrollView
				showsVerticalScrollIndicator = { false }
				refreshControl = { <RefreshControl refreshing = { props.isloadingUserDetailData } onRefresh = { fetchData } /> }
			>
				<Exchange showModal = { props.showExchangeModal } />
				<UserInfo data = { props.userDetailData } />
				<Statement
					tabIndex = { props.tabIndex }
					setTabIndex = { props.setTabIndex }
					isloading = { props.isloadingStatementData }
					statementData = { props.statementData }
					fecthStatementError = { props.fecthStatementError }
				/>
			</ScrollView>
		</View>
		{
			props.modalData.visible
				? <ModalCard
					{ ...props.modalData }
					etusdInfo = { props.userDetailData[ "ETUSD" ] }
					usdtInfo = { props.userDetailData[ "USDT" ] }
					pointInfo = { props.userDetailData[ "积分余额" ] }
					callback = { fetchData }
					setModalText = { props.setModalText }
					hideModal = { props.hideExchangeModal }
				/>
				: null
		}
	</React.Fragment>
};

export default connect(
	function mapStateToProps( state, ownProps )
	{
		const financeData = state.finance;

		return {
			version: financeData.version,
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
		return bindActionCreators( { getVersion, setTabIndex, fetchStatement, fetchUserDetailData, showExchangeModal, hideExchangeModal, setModalText, fetchGetBenefits }, dispatch );
	}
)( Finance );



