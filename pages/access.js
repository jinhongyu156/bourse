import React from "react";

import { View, Text, ScrollView, TouchableOpacity, ToastAndroid, StyleSheet, Keyboard, Dimensions } from "react-native";

import Clipboard from "@react-native-community/clipboard";

import { fetchData } from "./../redux/actions/ctc.js";
import { setInputText, clear, fetchAddress, fetchUsable, fetchRechargeSubmit, fetchMentionSubmit, fetchTurnSubmit } from "./../redux/actions/access.js";

import Input from "./../containers/input.js";
import SubmitBtn from "./../containers/submit.js";

import { bindActionCreators } from "redux";

import { connect } from "react-redux";

import I18n from "i18n-js";

// input box 宽度
const INPUTBOXWIDTH = Dimensions.get( "window" ).width * 0.9;

// input box 高度
const INPUTBOXHEIGHT = 60;

// 提交按钮高度
const SUBMITBTNHEIGHT = 50

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

	submitBtn: { width: INPUTBOXWIDTH, height: SUBMITBTNHEIGHT, marginTop: 30 },

	tipBox: { width: INPUTBOXWIDTH, height: TIPBOXHEIGHT, justifyContent: "center" },
	tipText: { fontSize: 12, color: "#9D9D9D" },

	errorBox: { width: INPUTBOXWIDTH, height: ERRORBOXHEIGHT, justifyContent: "space-around" },
	errorText: { color: "#F00" }
} );

const Recharge = React.memo( function( { address, number, note, inputError, copy, fetchSubmit, fetchAddress, fetchAddressError, fetchSubmitError, isLoading, setInputText } )
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
			renderInputLeft = { () => <Text>{ I18n.t( "recharge.address" ) }: </Text> }
			renderInputRight = { () => <View style = { styles.addressBtnBox }>
				<TouchableOpacity style = { styles.addressBtn } onPress = { fetchAddress }><Text style = { styles.addressBtnText }>{ I18n.t( "recharge.getAddress" ) }</Text></TouchableOpacity>
				<TouchableOpacity style = { styles.addressBtn } onPress = { copy }><Text style = { styles.addressBtnText }>{ I18n.t( "recharge.copy" ) }</Text></TouchableOpacity>
			</View> }
		/>
		<Input index = { "number" } value = { number } placeholder = { I18n.t( "recharge.placeholderNumber" ) } disabled = { false } hasError = { inputError[ "number" ] } inputBoxStyle = { styles.inputBoxStyle } inputStyle = { styles.inputStyle } setInputText = { setInputText } renderInputLeft = { () => <Text>{ I18n.t( "recharge.number" ) }: </Text> } />
		<Input index = { "note" } value = { note } placeholder = { I18n.t( "recharge.placeholderNote" ) } disabled = { false } inputBoxStyle = { styles.inputBoxStyle } inputStyle = { styles.inputStyle } setInputText = { setInputText } renderInputLeft = { () => <Text>{ I18n.t( "recharge.note" ) }: </Text> } />
		<SubmitBtn title = { I18n.t( "recharge.submitText" ) } submitBtnStyle = { styles.submitBtn } loading = { isLoading } onSubmit = { fetchSubmit } />
		<View style = { styles.tipBox }>
			<Text style = { styles.tipText }>{ I18n.t( "recharge.tip1" ) }</Text>
			<Text style = { styles.tipText }>{ I18n.t( "recharge.tip2" ) }</Text>
			<Text style = { styles.tipText }>{ I18n.t( "recharge.tip3" ) }</Text>
			<Text style = { styles.tipText }>{ I18n.t( "recharge.tip4" ) }</Text>
		</View>
	</View>;
} );

