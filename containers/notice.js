import React from "react";

import { View, Text, Image, Dimensions, StyleSheet } from "react-native";

import MarqueeVertical from "./../components/marquee.js";

// 通知栏高度
const NOTICEHEIGHT = 40;

// 通知栏 icon 宽高
const NOTICEICONHEIGHT = NOTICEHEIGHT * .5;

// 通知栏 icon marginHorizontal
const NOTICEICONMARGINHORIZONTAL = 10;

// 通知栏宽度
const NOTICEWIDTH = Dimensions.get( "window" ).width - NOTICEICONHEIGHT - NOTICEICONMARGINHORIZONTAL * 2;

const styles = StyleSheet.create( {
	container: { flexDirection: "row", alignItems: "center", height: NOTICEHEIGHT, backgroundColor: "#FFFFFF" },
	noticeIcon: { width: NOTICEICONHEIGHT, height: NOTICEICONHEIGHT, marginHorizontal: NOTICEICONMARGINHORIZONTAL },
	noticeView: { paddingHorizontal: 10 },
    noticeText: { color: "#656565" }
	
} );

export default React.memo( function Notice( { msg } )
{
    // { index: 1, value: "message 1" }
    const [ data, setData ] = React.useState( [{ index: 1, value : "meaasge 1" }, { index: 2, value : "meaasge 2" }] );
	return <View>
        <Text onPress = { () => {
            setData( c => {
                if( c.length )
                {
                    return [ ...c, { index: c.length + 1, value : `meaasge ${ c.length + 1 }` } ]
                } else
                {
                    return [ { index: 1, value : "meaasge 1" } ]
                };
            } )
        } }>add: { JSON.stringify( data ) }</Text>
         <Text onPress = { () => {
            setData( c => {
                if( c.length )
                {

                    return c.filter( (k, i) => i != 0 )
                } else
                {
                    return [ { index: 1, value : "meaasge 1" } ]
                };
            } )
        } }>--: { JSON.stringify( data ) }</Text>
        <View style = { styles.container }>
    		<Image style = { styles.noticeIcon } source = { require( "./../images/notice.png" ) } />
    		<MarqueeVertical
                list = { data }
                width = { NOTICEWIDTH }
                height = { NOTICEHEIGHT }
                textStyle = { styles.noticeText }
                containerStyle = { styles.noticeView }
                onClick = { index => {
                    console.log( "index", index )
                }}
            />
    	</View>
    </View>
} );
