import React from "react";

import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Keyboard, Dimensions } from "react-native";

import Toast from "react-native-root-toast";

import Clipboard from "@react-native-community/clipboard";

import { useNavigation, CommonActions } from "@react-navigation/native";

import { fetchData } from "./../redux/actions/ctc.js";

import { setAccountIndex, hideActionSheet, showAccountActionSheet, setInputText, clear, fetchAddress, fetchUsable, fetchRechargeSubmit, fetchMentionSubmit, fetchTurnSubmit } from "./../redux/actions/access.js";
import { sendMentionCode } from "./../redux/actions/sendCode.js";
import { fetchAccountData } from "./../redux/actions/user.js";

import Input from "./../containers/input.js";
import SubmitBtn from "./../containers/submit.js";
import SendCodeBtn from "./../containers/sendCode.js";
import ActionSheet from "./../components/actionSheet.js";

import { bindActionCreators } from "redux";

import { connect } from "react-redux";

import I18n from "i18n-js";

// input box 宽度
const INPUTBOXWIDTH = Dimensions.get( "window" ).width * 0.9;

// input box 高度
const INPUTBOXHEIGHT = 60;

// 提交按钮高度
const SUBMITBTNHEIGHT = 42;

// 提示信息 box 高度
const TIPBOXHEIGHT = 150;

// error box 高度
const ERRORBOXHEIGHT = 30;

const styles = StyleSheet.create( {
	container: { flex: 1, alignItems: "center", marginTop: 10 },

	inputBoxStyle: { width: INPUTBOXWIDTH, height: INPUTBOXHEIGHT, justifyContent: "center" },
	inputStyle: { height: INPUTBOXHEIGHT * 0.9, fontSize: 14 },
	addressInputStyle: { flex: 7, fontSize: 14 },

	addressBtnBox: { flex: 4, flexDirection: "row", justifyContent: "space-between" },
	addressBtn: { paddingVertical: 5, paddingHorizontal: 10, backgroundColor: "#696DAC" },
	addressBtnText: { color: "#FFFFFF" },
	actionSheetBtn: { flex: 1 },

	codeInputStyle: { flex: 2, height: INPUTBOXHEIGHT * 0.9, fontSize: 14 },

	submitBtn: { width: INPUTBOXWIDTH, height: SUBMITBTNHEIGHT, marginTop: 30 },

	tipBox: { width: INPUTBOXWIDTH, height: TIPBOXHEIGHT, justifyContent: "center" },
	tipText: { fontSize: 12, color: "#9D9D9D" },

	errorBox: { width: INPUTBOXWIDTH, height: ERRORBOXHEIGHT, justifyContent: "space-around" },
	errorText: { color: "#F00" }
} );

