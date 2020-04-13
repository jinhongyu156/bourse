import React from "react";

import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from "react-native";

import { bindActionCreators } from "redux";

import { connect } from "react-redux";

import I18n from "./../i18n/index.js";

import Tab from "./../components/tab.js";
import Input from "./../components/input.js";
import SubmitBtn from "./../components/submit.js";

import { setRegisterType, setInputText } from "./../redux/actions/register.js";

// 图标宽高
const ICONSIZE = 80;

// tabBar 宽高
const TABBARHEIGHT = 60;

// input box 高
const LISTITEMHEIGIT = 60;

// input box 宽
const LISTITEMWIDTH = Dimensions.get( "window" ).width * 0.9;

// 页面 padding
const PAGEMARGIN =  Dimensions.get( "window" ).width * 0.1;

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

// codeImage
const CodeImage = React.memo( function()
{

	return <View style = { styles.codeImageBtnContainer }></View>

} );

// 登录方式
const InputBox = React.memo( function( { registerType, setInputText, phoneNumber, emailText, password, code, inputError } ) {

	const hasError = ( registerType === 0 && inputError === "phoneNumber" ) || ( registerType === 1 && inputError === "emailText" );
	const isPhoneNumber = registerType == 0;

	const renderCodeImage = React.useCallback( function()
	{
		return <CodeImage />
	}, [] );

	return <View>
		<Input
			index = { isPhoneNumber ? "phoneNumber" : "emailText" }
			value = { isPhoneNumber ? phoneNumber : emailText }
			placeholder = { isPhoneNumber ? "phoneNumber" : "email" }
			hasError = { hasError }
			inputBoxStyle = { styles.textInputBox }
			setInputText = { setInputText }
		/>
		<Input
			index = { "password" }
			value = { password }
			placeholder = { "password" }
			hasError = { false }
			inputBoxStyle = { styles.textInputBox }
			setInputText = { setInputText }
		/>
		<Input
			index = { "code" }
			value = { code }
			placeholder = { "code" }
			hasError = { false }
			inputBoxStyle = { styles.textInputBox }
			inputStyle = { styles.codeTextInput }
			setInputText = { setInputText }
			// renderCodeImage = { renderCodeImage }
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

const Register = function( props )
{

	const renderTabBar = React.useCallback( function( { tabs, activeTab, goToPage } )
	{
		return <TabBar tabs = { tabs } activeTab = { activeTab } goToPage = { goToPage } />
	}, [] );

	const onChangeTab = React.useCallback( function( o ) {
		props.setRegisterType( o.i )
	}, [] );

	return <View style = { styles.container }>
		<View style = { styles.tabBox }>
			<Tab
				contentProps = { { pageMargin: PAGEMARGIN } }
				renderTabBar = { renderTabBar }
				initialPage = { props.registerType }
				onChangeTab = { onChangeTab }
			>
				<InputBox
					tabLabel = { "phoneNumber" }
					registerType = { props.registerType }
					setInputText = { props.setInputText }

					phoneNumber = { props.phoneNumber }
					emailText = { props.emailText }
					password = { props.password }
					code = { props.code }
					inputError = { props.inputError }
				/>
				<InputBox
					tabLabel = { "email" }
					registerType = { props.registerType }
					setInputText = { props.setInputText }

					phoneNumber = { props.phoneNumber }
					emailText = { props.emailText }
					password = { props.password }
					code = { props.code }
					inputError = { props.inputError }
				/>
			</Tab>
		</View>
		<SubmitBtn submitBtnStyle = { styles.submitBtn } title = { "registerSubmitBtn" } />
		<View style = { styles.options }>
			<TouchableOpacity><Text style = { styles.optionsText }>{ "register" }</Text></TouchableOpacity>
			<TouchableOpacity><Text style = { styles.optionsText }>{ "forgetPassword" }</Text></TouchableOpacity>
		</View>
	</View>;

};

export default connect(
	function mapStateToProps( state, ownProps )
	{
		const registerData = state.register;
		return {
			name: registerData.name,
			phoneNumber: registerData.phoneNumber,
			emailText: registerData.emailText,
			password: registerData.password,
			imageCode: registerData.imageCode,
			code: registerData.code,
			inputError: registerData.inputError,
			registerType: registerData.registerType
		};
	},
	function mapDispatchToProps( dispatch, ownProps )
	{
		return bindActionCreators( { setRegisterType, setInputText }, dispatch );
	}
)( Register );
