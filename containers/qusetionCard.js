import React from "react";

import { View, Text, Modal, TextInput, ActivityIndicator, TouchableOpacity, StyleSheet, Dimensions } from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";

import I18n from "i18n-js";

// Modal 宽度
const MODALWIDTH = Dimensions.get( "window" ).width * 0.9;

// Modal 高度
const MODALHEIGHT = Dimensions.get( "window" ).height * 0.5;

const styles = StyleSheet.create( {
	modalContainer: { width: MODALWIDTH, height: MODALHEIGHT, borderRadius: 8, backgroundColor: "#FFFFFF" },
	modalOverlay: { position: "absolute", top: 0, right: 0, bottom: 0, left: 0, backgroundColor: "rgba( 0, 0, 0, 0.4 )" },
	modalWrapper: { flex: 1, justifyContent: "center", alignItems: "center" },
	
	loadingBox: { height: MODALHEIGHT, alignItems: "center", justifyContent: "center" },
	errorBox: { height: MODALHEIGHT * 0.5, alignItems: "center", justifyContent: "center" },
	errorText: { fontSize: 18, color: "#F00" },

	titleBox: { height: MODALHEIGHT * 0.28, justifyContent: "center", paddingHorizontal: 12, borderColor: "#F5F5F5", borderBottomWidth: 2 },
	titleText: { fontSize: 20, fontWeight: "bold" },
	tipBox: { height: 56, justifyContent: "space-around", paddingHorizontal: 4 },
	tipText: { fontSize: 12, color: "#999999" },

	optionsBox: { height: MODALHEIGHT * 0.59, paddingHorizontal: 16, paddingVertical: 8, borderColor: "#F5F5F5", borderBottomWidth: 2 },
	questionBox: { flex: 1, justifyContent: "center" },
	questionText: { fontSize: 16, fontWeight: "bold", color: "#696DAC" },
	optionItem: { flex: 1, flexDirection: "row", paddingHorizontal: 8 },
	optionItemTextBox: { flex: 1, justifyContent: "center" },
	optionItemText: { color: "#10122A" },
	optionsIconBox: { width: 40, justifyContent: "center", alignItems: "center" },
	activeOptionItem: { backgroundColor: "#F5F5F5" },

	submitBox: { height: MODALHEIGHT * 0.13, flexDirection: "row" },
	submitItem: { flex: 1, alignItems: "center", justifyContent: "center" },
	divider: { width: 2, backgroundColor: "#F5F5F5" }
} );

const Loading = React.memo( function()
{
	return <View style = { styles.loadingBox }>
		<ActivityIndicator size = "small" color = "#696DAC" />
	</View>
} );

const ErrorInfo = React.memo( function( { error } )
{
	return <View style = { styles.errorBox }>
		<Text style = { styles.errorText }>{ error }</Text>
	</View>;
} );

const Option = React.memo( function( { data, selected, onSelect } )
{
	return data.map( function( item, index )
	{
		return <TouchableOpacity key = { index } style = { [ styles.optionItem, selected === item[ "key" ] ? styles.activeOptionItem : {} ] } onPress = { () => onSelect( item[ "key" ] ) }>
			<View style = { styles.optionItemTextBox }><Text style = { styles.optionItemText }>{ item[ "key" ] }: { item[ "value" ] }</Text></View>
			{ selected === item[ "key" ] ? <View style = { styles.optionsIconBox }><Icon name = "check" size = { 18 } color = "#696DAC" /></View> : null }
		</TouchableOpacity>;
	} )
} );

export default React.memo( function( { loading, visible, options, type, title, answer, selected, error, hideModal, onSelect, submit } )
{
	return <Modal visible = { visible } animationType = "none" transparent onRequestClose = { hideModal }>
		<View style = { styles.modalWrapper }>
			<Text style = { styles.modalOverlay } onPress = { hideModal } />
			<View style = { styles.modalContainer }>
			{
				error
					? <ErrorInfo error = { error } />
					: loading
						? <Loading />
						: <React.Fragment>
							<View style = { styles.titleBox }>
								<Text style = { styles.titleText }>{ type }</Text>
								<View style = { styles.tipBox }>
									<Text style = { styles.tipText }>{ I18n.t( "finance.question.tip1" ) }</Text>
									<Text style = { styles.tipText }>{ I18n.t( "finance.question.tip2" ) }</Text>
								</View>
							</View>
							<View style = { styles.optionsBox }>
								<View style = { styles.questionBox }>
									<Text style = { styles.questionText }>{ title }</Text>
								</View>
								<Option data = { options } selected = { selected } onSelect = { onSelect } />
							</View>
							<View style = { styles.submitBox }>
								<TouchableOpacity style = { styles.submitItem } onPress = { hideModal }>
									<Text>{ I18n.t( "finance.question.cancel" ) }</Text>
								</TouchableOpacity>
								<View style = { styles.divider } />
								<TouchableOpacity style = { styles.submitItem } onPress = { submit }>
									<Text>{ I18n.t( "finance.question.submit" ) }</Text>
								</TouchableOpacity>
							</View>
						</React.Fragment>
			}
			</View>
		</View>
	</Modal>;
} );
