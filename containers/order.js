import React from "react";

import { View, Text, Alert, TouchableOpacity, ToastAndroid, StyleSheet } from "react-native";

import I18n from "i18n-js";

import SubmitBtn from "./../containers/submit.js";

import { Accordion } from "./../components/accordion.js";

// 订单标题行的高度
const ACCORDIONTITLEHEIGTH = 50;

// 订单内容行的高度
const ACCORDIONCONTENTITEMHEIGHT = 36;

// 平仓按钮高度
const SUBMITBTNHEIGHT = 40

const styles = StyleSheet.create( {

	container: { marginTop: 6 },

	accordionItem: { marginVertical: 1 },
	accordionTitle: { height: ACCORDIONTITLEHEIGTH, flexDirection: "row", justifyContent: "space-around", alignItems: "center", backgroundColor: "#FFFFFF" },

	accordionContent: { paddingHorizontal: 20 },
	accordionContentItem: { height: ACCORDIONCONTENTITEMHEIGHT, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
	accordionContentItemKeyText: { fontSize: 14, color: "#4E4C58" },
	accordionContentItemValueText: { fontSize: 12, color: "#585862" },

	submitBtn: { width: "80%", height: SUBMITBTNHEIGHT, marginVertical: 10, alignSelf: "center" },

	col10Text: { fontSize: 14, color: "#4E4C58" },
	col11View: { flexDirection: "row" },
	col11Text: { fontSize: 12, color: "#9D9D9D" },

	upColor: { color: "#F4979D" },
	downColor: { color: "#96E89D" },
	normalColor: { color: "#9D9D9D" },

	col50Text: { fontSize: 14, color: "#F4979D" },
	col51Text: { fontSize: 12, color: "#96E89D" },
} );

const AccordionTitle = React.memo( function( { open, index, data } )
{
	const prevPrice = React.useRef( data[ "newprice" ] );
	const [ state, setState ] = React.useState( 0 )

	if( prevPrice.current !== data[ "newprice" ] )
	{
		if( data[ "newprice" ] > prevPrice.current )
		{
			setState( 1 );
		};
		if( data[ "newprice" ] < prevPrice.current )
		{
			setState( -1 );
		};
		prevPrice.current = data[ "newprice" ];
	};

	const color = state > 0 ? styles.upColor : state < 0 ? styles.downColor : state.normalColor;

	return <View style = { styles.accordionTitle }>
		<View>
			<Text style = { styles.col10Text }>{ data[ "产品代码" ] }</Text>
			<View style = { styles.col11View }>
				<Text style = { styles.col11Text }>{ data[ "建仓点数" ] } -></Text>
				<Text style = { [ styles.col11Text, color ] }>{ data[ "newprice" ] }</Text>
			</View>
		</View>
		<React.Fragment>
			<Text style = { data[ "产品方向" ] === "0" ? styles.upColor : styles.downColor }>
				{ data[ "产品方向" ] === "0" ? I18n.t( "contract.buy" ) : I18n.t( "contract.sell" ) }
			</Text>
		</React.Fragment>
		<React.Fragment>
			<Text>{ data[ "购买数量" ] }</Text>
		</React.Fragment>
		<React.Fragment>
			<Text style = { Number( data[ "profit" ] ) > 0 ? styles.upColor : styles.downColor }>{ data[ "profit" ] }</Text>
		</React.Fragment>
		<View>
			<Text style = { styles.col50Text }>{ data[ "止盈价" ] }</Text>
			<Text style = { styles.col51Text }>{ data[ "止损价" ] }</Text>
		</View>
	</View>;
} );

const AccordionContent = React.memo( function( { data, submit } )
{
	const bindSubmit = React.useCallback( function()
	{

		Alert.alert( I18n.t( "contract.submitMessage" ), "", [
			{ text: I18n.t( "contract.cancel" ), style: "cancel" },
			{ text: I18n.t( "contract.confirm" ), onPress: () => submit( { id: data[ "订单号" ] }, res => ToastAndroid.show( res, ToastAndroid.SHORT ) ) },
		], { cancelable: false } );
	}, [ data[ "订单号" ] ] );

	return <View style = { styles.accordionContent }>
		<View style = { styles.accordionContentItem }>
			<Text style = { styles.accordionContentItemKeyText }>{ I18n.t( "contract.time" ) }:</Text>
			<Text style = { styles.accordionContentItemValueText }>{ data[ "time" ] }</Text>
		</View>
		<View style = { styles.accordionContentItem }>
			<Text style = { styles.accordionContentItemKeyText }>{ I18n.t( "contract.orderId" ) }:</Text>
			<Text style = { styles.accordionContentItemValueText }>{ data[ "订单号" ] }</Text>
		</View>
		<View style = { styles.accordionContentItem }>
			<Text style = { styles.accordionContentItemKeyText }>{ I18n.t( "contract.unsubscribe" ) }:</Text>
			<View>
				<Text style = { styles.accordionContentItemValueText }>{ data[ "止盈价" ] }</Text>
				<Text style = { styles.accordionContentItemValueText }>{ data[ "止损价" ] }</Text>
			</View>
		</View>
		<View style = { styles.accordionContentItem }>
			<Text style = { styles.accordionContentItemKeyText }>{ I18n.t( "contract.currentValue" ) }:</Text>
			<Text style = { styles.accordionContentItemValueText }>{ data[ "currentValue" ] }</Text>
		</View>
		<View style = { styles.accordionContentItem }>
			<Text style = { styles.accordionContentItemKeyText }>{ I18n.t( "contract.amount" ) }:</Text>
			<Text style = { styles.accordionContentItemValueText }>{ data[ "总金额" ] }</Text>
		</View>
		<View style = { styles.accordionContentItem }>
			<Text style = { styles.accordionContentItemKeyText }>{ I18n.t( "contract.serviceFee" ) }:</Text>
			<Text style = { styles.accordionContentItemValueText }>{ data[ "总手续费" ] }</Text>
		</View>
		<SubmitBtn title = { I18n.t( "contract.closing" ) } submitBtnStyle = { styles.submitBtn } loading = { false } onSubmit = { bindSubmit } />
	</View>;
} );

export default function( { data, submit } )
{
	return <View style = { styles.container }>
		<Accordion
			data = { data }
			rowStyle = { styles.accordionItem }
			expanded = { [] }
			renderTitle = { ( open, index, data ) => <AccordionTitle data = { data } /> }
			renderContent = { ( open, index, data ) => <AccordionContent data = { data } submit = { submit } /> }
		/>
	</View>
};