const Recharge = React.memo( function( { name, address, number, note, inputError, copy, fetchSubmit, fetchAddress, fetchAddressError, fetchSubmitError, isLoading, setInputText } )
{
	return <View style = { styles.container }>
		<View style = { styles.errorBox }>
			{ fetchAddressError ? <Text style = { styles.errorText }>{ fetchAddressError }</Text> : null }
			{ fetchSubmitError ? <Text style = { styles.errorText }>{ fetchSubmitError }</Text> : null }
		</View>
		<Input
			value = { address }
			placeholder = { I18n.t( "recharge.placeholderAddress" ) }
			disabled = { true }
			multiline = { true }
			inputBoxStyle = { styles.inputBoxStyle }
			inputStyle = { [ styles.inputStyle, styles.addressInputStyle ] }
			// inputStyle = { styles.inputStyle }
			renderInputLeft = { () => <Text>{ I18n.t( "recharge.address" ) }: </Text> }
			renderInputRight = { () => <View style = { styles.addressBtnBox }>
				<TouchableOpacity style = { styles.addressBtn } onPress = { fetchAddress }><Text style = { styles.addressBtnText }>{ I18n.t( "recharge.getAddress" ) }</Text></TouchableOpacity>
				<TouchableOpacity style = { styles.addressBtn } onPress = { copy }><Text style = { styles.addressBtnText }>{ I18n.t( "recharge.copy" ) }</Text></TouchableOpacity>
			</View> }
		/>
		{/*<Input value = { name === "USDT" ? "USDT_ERC20" : name } disabled = { true } inputBoxStyle = { styles.inputBoxStyle } inputStyle = { styles.inputStyle } renderInputLeft = { () => <Text>{ I18n.t( "recharge.chainName" ) }:</Text> } />*/}
		<Input index = { "number" } value = { number } placeholder = { I18n.t( "recharge.placeholderNumber" ) } disabled = { false } hasError = { inputError[ "number" ] } inputBoxStyle = { styles.inputBoxStyle } inputStyle = { styles.inputStyle } setInputText = { setInputText } renderInputLeft = { () => <Text>{ I18n.t( "recharge.number" ) }: </Text> } />
		<Input index = { "note" } value = { note } placeholder = { I18n.t( "recharge.placeholderNote" ) } disabled = { false } inputBoxStyle = { styles.inputBoxStyle } inputStyle = { styles.inputStyle } setInputText = { setInputText } renderInputLeft = { () => <Text>{ I18n.t( "recharge.note" ) }: </Text> } />
		{/*<SubmitBtn title = { I18n.t( "recharge.submitText" ) } submitBtnStyle = { styles.submitBtn } loading = { isLoading } onSubmit = { fetchSubmit } />*/}
		{
			fetchAddressError
				? null
				: <SubmitBtn title = { I18n.t( "recharge.submitText" ) } submitBtnStyle = { styles.submitBtn } loading = { false } onSubmit = { fetchSubmit } />
		}
		<View style = { styles.tipBox }>
			<Text style = { styles.tipText }>{ I18n.t( "recharge.tip1" ) }</Text>
			<Text style = { styles.tipText }>{ I18n.t( "recharge.tip2" ) }</Text>
			<Text style = { styles.tipText }>{ I18n.t( "recharge.tip3" ) }</Text>
			<Text style = { styles.tipText }>{ I18n.t( "recharge.tip4" ) }</Text>
		</View>
	</View>;
} );

