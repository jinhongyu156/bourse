import React, { PureComponent } from "react";
import { RNCamera } from "react-native-camera";
import { StyleSheet, Text, View } from "react-native";
import I18n from "i18n-js";

const styles = StyleSheet.create( {
	container: { flex: 1, flexDirection: "column", backgroundColor: "#000000" },
	preview: { flex: 1, justifyContent: "flex-end", alignItems: "center" }
} );

export default class extends React.Component
{
	constructor( props )
	{
		super( props );
	}
	onBarCodeRead( res )
	{
		this.props.route.params.callback( res.data );
	}
	render()
	{
		return <View style = { styles.container }>
			<RNCamera
				style = { styles.preview }
				type = { RNCamera.Constants.Type.back }
				flashMode = { RNCamera.Constants.FlashMode.auto }
				androidCameraPermissionOptions = { {
					title: I18n.t( "camera.title" ),
					message: I18n.t( "camera.message" ),
					buttonPositive: I18n.t( "camera.buttonPositive" ),
					buttonNegative: I18n.t( "camera.buttonNegative" )
				} }
				onBarCodeRead = { this.onBarCodeRead }
			/>
	  </View>;
	}
};

