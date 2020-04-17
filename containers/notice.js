import React from "react";

import { View, Text, Image, StyleSheet } from "react-native";

// 通知栏高度
const NOTICEHEIGHT = 40;

// 通知栏 icon 宽高
const NOTICEICONHEIGHT = NOTICEHEIGHT * .5;

const styles = StyleSheet.create( {
	container: { flexDirection: "row", alignItems: "center", height: NOTICEHEIGHT, backgroundColor: "#FFFFFF" },
	noticeIcon: { width: NOTICEICONHEIGHT, height: NOTICEICONHEIGHT, marginHorizontal: 10 },
	noticeText: { fontSize: 16, color: "#656565" }
	
} );

export default React.memo( function Notice( { msg } )
{
	return <View style = { styles.container }>
		<Image style = { styles.noticeIcon } source = { require( "./../images/notice.png" ) } />
		<Text style = { styles.noticeText }>{ msg }</Text>
	</View>;
} );