const Mention = React.memo( function( { name, usable, address, number, fee, password, code, inputError, sendCodeStatus, countdown, sendCodeError, sendCode, accountIndex, actionSheetData, isShowActionSheet, accountData, hideActionSheet, showAccountActionSheet, fetchSubmit, fetchUsableError, fetchSubmitError, isLoading, setInputText } )
{
	const navigation = useNavigation();

	const renderCode = React.useCallback( function()
	{
		return <SendCodeBtn sendCode = { sendCode } countdown = { countdown } sendCodeStatus = { sendCodeStatus } />
	}, [ sendCodeStatus, countdown ] );

	const goToBindAccount = React.useCallback( function()
	{
		navigation.push( "BindAccount" );
	}, [] );

	return <View style = { styles.container }>
		<View style = { styles.errorBox }>
			{ fetchUsableError ? <Text style = { styles.errorText }>{ fetchUsableError }</Text> : null }
			{ fetchSubmitError ? <Text style = { styles.errorText }>{ fetchSubmitError }</Text> : null }
			{ sendCodeError ? <Text style = { styles.errorText }>{ sendCodeError }</Text> : null }
		</View>
		<Input value = { usable } disabled = { true } inputBoxStyle = { styles.inputBoxStyle } inputStyle = { styles.inputStyle } renderInputLeft = { () => <Text>{ I18n.t( "mention.usable" ) }: </Text> } />
		<Input index = { "address" } value = { address } placeholder = { I18n.t( "mention.placeholderAddress" ) } inputBoxStyle = { styles.inputBoxStyle } inputStyle = { styles.inputStyle } setInputText = { setInputText } renderInputLeft = { () => <Text>{ I18n.t( "mention.address" ) }: </Text> } />
		<Input index = { "number" } value = { number } placeholder = { I18n.t( "mention.placeholderNumber" ) } hasError = { inputError[ "number" ] } inputBoxStyle = { styles.inputBoxStyle } inputStyle = { styles.inputStyle } setInputText = { setInputText } renderInputLeft = { () => <Text>{ I18n.t( "mention.number" ) }: </Text> } />
		<Input value = { number ? String( fee ) : ( name === "ETH" ? "3%" : "5%" ) } disabled = { true } inputBoxStyle = { styles.inputBoxStyle } inputStyle = { styles.inputStyle } renderInputLeft = { () => <Text>{ I18n.t( "mention.fee" ) }: </Text> } />
		<Input index = { "password" } value = { password } placeholder = { I18n.t( "mention.placeholderPassword" ) } hasError = { inputError[ "password" ] } inputBoxStyle = { styles.inputBoxStyle } inputStyle = { styles.inputStyle } setInputText = { setInputText } renderInputLeft = { () => <Text>{ I18n.t( "mention.password" ) }: </Text> } />

		<TouchableOpacity onPress = { accountIndex == null ? goToBindAccount : showAccountActionSheet } style = { styles.actionSheetBtn }>
			<Input value = { accountIndex ? accountIndex : I18n.t( "mention.noAccountTip" ) } disabled = { true } inputBoxStyle = { styles.inputBoxStyle } inputStyle = { styles.inputStyle } renderInputLeft = { () => <Text>{ I18n.t( "mention.authType" ) }: </Text> } />
		</TouchableOpacity>

		<Input index = { "code" } value = { code }
			placeholder = { I18n.t( "mention.placeholderCode" ) }
			inputBoxStyle = { styles.inputBoxStyle }
			inputStyle = { styles.codeInputStyle }
			setInputText = { setInputText }
			renderInputLeft = { () => <Text>{ I18n.t( "mention.code" ) }: </Text> }
			renderInputRight = { renderCode }
		/>

		<SubmitBtn title = { I18n.t( "mention.submitText" ) } submitBtnStyle = { styles.submitBtn } loading = { isLoading } onSubmit = { fetchSubmit } />
		<View style = { styles.tipBox }>
			<Text style = { styles.tipText }>{ I18n.t( "mention.tip1" ) }</Text>
			<Text style = { styles.tipText }>{ I18n.t( "mention.tip2" ) }</Text>
			<Text style = { styles.tipText }>{ I18n.t( "mention.tip3" ) }</Text>
			<Text style = { styles.tipText }>{ I18n.t( "mention.tip4" ) }</Text>
			<Text style = { styles.tipText }>{ I18n.t( "mention.tip5", { name: name } ) }</Text>
		</View>
		<ActionSheet
			{ ...actionSheetData }
			hide = { hideActionSheet }
			isShow = { isShowActionSheet }
		/>
	</View>;
} );

