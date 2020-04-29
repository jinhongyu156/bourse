import React from "react";

import { View, Text, Image, ImageBackground, ActivityIndicator, Dimensions, StyleSheet } from "react-native";

// import { CommonActions } from "@react-navigation/native";

// import { logout } from "./../redux/actions/login.js";

import { bindActionCreators } from "redux";

import { connect } from "react-redux";

import { setTabIndex1, setTabIndex2, fetchUserDetailData, fetchTabData, setInputText } from "./../redux/actions/user.js";
import { showLanguageActionSheet, hideActionSheet } from "./../redux/actions/login.js";

import I18n from "i18n-js";

import Tab from "./../components/tab.js";

import Header from "./../containers/header.js";
import TabBar from "./../containers/tabBar.js";

import MyInfo from "./../containers/myInfo.js";
import MyClient from "./../containers/myClient.js";
import EditPassword from "./../containers/editPassword.js";

// 头部操作 icon 宽高
const HEADERHANDLESIZE = 36;

// 外部选项卡导航高度
const TABBARHEIGHT1 = 66;

// 内部选项卡导航高度
const TABBARHEIGHT2 = 40;

// 选项卡导航宽度
const SCREENWIDTH = Dimensions.get( "window" ).width;

const styles = StyleSheet.create( {
	container: { flex: 1 },
	headerRightViewItem: { alignItems: "center", justifyContent: "flex-end", marginLeft: 10 },
	headerRightViewItemImage: { width: HEADERHANDLESIZE, height: HEADERHANDLESIZE },
	headerRightViewItemText: { fontSize: 12, color: "#FFFFFF" },

	tab1: { flex: 1, backgroundColor: "#F5F5F5" },
	tabBarBox1: { width: SCREENWIDTH, height: TABBARHEIGHT1 },
	tabBar1: { position: "absolute", top: 0, left: 0, right: 0, height: TABBARHEIGHT1, borderRadius: 40, backgroundColor: "#FFFFFF" },
	tabBarPlaceHolder1: { position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: "#F5F5F5", height: TABBARHEIGHT1 * 0.5 },

	tab2: { flex: 1, marginTop: 10 },
	tabBar2: { width: SCREENWIDTH, height: TABBARHEIGHT2, backgroundColor: "#F6F6F6", justifyContent: "space-around", },

	errorBox: { height: 100, justifyContent: "center", alignItems: "center" },
	errorText: { fontSize: 16 }
} );

/*
props.isLogin || props.navigation.dispatch( CommonActions.reset( { index: 0, routes: [ { name: "Login" } ] } ) );
	return <View style = { styles.container }>
		<Text onPress = { () => props.setLanguage( "zh" ) }>中</Text>
		<Text onPress = { () => props.setLanguage( "en" ) }>英</Text>
		<Text onPress = { props.logout }>退出</Text>
	</View>;
*/

// default tab bar
const TabBar2 = React.memo( function( { tabs, activeTab, goToPage } )
{
	return <TabBar tabs = { tabs } type = { "default" } tabBarStyle = { styles.tabBar2 } activeTab = { activeTab } goToPage = { goToPage } />
} );

const Tab2Content = React.memo( function()
{
	return <View></View>
} );

