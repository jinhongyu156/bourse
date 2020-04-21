import React from "react";

import { Dimensions, View, ScrollView, Platform, StyleSheet } from "react-native";

// 选项卡宽度
const CONTAINERWIDTH = Dimensions.get( "window" ).width;

// 样式
const styles = StyleSheet.create( { container: { flex: 1 } } );

const SceneComponent = React.memo( function( { children, tabViewStyle, shouldUpdated } )
{
	return <View style = { tabViewStyle } collapsable = { false }>{ children }</View>;

}, function( prevProps, nextProps )
{
	return !nextProps.shouldUpdated;
} );

// 获取 react 元素
function getChildren( children )
{
	return React.Children.map( children, child => child );
};

// 生产页面 id
function makeSceneKey( child, idx )
{
	return `${ child.props.tabLabel }_${ idx }`;
};

// 当前页面 key 是否存在于 sceneKeys
function keyExists( sceneKeys, key )
{
	return sceneKeys.find( sceneKey => key === sceneKey );
};

// 当前 index 所代表的的页面是否需要预加载
function shouldRenderSceneKey( idx, currentPage, numOfSibling )
{
	return ( idx < ( currentPage + numOfSibling + 1 ) && idx > ( currentPage - numOfSibling - 1 ) );
};

// 返回新的 sceneKeys 数组
function newSceneKeys( { prevKeys = [], currentPage = 0, numOfSibling, children } )
{
	const newKeys = [];
	children.forEach( function( child, idx )
	{
		const key = makeSceneKey( child, idx );
		if ( keyExists( prevKeys, key ) || shouldRenderSceneKey( idx, currentPage, numOfSibling ) )
		{
			newKeys.push( key );
		};
	} );
	return newKeys;
};

export default React.memo( function(
{
	children,
	width = CONTAINERWIDTH,																// 选项卡宽度
	containerStyle = {},																// 容器样式
	tabViewStyle = {},																	// 选项卡页样式
	initialPage = 0,																	// 初始加载页码
	locked = false,																		// 禁止滑动切换
	animation = true,																	// 是否带有动画(仅在点击导航时)
	numOfSibling = 0,																	// 预加载数量
	tabBarPosition = "top",																// tabBar 位置: top, bottom
	contentProps = {},																	// tabView 的其他属性
	onChangeTab = function() {},														// 选项卡移动时的回调函数
	renderTabBar = function() {}														// 渲染选项卡导航
} = {} )
{
	const tabViewRef = React.useRef();													// 保存 tabView
	const pureChildren = getChildren( children );
	const [ currentPage, setCurrentPage ] = React.useState( initialPage );
	const [ sceneKeys, setSceneKeys ] = React.useState( () => newSceneKeys( { currentPage: initialPage, numOfSibling: numOfSibling, children: pureChildren } ) );

	const setState = React.useCallback( function( nextPage )							// 更新 state 并调用 onChangeTab
	{
		setCurrentPage( nextPage );
		setSceneKeys( newSceneKeys( { prevKeys: sceneKeys, currentPage: nextPage, numOfSibling: numOfSibling, children: pureChildren } ) );

		onChangeTab( nextPage );

	}, [ sceneKeys, numOfSibling, pureChildren ] );

	React.useEffect( function()															// 处理安卓默认的初始位置 contentOffset
	{
		( Platform.OS === "android" ) && tabViewRef.current.scrollTo( { x: initialPage * width, y: 0, animated: false } );
	}, [] )

	const composeScenes = function()													// 渲染子元素
	{
		
		return pureChildren.map( function( child, idx )
		{
			const key = makeSceneKey( child, idx );

			return <SceneComponent
				key = { key }
				style = { { width } }
				tabViewStyle = { [ tabViewStyle, { width } ] }
				shouldUpdated = { shouldRenderSceneKey( idx, currentPage, numOfSibling ) }>
				{ keyExists( sceneKeys, key ) ? child : <View tabLabel = { child.props.tabLabel } /> }
			</SceneComponent>;
		} );
	};

	const goToPage = function( pageNumber )												// 跳转页面函数
	{
		tabViewRef.current.scrollTo( { x: pageNumber * width, y: 0, animated: true } );
		currentPage !== pageNumber && setState( pageNumber );
	};

	const update = function( e )														// ios 调用( 未测试 )
	{
		const nextPage = Math.round( e.nativeEvent.contentOffset.x / width );
		currentPage !== nextPage && setState( nextPage );
	};

	const tabBarProps = { goToPage: goToPage, activeTab: currentPage, tabs: pureChildren.map( child => child.props.tabLabel ) };

	return <View style = { containerStyle }>
		{ tabBarPosition === "top" && renderTabBar( tabBarProps ) }
		<ScrollView
			ref = { tabViewRef }
			horizontal = { true }
			pagingEnabled = { true }
			scrollsToTop = { false }
			scrollEnabled = { !locked }
			alwaysBounceVertical = { false }
			directionalLockEnabled = { true }
			showsHorizontalScrollIndicator = { false }
			automaticallyAdjustContentInsets = { false }
			scrollEventThrottle = { 16 }
			keyboardDismissMode = "on-drag"
			contentOffset = { { x: initialPage * width } }
			onMomentumScrollEnd = { update }
			{ ...contentProps }
		>
			{ composeScenes() }
		</ScrollView>
		{ tabBarPosition === "bottom" && renderTabBar( tabBarProps ) }
	</View>;
} );