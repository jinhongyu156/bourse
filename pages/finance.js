import React from "react";

import { View, Text, Image, TouchableOpacity, ScrollView, BackHandler, Linking, Alert, RefreshControl, StyleSheet, Dimensions } from "react-native";

import Toast from "react-native-root-toast";

import { bindActionCreators } from "redux";

import { connect } from "react-redux";

import { getVersion, setTabIndex, fetchStatement, fetchUserDetailData, fetchSwiper, showExchangeModal, hideExchangeModal, showQuestionModal, hideQuestionModal, setQuestionSelected, questionSubmit, setModalText, fetchGetBenefits } from "./../redux/actions/finance.js";

import { fetchUserDetailData as testLogin } from "./../redux/actions/user.js";

import { fetchData as fetchC2cData, closeWs } from "./../redux/actions/ctc.js";

import { CommonActions } from "@react-navigation/native";

import I18n from "i18n-js";

import FloatAction from "./../components/floatAction.js";


import Swiper from "./../containers/swiper.js";

import Header from "./../containers/header.js";
import Notice from "./../containers/notice.js";
import Exchange from "./../containers/exchange.js";
import UserInfo from "./../containers/userInfo.js";
import Statement from "./../containers/statement.js";
import ModalCard from "./../containers/modalCard.js";
import ModalMenu from "./../containers/modalMenu.js";

import QusetionCard from "./../containers/qusetionCard.js";

const PACKAGEJSON = require( "./../package.json" );

// 屏幕高度
const SCREENHEIGHT = Dimensions.get( "window" ).height;

// 屏幕宽度
const SCREENWIDTH = Dimensions.get( "window" ).width;

