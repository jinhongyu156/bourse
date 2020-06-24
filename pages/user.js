import React from "react";

import { View, Text, Image, ImageBackground, TouchableOpacity, Dimensions, StyleSheet } from "react-native";

import { bindActionCreators } from "redux";

import { connect } from "react-redux";

import {
	setTabIndex1, setTabIndex2, setInputText, setQueryNavIndex,
	fetchUserDetailData, fetchMyClientData, fetchUserQueryData, fetchEditPassword, fetchSubAccountsData,
	fetchSubAccountsUnbind, fetchBindSubAccount, fetchSetHotkeyData, fetchSetSummarizeData, fetchElectronicContractData
} from "./../redux/actions/user.js";
import { showQueryTypeIndexActionSheet, hideActionSheet as hideQueryTypeIndexActionSheet } from "./../redux/actions/user.js";
import { showLanguageActionSheet, hideActionSheet as hideLanguageActionSheet } from "./../redux/actions/login.js";
import { fetchCardData } from "./../redux/actions/myBankCard.js";

import { getVersion } from "./../redux/actions/finance.js";

import { logout } from "./../redux/actions/login.js";

import I18n from "i18n-js";

import Tab from "./../components/tab.js";

import Header from "./../containers/header.js";
import TabBar from "./../containers/tabBar.js";

import MyInfo from "./../containers/myInfo.js";
import MyClient from "./../containers/myClient.js";
import EditPassword from "./../containers/editPassword.js";
import Query from "./../containers/query.js";
import BindSubAccount from "./../containers/bindSubAccount.js";
import ShowText from "./../containers/showText.js";
import Introduction from "./../containers/introduction.js";
import ElectronicContract from "./../containers/electronicContract.js";
import Repo from "./../containers/repo.js";
import SubAccounts from "./../containers/subAccounts.js";
import Download from "./../containers/download.js";

// 头部操作 icon 宽高
const HEADERHANDLESIZE = 32;

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

	tab2: { flex: 1, marginTop: 10, backgroundColor: "#FFFFFF" },
	tabBar2: { width: SCREENWIDTH, height: TABBARHEIGHT2, backgroundColor: "#F6F6F6", justifyContent: "space-around" },

	errorBox: { height: 100, justifyContent: "center", alignItems: "center" },
	errorText: { fontSize: 16 }
} );

// default tab bar
const TabBar2 = React.memo( function( { tabs, activeTab, goToPage } )
{
	return <TabBar tabs = { tabs } type = { "default" } tabBarStyle = { styles.tabBar2 } activeTab = { activeTab } goToPage = { goToPage } />
} );

const UserCenter = React.memo( function( { tabIndex2, setTabIndex2, myClientProps, myInfoProps, editPasswordProps, queryProps, callbackForEditPassword, callbackForMyInfo, callbackForMyClient, callbackForQuery } )
{
	const renderTabBar = React.useCallback( function( { tabs, activeTab, goToPage } )
	{
		return <TabBar2 tabs = { tabs } activeTab = { activeTab } goToPage = { goToPage } />;
	}, [] );

	return <Tab locked = { true } animation = { false } renderTabBar = { renderTabBar } containerStyle = { styles.tab2 } page = { tabIndex2 } onChangeTab = { setTabIndex2 }>
		<MyInfo tabLabel = { I18n.t( "user.myInfo" ) } { ...myInfoProps } { ...callbackForMyInfo } />
		<MyClient tabLabel = { I18n.t( "user.myClient" ) } { ...callbackForMyClient } { ...myClientProps } />
		<EditPassword tabLabel = { I18n.t( "user.editPassword" ) } { ...editPasswordProps } { ...callbackForEditPassword } />
		<Query tabLabel = { I18n.t( "user.query" ) } { ...queryProps } { ...callbackForQuery } />
	</Tab>;
} );

const SystemCenter = React.memo( function( { tabIndex2, setTabIndex2, subAccountsProps, bindSubAccountProps, hotkeyProps, summarizeProps, callbackForSubAccounts, callbackForBindSubAccount, callbackForHotkey, callbackForSummarize } )
{
	const renderTabBar = React.useCallback( function( { tabs, activeTab, goToPage } )
	{
		return <TabBar2 tabs = { tabs } activeTab = { activeTab } goToPage = { goToPage } />;
	}, [] );
	return <Tab locked = { true } animation = { false } renderTabBar = { renderTabBar } containerStyle = { styles.tab2 } page = { tabIndex2 } onChangeTab = { setTabIndex2 }>
		<SubAccounts tabLabel = { I18n.t( "user.subAccounts" ) } { ...subAccountsProps } { ...callbackForSubAccounts } />
		<BindSubAccount tabLabel = { I18n.t( "user.bindSubaccount" ) } { ...bindSubAccountProps } { ...callbackForBindSubAccount } />
		<ShowText tabLabel = { I18n.t( "user.hotkey" ) } { ...hotkeyProps } { ...callbackForHotkey } />
		<ShowText tabLabel = { I18n.t( "user.summarize" ) } { ...summarizeProps } { ...callbackForSummarize } />
	</Tab>;
} );

