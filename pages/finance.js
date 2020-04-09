import React from "react";

import { View, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create( {
	container: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: "#FFFFFF" },
} );

export default React.memo( function Finance( {} )
{
	return <View style = { styles.container }>
		<Text>Finance</Text>
	</View>;
} );
