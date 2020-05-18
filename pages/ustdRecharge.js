import React from "react";

import { View, Text, ScrollView, TouchableOpacity, TouchableWithoutFeedback, ToastAndroid, StyleSheet, Keyboard, Dimensions } from "react-native";

import I18n from "i18n-js";

import Clipboard from "@react-native-community/clipboard";

import { bindActionCreators } from "redux";

import { connect } from "react-redux";

import { fetchOrderData, fetchRechargeSubmit, fetchNoticePaid, setIsShowPrevState, setInputText, hideActionSheet, showRechargeTypeActionSheet } from "./../redux/actions/ustdRecharge.js";

import Input from "./../containers/input.js";
import SubmitBtn from "./../containers/submit.js";
import ActionSheet from "./../components/actionSheet.js";

// input box 宽度
const INPUTBOXWIDTH = Dimensions.get( "window" ).width * 0.9;

// input box 高度
const INPUTBOXHEIGHT = 60;

// 提交按钮高度
const SUBMITBTNHEIGHT = 42

// 提示信息 box 高度
const TIPBOXHEIGHT = 96;

// error box 高度
const ERRORBOXHEIGHT = 20;

const styles = StyleSheet.create( {
	container: { flex: 1, alignItems: "center", marginTop: 10 },

	inputBoxStyle: { width: INPUTBOXWIDTH, height: INPUTBOXHEIGHT, justifyContent: "center" },
	inputStyle: { height: INPUTBOXHEIGHT * 0.9, fontSize: 14 },
	copyInputStyle: { flex: 9, fontSize: 14 },

	btnBox: { flex: 3, flexDirection: "row", justifyContent: "flex-end" },
	btn: { paddingVertical: 5, paddingHorizontal: 10, backgroundColor: "#696DAC" },
	btnText: { color: "#FFFFFF" },

	stateText: { color: "#F00", marginTop: 10 },
	submitBtn: { width: INPUTBOXWIDTH, height: SUBMITBTNHEIGHT, marginTop: 10 },

	tipBox: { width: INPUTBOXWIDTH, height: TIPBOXHEIGHT, justifyContent: "center" },
	tipText: { fontSize: 12, color: "#9D9D9D" },

	errorBox: { width: INPUTBOXWIDTH, height: ERRORBOXHEIGHT, justifyContent: "space-around", paddingHorizontal: 6 },
	errorText: { color: "#F00" }
} );

const CopyBtn = React.memo( function( { text } )
{
	const copy = React.useCallback( function( text )
	{
		Clipboard.setString( text );
		ToastAndroid.show( I18n.t( "ustdRecharge.copySuccess" ), ToastAndroid.SHORT );
	}, [] );

	return <View style = { styles.btnBox }>
		<TouchableOpacity style = { styles.btn } onPress = { () => copy( text ) }>
			<Text style = { styles.btnText }>{ I18n.t( "ustdRecharge.copy" ) }</Text>
		</TouchableOpacity>
	</View>
} );

const BackBtn = React.memo( function( { setIsShowPrevState } )
{
	const onPress = React.useCallback( function()
	{
		setIsShowPrevState( false );
	}, [] )
	return <View style = { styles.btnBox }>
		<TouchableOpacity style = { styles.btn } onPress = { onPress }>
			<Text style = { styles.btnText }>{ I18n.t( "ustdRecharge.rechargeAgain" ) }</Text>
		</TouchableOpacity>
	</View>
} );

