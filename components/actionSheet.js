import React from "react";

import { Text, View, Dimensions, Modal, TouchableOpacity, StyleSheet, Animated, ScrollView, Easing } from "react-native";

const MARK_COLOR = "#FF3B30";
const MAX_HEIGHT = Dimensions.get( "window" ).height * 0.7;

const styles = StyleSheet.create( {

	overlay: { position: "absolute", top: 0, right: 0, bottom: 0, left: 0, backgroundColor: "rgba( 0, 0, 0, 0.4 )" },
	wrapper: { flex: 1, flexDirection: "row" },
	body: { flex: 1, paddingHorizontal: 10, alignSelf: "flex-end" },
	titleBox: { borderTopRightRadius: 10, borderTopLeftRadius: 10, height: 42, alignItems: "center", justifyContent: "center", backgroundColor: "#FFFFFF" },
	titleText: { color: "#000000", fontWeight: "bold", fontSize: 16 },
	messageBox: { height: 30, paddingHorizontal: 10, paddingBottom: 10, alignItems: "center", justifyContent: "center", backgroundColor: "#FFFFFF" },
	messageText: { color: "#999999", fontSize: 12 },
	buttonBox: { height: 50, marginTop: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#FFFFFF" },
	lastButtonBox: { borderBottomRightRadius: 10, borderBottomLeftRadius: 10, marginBottom: 20 },
	buttonText: { fontSize: 18 },
	cancelButtonBox: { borderRadius: 10, height: 50, marginTop: 16, marginBottom: 20, alignItems: "center", justifyContent: "center", backgroundColor: "#FFFFFF" }

} );

function getHeight( name )
{
	let height = 0;

	[ "height", "marginTop", "marginBottom" ].forEach( attrName => {
		height = height + ( typeof styles[ name ][ attrName ] !== "undefined" ? styles[ name ][ attrName ] : 0 );
	} );

	return height;
};

function isset ( prop )
{
	return typeof prop !== "undefined";
};

const Title = React.memo( function ( { title } )
{
	return <View style = { styles.titleBox }>
		<Text style = { styles.titleText }>{ title }</Text>
	</View>;
} );

const Message = React.memo( function ( { message } )
{
	return isset( message )
		? <View style = { styles.messageBox }>
			<Text style = { styles.messageText }>{ message }</Text>
		</View>
		: null;
} );

const Button = React.memo( function ( { title, index, lastButton, cancelButtonIndex, markButtonIndex, tintColor, onSelect, hide } )
{

	const fontColor = markButtonIndex === index ? MARK_COLOR : tintColor;
	const buttonBoxStyle = cancelButtonIndex === index ? styles.cancelButtonBox : styles.buttonBox;
	const lastButtonBoxStyle = lastButton ? styles.lastButtonBox : {};

	return <TouchableOpacity style = { [ buttonBoxStyle, lastButtonBoxStyle ] } onPress = { () => cancelButtonIndex === index ? hide() : onSelect( index ) }>
		<Text style = { [ styles.buttonText, { color: fontColor } ] }>{ title }</Text>
	</TouchableOpacity>;
} );


/**
 * title															// 标题
 * message 															// 副标题
 * options 															// 列表数据
 * tintColor														// 列表项颜色
 * cancelButtonIndex 												// 取消按钮的 index
 * markButtonIndex													// 标记的颜色
 * hide = { () => {} }												// 关闭 modal 的函数
 * onPress = { index => {} }										// 点击时触发
 *
 **/
export default function ActionSheet( props )
{
	const options = React.useMemo( () => {
		return props.options ? props.options : []
	} )

	const translateY = React.useMemo( () => {
		let height = 0;
		if ( props.title ) height += getHeight( "titleBox" );
		if ( props.message ) height += getHeight( "messageBox" );
		if ( isset( props.cancelButtonIndex ) ) {
			height += getHeight( "cancelButtonBox" );
			height += ( options.length - 1 ) * getHeight( "buttonBox" );
		} else {
			height += options.length * getHeight( "buttonBox" );
			height += getHeight( "lastButtonBox" );
		};
		return height;
	}, [ props.title, props.message, props.cancelButtonIndex, options ] );

	const prevIsShow = React.useRef( props.isShow );

	const [ sheetAnim, setSheetAnim ] = React.useState( () => new Animated.Value( translateY ) );

	const [ visible, setVisible ] = React.useState( props.isShow );

	if( prevIsShow.current != props.isShow )
	{
		if ( props.isShow )
		{
			setVisible( true );
			Animated.timing( sheetAnim, { toValue: 0, duration: 250, easing: Easing.out( Easing.ease ), useNativeDriver: true } ).start();
		} else
		{
			Animated.timing( sheetAnim, { toValue: translateY, duration: 200, useNativeDriver: true } ).start( () => setVisible( false ) );
		};
		prevIsShow.current = props.isShow;
	};

	const hide = () => {
		Animated.timing( sheetAnim, { toValue: translateY, duration: 200, useNativeDriver: true } ).start( () => {
			setVisible( false );
			props.hide();
		} );
	};

	const onSelect = index => {
		Animated.timing( sheetAnim, { toValue: translateY, duration: 200, useNativeDriver: true } ).start( () => {
			props.onPress( index );
		} );
	};

	return <Modal visible = { visible } animationType = "none" transparent onRequestClose = { hide }>
		<View style = { styles.wrapper }>
			<Text style = { styles.overlay } onPress = { () => isset( props.cancelButtonIndex ) && hide() } />
			<Animated.View style = { [ styles.body, { height: translateY, transform: [ { translateY: sheetAnim } ] } ] }>
				<Title title = { props.title } />
				<Message message = { props.message } />
				<ScrollView
					scrollEnabled = { translateY > MAX_HEIGHT }
					showsVerticalScrollIndicator = { false }
				>
				{
					options.map( ( title, index, array ) => props.cancelButtonIndex === index
						? null
						: <Button
							key = { index }
							title = { title }
							index = { index }
							lastButton = { ( props.cancelButtonIndex === array.length - 1 ) ? array.length - 2 === index : array.length - 1 === index }
							cancelButtonIndex = { props.cancelButtonIndex }
							markButtonIndex = { props.markButtonIndex }
							tintColor = { props.tintColor }
							onSelect = { onSelect }
							hide = { hide }
						/>
					)
				}
				</ScrollView>
				{
					isset( props.cancelButtonIndex )
						? <Button
							title = { options[ props.cancelButtonIndex ] }
							index = { props.cancelButtonIndex }
							lastButton = { false }
							cancelButtonIndex = { props.cancelButtonIndex }
							markButtonIndex = { props.markButtonIndex }
							tintColor = { props.tintColor }
							onSelect = { onSelect }
							hide = { hide }
						/>
						: null
				}
			</Animated.View>
		</View>
	</Modal>;
};