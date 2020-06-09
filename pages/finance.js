import React from "react";

import { View, Text, Image, TouchableOpacity, ScrollView, ToastAndroid, BackHandler, Linking, Alert, RefreshControl, StyleSheet, Dimensions } from "react-native";

import { bindActionCreators } from "redux";

import { connect } from "react-redux";

import { getVersion, setTabIndex, fetchStatement, fetchUserDetailData, showExchangeModal, hideExchangeModal, setModalText, fetchGetBenefits } from "./../redux/actions/finance.js";

import I18n from "i18n-js";

import FloatAction from "./../components/floatAction.js";

import Header from "./../containers/header.js";
import Notice from "./../containers/notice.js";
import Exchange from "./../containers/exchange.js";
import UserInfo from "./../containers/userInfo.js";
import Statement from "./../containers/statement.js";
import ModalCard from "./../containers/modalCard.js";
import ModalMenu from "./../containers/modalMenu.js";

const PACKAGEJSON = require( "./../package.json" );

// 屏幕高度
const SCREENHEIGHT = Dimensions.get( "window" ).height;

// 屏幕宽度
const SCREENWIDTH = Dimensions.get( "window" ).width;

// 头部操作 icon 宽高
const HEADERHANDLESIZE = 32;

// FloatAction 宽高
const FLOATACTIONHEIGHT = 50;

// TabNavigator 高度
const TABNAVIGATORHEIGHT = 50;

// 默认 FloatAction left
const DEFAULTFLOATACTIONLEFT = SCREENWIDTH - FLOATACTIONHEIGHT - 20;

// 默认 FloatAction top
const DEFAULTFLOATACTIONHEIGHT = SCREENHEIGHT - TABNAVIGATORHEIGHT - FLOATACTIONHEIGHT - 20;

// FloatAction 最大 y 坐标
const FLOATACTIONMAXY = SCREENHEIGHT - TABNAVIGATORHEIGHT;

const styles = StyleSheet.create( {
	container: { flex: 1, backgroundColor: "#F6F6F6" },
	headerRightViewItem: { alignItems: "center", justifyContent: "flex-end", marginLeft: 10 },
	headerRightViewItemImage: { width: HEADERHANDLESIZE, height: HEADERHANDLESIZE },
	headerRightViewItemText: { fontSize: 12, color: "#FFFFFF" }
} );

const Finance = function ( props )
{
	const [ showAlert, setShowAlert ] = React.useState( false );

	const [ showModalMenu, setShowModalMenu ] = React.useState( false );
	const [ modalMenuData, setModalMenuData ] = React.useState( { left: DEFAULTFLOATACTIONLEFT, top: DEFAULTFLOATACTIONHEIGHT } );

	const fetchData = React.useCallback( function()
	{
		props.fetchStatement();
		props.fetchUserDetailData();
		props.getVersion();
	}, [] );

	React.useEffect( () => {
		let lastTime = null;
		function onBack()
		{
			if ( lastTime && lastTime + 1000 > Date.now() ) {
				BackHandler.exitApp();
				return false;
			} else {
				lastTime = Date.now();
				ToastAndroid.show( I18n.t( "finance.quit" ), ToastAndroid.SHORT )
				return true;
			};
			return true;
		};
		BackHandler.addEventListener( "hardwareBackPress", onBack );
		return () => {
			BackHandler.removeEventListener( "hardwareBackPress", onBack );
		}
	}, [] );

	const showMenu = React.useCallback( function( e )
	{
		setShowModalMenu( true );
	}, [] );

	const hideMenu = React.useCallback( function( e )
	{
		setShowModalMenu( false );
	}, [] );

	const onDragRelease = React.useCallback( function( _1, _2, bounds )
	{
		setModalMenuData( { left: bounds.left, top: bounds.top } )
	}, [] );

	// React.useEffect( function()
	// {
	// 	fetchData();
	// }, [] );

	React.useEffect( () => {
		props.navigation.addListener( "focus", () => {
			fetchData();
		} );
	}, [ props.navigation ] );

	if( !showAlert && props.version && PACKAGEJSON.version !== props.version )
	{
		setShowAlert( true );
		Alert.alert( I18n.t( "finance.tip1" ), I18n.t( "finance.tip2" ), [ { text: I18n.t( "finance.confirm" ), onPress: () => Linking.openURL( "http://ca.slb.one/appdown.php" ) } ], { cancelable: false } );
	};

	return <React.Fragment>
		<Header usdtInfo = { props.userDetailData[ "USDT" ] } tradingInfo = { props.userDetailData[ "交易金" ] } etusdInfo = { props.userDetailData[ "ETUSD" ] }>
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
		<ModalCard
			{ ...props.modalData }
			etusdInfo = { props.userDetailData[ "ETUSD" ] }
			usdtInfo = { props.userDetailData[ "USDT" ] }
			pointInfo = { props.userDetailData[ "积分余额" ] }
			callback = { fetchData }
			setModalText = { props.setModalText }
			hideModal = { props.hideExchangeModal }
		/>
		<FloatAction
			maxY = { FLOATACTIONMAXY }
			x = { DEFAULTFLOATACTIONLEFT }
			y = { DEFAULTFLOATACTIONHEIGHT }
			renderSize = { FLOATACTIONHEIGHT }
			imageSource = { require( "./../images/float_action.png" ) }
			onDragRelease = { onDragRelease }
			onPress = { showMenu }
		/>
		<ModalMenu
			{ ...modalMenuData }
			size = { FLOATACTIONHEIGHT }
			maxX = { SCREENWIDTH }
			maxY = { FLOATACTIONMAXY }
			visible = { showModalMenu }
			hideModal = { hideMenu }
		/>
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



