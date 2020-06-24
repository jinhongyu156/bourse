import React, { PureComponent } from "react";
import { RNCamera } from "react-native-camera";
import { StyleSheet, View, Alert } from "react-native";
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
		this.state = { success: false };
	}
	onBarCodeRead( res )
	{
		this.setState( { success: true }, () => Alert.alert( I18n.t( "camera.successTitle" ), res.data, [ { text: I18n.t( "camera.confirm" ), onPress: () => {
			this.props.navigation.goBack();
			this.props.route.params.callback( res.data );
		} } ], { cancelable: false } ) );
	}
	render()
	{
		return <View style = { styles.container }>
		{
			this.state.success
				? null
				: <RNCamera
					style = { styles.preview }
					type = { RNCamera.Constants.Type.back }
					flashMode = { RNCamera.Constants.FlashMode.auto }
					androidCameraPermissionOptions = { {
						title: I18n.t( "camera.title" ),
						message: I18n.t( "camera.message" ),
						buttonPositive: I18n.t( "camera.buttonPositive" ),
						buttonNegative: I18n.t( "camera.buttonNegative" )
					} }
					onBarCodeRead = { this.onBarCodeRead.bind( this ) }
				/>
		}
	  </View>;
	}
};

