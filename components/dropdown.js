import React from "react";

import { StyleSheet, Dimensions, View, Text, ScrollView, TouchableWithoutFeedback, TouchableOpacity, Modal } from "react-native";

const SCREENWIDTH = Dimensions.get( "window" ).width;
const SCREENHEIGHT = Dimensions.get( "window" ).height;


const styles = StyleSheet.create( {
	button: { justifyContent: "center" },
	buttonText: { fontSize: 12 },
	modal: { flex: 1 },
	dropdown: { position: "absolute", backgroundColor: "#FFFFFF" },
	activeText: { fontWeight: "bold", color: "#000000" },
	inactivetext: { fontWeight: "normal", color: "#999999" }
} )

const Button = React.memo( function( { buttonText, renderButton } )
{
	return renderButton
		? renderButton( buttonText )
		: <View style = { styles.button }>
			<Text style = { styles.buttonText } numberOfLines = { 1 }>
				{ buttonText }
			</Text>
		</View>;
} );

const Row = React.memo( function( { isActive, text, rowStyle, rowTextStyle, onPress } )
{
	return <TouchableOpacity onPress = { onPress } style = { rowStyle }>
		<Text style = { [ rowTextStyle, isActive ? styles.activeText : styles.inactivetext ] }>{ text }</Text>
	</TouchableOpacity>
} );

const Dropdown = React.memo( function( { options, selectedIndex, rowStyle, rowTextStyle, onRowPress } )
{
	return <ScrollView>
	{
		options.map( function( item, index )
		{
			const onPress = () => onRowPress( index );
			return <Row key = { index } text = { item } rowStyle = { rowStyle } rowTextStyle = { rowTextStyle } isActive = { selectedIndex === index } onPress = { onPress } />
		} )
	}
	</ScrollView>;
} );

export default React.memo( function( {
	defaultButtonText = "",																		// 按钮默认文字
	renderButton = null,																		// 渲染按钮元素
	disabled = false,																			// 是否禁用按钮点击
	options = [],																				// 下拉组件中的项
	animated = true,																			// 下拉组件打开是否存在动画
	dropdownStyle = {},																			// 下拉组件的样式, 需存在 width, height
	rowStyle = {},																				// 下拉组件项的样式
	rowTextStyle = {},																			// 下拉组件项字体样式
	onSelect = function() {}																	// 下拉组件的项的点击
} )
{
	const btnRef = React.useRef( null );
	const [ dropdownOption, setDropdownOption ] = React.useState( { selectedIndex: 0, show: false, style: {} } );

	const getStyle = React.useCallback( function( callback )
	{
		btnRef.current.measure( ( fx, fy, width, height, px, py ) => {

			const dropdownHeight = StyleSheet.flatten( dropdownStyle ).height;					// 获取传入 dropdownStyle 的 height
			const dropdownWidth = StyleSheet.flatten( dropdownStyle ).width;					// 获取传入 dropdownStyle 的 width

			const bottomSpace = SCREENHEIGHT - py;
			const rightSpace = SCREENWIDTH - px;
			const showInBottom = bottomSpace >= dropdownHeight;
			const showInLeft = rightSpace >= dropdownWidth;

			const positionStyle = Object.assign(												// positionStyle: 包含 top, bottom, left, right
				{ height: dropdownHeight, width: dropdownWidth },
				showInLeft ? { left: px } : { right: rightSpace - width },
				showInBottom ? { top: py + height } : { bottom: py }
			);

			callback( positionStyle );
		} );
	}, [ btnRef.current, dropdownStyle ] );

	const hide = React.useCallback( function()													// 关闭 dropdown
	{
		setDropdownOption( state => Object.assign( {}, state, { show: false, style: {} } ) );
	}, [] );

	const show = React.useCallback( function()													// 打开 dropdown
	{
		getStyle( style => setDropdownOption( state => Object.assign( {}, state, { show: true, style: style } ) ) );
	}, [] );

	const onRowPress = React.useCallback( function( index )										// dropdown row 被点击
	{
		setDropdownOption( { selectedIndex: index, show: false, style: {} } );
		onSelect( index );
	}, [] );

	return <React.Fragment>
		<TouchableOpacity ref = { btnRef } disabled = { disabled } onPress = { show }>
			<Button buttonText = { defaultButtonText || options[ dropdownOption.selectedIndex ] } renderButton = { renderButton } />
		</TouchableOpacity>
		<Modal animationType = { animated ? "fade" : "none" } visible = { dropdownOption.show } transparent = { true } onRequestClose = { hide }>
			<TouchableWithoutFeedback onPress = { hide }>
				<View style = { styles.modal }>
					<View style = { [ styles.dropdown, dropdownOption.style, dropdownStyle ] }>
						<Dropdown options = { options } selectedIndex = { dropdownOption.selectedIndex } rowStyle = { rowStyle } rowTextStyle = { rowTextStyle } onRowPress = { onRowPress } />
					</View>
				</View>
			</TouchableWithoutFeedback>
		</Modal>
	</React.Fragment>;
} );