const Mention = React.memo( function( { usable, address, number, fee, password, inputError, fetchSubmit, fetchUsableError, fetchSubmitError, isLoading, setInputText } )
{
	return <View style = { styles.container }>
		<View style = { styles.errorBox }>
			{ fetchUsableError ? <Text style = { styles.errorText }>{ fetchUsableError }</Text> : null }
			{ fetchSubmitError ? <Text style = { styles.errorText }>{ fetchSubmitError }</Text> : null }
		</View>
		<Input value = { usable } disabled = { true } inputBoxStyle = { styles.inputBoxStyle } inputStyle = { styles.inputStyle } renderInputLeft = { () => <Text>{ I18n.t( "mention.usable" ) }: </Text> } />
		<Input index = { "address" } value = { address } placeholder = { I18n.t( "mention.placeholderAddress" ) } inputBoxStyle = { styles.inputBoxStyle } inputStyle = { styles.inputStyle } setInputText = { setInputText } renderInputLeft = { () => <Text>{ I18n.t( "mention.address" ) }: </Text> } />
		<Input index = { "number" } value = { number } placeholder = { I18n.t( "mention.placeholderNumber" ) } hasError = { inputError[ "number" ] } inputBoxStyle = { styles.inputBoxStyle } inputStyle = { styles.inputStyle } setInputText = { setInputText } renderInputLeft = { () => <Text>{ I18n.t( "mention.number" ) }: </Text> } />
		<Input value = { number ? String( fee ) : String( fee * 100 ).concat( "%" ) } disabled = { true } inputBoxStyle = { styles.inputBoxStyle } inputStyle = { styles.inputStyle } renderInputLeft = { () => <Text>{ I18n.t( "mention.fee" ) }: </Text> } />
		<Input index = { "password" } value = { password } placeholder = { I18n.t( "mention.placeholderPassword" ) } hasError = { inputError[ "password" ] } inputBoxStyle = { styles.inputBoxStyle } inputStyle = { styles.inputStyle } setInputText = { setInputText } renderInputLeft = { () => <Text>{ I18n.t( "mention.password" ) }: </Text> } />
		<SubmitBtn title = { I18n.t( "mention.submitText" ) } submitBtnStyle = { styles.submitBtn } loading = { isLoading } onSubmit = { fetchSubmit } />
		<View style = { styles.tipBox }>
			<Text style = { styles.tipText }>{ I18n.t( "mention.tip1" ) }</Text>
			<Text style = { styles.tipText }>{ I18n.t( "mention.tip2" ) }</Text>
			<Text style = { styles.tipText }>{ I18n.t( "mention.tip3" ) }</Text>
			<Text style = { styles.tipText }>{ I18n.t( "mention.tip4" ) }</Text>
			<Text style = { styles.tipText }>{ I18n.t( "mention.tip5" ) }</Text>
		</View>
	</View>;
} );

const Turn = React.memo( function( { number, account, password, inputError, fetchSubmit, fetchSubmitError, isLoading, setInputText } )
{
	return <View style = { styles.container }>
		<View style = { styles.errorBox }>{ fetchSubmitError ? <Text style = { styles.errorText }>{ fetchSubmitError }</Text> : null }</View>
		<Input index = { "number" } value = { number } placeholder = { I18n.t( "turn.placeholderNumber" ) } hasError = { inputError[ "number" ] } inputBoxStyle = { styles.inputBoxStyle } inputStyle = { styles.inputStyle } setInputText = { setInputText } renderInputLeft = { () => <Text>{ I18n.t( "turn.number" ) }: </Text> } />
		<Input index = { "account" } value = { account } placeholder = { I18n.t( "turn.placeholderAccount" ) } hasError = { inputError[ "account" ] } inputBoxStyle = { styles.inputBoxStyle } inputStyle = { styles.inputStyle } setInputText = { setInputText } renderInputLeft = { () => <Text>{ I18n.t( "turn.account" ) }: </Text> } />
		<Input index = { "password" } value = { password } placeholder = { I18n.t( "turn.placeholderPassword" ) } hasError = { inputError[ "password" ] } inputBoxStyle = { styles.inputBoxStyle } inputStyle = { styles.inputStyle } setInputText = { setInputText } renderInputLeft = { () => <Text>{ I18n.t( "turn.password" ) }: </Text> } />
		<SubmitBtn title = { I18n.t( "turn.submitText" ) } submitBtnStyle = { styles.submitBtn } loading = { isLoading } onSubmit = { fetchSubmit } />
	</View>;
} );

