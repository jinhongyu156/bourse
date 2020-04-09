import React from "react";

import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const styles = StyleSheet.create( {
	container: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: "#FFFFFF" },
} );

export default React.memo( function Login( {} )
{
	return <View style = { styles.container }>
	</View>;
} );
