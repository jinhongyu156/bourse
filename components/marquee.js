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
 * @duration			{number}		[description] 执行整个动画的完成时间 默认 600
 * @delay				{number}		[description] 文本停顿时间(ms) 默认 1200
 * @viewStyle			{Object}		[description] View 样式
 * @textStyle			{Object}		[description] Text 样式
 * @containerStyle		{Object}		[description] 容器样式
 * @onClick				{function}		[description] 点击回调
 * @return				{ele}			[description]
 **/

// [ 1, 2, 3, 4 ] => [ 4, 1, 2, 3, 4, 1 ]

class MarqueeVertical extends React.Component {
	constructor( props ) {
		super( props );

		this.state = { animation: null, index: props.direction === "down" ? props.list.length : 1 };
		this.animatedTransformY = new Animated.Value( -this.state.index * this.props.height );
	}

 /*   componentWillReceiveProps(nextProps){
		let newText = nextProps.list || [];
		let oldText = this.props.list || [];
		let newDirection = nextProps.direction || "up";
		if (newText !== oldText) {
			this.state.animation && this.state.animation.stop();
			this.setState({
				list : newText,
				textIndex : newText.length,
				index : newDirection == "down" ? newText.length : 1,
				animation: null,
			});
		}
	}*/
	componentDidUpdate()
	{
		if( !this.state.animation )
		{
			let value = 0;
			let toValue = 0;
			if( this.props.direction === "down" )
			{
				// console.log( "----------------------", this.state.index );
				if( this.state.index === 0 )
				{
					value = this.props.list.length * this.props.height;
					toValue = ( this.props.list.length - 1 ) * this.props.height;
					console.log( "更改前: ", toValue );
					this.setState( { index: this.props.list.length } );
				} else
				{
					value = this.state.index * this.props.height;
					toValue = ( this.state.index - 1 ) * this.props.height;
					console.log( "hahah前: ", value );
					this.setState( { index: this.state.index - 1 } );
				};
			};
			if( this.props.direction === "up" )
			{
				if( this.state.index === this.props.list.length + 1 )
				{
					console.log( "更改前: ", this.state.index, 2 * this.props.height )
					value = 1 * this.props.height;
					toValue = 2 * this.props.height;
					this.setState( { index: 2 }, () => console.log( "更改后: ", this.state.index ) );
				} else
				{
					value = this.state.index * this.props.height;
					toValue = ( this.state.index + 1 ) * this.props.height;
					this.setState( { index: this.state.index + 1 } );
				};
			};
			console.log( "----------------------", -value );
			this.animatedTransformY.setValue( -value );

			this.setState( { animation: Animated.timing( this.animatedTransformY, {
				toValue: -toValue, easing: Easing.linear, delay : this.props.delay, duration: this.props.duration, useNativeDriver: true
			} ) }, () => {
				this.state.animation && this.state.animation.start( () => this.setState( { animation: null } ) )
			} );
		}
	}

	componentWillUnmount()
	{
		this.state.animation && this.state.animation.stop();
	}

	singleLineTextView()
	{
		if( !this.props.list.length )
		{
			return null
		};

		const _listText = Array.from( this.props.list );
		const _listView = [];

		_listText.push( _listText[ 0 ] );
		_listText.unshift( _listText[ _listText.length - 2 ] );

		for( let i = 0; i < _listText.length; i++ )
		{
			_listView.push(
				this.props.onClick
					? <TouchableOpacity key = { i } onPress = { () => this.props.onClick( _listText[ i ].index ) }>
						<View style = { [ styles.viewStyle, { width: this.props.width, height: this.props.height }, this.props.viewStyle ] }>
							<Text style = { [ styles.textStyle, this.props.textStyle ] }>{ _listText[ i ].value }</Text>
						</View>
					</TouchableOpacity>
					: <View style = { [ styles.viewStyle, { width: this.props.width, height: this.props.height }, this.props.viewStyle ] }>
						<Text style = { [ styles.textStyle, this.props.textStyle ] }>{ _listText[ i ].value }</Text>
					</View>
			);
		};

		return <Animated.View style = { { width: this.props.width, transform: [ { translateY: this.animatedTransformY } ] } }>
		{
			_listView
		}
		</Animated.View>;
	}
	render()
	{
		return <View style = { [ styles.container, { width: this.props.width, height: this.props.height }, this.props.containerStyle ] }>
		{
			this.singleLineTextView()
		}
		</View>;
	}
};

MarqueeVertical.defaultProps = {
	list: [],
	delay: 1200,
	duration: 600, 
	direction: "up",
	width: MARQUEEHEIGHT,
	height: MARQUEEWIDTH
};

export default MarqueeVertical;