import React from "react";

import { View, ScrollView, Text, TouchableOpacity, StyleSheet, Image, Keyboard, Dimensions } from "react-native";

import { useFocusEffect } from "@react-navigation/native";

import { bindActionCreators } from "redux";

import { connect } from "react-redux";

import Icon from "react-native-vector-icons/FontAwesome5";

import I18n from "./../i18n/index.js";

import Tab from "./../components/tab.js";
import Input from "./../components/input.js";
import SubmitBtn from "./../components/submit.js";
import TabBar from "./../components/sizeChangeTabBar.js";

import { setLoginType, setInputText, fetchImageCode, fetchLogin, clear } from "./../redux/actions/login.js";

// 图标宽高
const ICONSIZE = 80;

// tab bar 高
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
	tabBar: { width: LISTITEMWIDTH, height: TABBARHEIGHT },

	textInputBox: { width: LISTITEMWIDTH, height: LISTITEMHEIGIT, justifyContent: "center" },
	codeTextInput: { flex: 2 },
	codeImageBtnBox: { flex: 1 },
	codeImageBtn: { height: LISTITEMHEIGIT },

	submitBtn: { width: LISTITEMWIDTH, height: 50, marginVertical: 16 },

	forgotBox: { width: LISTITEMWIDTH, marginTop: 30, alignItems: "flex-end" },
	forgotText: { fontSize: 14, color: "#666666" },

	registerBox: { width: LISTITEMWIDTH, alignItems: "center", marginTop: 10 },
	registerText: { fontSize: 14, color: "#696DAC" },

	errorBox: { width: LISTITEMWIDTH },
	errorColor: { color: "#F00" },

} );

// logo
const Logo = React.memo( function()
{

	return <Image style = { styles.icon } source = { require( "./../images/logo.png" ) } />

} );

// codeImage
const CodeImage = React.memo( function( { imageBlob, fetchImageError, fetchImageCode } )
{
	console.log( "=====", imageBlob, fetchImageError, ( imageBlob && !fetchImageError ) )

	return ( imageBlob && !fetchImageError )
		? <TouchableOpacity style = { styles.codeImageBtnBox } onPress = { fetchImageCode }>
			<Image resizeMode = { "cover" } style = { styles.codeImageBtn } source = { { uri: `data:image/png;base64,${ imageBlob }` } } />
		</TouchableOpacity>
		: <View style = { styles.codeImageBtnBox }>
			<Text style = { styles.errorColor }>{ fetchImageError }</Text>
		</View>
} );

// 登录方式
const InputBox = React.memo( function( { loginType, setInputText, phoneNumber, emailText, password, code, inputError, imageBlob, fetchImageCode, fetchImageError } )
{

	const hasError = ( loginType === 0 && inputError === "phoneNumber" ) || ( loginType === 1 && inputError === "emailText" );
	const isPhoneNumber = loginType == 0;

	const renderCodeImage = React.useCallback( function()
	{
		return <CodeImage imageBlob = { imageBlob } fetchImageError = { fetchImageError } fetchImageCode = { fetchImageCode } />
	}, [ imageBlob ] );

	const userIcon = React.useCallback( function()
	{
		return <Icon name = "user" color = { "#888888" } size = { 18 } />
	}, [] );

	const passwordIcon = React.useCallback( function()
	{
		return <Icon name = "lock" color = { "#888888" } size = { 18 } />
	}, [] );

	return <React.Fragment>
		<Input
			index = { isPhoneNumber ? "phoneNumber" : "emailText" }
			value = { isPhoneNumber ? phoneNumber : emailText }
			placeholder = { isPhoneNumber ? I18n.t( "login.placeholder.phoneNumber" ) : I18n.t( "login.placeholder.email" ) }
			hasError = { hasError }
			inputBoxStyle = { styles.textInputBox }
			setInputText = { setInputText }
			renderInputLeft = { userIcon }
		/>
		<Input
			index = { "password" }
			value = { password }
			placeholder = { I18n.t( "login.placeholder.password" ) }
			hasError = { false }
			inputBoxStyle = { styles.textInputBox }
			setInputText = { setInputText }
			renderInputLeft = { passwordIcon }
		/>
		<Input
			index = { "code" }
			value = { code }
			placeholder = { I18n.t( "login.placeholder.code" ) }
			hasError = { false }
			inputBoxStyle = { styles.textInputBox }
			inputStyle = { styles.codeTextInput }
			setInputText = { setInputText }
			renderInputRight = { renderCodeImage }
		>
		</Input>
	</React.Fragment>;
} );

const Login = function( props )
{
	// componentWillUnmount
	useFocusEffect(
		React.useCallback( function()
		{
			return function()
			{
				props.clear();
			};
		}, [] )
	);

	const renderTabBar = React.useCallback( function( { tabs, activeTab, goToPage } )
	{
		return <TabBar tabs = { tabs } tabBarStyle = { styles.tabBar } activeTab = { activeTab } goToPage = { goToPage } />
	}, [] );

	const onChangeTab = React.useCallback( function( o )
	{
		props.setLoginType( o.i );
	}, [] );

	const gotoRegister = React.useCallback( function()
	{
		props.navigation.push( "Register", { type: "register" } );
	} );

	const gotoForget = React.useCallback( function()
	{
		props.navigation.push( "Register", { type: "forget" } );
	} );

	return <ScrollView
		showsVerticalScrollIndicator = { false }
		contentContainerStyle = { styles.container }
		keyboardDismissMode = { "on-drag" }							// 无效
		onScrollBeginDrag = { Keyboard.dismiss }					// 暂且用该方法使其滑动时关闭键盘
	>
		<React.Fragment>
			<Logo />
			<View style = { styles.errorBox }>
				<Text style = { styles.errorColor }>{ props.fetchLoginError }</Text>
			</View>
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

						imageBlob = { props.imageBlob }
						fetchImageCode = { props.fetchImageCode }
						fetchImageError = { props.fetchImageError }
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

						imageBlob = { props.imageBlob }
						fetchImageCode = { props.fetchImageCode }
						fetchImageError = { props.fetchImageError }
					/>
				</Tab>
			</View>

			<View style = { styles.forgotBox }>
				<TouchableOpacity onPress = { gotoForget }>
					<Text style = { styles.forgotText }>{ I18n.t( "login.forgetPassword" ) }</Text>
				</TouchableOpacity>
			</View>
			<SubmitBtn submitBtnStyle = { styles.submitBtn } title = { I18n.t( "login.loginSubmitBtn" ) } onSubmit = { props.fetchLogin } />
			<View style = { styles.registerBox }>
				<TouchableOpacity onPress = { gotoRegister }>
					<Text style = { styles.registerText }>{ I18n.t( "login.register" ) }</Text>
				</TouchableOpacity>
			</View>
		</React.Fragment>
	</ScrollView>;

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
			inputError: loginData.inputError,
			imageBlob: loginData.imageBlob,
			isLogin: loginData.isLogin,
			fetchLoginError: loginData.fetchLoginError,
			fetchImageError: loginData.fetchImageError
		};
	},
	function mapDispatchToProps( dispatch, ownProps )
	{
		return bindActionCreators( { setLoginType, setInputText, fetchImageCode, fetchLogin, clear }, dispatch );
	}
)( Login );
