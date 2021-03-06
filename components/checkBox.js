import React from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";

const styles = StyleSheet.create( {
	container: { flexDirection: "row", alignItems: "center" },
} );

export default React.memo( function ( {
	style,														// checkbox 容器样式
	disabled,													// 禁止使用
	isChecked,													// 当前是否已选中

	leftTextView,												// checkbox 左侧的 ele
	leftText,													// checkbox 左侧的 string
	leftTextStyle,												// 当传入 leftText 时的文字样式

	rightTextView,												// checkbox 右侧的 ele
	rightText,													// checkbox 右侧的 string
	rightTextStyle,												// 当传入 rightText 时的文字样式

	checkedCheckBoxColor,										// 选中时 checkbox 的颜色
	uncheckedCheckBoxColor,										// 未选中时 checkbox 的颜色
	onClick														// 点击时触发
} )
{
	function _renderLeft()
	{
		return leftTextView ? leftTextView : leftText ? <Text style = { leftTextStyle }>{ leftText }</Text> : null;
	};

	function _renderRight()
	{
		return rightTextView ? rightTextView : rightText ? <Text style = { rightTextStyle }>{ rightText }</Text> : null;
	};

	function _renderCheckbox()
	{
		return isChecked
			? <Icon name = "dot-circle-o" color = { checkedCheckBoxColor } size = { 18 } />
			: <Icon name = "circle-o" color = { uncheckedCheckBoxColor } size = { 18 } />
	};

	return <TouchableOpacity style = { [ styles.container, style ] } onPress = { onClick } underlayColor = "transparent" disabled = { disabled }>
		{ _renderLeft() }
		{ _renderCheckbox() }
		{ _renderRight() }
	</TouchableOpacity>
} );