const Access = React.memo( function( props )
{
	const isRecharge = props.route.params.type === "recharge";
	const isMention = props.route.params.type === "mention";
	const isTurn = props.route.params.type === "turn";

	React.useEffect( () => {
		props.navigation.setOptions( { title: `${ isRecharge ? I18n.t( "recharge.title" ) : isMention ? I18n.t( "mention.title" ) : isTurn ? I18n.t( "turn.title" ) : "" } - ${ props.route.params.name }( ID: ${ props.id } )` } );
		return props.clear;
	}, [] );

	if( isTurn )
	{
		const fetchSubmit = React.useCallback( function()
		{
			props.fetchTurnSubmit( props.route.params.name, () => {
				ToastAndroid.show( I18n.t( "turn.fetchSubmitSuccess" ), ToastAndroid.SHORT );
				props.navigation.goBack();
				props.fetchData();
			} );
		}, [] );

		return <Turn
			number = { props.number }
			account = { props.account }
			password = { props.password }
			inputError = { props.inputError }
			fetchSubmit = { fetchSubmit }
			fetchSubmitError = { props.fetchSubmitError }
			isLoading = { props.isLoading }
			setInputText = { props.setInputText }
		/>;
	};

	if( isMention )
	{
		React.useEffect( () => {
			props.fetchUsable( props.route.params.name );
		}, [] );

		const fetchSubmit = React.useCallback( function()
		{
			props.fetchMentionSubmit( props.route.params.name, () => {
				ToastAndroid.show( I18n.t( "mention.fetchSubmitSuccess" ), ToastAndroid.SHORT );
				props.navigation.goBack();
				props.fetchData();
			} );
		}, [] );

		return <ScrollView showsVerticalScrollIndicator = { false } keyboardDismissMode = { "on-drag" } onScrollBeginDrag = { Keyboard.dismiss }>
			<Mention
				usable = { props.usable }
				address = { props.address }
				number = { props.number }
				fee = { props.fee }
				password = { props.password }
				inputError = { props.inputError }
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
		const copy = React.useCallback( function()
		{
			if( props.address )
			{
				Clipboard.setString( props.address );
				ToastAndroid.show( I18n.t( "recharge.copySuccess" ), ToastAndroid.SHORT );
			} else
			{
				ToastAndroid.show( I18n.t( "recharge.placeholderAddress" ), ToastAndroid.SHORT );
			};
		}, [ props.address ] );

		const fetchSubmit = React.useCallback( function()
		{
			props.fetchRechargeSubmit( props.route.params.name, () => {
				ToastAndroid.show( I18n.t( "recharge.fetchSubmitSuccess" ), ToastAndroid.SHORT );
				props.navigation.goBack();
				props.fetchData();
			} );
		}, [] );

		return <ScrollView showsVerticalScrollIndicator = { false } keyboardDismissMode = { "on-drag" } onScrollBeginDrag = { Keyboard.dismiss }>
			<Recharge
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

		return {
			id: ctcData.id,
			usable: accessData.usable,
			address: accessData.address,
			account: accessData.account,
			number: accessData.number,
			fee: accessData.fee,
			note: accessData.note,
			password: accessData.password,
			inputError: accessData.inputError,
			isLoading: accessData.isLoading,
			fetchAddressError: accessData.fetchAddressError,
			fetchUsableError: accessData.fetchUsableError,
			fetchSubmitError: accessData.fetchSubmitError
		};
	},
	function mapDispatchToProps( dispatch, ownProps )
	{
		return bindActionCreators( { setInputText, clear, fetchData, fetchAddress, fetchUsable, fetchRechargeSubmit, fetchMentionSubmit, fetchTurnSubmit }, dispatch );
	}
)( Access );
