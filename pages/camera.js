import React, { PureComponent } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import { RNCamera } from "react-native-camera";
import { readerQR } from "react-native-lewin-qrcode";
import I18n from "i18n-js";

const styles = StyleSheet.create( {
	container: { flex: 1, flexDirection: "column", backgroundColor: "#000000" },
	preview: { flex: 1, justifyContent: "flex-end", alignItems: "center" }
} );

export default class extends PureComponent
{
	render() {
		return <View style = { styles.container }>
			<RNCamera
				ref =  { ref => ( this.camera = ref ) }
				style = { styles.preview }
				type = { RNCamera.Constants.Type.back }
				flashMode = { RNCamera.Constants.FlashMode.auto }
				androidCameraPermissionOptions = { {
					title: I18n.t( "camera.title" ),
					message: I18n.t( "camera.message" ),
					buttonPositive: I18n.t( "camera.buttonPositive" ),
					buttonNegative: I18n.t( "camera.buttonNegative" )
				} }
				onBarCodeRead = { ( { barcodes } ) => {
					console.log( barcodes.data );
            Alert.alert( '识别结果',barcodes.data );
          }}
			/>
	  </View>;
	}
	takePicture = async() => {
		if ( this.camera ) {
			const options = { quality: 0.5, base64: true };
			const data = await this.camera.takePictureAsync( options );
			console.log( data.uri );
			//path 图片文件的路径
			readerQR( data.uri ).then( data => {
				Alert.alert('识别结果',data);
			} ).catch( err => {
				console.log( "err", err );
				Alert.alert('识别失败');
			} );
		};
	};
};

