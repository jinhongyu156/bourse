import React from "react";

import { View, Text, Image, Modal, TouchableOpacity, StyleSheet } from "react-native";

const styles = StyleSheet.create( {
	/*modalContainer: { width: MODALWIDTH, height: MODALHEIGHT, borderRadius: 8, backgroundColor: "#FFFFFF" },
	modalOverlay: { position: "absolute", top: 0, right: 0, bottom: 0, left: 0, backgroundColor: "rgba( 0, 0, 0, 0.4 )" },
	modalWrapper: { flex: 1, justifyContent: "center", alignItems: "center" },
	modalTitle: { width: MODALWIDTH, height: MODALTITLEBOXHEIGHT, justifyContent: "center", alignItems: "center" },
	modalTitleText: { fontSize: 22 },
	modalInputBox: { width: MODALWIDTH, height: MODALINPUTHEIGHT, justifyContent: "space-around", alignItems: "center" },
	modalInputView: { flexDirection: "row", alignItems: "center" },
	modalTimeInfoText: { fontSize: 24, marginRight: 10 },

	modalInput: { fontSize: 18, textAlign: "center", width: MODALINPUTBOXWIDTH, height: MODALINPUTHEIGHT * 0.5, borderWidth: 1 },
	modalInputTip: { fontSize: 10, color: "#6D6E77" },
	modalOptionBox: { flexDirection: "row", width: MODALWIDTH, height: MODALOPTIONBOXHEIGHT },
	modalOptionBoxItem: { flex: 1, justifyContent: "center", alignItems: "center" },
	modalOptionBoxItemText: { fontSize: 16, fontWeight: "bold", borderRadius: 50, paddingVertical: 10, paddingHorizontal: 40 },
	modalCancelBtn: { color: "#88898A", borderWidth: 1, borderColor: "#88898A" },
	modalConfirmBtn: { color: "#FFFFFF", backgroundColor: "#696DAC" },
	modalInfoBox: { width: MODALWIDTH, height: MODALINFOBOXHEIGHT, flexDirection: "row", justifyContent: "space-around", alignItems: "center" },
	modalInfoItem: { alignItems: "center" },
	modalInfoBoxText: { fontSize: 12, color: "#6D6E77" },

	correctBorderColor: { borderColor: "#ECECEC" },
	errorBorderColor: { borderColor: "#F00" },
	errorColor: { fontSize: 12, color: "#F00" }*/

	modalWrapper: { flex: 1 },
	modalOverlay: { position: "absolute", top: 0, right: 0, bottom: 0, left: 0, backgroundColor: "rgba( 0, 0, 0, 0.4 )" },
	modalContainer: { width: 100, height: 100, borderRadius: 8, backgroundColor: "#FFFFFF" },
} );

// 半径
const RADIUS = 100;

// 将角度转化为弧度
function angleToRadian( angle )
{
	return Math.PI / 180 * angle;
};

// 将弧度转化为角度
function radianToAngle( radian )
{
	return  180 / Math.PI * radian;
};

export default React.memo( function( { left, top, size, minX, maxX, minY, maxY, imageSource, visible, hideModal } )
{
	const floatAction = { x: left + size, y: top + size };
	const center = { x: floatAction.x + ( floatAction.x > maxX * 0.5 ? -RADIUS : +RADIUS ), y: floatAction.y + ( floatAction.y > maxY * 0.5 ? -RADIUS : +RADIUS ) };

	const coordinatesList = [];

	let count = 0;
	let angle = 45;
	while( count < 5 )
	{
		coordinatesList.push( { x: center.x + RADIUS * Math.cos( angleToRadian( angle ) ), y: center.y + RADIUS * Math.sin( angleToRadian( angle ) ) } );
		count ++;
		angle += 360 / 5;
	};

	/*for ( let angle = 135; angle < 360; angle += 360 / 5 )
	{
		if ( floatAction.x > maxX * 0.5 && floatAction.y > maxY * 0.5 && angle === 45 ) continue;
		// if ( floatAction.x < maxX * 0.5 && floatAction.y > maxY * 0.5 && angle ===  ) continue;
		console.log( "angle", angle, { x: center.x + RADIUS * Math.cos( angleToRadian( angle ) ), y: center.y + RADIUS * Math.sin( angleToRadian( angle ) ) } );
		coordinatesList.push( { x: center.x + RADIUS * Math.cos( angleToRadian( angle ) ), y: center.y + RADIUS * Math.sin( angleToRadian( angle ) ) } );
	};*/

	console.log( "floatAction", floatAction );
	console.log( "center", center );
	console.log( "coordinatesList", coordinatesList );

	return <Modal visible = { visible } animationType = "none" transparent onRequestClose = { hideModal }>
		<View style = { styles.modalWrapper }>
			<Text style = { styles.modalOverlay } onPress = { hideModal } />
			<View style = { { flex: 1 } }>
				{/*<View style = { { width: 100, height: 100, borderColor: "red", borderWidth: 1 } } />*/}
				<View style = { { backgroundColor: "blue", position: "absolute", top: center.y, left: center.x, width: 2, height: 2 } } />
				{/*<Image style = { { position: "absolute", top: floatAction.y - size, left: floatAction.x - size, width: size, height: size } } source = { require( "./../images/float_action.png" ) } />*/}
				<View style = { { position: "absolute", top: floatAction.y - size, left: floatAction.x - size, width: size, height: size, backgroundColor: "yellow" } } />
				{
					coordinatesList.map( function( item, index )
					{
						return <View key = { index } >
							{/*<Image style = { { position: "absolute", top: item.y, left: item.x, width: size, height: size } } source = { require( "./../images/float_action.png" ) } />*/}
							<View style = { { position: "absolute", top: item.y - size * 0.5, left: item.x - size * 0.5, width: size, height: size, backgroundColor: "green" } } />
							<View style = { { position: "absolute", top: item.y, left: item.x, width: 2, height: 2, backgroundColor: "red" } } />
						</View>
					} )
				}
			</View>
			
		</View>
	</Modal>;
} );