const UserCenter = React.memo( function( {
	id, vouchers,
	tabIndex2, setTabIndex2,
	myClientData, isLoadingMyClientData, fetchMyClientDataError, fetchTabData,
	userLanguage, actionSheetData, isShowActionSheet, showLanguageActionSheet, hideActionSheet,
	oldPassWord, newPassWord, confirmPassWord, isLoadingEditPassWord, fetchEditPassWordError, inputError, setInputText
} )
{
	console.log( "re-render UserCenter" );
	const renderTabBar = React.useCallback( function( { tabs, activeTab, goToPage } )
	{
		return <TabBar2 tabs = { tabs } activeTab = { activeTab } goToPage = { goToPage } />;
	}, [] );

	return <Tab locked = { true } animation = { false } renderTabBar = { renderTabBar } containerStyle = { styles.tab2 } page = { tabIndex2 } onChangeTab = { setTabIndex2 }>
		<MyClient
			tabLabel = { I18n.t( "user.myClient" ) }
			id = { id }
			data = { myClientData }
			loading = { isLoadingMyClientData }
			error = { fetchMyClientDataError }
			fetchData = { fetchTabData }
		/>
		<MyInfo
			tabLabel = { I18n.t( "user.myInfo" ) }
			id = { id }
			vouchers = { vouchers }
			userLanguage = { userLanguage }
			actionSheetData = { actionSheetData }
			isShowActionSheet = { isShowActionSheet }
			showLanguageActionSheet = { showLanguageActionSheet }
			hideActionSheet = { hideActionSheet }
		/>
		<EditPassword
			tabLabel = { I18n.t( "user.editPassword" ) }
			oldPassWord = { oldPassWord }
			newPassWord = { newPassWord }
			confirmPassWord = { confirmPassWord }
			isLoadingEditPassWord = { isLoadingEditPassWord }
			fetchEditPassWordError = { fetchEditPassWordError }
			inputError = { inputError }
			setInputText = { setInputText }
			submit = { fetchTabData }
		/>
	</Tab>;
} );

const SystemCenter = React.memo( function( { tabIndex2, setTabIndex2, fetchTabData } )
{
	console.log( "re-render SystemCenter" );
	const renderTabBar = React.useCallback( function( { tabs, activeTab, goToPage } )
	{
		return <TabBar2 tabs = { tabs } activeTab = { activeTab } goToPage = { goToPage } />;
	}, [] );
	return <Tab locked = { true } animation = { false } renderTabBar = { renderTabBar } containerStyle = { styles.tab2 } page = { tabIndex2 } onChangeTab = { setTabIndex2 }>
		<Tab2Content tabLabel = { I18n.t( "user.subAccounts" ) } />
		<Tab2Content tabLabel = { I18n.t( "user.bindSubaccount" ) } />
		<Tab2Content tabLabel = { I18n.t( "user.hotkey" ) } />
		<Tab2Content tabLabel = { I18n.t( "user.summarize" ) } />
	</Tab>;
} );

const NewbieGuide = React.memo( function( { tabIndex2, setTabIndex2, fetchTabData } )
{
	console.log( "re-render NewbieGuide" );
	const renderTabBar = React.useCallback( function( { tabs, activeTab, goToPage } )
	{
		return <TabBar2 tabs = { tabs } activeTab = { activeTab } goToPage = { goToPage } />;
	}, [] );
	return <Tab locked = { true } animation = { false } renderTabBar = { renderTabBar } containerStyle = { styles.tab2 } page = { tabIndex2 } onChangeTab = { setTabIndex2 }>
		<Tab2Content tabLabel = { I18n.t( "user.downloadCenter" ) } />
		<Tab2Content tabLabel = { I18n.t( "user.introduction" ) } />
		<Tab2Content tabLabel = { I18n.t( "user.contract" ) } />
		<Tab2Content tabLabel = { I18n.t( "user.repo" ) } />
	</Tab>;
} );

