import React from "react";

import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";

import { fetchBankList, fetchBindCard, fetchUnBindCard, fetchCardData, hideBankSelector, showBankSelector, searchBankList, setCurrentBank, setInputText } from "./../redux/actions/myBankCard.js";

import { bindActionCreators } from "redux";

import { connect } from "react-redux";

import I18n from "i18n-js";

import Input from "./../containers/input.js";
import SubmitBtn from "./../containers/submit.js";
import BankSelector from "./../containers/bankSelector.js";

// input box 宽度
const INPUTBOXWIDTH = Dimensions.get( "window" ).width * 0.9;

// input box 高度
const INPUTBOXHEIGHT = 60;

// 提交按钮高度
const SUBMITBTNHEIGHT = 42;

// error box 高度
const ERRORBOXHEIGHT = 30;


const styles = StyleSheet.create( {
	container: { flex: 1, alignItems: "center", marginTop: 10 },

	bankBoxStyle: { flexDirection: "row", width: INPUTBOXWIDTH, height: INPUTBOXHEIGHT, alignItems: "center" },
	inputBoxStyle: { width: INPUTBOXWIDTH, height: INPUTBOXHEIGHT, justifyContent: "center" },
	inputStyle: { height: INPUTBOXHEIGHT * 0.9, fontSize: 14 },
	editInputStyle: { flex: 7, fontSize: 14 },
	activeColor: { color: "#000000", paddingHorizontal: 14 },
	inActiveColor: { color: "#999999", paddingHorizontal: 14 },

	editBtnBox: { flex: 4, flexDirection: "row", justifyContent: "space-between" },
	editBtn: { paddingVertical: 5, paddingHorizontal: 10, backgroundColor: "#696DAC" },
	editBtnText: { color: "#FFFFFF" },

	submitBtn: { width: INPUTBOXWIDTH, height: SUBMITBTNHEIGHT, marginTop: 30 },

	errorBox: { width: INPUTBOXWIDTH, height: ERRORBOXHEIGHT, justifyContent: "space-around" },
	errorText: { color: "#F00" }
} );

const MyBankCard = function( props )
{

	React.useEffect( function()
	{
		props.fetchCardData();
	}, [] );
	
	return <View style = { styles.container }>
		<View style = { styles.errorBox }>
			{
				props.hasCard
					? ( props.fetchUnBindCardError ? <Text style = { styles.errorText }>{ props.fetchUnBindCardError }</Text> : null )
					: ( props.fetchBindCardError ? <Text style = { styles.errorText }>{ props.fetchBindCardError }</Text> : null )
			}
		</View>
		<TouchableOpacity activeOpacity = { 1 } style = { styles.bankBoxStyle } onPress = { props.showBankSelector } disabled = { !!props.hasCard }>
			<Text>{ I18n.t( "myBankCard.bankName" ) }: </Text>
			<Text style = { props.hasCard ? styles.inActiveColor : styles.activeColor }>{ props.bankName ? props.bankName : I18n.t( "myBankCard.placeholderBankName" ) }</Text>
			{ /* <Input
				disabled = { true }
				value = { props.bankName }
				placeholder = { I18n.t( "myBankCard.placeholderBankName" ) }
				inputBoxStyle = { styles.inputBoxStyle }
				inputStyle = { styles.inputStyle }
				renderInputLeft = { () => <Text>{ I18n.t( "myBankCard.bankName" ) }: </Text> }
			/> */ }
		</TouchableOpacity>
		<Input
			index = { "bankDeposit" }
			value = { props.bankDeposit }
			disabled = { props.hasCard }
			placeholder = { I18n.t( "myBankCard.placeholderBankDeposit" ) }
			inputBoxStyle = { styles.inputBoxStyle }
			inputStyle = { styles.inputStyle }
			setInputText = { props.setInputText }
			renderInputLeft = { () => <Text>{ I18n.t( "myBankCard.bankDeposit" ) }: </Text> }
		/>
		<Input
			index = { "bankCardNumber" }
			value = { props.bankCardNumber }
			disabled = { props.hasCard }
			placeholder = { I18n.t( "myBankCard.placeholderBankCardNumber" ) }
			hasError = { props.inputError[ "bankCardNumber" ] }
			inputBoxStyle = { styles.inputBoxStyle }
			inputStyle = { styles.inputStyle }
			setInputText = { props.setInputText }
			renderInputLeft = { () => <Text>{ I18n.t( "myBankCard.bankCardNumber" ) }: </Text> }
		/>
		<SubmitBtn
			title = { props.hasCard ? I18n.t( "myBankCard.unBind" ) : I18n.t( "myBankCard.bind" ) }
			submitBtnStyle = { styles.submitBtn }
			loading = { props.hasCard ? props.fetchUnBindCardLoading : props.fetchBindCardLoading }
			onSubmit = { props.hasCard ? props.fetchUnBindCard : props.fetchBindCard }
		/>
		<BankSelector
			isShow = { props.isShowBankSelector }
			onBack = { props.hideBankSelector }
			
			search = { props.searchBankList }
			onSelect = { props.setCurrentBank }

			fetchData = { props.fetchBankList }
			data = { props.bankListData }
			error = { props.fetchBankListDataError }
			isLoading = { props.fetchBankListDataLoading }
		/>
	</View>;
};

export default connect(
	function mapStateToProps( state, ownProps )
	{
		const myBankCardData = state.myBankCard;
		
		return {
			hasCard: myBankCardData.hasCard,

			bankId: myBankCardData.bankId,
			bankName: myBankCardData.bankName,

			bankDeposit: myBankCardData.bankDeposit,
			bankCardNumber: myBankCardData.bankCardNumber,

			inputError: myBankCardData.inputError,
			isShowBankSelector: myBankCardData.isShowBankSelector,

			bankListData: myBankCardData.bankListData,
			fetchBankListDataLoading: myBankCardData.fetchBankListDataLoading,
			fetchBankListDataError: myBankCardData.fetchBankListDataError,

			fetchBindCardLoading: myBankCardData.fetchBindCardLoading,
			fetchBindCardError: myBankCardData.fetchBindCardError,

			fetchUnBindCardLoading: myBankCardData.fetchUnBindCardLoading,
			fetchUnBindCardError: myBankCardData.fetchUnBindCardError,

			fetchCardDataLoading: myBankCardData.fetchCardDataLoading,
			fetchCardDataError: myBankCardData.fetchCardDataError
		};
	},
	function mapDispatchToProps( dispatch, ownProps )
	{
		return bindActionCreators( { fetchBankList, fetchBindCard, fetchUnBindCard, fetchCardData, hideBankSelector, showBankSelector, searchBankList, setCurrentBank, setInputText }, dispatch );
	}
)( MyBankCard );

