import React from "react";
import { View, Text, StyleSheet, Dimensions, Animated, Easing, TouchableOpacity } from "react-native";

// marquee 容器默认高度
const MARQUEEHEIGHT = Dimensions.get( "window" ).width;

// marquee 容器默认宽度
const MARQUEEWIDTH = 50;


const styles = StyleSheet.create( {
	container : { justifyContent : "flex-start", backgroundColor : "#FFFFFF", overflow : "hidden" },
	viewStyle : { flexDirection : "row", justifyContent : "flex-start", alignItems : "center" },
	textStyle : { flex : 1, fontSize : 16, color : "#000000" }
} );

/**
 * [description]		垂直滚动的文字容器
 * @list				{Array}			[description] 滚动的文字数组
 * @width				{number}		[description] 容器宽度 默认: Dimensions.get( "window" ).width( 别使用 flex )
 * @height				{number}		[description] 容器高度 默认: 50( 别使用 flex )
 * @direction			{string}		[description] 运动方向
 * @duration			{number}		[description] 执行整个动画的完成时间 默认 600
 * @delay				{number}		[description] 文本停顿时间(ms) 默认 1200
 * @viewStyle			{Object}		[description] View 样式
 * @textStyle			{Object}		[description] Text 样式
 * @containerStyle		{Object}		[description] 容器样式
 * @onClick				{function}		[description] 点击回调
 * @return				{ele}			[description]
 **/

const Row = React.memo( function ( { viewStyle, textStyle, text } )
{
	return <View style = { viewStyle }>
		<Text style = { textStyle }>{ text }</Text>
	</View>;
} );


const List = React.memo( function( { list, width, height, viewStyle, textStyle, animatedTransform, onClick } )
{
	const _viewStyle = [ styles.viewStyle, { width, height }, viewStyle ];
	const _textStyle = [ styles.textStyle, textStyle ];
	if( list.length === 0 )
	{
		return null;
	};

	if ( list.length === 1 )
	{
		return <Row viewStyle = { _viewStyle } textStyle = { _textStyle } text = { list[ 0 ].value } />;
	};

	if ( list.length > 1 )
	{
		const _listText = Array.from( list );
		const _listView = [];

		_listText.push( _listText[ 0 ] );
		_listText.unshift( _listText[ _listText.length - 2 ] );

		for( let i = 0; i < _listText.length; i++ )
		{
			_listView.push(
				onClick
					? <TouchableOpacity key = { i } onPress = { () => onClick( _listText[ i ].index ) }>
						<Row viewStyle = { _viewStyle } textStyle = { _textStyle } text = { _listText[ i ].value } />
					</TouchableOpacity>
					: <Row viewStyle = { _viewStyle } textStyle = { _textStyle } text = { _listText[ i ].value } />
			);
		};

		return <Animated.View style = { { width, transform: [ { translateY: animatedTransform } ] } }>
		{
			_listView
		}
		</Animated.View>;
	};
} );

export default React.memo( function( {
	list = [],
	width = MARQUEEHEIGHT,
	height = height,
	direction = "up",
	duration = 1600,
	delay = 1200,
	viewStyle = {},
	textStyle = {},
	containerStyle = {},
	onClick
} )
{
	console.log( "re-render" );
	const timer = React.useRef( null );
	const listRef = React.useRef( list )
	const indexRef = React.useRef( direction === "down" ? listRef.current.length : 1 );

	const animatedTransform = React.useRef( new Animated.Value( indexRef.current * height * -1 ) );

	if( listRef.current !== list )
	{
		if ( list.length > 1 )
		{
			if ( list.length > listRef.current.length )
			{
				clearInterval( timer.current );
				Animated.timing( animatedTransform.current, {
					toValue: list.length * height * -1, easing: Easing.linear, duration: duration, useNativeDriver: true
				} ).start( () => {
					timer.current = setInterval( run, delay + duration );
				} );
			};
		} else
		{
			clearInterval( timer.current );
		};
		listRef.current = list;
		indexRef.current = listRef.current.length;
	};

	function run()
	{
		console.log( "setInterval", listRef.current, indexRef.current );
		if( direction === "down" )
		{
			const initIndex = listRef.current.length;

			if( indexRef.current === 0 )
			{
				indexRef.current = initIndex - 1;
				animatedTransform.current.setValue( initIndex * height * -1 );
			} else
			{
				indexRef.current = indexRef.current - 1;
			};

		};
		if( direction === "up" )
		{
			const initIndex = 1;

			if( indexRef.current === listRef.current.length + 1 )
			{
				indexRef.current = initIndex + 1;
				animatedTransform.current.setValue( initIndex * height * -1 );
			} else
			{
				indexRef.current = indexRef.current + 1;
			};
		};

		Animated.timing( animatedTransform.current, {
			toValue: indexRef.current * height * -1, easing: Easing.linear, duration: duration, useNativeDriver: true
		} ).start();
	};

	React.useEffect( function()
	{
		
		console.log( "useEffect bind" );
		if ( listRef.current.length > 1 )
		{
			console.log( "useEffect 执行定时器" );
			timer.current = setInterval( run, delay + duration );
		};
		return function()
		{
			console.log( "useEffect unbind" )
			clearInterval( timer.current );
		};
	}, [] );
	return <View style = { [ styles.container, { width, height }, containerStyle ] }>
		<List
			list = { listRef.current }
			width = { width }
			height = { height }
			viewStyle = { viewStyle }
			textStyle = { textStyle }
			animatedTransform = { animatedTransform.current }
			onClick = { onClick }
		/>
	</View>;
} );
