import React from "react";

import { View, Text, ScrollView, TouchableOpacity, ToastAndroid, StyleSheet, Keyboard, Dimensions } from "react-native";

import I18n from "i18n-js";

import Clipboard from "@react-native-community/clipboard";

import { bindActionCreators } from "redux";

import { connect } from "react-redux";

import { fetchOrderData, fetchRechargeSubmit, fetchNoticePaid, setIsShowPrevState, setInputText, hideActionSheet, showRechargeTypeActionSheet } from "./../redux/actions/usdtRecharge.js";

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

	btnBox: { flex: 4, flexDirection: "row", justifyContent: "flex-end" },
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
		ToastAndroid.show( I18n.t( "usdtRecharge.copySuccess" ), ToastAndroid.SHORT );
	}, [] );

	return <View style = { styles.btnBox }>
		<TouchableOpacity style = { styles.btn } onPress = { () => copy( text ) }>
			<Text style = { styles.btnText }>{ I18n.t( "usdtRecharge.copy" ) }</Text>
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
			<Text style = { styles.btnText }>{ I18n.t( "usdtRecharge.rechargeAgain" ) }</Text>
		</TouchableOpacity>
	</View>
} );

const NoExist = React.memo( function( { fetchRechargeSubmit, fetchRechargeSubmitLoading, fetchRechargeSubmitError, usdtPrice, rechargeNumber, rechargeType, isShowActionSheet, actionSheetData, inputError, setInputText, showRechargeTypeActionSheet, hideActionSheet } )
{
	return <View style = { styles.container }>
		<ScrollView showsVerticalScrollIndicator = { false } keyboardDismissMode = { "on-drag" } onScrollBeginDrag = { Keyboard.dismiss }>
			<View style = { styles.errorBox }>
				{ fetchRechargeSubmitError ? <Text style = { styles.errorText }>{ fetchRechargeSubmitError }</Text> : null }
			</View>
			<Input
				disabled = { true }
				value = { usdtPrice }
				inputBoxStyle = { styles.inputBoxStyle }
				inputStyle = { styles.inputStyle }
				renderInputLeft = { () => <Text>{ I18n.t( "usdtRecharge.usdtPrice" ) }: </Text> }
			/>
			<TouchableOpacity activeOpacity = { 1 } onPress = { showRechargeTypeActionSheet }>
				<Input
					disabled = { true }
					value = { rechargeType === 0 ? I18n.t( "usdtRecharge.bank" ) : I18n.t( "usdtRecharge.other" ) }
					inputBoxStyle = { styles.inputBoxStyle }
					inputStyle = { styles.inputStyle }
					renderInputLeft = { () => <Text>{ I18n.t( "usdtRecharge.rechargeType" ) }: </Text> }
				/>
			</TouchableOpacity>
			<Input
				index = { "rechargeNumber" }
				value = { rechargeNumber }
				placeholder = { I18n.t( "usdtRecharge.rechargeNumberPlaceholder" ) }
				hasError = { inputError[ "rechargeNumber" ] }
				inputBoxStyle = { styles.inputBoxStyle }
				inputStyle = { styles.inputStyle }
				setInputText = { setInputText }
				renderInputLeft = { () => <Text>{ I18n.t( "usdtRecharge.rechargeNumber" ) }: </Text> }
			/>
			<SubmitBtn
				title = { I18n.t( "usdtRecharge.submitText" ) }
				submitBtnStyle = { styles.submitBtn }
				loading = { fetchRechargeSubmitLoading }
				onSubmit = { fetchRechargeSubmit }
			/>
			<View style = { styles.tipBox }>
				<Text style = { styles.tipText }>1: { I18n.t( "usdtRecharge.tip1" ) }</Text>
				<Text style = { styles.tipText }>2: { I18n.t( "usdtRecharge.tip2" ) }</Text>
				<Text style = { styles.tipText }>3: { I18n.t( "usdtRecharge.tip3" ) }</Text>
			</View>
			<ActionSheet
				{ ...actionSheetData }
				hide = { hideActionSheet }
				isShow = { isShowActionSheet }
			/>
		</ScrollView>
	</View>;
} );

