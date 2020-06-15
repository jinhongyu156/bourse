import React from "react";

import { View, Text, Modal, TextInput, ActivityIndicator, TouchableOpacity, StyleSheet, Dimensions } from "react-native";

import Toast from "react-native-root-toast";

import I18n from "i18n-js";

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
	modalContainer: { width: MODALWIDTH, height: MODALHEIGHT, borderRadius: 8, backgroundColor: "#FFFFFF" },
	modalOverlay: { position: "absolute", top: 0, right: 0, bottom: 0, left: 0, backgroundColor: "rgba( 0, 0, 0, 0.4 )" },
	modalWrapper: { flex: 1, justifyContent: "center", alignItems: "center" },
	modalTitle: { width: MODALWIDTH, height: MODALTITLEBOXHEIGHT, justifyContent: "center", alignItems: "center" },
	modalTitleText: { fontSize: 22 },
	modalInputBox: { width: MODALWIDTH, height: MODALINPUTHEIGHT, justifyContent: "space-around", alignItems: "center" },
	modalInputView: { flexDirection: "row", alignItems: "center" },
	modalTimeInfoText: { fontSize: 24, marginRight: 10 },

	modalInput: { fontSize: 18, textAlign: "center", width: MODALINPUTBOXWIDTH, height: MODALINPUTHEIGHT * 0.5, borderWidth: 1 },
	modalInputTip: { fontSize: 10, color: "#6D6E77" },
	modalOptionBox: { flexDirection: "row", width: MODALWIDTH, height: MODALOPTIONBOXHEIGHT},
	modalOptionBoxItem: { flex: 1, justifyContent: "center", alignItems: "center" },
	modalOptionBoxItemView: { height: MODALOPTIONBOXHEIGHT * 0.4, justifyContent: "center", borderRadius: 50, paddingHorizontal: 40 },
	modalOptionBoxItemText: { fontSize: 16, fontWeight: "bold" },
	modalCancelBtn: { color: "#88898A" },
	modalConfirmBtn: { color: "#FFFFFF" },

	modalCancelBtnView: { borderWidth: 1, borderColor: "#88898A" },
	modalConfirmBtnView: { backgroundColor: "#696DAC" },


	modalInfoBox: { width: MODALWIDTH, height: MODALINFOBOXHEIGHT, flexDirection: "row", justifyContent: "space-around", alignItems: "center" },
	modalInfoItem: { alignItems: "center" },
	modalInfoBoxText: { fontSize: 12, color: "#6D6E77" },

	correctBorderColor: { borderColor: "#ECECEC" },
	errorBorderColor: { borderColor: "#F00" },
	errorColor: { fontSize: 12, color: "#F00" }
} );


export default React.memo( function( { callback, visible, title, text, times, inputError, fecthError, isloading, tip, setModalText, hideModal, etusdInfo, usdtInfo, pointInfo } )
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
			Toast.show( I18n.t( "finance.exchange.exchangeSuccess" ) );
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
					<View style = { styles.modalInputView }>
						{ times ? <Text style = { styles.modalTimeInfoText }>{ times } *</Text> : null }
						<TextInput
							style = { [ styles.modalInput, inputError ? styles.errorBorderColor : styles.correctBorderColor ] }
							value = { text }
							keyboardType = { "numeric" }
							placeholder = { I18n.t( "finance.exchange.placeholder" ) }
							onChangeText = { setModalText }
						/>
					</View>
					<Text style = { styles.modalInputTip }>{ tip }</Text>
				</View>
				<View style = { styles.modalOptionBox }>
					<TouchableOpacity style = { styles.modalOptionBoxItem } onPress = { hide }>
						<View style = { [ styles.modalOptionBoxItemView, styles.modalCancelBtnView ] }>
							<Text style = { [ styles.modalOptionBoxItemText, styles.modalCancelBtn ] }>{ I18n.t( "finance.exchange.cancelText" ) }</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity style = { styles.modalOptionBoxItem } disabled = { isloading } onPress = { submit }>
					{
						isloading
							? <View style = { [ styles.modalOptionBoxItemText, styles.modalConfirmBtn ] }>
								<ActivityIndicator size = "small" color = "#FFFFFF" />
							</View>
							: <View style = { [ styles.modalOptionBoxItemView, styles.modalConfirmBtnView ] }>
								<Text style = { [ styles.modalOptionBoxItemText, styles.modalConfirmBtn ] }>{ I18n.t( "finance.exchange.exchangeText" ) }</Text>
							</View>
					}
					</TouchableOpacity>
				</View>
				<View style = { styles.modalInfoBox }>
					<View style = { styles.modalInfoItem }>
						<Text style = { styles.modalInfoBoxText }>{ I18n.t( "finance.exchange.balance", { name: "ETUSD" } ) }</Text>
						<Text style = { styles.modalInfoBoxText }>{ etusdInfo }</Text>
					</View>
					<View style = { styles.modalInfoItem }>
						<Text style = { styles.modalInfoBoxText }>{ I18n.t( "finance.exchange.balance", { name: "USDT" } ) }</Text>
						<Text style = { styles.modalInfoBoxText }>{ usdtInfo }</Text>
					</View>
					<View style = { styles.modalInfoItem }>
						<Text style = { styles.modalInfoBoxText }>{ I18n.t( "finance.exchange.balance", { name: I18n.t( "finance.exchange.point" ) } ) }</Text>
						<Text style = { styles.modalInfoBoxText }>{ pointInfo }</Text>
					</View>
				</View>
			</View>
		</View>
	</Modal>;
} );
