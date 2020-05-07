import React from "react";

import { View, Text, TextInput, ActivityIndicator, TouchableOpacity, ToastAndroid, StyleSheet } from "react-native";

import { bindActionCreators } from "redux";

import { connect } from "react-redux";

import { setHeaderDropdownIndex, setOrderParamsTabIndex, setOrderParamsDropdownIndex } from "./../redux/actions/chart.js";

import Icon from "react-native-vector-icons/FontAwesome";

import I18n from "i18n-js";

import Dropdown from "./../components/dropdown.js";

// 头部高度
const HEADERHEIGHT = 50;

// 头部返回按钮宽度
const GOBACKBOXWIDTH = 80;

// dropdown btn 宽度
const HEADERDROPDOWNBUTTONWIDTH = 130;

// dropdown row 高度
const HEADERDROPDOWNROWHEIGHT = 40;

// userInfo 高度
const USERINFOBOXHEIGHT = 80;

// order 头部高度
const ORDERHEADER = 30;

// order(params) dropdown box 高度
const ORDERPARAMSDROPDOWNBOXHEIGHT = 40;

// order(params) dropdown btn 宽度
const ORDERPARAMSDROPDOWNBUTTONWIDTH = 100;

// order(params) row 高度
const ORDERPARAMSDROPDOWNROWHEIGHT = 40;