const Exist = React.memo( function( { orderData, prevOrderDataState, setIsShowPrevState, drawee, inputError, setInputText, fetchNoticePaid, fetchNoticePaidLoading, fetchNoticePaidError } )
{
	return <View style = { styles.container }>
		<ScrollView showsVerticalScrollIndicator = { false } keyboardDismissMode = { "on-drag" } onScrollBeginDrag = { Keyboard.dismiss }>
			<View style = { styles.errorBox }>
				{ fetchNoticePaidError ? <Text style = { styles.errorText }>{ fetchNoticePaidError }</Text> : null }
			</View>
			<Input
				disabled = { true }
				value = { orderData[ "订单号" ] }
				inputBoxStyle = { styles.inputBoxStyle }
				inputStyle = { styles.inputStyle }
				renderInputLeft = { () => <Text>{ I18n.t( "usdtRecharge.orderId" ) }: </Text> }
			/>
			<Input
				disabled = { true }
				value = { orderData[ "订单状态" ] === "0" ? I18n.t( "usdtRecharge.state0tip" )
					: orderData[ "订单状态" ] === "1" ? I18n.t( "usdtRecharge.state1tip" )
					: orderData[ "订单状态" ] === "2" ? I18n.t( "usdtRecharge.state2tip" )
					: orderData[ "订单状态" ] === "3" ? I18n.t( "usdtRecharge.state3tip" )
					: orderData[ "订单状态" ] === "4" ? I18n.t( "usdtRecharge.state4tip" )
					: "" }
				inputBoxStyle = { styles.inputBoxStyle }
				inputStyle = { [ styles.inputStyle, styles.copyInputStyle ] }
				renderInputLeft = { () => <Text>{ I18n.t( "usdtRecharge.state" ) }: </Text> }
				renderInputRight = { () => ( orderData[ "订单状态" ] === "3" || orderData[ "订单状态" ] === "4" ) ? <BackBtn setIsShowPrevState = { setIsShowPrevState } /> : null }
			/>
			<Input
				disabled = { true }
				value = { orderData[ "bankName" ] }
				inputBoxStyle = { styles.inputBoxStyle }
				inputStyle = { [ styles.inputStyle, styles.copyInputStyle ] }
				renderInputLeft = { () => <Text>{ I18n.t( "usdtRecharge.bankName" ) }: </Text> }
				renderInputRight = { () => prevOrderDataState === 0 ? <CopyBtn text = { orderData[ "bankName" ] } /> : null }
			/>
			<Input
				disabled = { true }
				value = { orderData[ "accountTitle" ] }
				inputBoxStyle = { styles.inputBoxStyle }
				inputStyle = { [ styles.inputStyle, styles.copyInputStyle ] }
				renderInputLeft = { () => <Text>{ I18n.t( "usdtRecharge.accountTitle" ) }: </Text> }
				renderInputRight = { () => prevOrderDataState === 0 ? <CopyBtn text = { orderData[ "accountTitle" ] } /> : null }
			/>
			<Input
				disabled = { true }
				value = { orderData[ "account" ] }
				inputBoxStyle = { styles.inputBoxStyle }
				inputStyle = { [ styles.inputStyle, styles.copyInputStyle ] }
				renderInputLeft = { () => <Text>{ I18n.t( "usdtRecharge.account" ) }: </Text> }
				renderInputRight = { () => prevOrderDataState === 0 ? <CopyBtn text = { orderData[ "account" ] } /> : null }
			/>
			<Input
				disabled = { true }
				value = { orderData[ "充值金额" ] }
				inputBoxStyle = { styles.inputBoxStyle }
				inputStyle = { [ styles.inputStyle, styles.copyInputStyle ] }
				renderInputLeft = { () => <Text>{ I18n.t( "usdtRecharge.amount" ) }: </Text> }
				renderInputRight = { () => prevOrderDataState === 0 ? <CopyBtn text = { orderData[ "充值金额" ] } /> : null }
			/>
			<Input
				disabled = { true }
				value = { "CNY" }
				inputBoxStyle = { styles.inputBoxStyle }
				inputStyle = { styles.inputStyle }
				renderInputLeft = { () => <Text>{ I18n.t( "usdtRecharge.currency" ) }: </Text> }
			/>
			{
				prevOrderDataState === 0
					? <React.Fragment>
						<Input
							index = { "drawee" }
							value = { drawee }
							placeholder = { I18n.t( "usdtRecharge.draweePlaceholder" ) }
							hasError = { inputError[ "drawee" ] }
							inputBoxStyle = { styles.inputBoxStyle }
							inputStyle = { styles.inputStyle }
							setInputText = { setInputText }
							renderInputLeft = { () => <Text>{ I18n.t( "usdtRecharge.drawee" ) }: </Text> }
						/>
						<Text style = { styles.stateText }>{ I18n.t( "usdtRecharge.countdownText", { seconds: orderData[ "countdown" ] } ) }</Text>
						<SubmitBtn
							title = { I18n.t( "usdtRecharge.noticePaid" ) }
							submitBtnStyle = { styles.submitBtn }
							loading = { fetchNoticePaidLoading }
							onSubmit = { fetchNoticePaid }
						/>
						<View style = { styles.tipBox }>
							<Text style = { styles.tipText }>1: { I18n.t( "usdtRecharge.tip4" ) }</Text>
							<Text style = { styles.tipText }>2: { I18n.t( "usdtRecharge.tip5" ) }</Text>
							<Text style = { styles.tipText }>3: { I18n.t( "usdtRecharge.tip6" ) }</Text>
						</View>
					</React.Fragment>
					: null
			}
		</ScrollView>
	</View>;
} );