// 轮播图高度
const SWIPERHEIGHT = 100;

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
		props.fetchSwiper();
		props.fetchC2cData();
		props.testLogin( () => props.navigation.dispatch( CommonActions.reset( { index: 0, routes: [ { name: "Login" } ] } ) ) );
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

	const bindQuestionSubmit = React.useCallback( function()
	{
		props.questionSubmit( () => props.fetchGetBenefits( res => Toast.show( res ) ) )
	}, [] );

	const goToAccess = React.useCallback( function( type, title, count = 0 )
	{
		props.navigation.push( "Access", { type: type, name: title, count: count } );
	}, [] );

	const goToUsdtRecharge = React.useCallback( function()
	{
		if( props.data.length && props.data[ 0 ].data.filter( c => c.key === "USDT" ).length )
		{
			props.navigation.push( "UsdtRecharge", { usdtPrice: props.data[ 0 ].data.filter( c => c.key === "USDT" )[ 0 ].unitRate } );
		} else
		{
			return;
		};
	}, [ props.data ] );

	// React.useEffect( function()
	// {
	//	fetchData();
	// }, [] );

	React.useEffect( () => {
		let lastTime = null;
		function onBack()
		{
			if ( lastTime && lastTime + 1000 > Date.now() ) {
				BackHandler.exitApp();
				return false;
			} else {
				lastTime = Date.now();
				Toast.show( I18n.t( "finance.quit" ) );
				return true;
			};
			return true;
		};

		props.navigation.addListener( "focus", () => {
			fetchData();
			BackHandler.addEventListener( "hardwareBackPress", onBack );
		} );
		props.navigation.addListener( "blur", () => {
			closeWs();
			BackHandler.removeEventListener( "hardwareBackPress", onBack );
		} );

	}, [ props.navigation ] );

	// 双数为强制更新, 单数为非必须更新
	if( !showAlert && props.version && props.version.version && !( props.version.version.split( "." )[ 2 ] & 1 ) && PACKAGEJSON.version !== props.version.version )
	{
		setShowAlert( true );
		Alert.alert( I18n.t( "finance.tip1" ), `${ I18n.t( "finance.tip2" ) }  \r\n${ I18n.t( "finance.tip3" ) }: ${ props.version ? `\n${ props.version.content.join( "\n" ) }` : "" }`, [ { text: I18n.t( "finance.confirm" ), onPress: () => Linking.openURL( "http://ca.slb.one/appdown.php" ) } ], { cancelable: false } );
	};

	return <React.Fragment>
		{ /* <Header logoKey = { 1 } usdtInfo = { props.userDetailData[ "USDT" ] } tradingInfo = { props.userDetailData[ "交易金" ] } etusdInfo = { props.userDetailData[ "ETUSD" ] }> */ }
		<Header logoKey = { 1 }>
			<React.Fragment>
				<TouchableOpacity style = { styles.headerRightViewItem } onPress = { goToUsdtRecharge }>
					<Image style = { styles.headerRightViewItemImage } source = { require( "./../images/recharge.png" ) } />
					<Text style = { styles.headerRightViewItemText }>{ I18n.t( "contract.header.recharge" ) }</Text>
				</TouchableOpacity>
				<TouchableOpacity style = { styles.headerRightViewItem } onPress = { () => goToAccess( "recharge", "USDT" ) }>
					<Image style = { styles.headerRightViewItemImage } source = { require( "./../images/usdt_recharge.png" ) } />
					<Text style = { styles.headerRightViewItemText }>{ I18n.t( "contract.header.usdtRecharge" ) }</Text>
				</TouchableOpacity>
				<TouchableOpacity style = { styles.headerRightViewItem } onPress = { () => goToAccess( "mention", "USDT" ) }>
					<Image style = { styles.headerRightViewItemImage } source = { require( "./../images/usdt_withdrawal.png" ) } />
					<Text style = { styles.headerRightViewItemText }>{ I18n.t( "contract.header.usdtWithdrawal" ) }</Text>
				</TouchableOpacity>

				<TouchableOpacity style = { styles.headerRightViewItem } onPress = { () => props.showExchangeModal( "投资ETU金融" ) }>
					<Image style = { styles.headerRightViewItemImage } source = { require( "./../images/invest_etu.png" ) } />
					<Text style = { styles.headerRightViewItemText }>{ I18n.t( "finance.header.investment" ) } ETU</Text>
				</TouchableOpacity>
				<TouchableOpacity style = { styles.headerRightViewItem } onPress = { props.showQuestionModal }>
					<Image style = { styles.headerRightViewItemImage } source = { require( "./../images/get_benefits.png" ) } />
					<Text style = { styles.headerRightViewItemText }>{ I18n.t( "finance.header.benefits" ) }</Text>
				</TouchableOpacity>
			</React.Fragment>
		</Header>
		<Notice />
		<View style = { styles.container }>
			<ScrollView showsVerticalScrollIndicator = { false } refreshControl = { <RefreshControl refreshing = { props.isloadingUserDetailData } onRefresh = { fetchData } /> }>
				<Swiper hasActivity = { props.hasActivity } swiper = { props.swiper } />
				<Exchange showModal = { props.showExchangeModal } />
				<UserInfo data = { props.userDetailData } hasActivity = { props.hasActivity } />
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
		<QusetionCard
			{ ...props.qusetionData }
			hideModal = { props.hideQuestionModal }
			onSelect = { props.setQuestionSelected }
			submit = { bindQuestionSubmit }
		/>
		{ /* <FloatAction
			maxY = { FLOATACTIONMAXY }
			x = { DEFAULTFLOATACTIONLEFT }
			y = { DEFAULTFLOATACTIONHEIGHT }
			renderSize = { FLOATACTIONHEIGHT }
			imageSource = { require( "./../images/float_action.png" ) }
			onDragRelease = { onDragRelease }
			onPress = { showMenu }
		/> */ }
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
		const ctcData = state.ctc;

		return {
			data: ctcData.data,

			version: financeData.version,
			tabIndex: financeData.tabIndex,
			statementData: financeData.statementData,
			fecthStatementError: financeData.fecthStatementError,
			isloadingStatementData: financeData.isloadingStatementData,

			hasActivity: financeData.hasActivity,
			swiper: financeData.swiper,
			userDetailData: financeData.userDetailData,
			isloadingUserDetailData: financeData.isloadingUserDetailData,

			modalData: financeData.modalData,
			qusetionData: financeData.qusetionData
		};
	},
	function mapDispatchToProps( dispatch, ownProps )
	{
		return bindActionCreators( { getVersion, setTabIndex, fetchStatement, fetchUserDetailData, fetchSwiper, testLogin, showExchangeModal, hideExchangeModal, showQuestionModal, hideQuestionModal, setQuestionSelected, questionSubmit, setModalText, fetchGetBenefits, fetchC2cData }, dispatch );
	}
)( Finance );



