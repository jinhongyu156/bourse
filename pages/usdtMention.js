import React from "react";

import I18n from "i18n-js";

import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Keyboard, Dimensions } from "react-native";

import { useNavigation, CommonActions } from "@react-navigation/native";

import { bindActionCreators } from "redux";

import { connect } from "react-redux";

import { fetchCardData } from "./../redux/actions/myBankCard.js";
import { fetchValuation, fetchMentionSubmit, clear, setInputText } from "./../redux/actions/usdtMention.js";

import Input from "./../containers/input.js";
import SubmitBtn from "./../containers/submit.js";

// input box 宽度
const INPUTBOXWIDTH = Dimensions.get( "window" ).width * 0.9;

// input box 高度
const INPUTBOXHEIGHT = 60;

// 提交按钮高度
const SUBMITBTNHEIGHT = 42

// error box 高度
const ERRORBOXHEIGHT = 20;

const styles = StyleSheet.create( {
	container: { flex: 1, alignItems: "center", marginTop: 10 },
	inputBoxStyle: { width: INPUTBOXWIDTH, height: INPUTBOXHEIGHT, justifyContent: "center" },
	inputStyle: { height: INPUTBOXHEIGHT * 0.9, fontSize: 14 },
	bindInputStyle: { flex: 9, fontSize: 14 },
	submitBtn: { width: INPUTBOXWIDTH, height: SUBMITBTNHEIGHT, marginTop: 30 },

	btnBox: { flex: 4, flexDirection: "row", justifyContent: "flex-end" },
	btn: { paddingVertical: 5, paddingHorizontal: 10, backgroundColor: "#696DAC" },
	btnText: { color: "#FFFFFF" },

	errorBox: { width: INPUTBOXWIDTH, height: ERRORBOXHEIGHT, justifyContent: "space-around", paddingHorizontal: 6 },
	errorText: { color: "#F00" }
} );

const LinkPageBtn = React.memo( function()
{
	const navigation = useNavigation();

	const goToMyBankCard = React.useCallback( function()
	{
		navigation.push( "MyBankCard" );
	}, [] );

	return <View style = { styles.btnBox }>
		<TouchableOpacity style = { styles.btn } onPress = { goToMyBankCard }>
			<Text style = { styles.btnText }>{ I18n.t( "usdtMention.bind" ) }</Text>
		</TouchableOpacity>
	</View>
} );

const ValuationExist = React.memo( function( { data, password, inputError, setInputText, hasCard, bankCardNumber, fetchCardData, submit, loading, error } )
{
	React.useEffect( function()
	{
		fetchCardData()
	}, [] );

	return <View style = { styles.container }>
		<View style = { styles.errorBox }>
			{ error ? <Text style = { styles.errorText }>{ error }</Text> : null }
		</View>
		<Input
			disabled = { true }
			value = { String( data[ "amount" ] ) }
			inputBoxStyle = { styles.inputBoxStyle }
			inputStyle = { styles.inputStyle }
			renderInputLeft = { () => <Text>{ I18n.t( "usdtMention.amount" ) }: </Text> }
		/>
		<Input
			disabled = { true }
			value = { String( data[ "currency" ] ) }
			inputBoxStyle = { styles.inputBoxStyle }
			inputStyle = { styles.inputStyle }
			renderInputLeft = { () => <Text>{ I18n.t( "usdtMention.currency" ) }: </Text> }
		/>
		<Input
			disabled = { true }
			value = { String( data[ "quantity" ] ) }
			inputBoxStyle = { styles.inputBoxStyle }
			inputStyle = { styles.inputStyle }
			renderInputLeft = { () => <Text>{ I18n.t( "usdtMention.number" ) }: </Text> }
		/>
		<Input
			disabled = { true }
			value = { String( data[ "unitPrice" ] ) }
			inputBoxStyle = { styles.inputBoxStyle }
			inputStyle = { styles.inputStyle }
			renderInputLeft = { () => <Text>{ I18n.t( "usdtMention.unitPrice" ) }: </Text> }
		/>
		<Input
			index = { "password" }
			value = { password }
			placeholder = { I18n.t( "usdtMention.placeholderPassword" ) }
			hasError = { inputError[ "password" ] }
			inputBoxStyle = { styles.inputBoxStyle }
			inputStyle = { styles.inputStyle }
			setInputText = { setInputText }
			renderInputLeft = { () => <Text>{ I18n.t( "usdtMention.password" ) }: </Text> }
		/>
		<Input
			disabled = { true }
			value = { hasCard ? bankCardNumber : I18n.t( "usdtMention.notBoundTip" ) }
			inputBoxStyle = { styles.inputBoxStyle }
			inputStyle = { [ styles.inputStyle, styles.bindInputStyle ] }
			renderInputLeft = { () => <Text>{ I18n.t( "usdtMention.bankCard" ) }: </Text> }
			renderInputRight = { () => hasCard ? null : <LinkPageBtn /> }
		/>
		<SubmitBtn
			title = { I18n.t( "usdtMention.submitText" ) }
			submitBtnStyle = { styles.submitBtn }
			loading = { loading }
			onSubmit = { submit }
		/>
	</View>;
} );

