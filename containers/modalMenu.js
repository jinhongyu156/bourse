import React from "react";

import { View, Text, Image, Modal, TouchableOpacity, StyleSheet } from "react-native";

import { useNavigation } from "@react-navigation/native";

import I18n from "i18n-js";

const styles = StyleSheet.create( {
	modalWrapper: { flex: 1 },
	modalOverlay: { position: "absolute", top: 0, right: 0, bottom: 0, left: 0, backgroundColor: "rgba( 0, 0, 0, 0.4 )" },
	modalContainer: { width: 100, height: 100, borderRadius: 8, backgroundColor: "#FFFFFF" },
	menuItem: { position: "absolute" },
	text: { textAlign: "center", color: "#FFFFFF" }
} );

// 半径
const RADIUS = 100;

// 将角度转化为弧度
function angleToRadian( angle )
{
	return Math.PI / 180 * angle;
};

// 根据圆心坐标 center 将取圆上的 number 个点坐标
function getMenuList( center, quadrant, hideModal, number )
{
	const navigation = useNavigation();

	const imageSourceList = [
		{ title: "", source: require( "./../images/float_action.png" ), link: null },
		{ title: I18n.t( "floatAction.etuDynamic" ), source: require( "./../images/etu_dynamic.png" ), index: 3 },
		{ title: I18n.t( "floatAction.etuNotice" ), source: require( "./../images/etu_notice.png" ), index: 1 },
		{ title: I18n.t( "floatAction.companyDynamic" ), source: require( "./../images/company_dynamic.png" ), index: 4 },
		{ title: I18n.t( "floatAction.transactionInformation" ), source: require( "./../images/transaction_information.png" ), index: 2 }
	];

	const menuList = [];

	let count = 0;
	let angle = quadrant === 4 ? 45 : quadrant === 1 ? 315 : quadrant === 3 ? 135 : quadrant === 2 ? 225 : 0;

	while( count < number )
	{
		const index = count;
		menuList.push( {
			x: center.x + RADIUS * Math.cos( angleToRadian( angle ) ),
			y: center.y + RADIUS * Math.sin( angleToRadian( angle ) ),
			title: imageSourceList[ index ].title,
			source: imageSourceList[ index ].source,
			onPress: function()
			{
				hideModal();
				index && navigation.push( "Article", { title: imageSourceList[ index ].title, index: imageSourceList[ index ].index } );
			}
		} );
		count ++;
		angle += 360 / number;
	};
	return menuList;
};

export default React.memo( function( { left, top, size, maxX, maxY, visible, hideModal } )
{
	// 开启菜单的 floatAction 坐标
	const floatAction = {
		x: left + size * 0.5,
		y: top + size * 0.5
	};

	// floatAction 所在象限
	const quadrant = ( floatAction.x > maxX * 0.5 && floatAction.y > maxY * 0.5 ) ? 4
		: ( floatAction.x < maxX * 0.5 && floatAction.y > maxY * 0.5 ) ? 3
		: ( floatAction.x > maxX * 0.5 && floatAction.y < maxY * 0.5 ) ? 1
		: ( floatAction.x < maxX * 0.5 && floatAction.y < maxY * 0.5 ) ? 2
		: null;

	// 菜单圆心
	const center = {
		x: floatAction.x + ( ( quadrant === 4 || quadrant === 1 ) ? -RADIUS : +RADIUS ) / Math.sqrt( 2 ),
		y: floatAction.y + ( ( quadrant === 4 || quadrant === 3 ) ? -RADIUS : +RADIUS ) / Math.sqrt( 2 )
	};

	const menuList = getMenuList( center, quadrant, hideModal, 5 );

	return <Modal visible = { visible } animationType = "none" transparent onRequestClose = { hideModal }>
		<View style = { styles.modalWrapper }>
			<Text style = { styles.modalOverlay } onPress = { hideModal } />
			{
				menuList.map( function( item, index )
				{
					const imagePosition = { top: item.y - size * 0.5, left: item.x - size * 0.5 };
					const textPosition = { width: size * 2, left: size * -0.5, top: 4 };
					return <TouchableOpacity key = { index } onPress = { item.onPress } style = { [ styles.menuItem, imagePosition ] }>
						<Image style = { { width: size, height: size } } source = { item.source } />
						<Text style = { [ styles.text, textPosition ] } onPress = { item.onPress }>{ item.title }</Text>
					</TouchableOpacity>;
				} )
			}
		</View>
	</Modal>;
} );