const Turn = React.memo( function( { count, number, account, phone, password, note, inputError, fetchSubmit, fetchSubmitError, isLoading, setInputText } )
{
	return <View style = { styles.container }>
		<View style = { styles.errorBox }>{ fetchSubmitError ? <Text style = { styles.errorText }>{ fetchSubmitError }</Text> : null }</View>
		<Input value = { count } disabled = { true } inputBoxStyle = { styles.inputBoxStyle } inputStyle = { styles.inputStyle } renderInputLeft = { () => <Text>{ I18n.t( "mention.usable" ) }: </Text> } />
		<Input index = { "number" } value = { number } placeholder = { I18n.t( "turn.placeholderNumber" ) } hasError = { inputError[ "number" ] } inputBoxStyle = { styles.inputBoxStyle } inputStyle = { styles.inputStyle } setInputText = { setInputText } renderInputLeft = { () => <Text>{ I18n.t( "turn.number" ) }: </Text> } />
		<Input index = { "account" } value = { account } placeholder = { I18n.t( "turn.placeholderAccount" ) } hasError = { inputError[ "account" ] } inputBoxStyle = { styles.inputBoxStyle } inputStyle = { styles.inputStyle } setInputText = { setInputText } renderInputLeft = { () => <Text>{ I18n.t( "turn.account" ) }: </Text> } />
		<Input index = { "phone" } value = { phone } placeholder = { I18n.t( "turn.placeholderPhone" ) } hasError = { inputError[ "phone" ] } inputBoxStyle = { styles.inputBoxStyle } inputStyle = { styles.inputStyle } setInputText = { setInputText } renderInputLeft = { () => <Text>{ I18n.t( "turn.phone" ) }: </Text> } />
		<Input index = { "password" } value = { password } placeholder = { I18n.t( "turn.placeholderPassword" ) } hasError = { inputError[ "password" ] } inputBoxStyle = { styles.inputBoxStyle } inputStyle = { styles.inputStyle } setInputText = { setInputText } renderInputLeft = { () => <Text>{ I18n.t( "turn.password" ) }: </Text> } />
		<Input index = { "note" } value = { note } placeholder = { I18n.t( "recharge.placeholderNote" ) } disabled = { false } inputBoxStyle = { styles.inputBoxStyle } inputStyle = { styles.inputStyle } setInputText = { setInputText } renderInputLeft = { () => <Text>{ I18n.t( "recharge.note" ) }: </Text> } />
		<SubmitBtn title = { I18n.t( "turn.submitText" ) } submitBtnStyle = { styles.submitBtn } loading = { isLoading } onSubmit = { fetchSubmit } />
	</View>;
} );

const Access = React.memo( function( props )
{
	const isRecharge = props.route.params.type === "recharge";
	const isMention = props.route.params.type === "mention";
	const isTurn = props.route.params.type === "turn";

	React.useEffect( () => {
		props.navigation.addListener( "focus", () => {
			props.navigation.setOptions( { title: `${ isRecharge ? I18n.t( "recharge.title" ) : isMention ? I18n.t( "mention.title" ) : isTurn ? I18n.t( "turn.title" ) : "" } - ${ props.route.params.name }( ID: ${ props.id } )` } );
		} );
		props.navigation.addListener( "blur", () => {
			props.clear();
		} );

	}, [ props.navigation ] );

	if( isTurn )
	{
		const fetchSubmit = React.useCallback( function()
		{
			props.fetchTurnSubmit( props.route.params.name, () => {
				Toast.show( I18n.t( "turn.fetchSubmitSuccess" ) );
				props.navigation.goBack();
				props.fetchData();
			} );
		}, [] );

		return <ScrollView showsVerticalScrollIndicator = { false } keyboardDismissMode = { "on-drag" } onScrollBeginDrag = { Keyboard.dismiss }>
			<Turn
				count = { props.route.params.count }
				number = { props.number }
				account = { props.account }
				phone = { props.phone }
				password = { props.password }
				note = { props.note }
				inputError = { props.inputError }
				fetchSubmit = { fetchSubmit }
				fetchSubmitError = { props.fetchSubmitError }
				isLoading = { props.isLoading }
				setInputText = { props.setInputText }
			/>
		</ScrollView>
	};

	if( isMention )
	{
		React.useEffect( () => {
			props.navigation.addListener( "focus", () => {
				props.fetchUsable( props.route.params.name );
				props.fetchAccountData();
			} );
		}, [ props.navigation ] );

		React.useEffect( () => {
			if( Object.keys( props.accountData ).length )
			{
				props.setAccountIndex( props.accountData[ "电话" ] ? props.accountData[ "电话" ] : props.accountData[ "邮箱" ] ? props.accountData[ "邮箱" ] : null )
			};
		}, [ props.accountData ] )

		const fetchSubmit = React.useCallback( function()
		{
			props.fetchMentionSubmit( props.route.params.name, () => {
				Toast.show( I18n.t( "mention.fetchSubmitSuccess" ) );
				props.navigation.goBack();
				props.fetchData();
			} );
		}, [] );

		return <ScrollView showsVerticalScrollIndicator = { false } keyboardDismissMode = { "on-drag" } onScrollBeginDrag = { Keyboard.dismiss }>
			<Mention
				name = { props.route.params.name }
				usable = { props.usable }
				address = { props.address }
				number = { props.number }
				fee = { props.fee }
				password = { props.password }
				code = { props.code }
				inputError = { props.inputError }
				sendCodeStatus = { props.sendCodeStatus }
				countdown = { props.countdown }
				sendCodeError = { props.sendCodeError }
				sendCode = { props.sendMentionCode }
				accountIndex = { props.accountIndex }
				actionSheetData = { props.actionSheetData }
				isShowActionSheet = { props.isShowActionSheet }
				accountData = { props.accountData }
				hideActionSheet = { props.hideActionSheet }
				showAccountActionSheet = { props.showAccountActionSheet }
				fetchSubmit = { fetchSubmit }
				fetchUsableError = { props.fetchUsableError }
				fetchSubmitError = { props.fetchSubmitError }
				isLoading = { props.isLoading }
				setInputText = { props.setInputText }
			/>
		</ScrollView>;
	};

	if( isRecharge )
	{
		/*React.useEffect( () => {
			props.fetchAddress( props.route.params.name );
		}, [] );*/

		const copy = React.useCallback( function()
		{
			if( props.address )
			{
				Clipboard.setString( props.address );
				Toast.show( I18n.t( "recharge.copySuccess" ) );
			} else
			{
				Toast.show( I18n.t( "recharge.placeholderAddress" ) );
			};
		}, [ props.address ] );

		const fetchSubmit = React.useCallback( function()
		{
			props.fetchRechargeSubmit( props.route.params.name, () => {
				Toast.show( I18n.t( "recharge.fetchSubmitSuccess" ) );
				props.navigation.goBack();
				props.fetchData();
			} );
		}, [] );

		return <ScrollView showsVerticalScrollIndicator = { false } keyboardDismissMode = { "on-drag" } onScrollBeginDrag = { Keyboard.dismiss }>
			<Recharge
				name = { props.route.params.name }
				address = { props.address }
				number = { props.number }
				note = { props.note }
				inputError = { props.inputError }
				copy = { copy }
				fetchSubmit = { fetchSubmit }
				fetchAddress = { props.fetchAddress }
				fetchAddressError = { props.fetchAddressError }
				fetchSubmitError = { props.fetchSubmitError }
				isLoading = { props.isLoading }
				setInputText = { props.setInputText }
			/>
		</ScrollView>;
	};
} );