const ValuationNoExist = React.memo( function( { usdtInfo, number, inputError, setInputText, submit, loading, error } )
{
	return <View style = { styles.container }>
		<View style = { styles.errorBox }>
			{ error ? <Text style = { styles.errorText }>{ error }</Text> : null }
		</View>
		<Input
			value = { usdtInfo }
			disabled = { true }
			inputBoxStyle = { styles.inputBoxStyle }
			inputStyle = { styles.inputStyle }
			renderInputLeft = { () => <Text>{ I18n.t( "usdtMention.usable" ) }: </Text> }
		/>
		<Input
			index = { "number" }
			value = { number }
			placeholder = { I18n.t( "usdtMention.placeholderNumber" ) }
			hasError = { inputError[ "number" ] }
			inputBoxStyle = { styles.inputBoxStyle }
			inputStyle = { styles.inputStyle }
			setInputText = { setInputText }
			renderInputLeft = { () => <Text>{ I18n.t( "usdtMention.number" ) }: </Text> }
		/>
		<SubmitBtn
			title = { I18n.t( "usdtMention.nextText" ) }
			submitBtnStyle = { styles.submitBtn }
			loading = { loading }
			onSubmit = { submit }
		/>
	</View>;
} )

const UsdtMention = React.memo( function( props )
{
	React.useEffect( function()
	{
		return props.clear;
	}, [] );
	if( Object.keys( props.valuationData ).length )
	{
		return <ValuationExist
			data = { props.valuationData }
			password = { props.password }
			inputError = { props.inputError }
			setInputText = { props.setInputText }
			fetchCardData = { props.fetchCardData }
			hasCard = { props.hasCard }
			bankCardNumber = { props.bankCardNumber }
			submit = { props.fetchMentionSubmit }
			loading = { props.fetchMentionSubmitLoading }
			error = { props.fetchMentionSubmitError }
		/>
	} else
	{
		return <ValuationNoExist
			usdtInfo = { props.route.params.usdtInfo }
			number = { props.number }
			inputError = { props.inputError }
			setInputText = { props.setInputText }
			submit = { props.fetchValuation }
			loading = { props.fetchValuationDataLoading }
			error = { props.fetchValuationDataError }
		/>;
	};
} );

export default connect(
	function mapStateToProps( state, ownProps )
	{
		const myBankCardData = state.myBankCard;
		const usdtMentionData = state.usdtMention;
		return {
			hasCard: myBankCardData.hasCard,
			bankCardNumber: myBankCardData.bankCardNumber,

			number: usdtMentionData.number,
			password: usdtMentionData.password,
			inputError: usdtMentionData.inputError,
			valuationData: usdtMentionData.valuationData,
			fetchValuationDataLoading: usdtMentionData.fetchValuationDataLoading,
			fetchValuationDataError: usdtMentionData.fetchValuationDataError,

			fetchMentionSubmitLoading: usdtMentionData.fetchMentionSubmitLoading,
			fetchMentionSubmitError: usdtMentionData.fetchMentionSubmitError,
		};
	},
	function mapDispatchToProps( dispatch, ownProps )
	{
		return bindActionCreators( { fetchValuation, fetchMentionSubmit, fetchCardData, clear, setInputText }, dispatch );
	}
)( UsdtMention );