const User =  React.memo( function( props )
{
	React.useEffect( function()
	{
		props.fetchUserDetailData();
	}, [] );

	const renderTabBar = React.useCallback( function( { tabs, activeTab, goToPage } )
	{
		return <ImageBackground source = { require( "./../images/header.png" ) } style = { styles.tabBarBox1 }>
			<View style = { styles.tabBarPlaceHolder1 } />
			<TabBar tabs = { tabs } type = { "underline" } tabBarStyle = { styles.tabBar1 } activeTab = { activeTab } goToPage = { goToPage } />
		</ImageBackground>
	}, [] );
	// console.log( "props", props );
	return <View style = { styles.container }>
		<Header usdtInfo = { "" } tradingInfo = { "" } slbtInfo = { "" }>
			<View style = { styles.headerRightViewItem }>
				<Image style = { styles.headerRightViewItemImage } source = { require( "./../images/qr_code.png" ) } />
				<Text style = { styles.headerRightViewItemText }>{ I18n.t( "user.header.chart" ) }</Text>
			</View>
		</Header>
		{
			props.fetchUserDetailDataError
				? <View style = { styles.errorBox }>
					<Text style = { styles.errorText }>{ props.fetchUserDetailDataError }</Text>
				</View>
			: Object.keys( props.userDetailData ).length
				? <Tab locked = { true } animation = { false } renderTabBar = { renderTabBar } containerStyle = { styles.tab1 } page = { props.tabIndex1 } onChangeTab = { props.setTabIndex1 }>
					<UserCenter
						tabLabel = { I18n.t( "user.userCenter" ) }

						id = { props.userDetailData[ "id" ] }
						vouchers = { props.userDetailData[ "代金券" ] }

						fetchTabData = { props.fetchTabData }
						myClientData = { props.myClientData }
						isLoadingMyClientData = { props.isLoadingMyClientData }
						fetchMyClientDataError = { props.fetchMyClientDataError }

						tabIndex2 = { props.tabIndex2 }
						setTabIndex2 = { props.setTabIndex2 }

						actionSheetData = { props.actionSheetData }
						isShowActionSheet = { props.isShowActionSheet }
						showLanguageActionSheet = { props.showLanguageActionSheet }
						hideActionSheet = { props.hideActionSheet }
						userLanguage = { props.userLanguage }

						oldPassWord = { props.oldPassWord }
						newPassWord = { props.newPassWord }
						confirmPassWord = { props.confirmPassWord }
						isLoadingEditPassWord = { props.isLoadingEditPassWord }
						fetchEditPassWordError = { props.fetchEditPassWordError }
						inputError = { props.inputError }
						setInputText = { props.setInputText }

					/>
					<SystemCenter
						tabLabel = { I18n.t( "user.systemCenter" ) }
						tabIndex2 = { props.tabIndex2 }
						setTabIndex2 = { props.setTabIndex2 }
						fetchTabData = { props.fetchTabData }
					/>
					<NewbieGuide
						tabLabel = { I18n.t( "user.newbieGuide" ) }
						tabIndex2 = { props.tabIndex2 }
						setTabIndex2 = { props.setTabIndex2 }
						fetchTabData = { props.fetchTabData }
					/>
				</Tab>
			: null
		}
	</View>
} );

export default connect(
	function mapStateToProps( state, ownProps )
	{
		const userData = state.user;
		const loginData = state.login;
		const languageData = state.language;
		return {
			tabIndex1: userData.tabIndex1,
			tabIndex2: userData.tabIndex2,

			userDetailData: userData.userDetailData,
			fetchUserDetailDataError: userData.fetchUserDetailDataError,

			myClientData: userData.myClientData,
			isLoadingMyClientData: userData.isLoadingMyClientData,
			fetchMyClientDataError: userData.fetchMyClientDataError,

			actionSheetData: loginData.actionSheetData,
			isShowActionSheet: loginData.isShowActionSheet,
			userLanguage: languageData.userLanguage,

			oldPassWord: userData.oldPassWord,
			newPassWord: userData.newPassWord,
			confirmPassWord: userData.confirmPassWord,
			isLoadingEditPassWord: userData.isLoadingEditPassWord,
			fetchEditPassWordError: userData.fetchEditPassWordError,
			inputError: userData.inputError
		};
	},
	function mapDispatchToProps( dispatch, ownProps )
	{
		// return bindActionCreators( { logout, setLanguage }, dispatch );
		return bindActionCreators( {
			setTabIndex1, setTabIndex2,
			fetchUserDetailData,
			fetchTabData,
			showLanguageActionSheet, hideActionSheet,
			setInputText
		}, dispatch );
	}
)( User );