const NewbieGuide = React.memo( function( { tabIndex2, setTabIndex2, electronicContractProps, repoProps, callbackForElectronicContract } )
{
	const renderTabBar = React.useCallback( function( { tabs, activeTab, goToPage } )
	{
		return <TabBar2 tabs = { tabs } activeTab = { activeTab } goToPage = { goToPage } />;
	}, [] );
	return <Tab locked = { true } animation = { false } renderTabBar = { renderTabBar } containerStyle = { styles.tab2 } page = { tabIndex2 } onChangeTab = { setTabIndex2 }>
		<Download tabLabel = { I18n.t( "user.downloadCenter" ) } />
		<Introduction tabLabel = { I18n.t( "user.introduction" ) } />
		<ElectronicContract tabLabel = { I18n.t( "user.contract" ) } { ...electronicContractProps } { ...callbackForElectronicContract } />
		<Repo tabLabel = { I18n.t( "user.repo" ) } { ...repoProps } />
	</Tab>;
} );

const User = React.memo( function( props )
{
	// React.useEffect( function()
	// {
	// 	props.fetchUserDetailData();
	// }, [] );

	React.useEffect( () => {
		props.navigation.addListener( "focus", () => {
			props.fetchUserDetailData();
		} );
	}, [ props.navigation ] );

	const renderTabBar = React.useCallback( function( { tabs, activeTab, goToPage } )
	{
		return <ImageBackground source = { require( "./../images/header.png" ) } style = { styles.tabBarBox1 }>
			<View style = { styles.tabBarPlaceHolder1 } />
			<TabBar tabs = { tabs } type = { "underline" } tabBarStyle = { styles.tabBar1 } activeTab = { activeTab } goToPage = { goToPage } />
		</ImageBackground>
	}, [] );

	const gotoMyQrCode = React.useCallback( function()
	{
		props.navigation.push( "MyQrCode", { id: props.userDetailData[ "id" ] } );
	}, [ props.userDetailData[ "id" ] ] );

	return <View style = { styles.container }>
		<Header usdtInfo = { props.userDetailData[ "USDT" ] } tradingInfo = { props.userDetailData[ "交易金" ] } slbtInfo = { props.userDetailData[ "SLBT" ] }>
			<TouchableOpacity style = { styles.headerRightViewItem }>
				<Image style = { styles.headerRightViewItemImage } source = { require( "./../images/theme.png" ) } />
				<Text style = { styles.headerRightViewItemText }>{ I18n.t( "user.header.theme" ) }</Text>
			</TouchableOpacity>
			<TouchableOpacity style = { styles.headerRightViewItem } onPress = { gotoMyQrCode }>
				<Image style = { styles.headerRightViewItemImage } source = { require( "./../images/qr_code.png" ) } />
				<Text style = { styles.headerRightViewItemText }>{ I18n.t( "user.header.chart" ) }</Text>
			</TouchableOpacity>
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
						tabIndex2 = { props.tabIndex2 }
						setTabIndex2 = { props.setTabIndex2 }

						myClientProps = { props.myClientProps }
						myInfoProps = { props.myInfoProps }
						editPasswordProps = { props.editPasswordProps }
						queryProps = { props.queryProps }

						callbackForMyClient = { props.callbackForMyClient }
						callbackForMyInfo = { props.callbackForMyInfo }
						callbackForEditPassword = { props.callbackForEditPassword }
						callbackForQuery = { props.callbackForQuery }
					/>
					<SystemCenter
						tabLabel = { I18n.t( "user.systemCenter" ) }
						tabIndex2 = { props.tabIndex2 }
						setTabIndex2 = { props.setTabIndex2 }

						subAccountsProps = { props.subAccountsProps }
						bindSubAccountProps = { props.bindSubAccountProps }
						hotkeyProps = { props.hotkeyProps }
						summarizeProps = { props.summarizeProps }

						callbackForSubAccounts = { props.callbackForSubAccounts }
						callbackForBindSubAccount = { props.callbackForBindSubAccount }
						callbackForHotkey = { props.callbackForHotkey }
						callbackForSummarize = { props.callbackForSummarize }

					/>
					<NewbieGuide
						tabLabel = { I18n.t( "user.newbieGuide" ) }
						tabIndex2 = { props.tabIndex2 }
						setTabIndex2 = { props.setTabIndex2 }
						electronicContractProps = { props.electronicContractProps }
						repoProps = { props.repoProps }
						callbackForElectronicContract = { props.callbackForElectronicContract }
					/>
				</Tab>
			: null
		}
	</View>;
} );

