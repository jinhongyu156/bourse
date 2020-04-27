import React from "react";

import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";

// import { logout } from "./../redux/actions/login.js";

import Input from "./../containers/input.js";
import SubmitBtn from "./../containers/submit.js";

import { bindActionCreators } from "redux";

import { connect } from "react-redux";

import I18n from "i18n-js";

// input box 宽度
const INPUTBOXWIDTH = Dimensions.get( "window" ).width * 0.9;

// input box 高度
const INPUTBOXHEIGHT = 80;

// 提交按钮高度
const SUBMITBTNHEIGHT = 50

// 提示信息 box 高度
const TIPBOXHEIGHT = 120;

const styles = StyleSheet.create( {
	container: { flex: 1, alignItems: "center", marginTop: 20 },

	inputBoxStyle: { width: INPUTBOXWIDTH, height: INPUTBOXHEIGHT, justifyContent: "center" },
	inputStyle: { height: INPUTBOXHEIGHT * 0.8 },
	addressInputStyle: { flex: 7, fontSize: 12 },

	addressBtnBox: { flex: 4, flexDirection: "row", justifyContent: "space-between" },
	addressBtn: { paddingVertical: 5, paddingHorizontal: 10, backgroundColor: "#696DAC" },
	addressBtnText: { color: "#FFFFFF" },

	submitBtn: { width: INPUTBOXWIDTH, height: SUBMITBTNHEIGHT, marginTop: 30 },

	tipBox: { width: INPUTBOXWIDTH, height: TIPBOXHEIGHT, justifyContent: "center" },
	tipText: { fontSize: 12, color: "#9D9D9D" }
} );

const Recharge =  React.memo( function( props )
{
	React.useEffect( () => {
		props.navigation.setOptions( { title: `${ I18n.t( "recharge.title" ) } - ${ props.route.params.name }( ID: ${ props.id } )` } );
	}, [] );

	return <View style = { styles.container }>
		<Input
			index = { "code" }
			value = { "0x18916584198416549816513sadf46s5d46fd51g1hh65" }
			disabled = { true }
			inputBoxStyle = { styles.inputBoxStyle }
			inputStyle = { [ styles.inputStyle, styles.addressInputStyle ] }
			renderInputLeft = { () => <Text>{ I18n.t( "recharge.address" ) }: </Text> }
			renderInputRight = { () => <View style = { styles.addressBtnBox }>
				<TouchableOpacity style = { styles.addressBtn } onPress = { () => {} }>
					<Text style = { styles.addressBtnText }>{ I18n.t( "recharge.getAddress" ) }</Text>
				</TouchableOpacity>
				<TouchableOpacity style = { styles.addressBtn } onPress = { () => {} }>
					<Text style = { styles.addressBtnText }>{ I18n.t( "recharge.copy" ) }</Text>
				</TouchableOpacity>
			</View> }
		/>
		<Input
			index = { "number" }
			value = { "" }
			placeholder = { I18n.t( "recharge.placeholderNumber" ) }
			disabled = { false }
			hasError = { false }
			inputBoxStyle = { styles.inputBoxStyle }
			inputStyle = { styles.inputStyle }
			setInputText = { () => {} }
			renderInputLeft = { () => <Text>{ I18n.t( "recharge.number" ) }: </Text> }
		/>
		<Input
			index = { "number" }
			value = { "" }
			placeholder = { I18n.t( "recharge.placeholderNote" ) }
			disabled = { false }
			hasError = { false }
			inputBoxStyle = { styles.inputBoxStyle }
			inputStyle = { styles.inputStyle }
			setInputText = { () => {} }
			renderInputLeft = { () => <Text>{ I18n.t( "recharge.note" ) }: </Text> }
		/>
		<SubmitBtn
			title = { I18n.t( "recharge.submitText" ) }
			submitBtnStyle = { styles.submitBtn }
			loading = { props.isLoading }
			onSubmit = { () => {} }
		/>
		<View style = { styles.tipBox }>
			<Text style = { styles.tipText }>{ I18n.t( "recharge.tip1" ) }</Text>
			<Text style = { styles.tipText }>{ I18n.t( "recharge.tip2" ) }</Text>
			<Text style = { styles.tipText }>{ I18n.t( "recharge.tip3" ) }</Text>
			<Text style = { styles.tipText }>{ I18n.t( "recharge.tip4" ) }</Text>
		</View>
	</View>;
} );

export default connect(
	function mapStateToProps( state, ownProps )
	{
		const ctcData = state.ctc;

		return {
			id: ctcData.id
		};
	},
	function mapDispatchToProps( dispatch, ownProps )
	{
		return bindActionCreators( {}, dispatch );
	}
)( Recharge );
