import React from "react";

import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from "react-native";

import { bindActionCreators } from "redux";

import { connect } from "react-redux";

import Icon from "react-native-vector-icons/FontAwesome5";

import I18n from "./../i18n/index.js";

import Tab from "./../components/tab.js";
import Input from "./../components/input.js";
import SubmitBtn from "./../components/submit.js";

import { setLoginType, setInputText } from "./../redux/actions/login.js";

// 图标宽高
const ICONSIZE = 80;

// tabBar 宽高
const TABBARHEIGHT = 60;

// input box 高
const LISTITEMHEIGIT = 60;

// input box 宽
const LISTITEMWIDTH = Dimensions.get( "window" ).width * 0.8;

// 页面 padding
const PAGEMARGIN =  Dimensions.get( "window" ).width * 0.2;

const styles = StyleSheet.create( {

	container: { flex: 1, alignItems: "center", backgroundColor: "#FEFEFE" },
	icon: { width: ICONSIZE, height: ICONSIZE, borderColor: "#FFFFFF", borderRadius: 80, borderWidth: 2, marginVertical: 20 },

	tabBox: { width: LISTITEMWIDTH, height: LISTITEMHEIGIT * 3 + TABBARHEIGHT },
	tabBar: { width: LISTITEMWIDTH, height: TABBARHEIGHT, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },

	textInputBox: { width: LISTITEMWIDTH, height: LISTITEMHEIGIT, justifyContent: "center" },
	codeTextInput: { flex: 2 },
	codeImageBtnContainer: { flex: 1, backgroundColor: "blue" },

	submitBtn: { width: LISTITEMWIDTH, height: 50, marginTop: 30, marginBottom: 20, borderRadius: 4 },

	options: { width: LISTITEMWIDTH, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
	optionsText: { fontSize: 14 },

	inactiveColor: { fontSize: 16, color: "#888888" },
	activeColor: { fontSize: 20, color: "#4AA7C3" }

} );

// logo
const Logo = React.memo( function()
{

	return <Image style = { styles.icon } source = { require( "./../images/logo.png" ) } />

} );

// codeImage
const CodeImage = React.memo( function()
{

	return <View style = { styles.codeImageBtnContainer }>
		<Text>123</Text>
	</View>
} );

// 登录方式
const InputBox = React.memo( function( { loginType, setInputText, phoneNumber, emailText, password, code, inputError } ) {

	const hasError = ( loginType === 0 && inputError === "phoneNumber" ) || ( loginType === 1 && inputError === "emailText" );
	const isPhoneNumber = loginType == 0;

	const renderCodeImage = React.useCallback( function()
	{
		return <CodeImage />
	}, [] );

	const renderPasswordImageLeft = React.useCallback( function()
	{
		return <Icon name = "lock" color = { "#888888" } size = { 18 } />
	}, [] );

	return <View>
		<Input
			index = { isPhoneNumber ? "phoneNumber" : "emailText" }
			value = { isPhoneNumber ? phoneNumber : emailText }
			placeholder = { isPhoneNumber ? I18n.t( "login.placeholder.phoneNumber" ) : I18n.t( "login.placeholder.email" ) }
			hasError = { hasError }
			inputBoxStyle = { styles.textInputBox }
			setInputText = { setInputText }
			renderlineImageLeft = { renderPasswordImageLeft }
		/>
		<Input
			index = { "password" }
			value = { password }
			placeholder = { I18n.t( "login.placeholder.password" ) }
			hasError = { false }
			inputBoxStyle = { styles.textInputBox }
			setInputText = { setInputText }
			renderlineImageLeft = { renderPasswordImageLeft }
		/>
		<Input
			index = { "code" }
			value = { code }
			placeholder = { I18n.t( "login.placeholder.code" ) }
			hasError = { false }
			inputBoxStyle = { styles.textInputBox }
			inputStyle = { styles.codeTextInput }
			setInputText = { setInputText }
			renderCodeImage = { renderCodeImage }
		>
		</Input>
	</View>;
} );

// 选项卡导航栏
const TabBar = React.memo( function( { tabs, activeTab, goToPage } )
{

	const onPress = React.useCallback( i => goToPage( i ), [] );

	return <View style = { styles.tabBar }>
	{
		tabs.map( function( item, index )
		{
			return <TabBarItem key = { index } index = { index } title = { item } isActive = { activeTab == index } onPress = { onPress } />;
		} )
	}
	</View>;

}, function( prevProps, nextProps )
{
	const activeTabChanged = prevProps.activeTab == nextProps.activeTab;
	const goToPageChanged = prevProps.goToPage == nextProps.goToPage;
	const tabsChanged = JSON.stringify( prevProps.tabs ) == JSON.stringify( nextProps.tabs );
	return activeTabChanged && goToPageChanged && tabsChanged;

} );

// 选项卡项
const TabBarItem = React.memo( function( { index, title, isActive, onPress } )
{
	return <TouchableOpacity onPress = { () => onPress( index ) }>
		<Text style = { [ isActive ? styles.activeColor : styles.inactiveColor ] }>{ title }</Text>
	</TouchableOpacity>;

} );

const Login = function( props )
{

	const renderTabBar = React.useCallback( function( { tabs, activeTab, goToPage } )
	{
		return <TabBar tabs = { tabs } activeTab = { activeTab } goToPage = { goToPage } />
	}, [] );

	const onChangeTab = React.useCallback( function( o )
	{
		props.setLoginType( o.i );
	}, [] );

	const gotoRegister = React.useCallback( function()
	{
		props.navigation.push( "Register" );
	} );

	return <View style = { styles.container }>
		<Logo />
		<View style = { styles.tabBox }>
			<Tab
				contentProps = { { pageMargin: PAGEMARGIN } }
				renderTabBar = { renderTabBar }
				initialPage = { props.loginType }
				onChangeTab = { onChangeTab }
			>
				<InputBox
					tabLabel = { I18n.t( "login.loginType.phoneNumber" ) }
					loginType = { props.loginType }
					setInputText = { props.setInputText }

					phoneNumber = { props.phoneNumber }
					emailText = { props.emailText }
					password = { props.password }
					code = { props.code }
					inputError = { props.inputError }
				/>
				<InputBox
					tabLabel = { I18n.t( "login.loginType.email" ) }
					loginType = { props.loginType }
					setInputText = { props.setInputText }

					phoneNumber = { props.phoneNumber }
					emailText = { props.emailText }
					password = { props.password }
					code = { props.code }
					inputError = { props.inputError }
				/>
			</Tab>
		</View>
		<SubmitBtn submitBtnStyle = { styles.submitBtn } title = { I18n.t( "login.loginSubmitBtn" ) } onSubmit = { () => {} } />
		<View style = { styles.options }>
			<TouchableOpacity onPress = { gotoRegister }><Text style = { styles.optionsText }>{ I18n.t( "login.options.register" ) }</Text></TouchableOpacity>
			<TouchableOpacity><Text style = { styles.optionsText }>{ I18n.t( "login.options.forgetPassword" ) }</Text></TouchableOpacity>
		</View>
	</View>;

};

export default connect(
	function mapStateToProps( state, ownProps )
	{
		const loginData = state.login;
		return {
			phoneNumber: loginData.phoneNumber,
			emailText: loginData.emailText,
			password: loginData.password,
			code: loginData.code,
			loginType: loginData.loginType,
			inputError: loginData.inputError
		};
	},
	function mapDispatchToProps( dispatch, ownProps )
	{
		return bindActionCreators( { setLoginType, setInputText }, dispatch );
	}
)( Login );
