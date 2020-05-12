import React from "react";
import { View, Text, Image, PanResponder, Animated, Dimensions, TouchableOpacity, StyleSheet } from "react-native";

// 屏幕高度
const SCREENHEIGHT = Dimensions.get( "window" ).height;

// 屏幕宽度
const SCREENWIDTH = Dimensions.get( "window" ).width;

// 边界检查函数
function clamp( number, min, max )
{
	return Math.max( min, Math.min( number, max ) );
};

const styles = StyleSheet.create( {
	container: { position: "absolute", top: 0, left: 0, width: SCREENWIDTH, height: SCREENHEIGHT },
	text: { textAlign: "center" }
} );

export default React.memo( function( {
	renderSize = 36,															// 组件宽高
	isCircle = true,															// 是否为圆
	renderText = "+",															// 渲染文字
	renderBgColor,																// 文字的背景颜色
	renderColor,																// 文字颜色
	imageSource,																// 渲染图片
	children,																	// 渲染组件
	disabled = false,															// 是否可以拖动
	animatedViewProps = {},														// 传递给 animated View 的 props
	touchableOpacityProps = {},													// 传递给 TouchableOpacity 的 props
	onDrag = () => {},															// 拖动时回调函数
	onDragRelease = () => {},													// 结束拖动回调函数
	onPress = () => {},															// 点击时回调函数
	onPressIn = () => {},														// 按下时回调函数
	onPressOut = () => {},														// 离开时回调函数
	onLongPress = () => {},														// 长按时回调函数
	x = 0,																		// 初始值 x
	y = 0,																		// 初始值 y
	z = 1,																		// 初始值 z
	minX = 0,																	// 边界 minx
	minY = 0,																	// 边界 miny
	maxX = SCREENWIDTH,															// 边界 maxx
	maxY = SCREENHEIGHT,														// 边界 maxy
} )
{
	const pan = React.useRef( new Animated.ValueXY() );
	const offsetFromStart = React.useRef( { x: 0, y: 0 } );
	const childSize = React.useRef( { x: renderSize, y: renderSize } );
	const startBounds = React.useRef();

	const getBounds = React.useCallback( () => {								// 返回元素位置信息 包含 left, top, right, bottom
		const left = x + offsetFromStart.current.x;
		const top = y + offsetFromStart.current.y;
		const right = left + childSize.current.x;
		const bottom = top + childSize.current.y;
		return { left, top, right, bottom };
	}, [ x, y ] );

	const onPanResponderRelease = React.useCallback( ( e, gestureState ) => {	// 结束滑动, 1: 回调函数 onDragRelease
		onDragRelease( e, gestureState, getBounds() );
		pan.current.flattenOffset();
	}, [ onDragRelease, getBounds ] );

	const onPanResponderGrant = React.useCallback( ( e, gestureState ) => {		// 开始滑动, 1: 设置元素位置信息 startBounds; 2: 设置动画 setValue, setOffset
		startBounds.current = getBounds();
		pan.current.setOffset( offsetFromStart.current );
		pan.current.setValue( { x: 0, y: 0 } );
	}, [ getBounds ] );

	const handleOnDrag = React.useCallback( ( e, gestureState ) => {			// 滑动中, 1: 计算滑动距离; 2: 边界检查; 3: 动画 setValue; 4: 回调函数 onDrag
		const { top, right, left, bottom } = startBounds.current;
		pan.current.setValue( { x: clamp( gestureState.dx, minX - left, maxX - right ), y: clamp( gestureState.dy, minY - top, maxY - bottom ) } );
		onDrag( e, gestureState );
	}, [ maxX, maxY, minX, minY, onDrag ] );

	const panResponder = React.useMemo( () => PanResponder.create( {			// panResponder
		onMoveShouldSetPanResponder: () => !disabled,
		onMoveShouldSetPanResponderCapture: () => !disabled,
		onPanResponderGrant: onPanResponderGrant,
		onPanResponderRelease: onPanResponderRelease,
		onPanResponderMove: Animated.event( [], { listener: handleOnDrag, useNativeDriver: false } )
	} ), [ handleOnDrag, onPanResponderGrant, onPanResponderRelease ] );

	const dragItemCss = React.useMemo( () => Object.assign( {},					// <TouchableOpacity> 样式
		{ width: renderSize, height: renderSize, top: y, left: x, elevation: z, zIndex: z, justifyContent: "center" },
		isCircle ? { borderRadius: renderSize } : {},
		renderBgColor ? { backgroundColor: renderBgColor } : {}
	), [ children, isCircle, renderBgColor, renderSize, x, y, z ] );

	const touchableContent = React.useMemo( () => {								// <TouchableOpacity> 的内容, 若 children 存在渲染 children, 若 imageSource 存在渲染 image, 否则渲染 <Text>
		if ( children )
		{
			return children;
		} else if ( imageSource )
		{
			return <Image style = { { width: renderSize, height: renderSize } } source = { imageSource } />;
		} else
		{
			return <Text style = { [ styles.text, renderColor ? { color: renderColor } : {} ] }>{ renderText }</Text>;
		};
	}, [ children, imageSource, renderSize, renderText ] );

	React.useEffect( () => {													// 设置 offset
		pan.current.addListener( c => ( offsetFromStart.current = c ) );
		return () => pan.current.removeAllListeners();
	}, [] );

	return <View pointerEvents = "box-none" style = { styles.container }>
		<Animated.View pointerEvents = "box-none" { ...animatedViewProps } { ...panResponder.panHandlers } style = { pan.current.getLayout() }>
			<TouchableOpacity
				{ ...touchableOpacityProps }
				style = { dragItemCss }
				disabled = { disabled }
				onPress = { onPress }
				onPressIn = { onPressIn }
				onPressOut = { onPressOut }
				onLongPress = { onLongPress }
			>
				{ touchableContent }
			</TouchableOpacity>
		</Animated.View>
	</View>;
} );