const styles = StyleSheet.create( {
	/*modalContainer: { width: MODALWIDTH, height: MODALHEIGHT, borderRadius: 8, backgroundColor: "#FFFFFF" },
	modalOverlay: { position: "absolute", top: 0, right: 0, bottom: 0, left: 0, backgroundColor: "rgba( 0, 0, 0, 0.4 )" },
	modalWrapper: { flex: 1, justifyContent: "center", alignItems: "center" },
	modalTitle: { width: MODALWIDTH, height: MODALTITLEBOXHEIGHT, justifyContent: "center", alignItems: "center" },
	modalTitleText: { fontSize: 22 },
	modalInputBox: { width: MODALWIDTH, height: MODALINPUTHEIGHT, justifyContent: "space-around", alignItems: "center" },
	modalInputView: { flexDirection: "row", alignItems: "center" },
	modalTimeInfoText: { fontSize: 24, marginRight: 10 },

	modalInput: { fontSize: 18, textAlign: "center", width: MODALINPUTBOXWIDTH, height: MODALINPUTHEIGHT * 0.5, borderWidth: 1 },
	modalInputTip: { fontSize: 10, color: "#6D6E77" },
	modalOptionBox: { flexDirection: "row", width: MODALWIDTH, height: MODALOPTIONBOXHEIGHT },
	modalOptionBoxItem: { flex: 1, justifyContent: "center", alignItems: "center" },
	modalOptionBoxItemText: { fontSize: 16, fontWeight: "bold", borderRadius: 50, paddingVertical: 10, paddingHorizontal: 40 },
	modalCancelBtn: { color: "#88898A", borderWidth: 1, borderColor: "#88898A" },
	modalConfirmBtn: { color: "#FFFFFF", backgroundColor: "#696DAC" },
	modalInfoBox: { width: MODALWIDTH, height: MODALINFOBOXHEIGHT, flexDirection: "row", justifyContent: "space-around", alignItems: "center" },
	modalInfoItem: { alignItems: "center" },
	modalInfoBoxText: { fontSize: 12, color: "#6D6E77" },

	correctBorderColor: { borderColor: "#ECECEC" },
	errorBorderColor: { borderColor: "#F00" },
	errorColor: { fontSize: 12, color: "#F00" }*/

	container: { flex: 1, backgroundColor: "#F6F6F6" },
	header: { height: HEADERHEIGHT, flexDirection: "row", alignItems: "center", paddingHorizontal: 10, backgroundColor: "#FFFFFF" },
	headerGobackBox: { width: GOBACKBOXWIDTH },
	headerDropdownContainer: { flex: 1, alignItems: "center" },

	headerDropdownBox: { marginRight: GOBACKBOXWIDTH },
	headerDropdownButton: { width: HEADERDROPDOWNBUTTONWIDTH, height: HEADERHEIGHT * 0.6, flexDirection: "row", justifyContent: "center", alignItems: "center", borderColor: "#E9E9E9", borderWidth: 1, borderRadius: 40 },
	headerDropdownButtonText: { marginRight: 8 },
	headerDropdown: { width: HEADERDROPDOWNBUTTONWIDTH, height: HEADERDROPDOWNROWHEIGHT * 2, marginTop: 2, backgroundColor: "#F6F6F6" },
	headerDropdownRow: { height: HEADERDROPDOWNROWHEIGHT, paddingHorizontal: 10, justifyContent: "center" },
	headerDropdownRowText: { fontSize: 14 },

	userInfoBox: { flexDirection: "row", alignItems: "center", backgroundColor: "#FFFFFF", height: USERINFOBOXHEIGHT },
	userInfoItem: { flex: 1, alignItems: "center" },
	userInfoItemLine: { borderColor: "#F6F6F6", borderRightWidth: 2 },
	userInfoItemTitleText: { fontSize: 18, fontWeight: "bold", color: "#000000" },
	userInfoItemValueText: { fontSize: 12, fontWeight: "normal", color: "#828282" },

	orderBox: { height: 200, flexDirection: "row", backgroundColor: "#FFFFFF", marginTop: 6 },
	orderItem: { flex: 1 },
	orderItemLine: { borderColor: "#E9E9E9", borderRightWidth: 1 },

	orderParamsHeader: { height: ORDERHEADER, flexDirection: "row", borderColor: "#E9E9E9", borderBottomWidth: 1 },
	orderParamsHeaderBtn: { flex: 1, height: ORDERHEADER, justifyContent: "center", alignItems: "center" },
	orderParamsHeaderBtnText: { fontSize: 12 },
	orderParamsHeaderBuyBtnText: { color: "#8DE192" },
	orderParamsHeaderSellBtnText: { color: "#F49BA0" },
	orderParamsHeaderBtnActive: { backgroundColor: "#FFFFFF" },
	orderParamsHeaderBtnInActive: { backgroundColor: "#F6F6F6" },
	orderParamsDropdownBox: { height: ORDERPARAMSDROPDOWNBOXHEIGHT, paddingHorizontal: 10, justifyContent: "center" },
	orderParamsDropdown: { width: ORDERPARAMSDROPDOWNBUTTONWIDTH, height: ORDERPARAMSDROPDOWNROWHEIGHT * 2, marginTop: 2, backgroundColor: "#F6F6F6" },
	orderParamsDropdownRow: { height: ORDERPARAMSDROPDOWNROWHEIGHT, paddingHorizontal: 10, justifyContent: "center" },
	orderParamsDropdownRowText: { fontSize: 12 },
	orderParamsDropdownBtn: { width: ORDERPARAMSDROPDOWNBUTTONWIDTH, height: ORDERPARAMSDROPDOWNBOXHEIGHT * 0.6, flexDirection: "row", justifyContent: "center", alignItems: "center", borderColor: "#E9E9E9", borderWidth: 1, borderRadius: 40 },
	orderParamsDropdownBtnText: { color: "#000000", marginRight: 8, fontSize: 12 },

	orderListHeader: { height: ORDERHEADER, paddingHorizontal: 6, flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderColor: "#E9E9E9", borderBottomWidth: 1 },
	orderListHeaderText: { fontSize: 12 }
} );

const Header = React.memo( function( { onSelect, goBack } )
{
	const options = [ "ETUSD / USDT", "SLBT / USDT" ];

	const dropdownButton = React.useCallback( function( buttonText )
	{
		return <View style = { styles.headerDropdownButton }>
			<Text style = { styles.headerDropdownButtonText }>{ buttonText }</Text>
			<Icon name = "caret-down" size = { 18 } color = "#000000" />
		</View>;
	}, [] );

	return <View style = { styles.header } >
		<TouchableOpacity style = { styles.headerGobackBox } onPress = { goBack }>
			<Icon name = "angle-left" size = { 30 } color = "#000000" />
		</TouchableOpacity>
		<View style = { styles.headerDropdownContainer }>
			<View style = { styles.headerDropdownBox }>
				<Dropdown
					options = { options }
					dropdownStyle = { styles.headerDropdown }
					rowStyle = { styles.headerDropdownRow }
					rowTextStyle = { styles.headerDropdownRowText }
					renderButton = { dropdownButton }
					onSelect = { onSelect }
				/>
			</View>
		</View>
	</View>;
} );