export default connect(
	function mapStateToProps( state, ownProps )
	{
		const financeData = state.finance;
		const userData = state.user;
		const loginData = state.login;
		const languageData = state.language;
		const myBankCardData = state.myBankCard;

		return {
			myClientProps: {
				id: userData.userDetailData[ "id" ],
				data: userData.myClientData, loading: userData.isLoadingMyClientData, error: userData.fetchMyClientDataError
			},
			myInfoProps: {
				id: userData.userDetailData[ "id" ], vouchers: userData.userDetailData[ "代金券" ],
				userLanguage: languageData.userLanguage,
				version: financeData.version,
				hasCard: myBankCardData.hasCard, bankName: myBankCardData.bankName,
				actionSheetData: loginData.actionSheetData, isShowActionSheet: loginData.isShowActionSheet, isLogin: loginData.isLogin
			},
			editPasswordProps: {
				oldPassWord: userData.oldPassWord, newPassWord: userData.newPassWord, confirmPassWord: userData.confirmPassWord,
				loading: userData.isLoadingEditPassWord, fetchError: userData.fetchEditPassWordError, inputError: userData.inputError
			},
			queryProps: {
				data: userData.userQueryData, loading: userData.isLoadingUserQueryData, error: userData.fetchUserQueryDataError,
				queryNavIndex: userData.queryNavIndex, queryTypeIndex: userData.queryTypeIndex,
				isShowActionSheet: userData.isShowActionSheet, actionSheetData: userData.actionSheetData,
			},
			subAccountsProps: {
				data: userData.subAccountsData, loading: userData.isLoadingSubAccountsData, error: userData.fetchSubAccountsError
			},
			bindSubAccountProps: {
				subAccountText: userData.subAccountText, subAccountPassWordText: userData.subAccountPassWordText,
				loading: userData.isLoadingBindSubAccount, fetchError: userData.fetchBindSubAccountError, inputError: userData.inputError
			},
			hotkeyProps: {
				data: userData.hotkeyData, loading: userData.isLoadingHotkeyData, error: userData.fetchHotkeyDataError
			},
			summarizeProps: {
				data: userData.summarizeData, loading: userData.isLoadingSummarizeData, error: userData.fetchSummarizeDataError
			},
			electronicContractProps: {
				data: userData.electronicContractData, loading: userData.isLoadingElectronicContractData, error: userData.fetchElectronicContractDataError
			},
			repoProps: {
				etusd: userData.userDetailData[ "投资ETUSD" ]
			},
			tabIndex1: userData.tabIndex1, tabIndex2: userData.tabIndex2, userDetailData: userData.userDetailData, fetchUserDetailDataError: userData.fetchUserDetailDataError
		};
	},
	function mapDispatchToProps( dispatch, ownProps )
	{
		return {
			callbackForMyClient: bindActionCreators( { fetchData: fetchMyClientData }, dispatch ),
			callbackForMyInfo: bindActionCreators( { fetchData: fetchCardData, getVersion: getVersion, showLanguageActionSheet: showLanguageActionSheet, hideActionSheet: hideLanguageActionSheet, logout: logout }, dispatch ),
			callbackForEditPassword: bindActionCreators( { setInputText: setInputText, submit: fetchEditPassword }, dispatch ),
			callbackForQuery: bindActionCreators( { fetchData: fetchUserQueryData, setQueryNavIndex: setQueryNavIndex, showQueryTypeIndexActionSheet: showQueryTypeIndexActionSheet, hideActionSheet: hideQueryTypeIndexActionSheet }, dispatch ),
			callbackForSubAccounts: bindActionCreators( { fetchData: fetchSubAccountsData, unbind: fetchSubAccountsUnbind }, dispatch ),
			callbackForBindSubAccount: bindActionCreators( { setInputText: setInputText, submit: fetchBindSubAccount }, dispatch ),
			callbackForHotkey: bindActionCreators( { fetchData: fetchSetHotkeyData }, dispatch ),
			callbackForSummarize: bindActionCreators( { fetchData: fetchSetSummarizeData }, dispatch ),
			callbackForElectronicContract: bindActionCreators( { fetchData: fetchElectronicContractData }, dispatch ),

			...bindActionCreators( { setTabIndex1, setTabIndex2, fetchUserDetailData }, dispatch )
		};
	}
)( User );

