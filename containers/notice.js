import React from "react";

import { View, Text, Image, Dimensions, StyleSheet } from "react-native";

import { bindActionCreators } from "redux";

import { connect } from "react-redux";

import { wsNotice, closeWs } from "./../redux/actions/notice.js";

import { useNavigation } from "@react-navigation/native";

import MarqueeVertical from "./../components/marquee.js";

// 通知栏高度
export const NOTICEHEIGHT = 40;

// 通知栏 icon 宽高
const NOTICEICONHEIGHT = NOTICEHEIGHT * .38;

// 通知栏 icon marginHorizontal
const NOTICEICONMARGINLEFT = 10;

// 通知栏宽度
const NOTICEWIDTH = Dimensions.get( "window" ).width - NOTICEICONHEIGHT - NOTICEICONMARGINLEFT * 2;

const styles = StyleSheet.create( {
	container: { flexDirection: "row", alignItems: "center", height: NOTICEHEIGHT, backgroundColor: "#FFFFFF" },
	noticeIcon: { width: NOTICEICONHEIGHT, height: NOTICEICONHEIGHT, marginLeft: NOTICEICONMARGINLEFT },
	noticeView: { paddingHorizontal: 10 },
	noticeText: { fontSize: 14, color: "#656565" }
} );

let seed = 0;

const Notice = React.memo( function( { wsNotice, noticeMessage: msg } )
{

	const msgArr = React.useRef( [] );
	const [ state, update ] = React.useState( 0 );

	const navigation = useNavigation();

	/*React.useEffect( function()
	{
		wsNotice();
	}, [] )*/

	React.useEffect( () => {
		navigation.addListener( "focus", () => {
			wsNotice();
		} );
		navigation.addListener( "blur", () => {
			closeWs();
		} );
	}, [ navigation ] );



	if( msg )
	{
		if( msgArr.current.length === 0 )
		{
			msgArr.current = [ { index: seed++, value: msg } ];
		};

		if( ( msgArr.current.length === 1 ) && ( msgArr.current[ 0 ].value !== msg ) )
		{
			msgArr.current = [ msgArr.current[ 0 ], { index: seed++, value: msg } ]
		};
	};

	const onUnitLoopEnd = React.useCallback( function()
	{
		if( msgArr.current.length > 1 )
		{
			msgArr.current = [ msgArr.current[ 1 ] ];
			update( c => c + 1 );
		};
	}, [ msgArr.current ] );

	return <View style = { styles.container }>
		<Image style = { styles.noticeIcon } source = { require( "./../images/notice.png" ) } />
		<MarqueeVertical
			list = { msgArr.current }
			width = { NOTICEWIDTH }
			height = { NOTICEHEIGHT }
			textStyle = { styles.noticeText }
			containerStyle = { styles.noticeView }
			onUnitLoopEnd = { onUnitLoopEnd }
		/>
	</View>;
} );

export default connect(
	function mapStateToProps( state, ownProps )
	{
		const noticeData = state.notice;

		return {
			noticeMessage: noticeData.noticeMessage
		};
	},
	function mapDispatchToProps( dispatch, ownProps )
	{
		return bindActionCreators( { wsNotice }, dispatch );
	}
)( Notice );