const Recharge = React.memo( function( props )
{
	// console.log( "props", props, props.route.params.usdtPrice );
	React.useEffect( function()
	{
		props.fetchOrderData();
	}, [] );

	if( props.prevOrderDataState === -1 || props.isShowPrevState === false )
	{
		return <View style = { styles.container }>
			<ScrollView showsVerticalScrollIndicator = { false } keyboardDismissMode = { "on-drag" } onScrollBeginDrag = { Keyboard.dismiss }>
				<View style = { styles.errorBox }>
					{ props.fetchRechargeSubmitError ? <Text style = { styles.errorText }>{ props.fetchRechargeSubmitError }</Text> : null }
				</View>
				<Input
					disabled = { true }
					value = { props.route.params.usdtPrice }
					inputBoxStyle = { styles.inputBoxStyle }
					inputStyle = { styles.inputStyle }
					renderInputLeft = { () => <Text>{ I18n.t( "ustdRecharge.usdtPrice" ) }: </Text> }
				/>
				<TouchableOpacity activeOpacity = { 1 } onPress = { props.showRechargeTypeActionSheet }>
					<Input
						disabled = { true }
						value = { props.rechargeType === 0 ? I18n.t( "ustdRecharge.bank" ) : I18n.t( "ustdRecharge.other" ) }
						inputBoxStyle = { styles.inputBoxStyle }
						inputStyle = { styles.inputStyle }
						renderInputLeft = { () => <Text>{ I18n.t( "ustdRecharge.rechargeType" ) }: </Text> }
					/>
				</TouchableOpacity>
				<Input
					index = { "rechargeNumber" }
					value = { props.rechargeNumber }
					placeholder = { I18n.t( "ustdRecharge.rechargeNumberPlaceholder" ) }
					hasError = { props.inputError[ "rechargeNumber" ] }
					inputBoxStyle = { styles.inputBoxStyle }
					inputStyle = { styles.inputStyle }
					setInputText = { props.setInputText }
					renderInputLeft = { () => <Text>{ I18n.t( "ustdRecharge.rechargeNumber" ) }: </Text> }
				/>
				<SubmitBtn
					title = { I18n.t( "ustdRecharge.submitText" ) }
					submitBtnStyle = { styles.submitBtn }
					loading = { props.rechargeSubmitLoading }
					onSubmit = { props.fetchRechargeSubmit }
				/>
				<View style = { styles.tipBox }>
					<Text style = { styles.tipText }>1: { I18n.t( "ustdRecharge.tip1" ) }</Text>
					<Text style = { styles.tipText }>2: { I18n.t( "ustdRecharge.tip2" ) }</Text>
					<Text style = { styles.tipText }>3: { I18n.t( "ustdRecharge.tip3" ) }</Text>
				</View>
				<ActionSheet
					{ ...props.actionSheetData }
					hide = { props.hideActionSheet }
					isShow = { props.isShowActionSheet }
				/>
			</ScrollView>
		</View>;
	};

	if( props.prevOrderDataState === 0 || props.prevOrderDataState === 1 || props.prevOrderDataState === 2 || props.prevOrderDataState === 3 || props.prevOrderDataState === 4 )
	{
		return <View style = { styles.container }>
			<ScrollView showsVerticalScrollIndicator = { false } keyboardDismissMode = { "on-drag" } onScrollBeginDrag = { Keyboard.dismiss }>
				<View style = { styles.errorBox }>
					{ props.fetchNoticePaidError ? <Text style = { styles.errorText }>{ props.fetchNoticePaidError }</Text> : null }
				</View>
				<Input
					disabled = { true }
					value = { props.orderData[ "订单号" ] }
					inputBoxStyle = { styles.inputBoxStyle }
					inputStyle = { styles.inputStyle }
					renderInputLeft = { () => <Text>{ I18n.t( "ustdRecharge.orderId" ) }: </Text> }
				/>
				<Input
					disabled = { true }
					value = { props.orderData[ "订单状态" ] === "0" ? I18n.t( "ustdRecharge.state0tip" )
						: props.orderData[ "订单状态" ] === "1" ? I18n.t( "ustdRecharge.state1tip" )
						: props.orderData[ "订单状态" ] === "2" ? I18n.t( "ustdRecharge.state2tip" )
						: props.orderData[ "订单状态" ] === "3" ? I18n.t( "ustdRecharge.state3tip" )
						: props.orderData[ "订单状态" ] === "4" ? I18n.t( "ustdRecharge.state4tip" )
						: "" }
					inputBoxStyle = { styles.inputBoxStyle }
					inputStyle = { [ styles.inputStyle, styles.copyInputStyle ] }
					renderInputLeft = { () => <Text>{ I18n.t( "ustdRecharge.state" ) }: </Text> }
					renderInputRight = { () => ( props.orderData[ "订单状态" ] === "3" || props.orderData[ "订单状态" ] === "4" ) ? <BackBtn setIsShowPrevState = { props.setIsShowPrevState } /> : null }
				/>
				<Input
					disabled = { true }
					value = { props.orderData[ "bankName" ] }
					inputBoxStyle = { styles.inputBoxStyle }
					inputStyle = { [ styles.inputStyle, styles.copyInputStyle ] }
					renderInputLeft = { () => <Text>{ I18n.t( "ustdRecharge.bankName" ) }: </Text> }
					renderInputRight = { () => props.prevOrderDataState === 0 ? <CopyBtn text = { props.orderData[ "bankName" ] } /> : null }
				/>
				<Input
					disabled = { true }
					value = { props.orderData[ "accountTitle" ] }
					inputBoxStyle = { styles.inputBoxStyle }
					inputStyle = { [ styles.inputStyle, styles.copyInputStyle ] }
					renderInputLeft = { () => <Text>{ I18n.t( "ustdRecharge.accountTitle" ) }: </Text> }
					renderInputRight = { () => props.prevOrderDataState === 0 ? <CopyBtn text = { props.orderData[ "accountTitle" ] } /> : null }
				/>
				<Input
					disabled = { true }
					value = { props.orderData[ "account" ] }
					inputBoxStyle = { styles.inputBoxStyle }
					inputStyle = { [ styles.inputStyle, styles.copyInputStyle ] }
					renderInputLeft = { () => <Text>{ I18n.t( "ustdRecharge.account" ) }: </Text> }
					renderInputRight = { () => props.prevOrderDataState === 0 ? <CopyBtn text = { props.orderData[ "account" ] } /> : null }
				/>
				<Input
					disabled = { true }
					value = { props.orderData[ "充值金额" ] }
					inputBoxStyle = { styles.inputBoxStyle }
					inputStyle = { [ styles.inputStyle, styles.copyInputStyle ] }
					renderInputLeft = { () => <Text>{ I18n.t( "ustdRecharge.amount" ) }: </Text> }
					renderInputRight = { () => props.prevOrderDataState === 0 ? <CopyBtn text = { props.orderData[ "充值金额" ] } /> : null }
				/>
				<Input
					disabled = { true }
					value = { "CNY" }
					inputBoxStyle = { styles.inputBoxStyle }
					inputStyle = { styles.inputStyle }
					renderInputLeft = { () => <Text>{ I18n.t( "ustdRecharge.currency" ) }: </Text> }
				/>
				{
					props.prevOrderDataState === 0
						? <React.Fragment>
							<Input
								index = { "drawee" }
								value = { props.drawee }
								placeholder = { I18n.t( "ustdRecharge.draweePlaceholder" ) }
								hasError = { props.inputError[ "drawee" ] }
								inputBoxStyle = { styles.inputBoxStyle }
								inputStyle = { styles.inputStyle }
								setInputText = { props.setInputText }
								renderInputLeft = { () => <Text>{ I18n.t( "ustdRecharge.drawee" ) }: </Text> }
							/>
							<Text style = { styles.stateText }>{ I18n.t( "ustdRecharge.countdownText", { seconds: props.orderData[ "countdown" ] } ) }</Text>
							<SubmitBtn
								title = { I18n.t( "ustdRecharge.noticePaid" ) }
								submitBtnStyle = { styles.submitBtn }
								loading = { props.fetchNoticePaidLoading }
								onSubmit = { props.fetchNoticePaid }
							/>
							<View style = { styles.tipBox }>
								<Text style = { styles.tipText }>1: { I18n.t( "ustdRecharge.tip4" ) }</Text>
								<Text style = { styles.tipText }>2: { I18n.t( "ustdRecharge.tip5" ) }</Text>
								<Text style = { styles.tipText }>3: { I18n.t( "ustdRecharge.tip6" ) }</Text>
							</View>
						</React.Fragment>
						: null
				}
			</ScrollView>
		</View>;
	};

	if( props.prevOrderDataState === null )
	{
		return <View style = { styles.container }>
			<View style = { styles.errorBox }>
				{ props.fetchOrderDataError ? <Text style = { styles.errorText }>{ props.fetchOrderDataError }</Text> : null }
			</View>
		</View>;
	};
} );

