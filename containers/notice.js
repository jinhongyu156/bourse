import React from "react";

import { View, Text, Image, StyleSheet } from "react-native";

import MarqueeVertical from "./../components/marquee.js";

// 通知栏高度
const NOTICEHEIGHT = 40;

// 通知栏 icon 宽高
const NOTICEICONHEIGHT = NOTICEHEIGHT * .5;

const styles = StyleSheet.create( {
	container: { flexDirection: "row", alignItems: "center", height: NOTICEHEIGHT, backgroundColor: "#FFFFFF" },
	noticeIcon: { width: NOTICEICONHEIGHT, height: NOTICEICONHEIGHT, marginHorizontal: 10 },
	noticeText: { color: "#656565" }
	
} );

export default React.memo( function Notice( { msg } )
{
	return <View style = { styles.container }>
		{/*<Image style = { styles.noticeIcon } source = { require( "./../images/notice.png" ) } />
		<Text style = { styles.noticeText }>{ msg }</Text>*/}
		                <MarqueeVertical
                    list = {[
                        { index: 1, value : 'item1:一闪一闪亮晶晶，满天都是小星星'},
                        { index: 2, value : 'item2:两只老虎跑的快'},
                        { index: 3, value : 'item3:蓝蓝的天上白云飘，白云下面小肥羊儿跑'},
                        { index: 4, value : 'item4:哈哈哈哈哈哈哈'},
                    ]}
                    direction = { "down" }
                    // height = { NOTICEHEIGHT }
                    containerStyle = {{backgroundColor : '#FFFF00'}}
                    textStyle = {{fontSize : 16,color : '#FF0000'}}
                    onTextClick = {(item) => {
                        alert(''+JSON.stringify(item));
                    }}
                />
	</View>;
} );