const Recharge = React.memo( function( props )
{
	console.log( "props", props );
	React.useEffect( function()
	{
		props.fetchOrderData();
	}, [] );

	if( props.prevOrderDataState === -1 || props.isShowPrevState === false )
	{
		return <NoExist
			fetchRechargeSubmit = { props.fetchRechargeSubmit }
			fetchRechargeSubmitLoading = { props.fetchRechargeSubmitLoading }
			fetchRechargeSubmitError = { props.fetchRechargeSubmitError }
			usdtPrice = { props.route.params.usdtPrice }
			rechargeNumber = { props.rechargeNumber }
			rechargeType = { props.rechargeType }
			isShowActionSheet = { props.isShowActionSheet }
			actionSheetData = { props.actionSheetData }
			inputError = { props.inputError }
			setInputText = { props.setInputText }
			showRechargeTypeActionSheet = { props.showRechargeTypeActionSheet }
			hideActionSheet = { props.hideActionSheet }
		/>;
	};

	if( props.prevOrderDataState === 0 || props.prevOrderDataState === 1 || props.prevOrderDataState === 2 || props.prevOrderDataState === 3 || props.prevOrderDataState === 4 )
	{
		return <Exist
			orderData = { props.orderData }
			prevOrderDataState = { props.prevOrderDataState }
			setIsShowPrevState = { props.setIsShowPrevState }
			drawee = { props.drawee }
			inputError = { props.inputError }
			setInputText = { props.setInputText }
			fetchNoticePaid = { props.fetchNoticePaid }
			fetchNoticePaidLoading = { props.fetchNoticePaidLoading }
			fetchNoticePaidError = { props.fetchNoticePaidError }
		/>;
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
		const usdtRechargeData = state.usdtRecharge;
		return {
			isShowPrevState: usdtRechargeData.isShowPrevState,
			orderData: usdtRechargeData.orderData,
			prevOrderDataState: Object.keys( usdtRechargeData.orderData ).length ? Number( usdtRechargeData.orderData[ "订单状态" ] ) : -1,
			fetchOrderDataLoading: usdtRechargeData.fetchOrderDataLoading,
			fetchOrderDataError: usdtRechargeData.fetchOrderDataError,

			rechargeType: usdtRechargeData.rechargeType,
			actionSheetData: usdtRechargeData.actionSheetData,
			isShowActionSheet: usdtRechargeData.isShowActionSheet,
			rechargeNumber: usdtRechargeData.rechargeNumber,
			drawee: usdtRechargeData.drawee,
			inputError: usdtRechargeData.inputError,

			fetchRechargeSubmitLoading: usdtRechargeData.fetchRechargeSubmitLoading,
			fetchRechargeSubmitError: usdtRechargeData.fetchRechargeSubmitError,

			fetchNoticePaidLoading: usdtRechargeData.fetchNoticePaidLoading,
			fetchNoticePaidError: usdtRechargeData.fetchNoticePaidError
		};
	},
	function mapDispatchToProps( dispatch, ownProps )
	{
		return bindActionCreators( { fetchOrderData, fetchRechargeSubmit, fetchNoticePaid, setIsShowPrevState, setInputText, hideActionSheet, showRechargeTypeActionSheet }, dispatch );
	}
)( Recharge );
