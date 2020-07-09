import React from "react";

import { View, Text, ScrollView, StyleSheet, Keyboard, Dimensions } from "react-native";

import Toast from "react-native-root-toast";

import { fetchSimulatorData, setInputText, clear, fetchUsable, fetchRechargeSubmit, fetchMentionSubmit } from "./../redux/actions/simulator.js";

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
const SUBMITBTNHEIGHT = 42;

// 提示信息 box 高度
const TIPBOXHEIGHT = 150;

// error box 高度
const ERRORBOXHEIGHT = 30;

const styles = StyleSheet.create( {
	container: { flex: 1, alignItems: "center", marginTop: 10 },

	inputBoxStyle: { width: INPUTBOXWIDTH, height: INPUTBOXHEIGHT, justifyContent: "center" },
	inputStyle: { height: INPUTBOXHEIGHT * 0.9, fontSize: 14 },

	submitBtn: { width: INPUTBOXWIDTH, height: SUBMITBTNHEIGHT, marginTop: 30 },

	errorBox: { width: INPUTBOXWIDTH, height: ERRORBOXHEIGHT, justifyContent: "space-around" },
	errorText: { color: "#F00" }
} );

const Recharge = React.memo( function( { number, inputError, fetchSubmit, fetchSubmitError, setInputText } )
{
	return <View style = { styles.container }>
		<View style = { styles.errorBox }>
			{ fetchSubmitError ? <Text style = { styles.errorText }>{ fetchSubmitError }</Text> : null }
		</View>
		<Input index = { "number" } value = { number } placeholder = { I18n.t( "recharge.placeholderNumber" ) } disabled = { false } hasError = { inputError[ "number" ] } inputBoxStyle = { styles.inputBoxStyle } inputStyle = { styles.inputStyle } setInputText = { setInputText } renderInputLeft = { () => <Text>{ I18n.t( "recharge.number" ) }: </Text> } />
		<SubmitBtn title = { I18n.t( "simulator.submit" ) } submitBtnStyle = { styles.submitBtn } loading = { false } onSubmit = { fetchSubmit } />
	</View>;
} );

const Mention = React.memo( function( { usable, address, number, password, inputError, fetchSubmit, fetchUsableError, fetchSubmitError, setInputText } )
{
	return <View style = { styles.container }>
		<View style = { styles.errorBox }>
			{ fetchUsableError ? <Text style = { styles.errorText }>{ fetchUsableError }</Text> : null }
			{ fetchSubmitError ? <Text style = { styles.errorText }>{ fetchSubmitError }</Text> : null }
		</View>
		<Input value = { usable } disabled = { true } inputBoxStyle = { styles.inputBoxStyle } inputStyle = { styles.inputStyle } renderInputLeft = { () => <Text>{ I18n.t( "mention.usable" ) }: </Text> } />
		<Input index = { "address" } value = { address } placeholder = { I18n.t( "mention.placeholderAddress" ) } inputBoxStyle = { styles.inputBoxStyle } inputStyle = { styles.inputStyle } setInputText = { setInputText } renderInputLeft = { () => <Text>{ I18n.t( "mention.address" ) }: </Text> } />
		<Input index = { "number" } value = { number } placeholder = { I18n.t( "mention.placeholderNumber" ) } hasError = { inputError[ "number" ] } inputBoxStyle = { styles.inputBoxStyle } inputStyle = { styles.inputStyle } setInputText = { setInputText } renderInputLeft = { () => <Text>{ I18n.t( "mention.number" ) }: </Text> } />
		<Input value = { "0" } disabled = { true } inputBoxStyle = { styles.inputBoxStyle } inputStyle = { styles.inputStyle } renderInputLeft = { () => <Text>{ I18n.t( "mention.fee" ) }: </Text> } />
		<Input index = { "password" } value = { password } placeholder = { I18n.t( "mention.placeholderPassword" ) } hasError = { inputError[ "password" ] } inputBoxStyle = { styles.inputBoxStyle } inputStyle = { styles.inputStyle } setInputText = { setInputText } renderInputLeft = { () => <Text>{ I18n.t( "mention.password" ) }: </Text> } />
		<SubmitBtn title = { I18n.t( "mention.submitText" ) } submitBtnStyle = { styles.submitBtn } loading = { false } onSubmit = { fetchSubmit } />
	</View>;
} );


const Access = React.memo( function( props )
{
	const isRecharge = props.route.params.type === "recharge";
	const isMention = props.route.params.type === "mention";

	React.useEffect( () => {
		props.navigation.setOptions( { title: `${ isRecharge ? I18n.t( "recharge.title" ) : isMention ? I18n.t( "mention.title" ) : "" } - ${ props.route.params.name }` } );
		return props.clear;
	}, [] );


	if( isMention )
	{
		React.useEffect( () => {
			props.fetchUsable( props.route.params.name );
		}, [] );

		const fetchSubmit = React.useCallback( function()
		{
			props.fetchMentionSubmit( () => {
				Toast.show( I18n.t( "mention.fetchSubmitSuccess" ) );
				props.navigation.goBack();
				props.fetchSimulatorData();
			} );
		}, [] );

		return <ScrollView showsVerticalScrollIndicator = { false } keyboardDismissMode = { "on-drag" } onScrollBeginDrag = { Keyboard.dismiss }>
			<Mention
				usable = { props.usable }
				address = { props.address }
				number = { props.number }
				password = { props.password }
				inputError = { props.inputError }
				fetchSubmit = { fetchSubmit }
				fetchUsableError = { props.fetchUsableError }
				fetchSubmitError = { props.fetchSubmitError }
				setInputText = { props.setInputText }
			/>
		</ScrollView>;
	};

	if( isRecharge )
	{
		const fetchSubmit = React.useCallback( function()
		{
			props.fetchRechargeSubmit( () => {
				Toast.show( I18n.t( "recharge.fetchSubmitSuccess" ) );
				props.navigation.goBack();
				props.fetchSimulatorData();
			} );
		}, [] );

		return <ScrollView showsVerticalScrollIndicator = { false } keyboardDismissMode = { "on-drag" } onScrollBeginDrag = { Keyboard.dismiss }>
			<Recharge
				number = { props.number }
				inputError = { props.inputError }
				fetchSubmit = { fetchSubmit }
				fetchSubmitError = { props.fetchSubmitError }
				setInputText = { props.setInputText }
			/>
		</ScrollView>;
	};
} );


export default connect(
	function mapStateToProps( state, ownProps )
	{
		const simulatorData = state.simulator;

		return {
			usable: simulatorData.usable,
			address: simulatorData.address,
			number: simulatorData.number,
			password: simulatorData.password,
			inputError: simulatorData.inputError,
			fetchUsableError: simulatorData.fetchUsableError,
			fetchSubmitError: simulatorData.fetchSubmitError
		};
	},
	function mapDispatchToProps( dispatch, ownProps )
	{
		return bindActionCreators( { setInputText, clear, fetchSimulatorData, fetchUsable, fetchRechargeSubmit, fetchMentionSubmit }, dispatch );
	}
)( Access );

