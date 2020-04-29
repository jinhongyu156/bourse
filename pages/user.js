import React from "react";

import { View, Text, Image, ImageBackground, ActivityIndicator, Dimensions, StyleSheet } from "react-native";

// import { CommonActions } from "@react-navigation/native";

// import { logout } from "./../redux/actions/login.js";
// import { setLanguage } from "./../redux/actions/language.js";

import { bindActionCreators } from "redux";

import { connect } from "react-redux";

import { setTabIndex1, setTabIndex2, fetchUserDetailData, fetchTabData } from "./../redux/actions/user.js";

import I18n from "i18n-js";

import Tab from "./../components/tab.js";

import Header from "./../containers/header.js";
import TabBar from "./../containers/tabBar.js";

import MyClient from "./../containers/myClient.js";

// 头部操作 icon 宽高
const HEADERHANDLESIZE = 36;

// 外部选项卡导航高度
const TABBARHEIGHT1 = 66;

// 内部选项卡导航高度
const TABBARHEIGHT2 = 40;

// 选项卡导航宽度
const SCREENWIDTH = Dimensions.get( "window" ).width;

const styles = StyleSheet.create( {
/*
modalContainer: { width: MODALWIDTH, height: MODALHEIGHT, borderRadius: 8, backgroundColor: "#FFFFFF" },
	modalOverlay: { position: "absolute", top: 0, right: 0, bottom: 0, left: 0, backgroundColor: "rgba( 0, 0, 0, 0.4 )" },
	modalWrapper: { flex: 1, justifyContent: "center", alignItems: "center" },
	modalTitle: { width: MODALWIDTH, height: MODALTITLEBOXHEIGHT, justifyContent: "center", alignItems: "center" },
	modalTitleText: { fontSize: 22 },
	modalInputBox: { width: MODALWIDTH, height: MODALINPUTHEIGHT, justifyContent: "space-around", alignItems: "center" },
	modalInputView: { flexDirection: "row", alignItems: "center" },
	modalTimeInfoText: { fontSize: 24, marginRight: 10 },

	modalInput: { fontSize: 18, textAlign: "center", width: MODALINPUTBOXWIDTH, height: MODALINPUTHEIGHT * 0.5, borderWidth: 1 },
	modalInputTip: { fontSize: 10, color: "#6D6E77" },
	modalOptionBox: { flexDirection: "row", width: MODALWIDTH, height: MODALOPTIONBOXHEIGHT },
	modalOptionBoxItem: { flex: 1, justifyContent: "center", alignItems: "center" },
	modalOptionBoxItemText: { fontSize: 16, fontWeight: "bold", borderRadius: 50, paddingVertical: 10, paddingHorizontal: 40 },
	modalCancelBtn: { color: "#88898A", borderWidth: 1, borderColor: "#88898A" },
	modalConfirmBtn: { color: "#FFFFFF", backgroundColor: "#696DAC" },
	modalInfoBox: { width: MODALWIDTH, height: MODALINFOBOXHEIGHT, flexDirection: "row", justifyContent: "space-around", alignItems: "center" },
	modalInfoItem: { alignItems: "center" },
	modalInfoBoxText: { fontSize: 12, color: "#6D6E77" },

	correctBorderColor: { borderColor: "#ECECEC" },
	errorBorderColor: { borderColor: "#F00" },
	errorColor: { fontSize: 12, color: "#F00" }
*/
	container: { flex: 1 },
	headerRightViewItem: { alignItems: "center", justifyContent: "flex-end", marginLeft: 10 },
	headerRightViewItemImage: { width: HEADERHANDLESIZE, height: HEADERHANDLESIZE },
	headerRightViewItemText: { fontSize: 12, color: "#FFFFFF" },

	tab1: { flex: 1, backgroundColor: "#F5F5F5" },
	tabBarBox1: { width: SCREENWIDTH, height: TABBARHEIGHT1 },
	tabBar1: { position: "absolute", top: 0, left: 0, right: 0, height: TABBARHEIGHT1, borderRadius: 40, backgroundColor: "#FFFFFF" },
	tabBarPlaceHolder1: { position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: "#F5F5F5", height: TABBARHEIGHT1 * 0.5 },

	tab2: { flex: 1, marginTop: 10, backgroundColor: "#FFFFFF" },
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

const UserCenter = React.memo( function( { id, tabIndex2, setTabIndex2, myClientData, isLoadingMyClientData, fetchMyClientDataError, fetchTabData } )
{
	console.log( "re-render UserCenter", isLoadingMyClientData );
	const renderTabBar = React.useCallback( function( { tabs, activeTab, goToPage } )
	{
		return <TabBar2 tabs = { tabs } activeTab = { activeTab } goToPage = { goToPage } />;
	}, [] );

	return <Tab locked = { true } animation = { false } renderTabBar = { renderTabBar } containerStyle = { styles.tab2 } page = { tabIndex2 } onChangeTab = { setTabIndex2 }>
		<MyClient
			tabLabel = { "我的客户" }
			id = { id }
			data = { myClientData }
			loading = { isLoadingMyClientData }
			error = { fetchMyClientDataError }
			fetchData = { fetchTabData }
		/>
		<Tab2Content tabLabel = { "我的信息" } />
		<Tab2Content tabLabel = { "登录密码" } />
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
		<Tab2Content tabLabel = { "子账户列表" } />
		<Tab2Content tabLabel = { "绑定子账号" } />
		<Tab2Content tabLabel = { "一件领取" } />
		<Tab2Content tabLabel = { "资金归集" } />
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
		<Tab2Content tabLabel = { "下载中心" } />
		<Tab2Content tabLabel = { "公司介绍" } />
		<Tab2Content tabLabel = { "投资合同" } />
		<Tab2Content tabLabel = { "矿机回购" } />
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
						tabLabel = { "用户中心" }

						id = { props.userDetailData[ "id" ] }

						fetchTabData = { props.fetchTabData }
						myClientData = { props.myClientData }
						isLoadingMyClientData = { props.isLoadingMyClientData }
						fetchMyClientDataError = { props.fetchMyClientDataError }

						tabIndex2 = { props.tabIndex2 }
						setTabIndex2 = { props.setTabIndex2 }

					/>
					<SystemCenter
						tabLabel = { "系统中心" }
						tabIndex2 = { props.tabIndex2 }
						setTabIndex2 = { props.setTabIndex2 }
						fetchTabData = { props.fetchTabData }
					/>
					<NewbieGuide
						tabLabel = { "新手指南" }
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
		return {
			tabIndex1: userData.tabIndex1,
			tabIndex2: userData.tabIndex2,

			userDetailData: userData.userDetailData,
			fetchUserDetailDataError: userData.fetchUserDetailDataError,

			myClientData: userData.myClientData,
			isLoadingMyClientData: userData.isLoadingMyClientData,
			fetchMyClientDataError: userData.fetchMyClientDataError
		};
	},
	function mapDispatchToProps( dispatch, ownProps )
	{
		// return bindActionCreators( { logout, setLanguage }, dispatch );
		return bindActionCreators( { setTabIndex1, setTabIndex2, fetchUserDetailData, fetchTabData }, dispatch );
	}
)( User );
