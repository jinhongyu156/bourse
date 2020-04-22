import React from "react";

import { View, Text, Modal, TextInput, ActivityIndicator, TouchableOpacity, ToastAndroid, Image, StyleSheet, Dimensions } from "react-native";

import I18n from "i18n-js";

// import Modal from "./../components/modal.js";

// 兑换操作容器高度
const EXCHANGEHEIGHT = 110;

// 兑换操作项目 icon 宽高
const EXCHANGEICONSIZE = 58;

// Modal 宽度
const MODALWIDTH = Dimensions.get( "window" ).width * 0.8;

// Modal 高度
const MODALHEIGHT = Dimensions.get( "window" ).height * 0.45;

// Modal 标题高度
const MODALTITLEBOXHEIGHT = MODALHEIGHT * 0.25;			// 25

// Modal input box 宽度
const MODALINPUTBOXWIDTH = MODALWIDTH * 0.6;

// Modal input box 高度
const MODALINPUTHEIGHT = MODALHEIGHT * 0.3;				// 30

// Modal option box 高度
const MODALOPTIONBOXHEIGHT = MODALHEIGHT * 0.3;			// 30

// Modal info box 高度
const MODALINFOBOXHEIGHT = MODALHEIGHT * 0.15;			// 15

const styles = StyleSheet.create( {
	container: { flexDirection: "row", marginTop: 6, height: EXCHANGEHEIGHT, backgroundColor: "#FFFFFF" },
	exchangeItem: { flex: 1, justifyContent: "space-around", alignItems: "center" },
	exchangeIcon: { width: EXCHANGEICONSIZE, height: EXCHANGEICONSIZE },
	exchangeItemText: { color: "#777777" },

	modalContainer: { width: MODALWIDTH, height: MODALHEIGHT, borderRadius: 8, backgroundColor: "#FFFFFF" },
	modalOverlay: { position: "absolute", top: 0, right: 0, bottom: 0, left: 0, backgroundColor: "rgba( 0, 0, 0, 0.4 )" },
	modalWrapper: { flex: 1, justifyContent: "center", alignItems: "center" },
	modalTitle: { width: MODALWIDTH, height: MODALTITLEBOXHEIGHT, justifyContent: "center", alignItems: "center" },
	modalTitleText: { fontSize: 22 },
	modalInputBox: { width: MODALWIDTH, height: MODALINPUTHEIGHT, justifyContent: "space-around", alignItems: "center" },
	modalInput: { fontSize: 18, textAlign: "center", width: MODALINPUTBOXWIDTH, height: MODALINPUTHEIGHT * 0.5, borderWidth: 1 },
	modalInputTip: { fontSize: 12, color: "#6D6E77" },
	modalOptionBox: { flexDirection: "row", width: MODALWIDTH, height: MODALOPTIONBOXHEIGHT },
	modalOptionBoxItem: { flex: 1, justifyContent: "center", alignItems: "center" },
	modalOptionBoxItemText: { fontSize: 18, fontWeight: "bold", borderRadius: 50, paddingVertical: 10, paddingHorizontal: 40 },
	modalCancelBtn: { color: "#88898A", borderWidth: 1, borderColor: "#88898A" },
	modalConfirmBtn: { color: "#FFFFFF", backgroundColor: "#696DAC" },
	modalInfoBox: { width: MODALWIDTH, height: MODALINFOBOXHEIGHT, flexDirection: "row", justifyContent: "space-around", alignItems: "center" },
	modalInfoItem: { alignItems: "center" },
	modalInfoBoxText: { fontSize: 12, color: "#6D6E77" },

	correctBorderColor: { borderColor: "#ECECEC" },
	errorBorderColor: { borderColor: "#F00" },
	errorColor: { fontSize: 12, color: "#F00" }
} );

/*


*/