const UserInfo = React.memo( function()
{
	return <View style = { styles.userInfoBox }>
		<View style = { [ styles.userInfoItem, styles.userInfoItemLine ] }>
			<Text style = { styles.userInfoItemTitleText }>9.789</Text>
			<Text style = { styles.userInfoItemValueText }>USDT</Text>
		</View>
		<View style = { [ styles.userInfoItem, styles.userInfoItemLine ] }>
			<Text style = { styles.userInfoItemTitleText }>9.789</Text>
			<Text style = { styles.userInfoItemValueText }>USDT</Text>
		</View>
		<View style = { styles.userInfoItem }>
			<Text style = { styles.userInfoItemTitleText }>9.789</Text>
			<Text style = { styles.userInfoItemValueText }>USDT</Text>
		</View>
	</View>;
} );

const Order = React.memo( function( { tabIndex, dropdownIndex, changeTab, onSelect } )
{
	const tabIndexArr = [ "买入", "卖出" ];

	const options = tabIndex === 0 ? [ "市价买入", "限价买入" ] : [ "市价卖入", "限价卖入" ];

	const dropdownButton = React.useCallback( function( buttonText )
	{
		return <View style = { styles.orderParamsDropdownBtn }>
			<Text style = { styles.orderParamsDropdownBtnText }>{ buttonText }</Text>
			<Icon name = "caret-down" size = { 12 } color = "#000000" />
		</View>;
	}, [] );

	return <View style = { styles.orderBox }>
		<View style = { [ styles.orderItem, styles.orderItemLine ] }>
			<View style = { styles.orderParamsHeader }>
			{
				tabIndexArr.map( function( item, index )
				{
					const textStyle = index === 0 ? styles.orderParamsHeaderBuyBtnText : styles.orderParamsHeaderSellBtnText;
					const viewStyle = [ styles.orderParamsHeaderBtn, index === 0 ? styles.orderItemLine : {}, tabIndex === index ? styles.orderParamsHeaderBtnActive : styles.orderParamsHeaderBtnInActive ];

					return <TouchableOpacity key = { index } style = { viewStyle } onPress = { () => changeTab( index ) }>
						<Text style = { textStyle }>{ item }</Text>
					</TouchableOpacity>;
				} )
			}
			</View>
			<View style = { styles.orderParamsDropdownBox }>
				<Dropdown
					options = { options }
					dropdownStyle = { styles.orderParamsDropdown }
					rowTextStyle = { styles.orderParamsDropdownRowText }
					rowStyle = { styles.orderParamsDropdownRow }
					renderButton = { dropdownButton }
					onSelect = { onSelect }
				/>
			</View>
			<View>
				
			</View>
		</View>
		<View style = { styles.orderItem }>
			<View style = { styles.orderListHeader }>
				<Text style = { styles.orderListHeaderText }>价格 USDT</Text>
				<Text style = { styles.orderListHeaderText }>数量</Text>
			</View>
		</View>
	</View>;
} );

const Chart = function( props )
{
	console.log( "props", props );

	return <View style = { styles.container }>
		<Header onSelect = { props.setHeaderDropdownIndex } goBack = { props.navigation.goBack } />
		<UserInfo />
		<Order
			tabIndex = { props.orderParamsTabIndex }
			dropdownIndex = { props.orderParamsDropdownIndex }
			changeTab = { props.setOrderParamsTabIndex }
			onSelect = { props.setOrderParamsDropdownIndex }
		/>
	</View>
};

export default connect(
	function mapStateToProps( state, ownProps )
	{
		const chartData = state.chart;

		return {
			headerDropdownIndex: chartData.headerDropdownIndex,
			orderParamsDropdownIndex: chartData.orderParamsDropdownIndex,
			orderParamsTabIndex: chartData.orderParamsTabIndex
		};
	},
	function mapDispatchToProps( dispatch, ownProps )
	{
		return bindActionCreators( { setHeaderDropdownIndex, setOrderParamsTabIndex, setOrderParamsDropdownIndex }, dispatch );
	}
)( Chart );