export default connect(
	function mapStateToProps( state, ownProps )
	{
		const ctcData = state.ctc;
		const accessData = state.access;
		const sendCodeData = state.sendCode;
		const userData = state.user;

		return {
			id: ctcData.id,
			usable: accessData.usable,
			address: accessData.address,
			account: accessData.account,
			phone: accessData.phone,
			code: accessData.code,
			number: accessData.number,
			fee: accessData.fee,
			note: accessData.note,
			password: accessData.password,
			inputError: accessData.inputError,
			isLoading: accessData.isLoading,
			fetchAddressError: accessData.fetchAddressError,
			fetchUsableError: accessData.fetchUsableError,
			fetchSubmitError: accessData.fetchSubmitError,

			sendCodeStatus: sendCodeData.sendCodeStatus,
			countdown: sendCodeData.countdown,
			sendCodeError: sendCodeData.sendCodeError,

			accountData: userData.accountData,
			accountIndex: accessData.accountIndex, 
			actionSheetData: accessData.actionSheetData, 
			isShowActionSheet: accessData.isShowActionSheet,
		};
	},
	function mapDispatchToProps( dispatch, ownProps )
	{
		return bindActionCreators( { setAccountIndex, hideActionSheet, showAccountActionSheet, setInputText, clear, sendMentionCode, fetchAccountData, fetchData, fetchAddress, fetchUsable, fetchRechargeSubmit, fetchMentionSubmit, fetchTurnSubmit }, dispatch );
	}
)( Access );