const ModalCard = React.memo( function( { callback, visible, title, text, inputError, fecthError, isloading, tip, setModalText, hideModal } )
{
	// 关闭 modal, 不发送请求
	const hide = React.useCallback( function()
	{
		hideModal( 0 );
	}, [] );

	// 关闭 modal, 发送请求
	const submit = React.useCallback( function()
	{
		hideModal( 1, () => {
			callback();
			ToastAndroid.show( I18n.t( "finance.exchange.exchangeSuccess" ), ToastAndroid.SHORT );
		} );
	}, [] );

	return <Modal visible = { visible } animationType = "none" transparent onRequestClose = { hide }>
		<View style = { styles.modalWrapper }>
			<Text style = { styles.modalOverlay } onPress = { hide } />
			<View style = { styles.modalContainer }>
				<View style = { styles.modalTitle }>
					<Text style = { styles.modalTitleText }>{ title }</Text>
					{ fecthError ? <Text style = { styles.errorColor }>{ fecthError }</Text> : null }
				</View>
				<View style = { styles.modalInputBox }>
					<TextInput
						style = { [ styles.modalInput, inputError ? styles.errorBorderColor : styles.correctBorderColor ] }
						value = { text }
						keyboardType = { "numeric" }
						placeholder = { I18n.t( "finance.exchange.placeholder" ) }
						onChangeText = { setModalText }
					/>
					<Text style = { styles.modalInputTip }>{ tip }</Text>
				</View>
				<View style = { styles.modalOptionBox }>
					<TouchableOpacity style = { styles.modalOptionBoxItem } onPress = { hide }>
						<Text style = { [ styles.modalOptionBoxItemText, styles.modalCancelBtn ] }>{ I18n.t( "finance.exchange.cancelText" ) }</Text>
					</TouchableOpacity>
					<TouchableOpacity style = { styles.modalOptionBoxItem } disabled = { isloading } onPress = { submit }>
					{
						isloading
							? <View style = { [ styles.modalOptionBoxItemText, styles.modalConfirmBtn ] }>
								<ActivityIndicator size = "small" color = "#FFFFFF" />
							</View>
							: <Text style = { [ styles.modalOptionBoxItemText, styles.modalConfirmBtn ] }>{ I18n.t( "finance.exchange.exchangeText" ) }</Text>
					}
					</TouchableOpacity>
				</View>
				<View style = { styles.modalInfoBox }>
					<View style = { styles.modalInfoItem }>
						<Text style = { styles.modalInfoBoxText }>{ I18n.t( "finance.exchange.balance", { name: "ETUSD" } ) }</Text>
						<Text style = { styles.modalInfoBoxText }>0.00</Text>
					</View>
					<View style = { styles.modalInfoItem }>
						<Text style = { styles.modalInfoBoxText }>{ I18n.t( "finance.exchange.balance", { name: "USDT" } ) }</Text>
						<Text style = { styles.modalInfoBoxText }>0.00</Text>
					</View>
					<View style = { styles.modalInfoItem }>
						<Text style = { styles.modalInfoBoxText }>{ I18n.t( "finance.exchange.balance", { name: I18n.t( "finance.exchange.point" ) } ) }</Text>
						<Text style = { styles.modalInfoBoxText }>0.00</Text>
					</View>
				</View>
			</View>
		</View>
	</Modal>;
} );


export default React.memo( function Exchange( { modalData, callback, setModalText, showModal, hideModal } )
{
	console.log( "Exchange", "re-render", modalData );

	return <View style = { styles.container }>
		<TouchableOpacity style = { styles.exchangeItem } onPress = { () => showModal( "USD兑换ETU" ) }>
			<Image style = { styles.exchangeIcon } source = { require( "./../images/usdt_to_etu.png" ) } />
			<React.Fragment>
				<Text style = { styles.exchangeItemText }>USDT { I18n.t( "finance.exchange.exchangeText" ) }</Text>
				<Text style = { styles.exchangeItemText }>ETU</Text>
			</React.Fragment>
		</TouchableOpacity>
		<TouchableOpacity style = { styles.exchangeItem } onPress = { () => showModal( "积分兑USDT" ) }>
			<Image style = { styles.exchangeIcon } source = { require( "./../images/point_to_usdt.png" ) } />
			<React.Fragment>
				<Text style = { styles.exchangeItemText }>{ I18n.t( "finance.exchange.potintExchange" ) }</Text>
				<Text style = { styles.exchangeItemText }>USDT</Text>
			</React.Fragment>
		</TouchableOpacity>
		<TouchableOpacity style = { styles.exchangeItem } onPress = { () => showModal( "积分兑ETUSD" ) }>
			<Image style = { styles.exchangeIcon } source = { require( "./../images/point_to_etusd.png" ) } />
			<React.Fragment>
				<Text style = { styles.exchangeItemText }>{ I18n.t( "finance.exchange.potintExchange" ) }</Text>
				<Text style = { styles.exchangeItemText }>ETUSD</Text>
			</React.Fragment>
		</TouchableOpacity>
		{ modalData ? <ModalCard { ...modalData } callback = { callback } setModalText = { setModalText } hideModal = { hideModal } /> : null }
	</View>;
} );
