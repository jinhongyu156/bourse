import React from "react";

import { TouchableOpacity, Image, Dimensions, StyleSheet } from "react-native";

import { useNavigation } from "@react-navigation/native";

import Tab from "./../components/tab.js";

// 屏幕宽度
const SCREENWIDTH = Dimensions.get( "window" ).width;

const styles = StyleSheet.create( {
	tab: { height: 100, backgroundColor: "#F6F6F6" }
} );

// 活动项目
const SwiperItem = React.memo( function( { item, gotoActivity, gotoRanking } )
{
	return <TouchableOpacity onPress = { () => item.title ? ( item.type == 0 ? gotoActivity( item.title, item.content ) : gotoRanking() ) : false }>
		<Image resizeMode = { "cover" } style = { { width: SCREENWIDTH, height: 100 } } source = { { uri: item.img } } />
	</TouchableOpacity>
} )

export default function ( props )
{
	const navigation = useNavigation();
	const [ swiperAutoPlay, setSwiperAutoPlay ] = React.useState( 2500 );
	const gotoActivity = React.useCallback( function( title, content )
	{
		navigation.push( "Activity", { title, content } );
	}, [] );

	const gotoRanking = React.useCallback( function()
	{
		navigation.push( "Ranking" );
	}, [] );

	React.useEffect( () => {
		navigation.addListener( "blur", () => {
			setSwiperAutoPlay( false );
		} );
	}, [ navigation ] );

	return props.hasActivity
		? <Tab initialPage = { 0 } numOfSibling = { props.swiper.length } swiperAutoPlay = { swiperAutoPlay } locked = { false } animation = { true } containerStyle = { styles.tab }>
		{
			props.swiper.map( ( item, index ) => <SwiperItem key = { index } item = { item } gotoActivity = { gotoActivity } gotoRanking = { gotoRanking } /> )
		}
		</Tab>
		: null
}