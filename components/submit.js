import React from "react";

import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const styles = StyleSheet.create( {
	submitBtn: { alignItems: "center", justifyContent: "center" },
	submitBtnText: { fontSize: 18, fontWeight: "bold", color: "#FFFFFF" },
	inactiveBgColor: { backgroundColor: "#888888" },
	activeBgColor: { backgroundColor: "#4AA7C3" }
} );

/**
 * [description]		登录按钮
 * @title				{string}		[description] 按钮标题
 * @loading				{bool}			[description] 是否加载中
 * @submitBtnStyle		{[Object]}		[description] 按钮容器样式
 * @submitBtnTextStyle	{[Object]}		[description] 按钮样式
 * @onSubmit			{function}		[description] 点击事件
 * @return				{ele}			[description]
 **/
export default React.memo( function( { title, loading, submitBtnStyle, submitBtnTextStyle, onSubmit } )
{
	console.log( "submit re-render" );

	return <TouchableOpacity style = { [ styles.submitBtn, submitBtnStyle, styles.inactiveBgColor ] } onPress = { onSubmit }>
		<Text style = { [ styles.submitBtnText, submitBtnTextStyle ] }>{ title }</Text>
	</TouchableOpacity>;

} );