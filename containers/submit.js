import React from "react";

import { View, ActivityIndicator, Text, TouchableOpacity, StyleSheet } from "react-native";

const styles = StyleSheet.create( {
	submitBtn: { borderRadius: 26, alignItems: "center", justifyContent: "center", backgroundColor: "#696DAC" },
	submitBtnText: { fontSize: 18, fontWeight: "bold", color: "#FFFFFF" }
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
	return <TouchableOpacity style = { [ styles.submitBtn, submitBtnStyle ] } disabled = { loading } onPress = { onSubmit }>
	{
		loading
			? <ActivityIndicator size = "small" color = "#FFFFFF" />
			: <Text style = { [ styles.submitBtnText, submitBtnTextStyle ] }>{ title }</Text>
	}
	</TouchableOpacity>;
} );