export default connect(
	function mapStateToProps( state, ownProps )
	{
		const ustdRechargeData = state.ustdRecharge;
		return {
			isShowPrevState: ustdRechargeData.isShowPrevState,
			orderData: ustdRechargeData.orderData,
			prevOrderDataState: Number( ustdRechargeData.orderData[ "订单状态" ] ),
			fetchOrderDataLoading: ustdRechargeData.fetchOrderDataLoading,
			fetchOrderDataError: ustdRechargeData.fetchOrderDataError,

			rechargeType: ustdRechargeData.rechargeType,
			actionSheetData: ustdRechargeData.actionSheetData,
			isShowActionSheet: ustdRechargeData.isShowActionSheet,
			rechargeNumber: ustdRechargeData.rechargeNumber,
			drawee: ustdRechargeData.drawee,
			inputError: ustdRechargeData.inputError,

			fetchRechargeSubmitLoading: ustdRechargeData.fetchRechargeSubmitLoading,
			fetchRechargeSubmitError: ustdRechargeData.fetchRechargeSubmitError,

			fetchNoticePaidLoading: ustdRechargeData.fetchNoticePaidLoading,
			fetchNoticePaidError: ustdRechargeData.fetchNoticePaidError
		};
	},
	function mapDispatchToProps( dispatch, ownProps )
	{
		return bindActionCreators( { fetchOrderData, fetchRechargeSubmit, fetchNoticePaid, setIsShowPrevState, setInputText, hideActionSheet, showRechargeTypeActionSheet }, dispatch );
	}
)( Recharge );
