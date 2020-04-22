import React from "react";

import { View, Text, Image, Dimensions, StyleSheet } from "react-native";

import { bindActionCreators } from "redux";

import { connect } from "react-redux";

import { wsNotice } from "./../redux/actions/finance.js";

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
	noticeText: { fontSize: 14, color: "#656565" }
} );

let seed = 0;

const Notice = React.memo( function( { wsNotice, noticeMessage: msg } )
{
	// console.log( "Notice re-render" );

	const msgArr = React.useRef( msg );

	const [ data, setData ] = React.useState( [] );

	React.useEffect( function()
	{
		wsNotice();
	}, [] )

	if( msgArr.current != msg )
	{
		msgArr.current = msg;
		setData( data => [ ...data, { index: seed++, value: msg } ] );
	};

	const onUnitLoopEnd = React.useCallback( function()
	{
		if( data.length > 1 )
		{
			setData( data => [ data[ data.length - 1 ] ] )
		};
	}, [ data ] );

	return <View style = { styles.container }>
		<Image style = { styles.noticeIcon } source = { require( "./../images/notice.png" ) } />
		<MarqueeVertical
			list = { data }
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
		const financeData = state.finance;

		return {
			noticeMessage: financeData.noticeMessage
		};
	},
	function mapDispatchToProps( dispatch, ownProps )
	{
		return bindActionCreators( { wsNotice }, dispatch );
	}
)( Notice );
