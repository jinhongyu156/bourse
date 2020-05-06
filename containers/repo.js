import React from "react";

import { ScrollView, Text, ToastAndroid, TouchableOpacity, StyleSheet } from "react-native";

import I18n from "i18n-js";

const RNFS = require( "react-native-fs" );

const PADDING = 20;

const styles = StyleSheet.create( {
	container: { flex: 1, backgroundColor: "#FFFFFF" },
	contentContainer: { padding: PADDING },

	text: { fontSize: 12, marginVertical: 8 },
	title: { fontSize: 20, alignSelf: "center" },
	rightText: { fontSize: 12, marginVertical: 8, alignSelf: "flex-end" },
	downloadText: { fontSize: 12, marginVertical: 8, color: "#F00" },

	errorBox: { height: 100, alignItems: "center", justifyContent: "center" },
	errorText: { fontSize: 16, color: "#F00" },
	noDataText: { fontSize: 16, color: "#000000" }
} );

export default React.memo( function( { etusd } )
{
	console.log( "etusd", etusd );
	const onPress = React.useCallback( function()
	{
		RNFS.downloadFile( {
			fromUrl: "http://ca.slb.one/data/矿机回购申请书.doc",
			toFile: `${ Platform.OS === "ios" ? RNFS.LibraryDirectoryPath : RNFS.ExternalDirectoryPath }/${ ( ( Math.random() * 1000 ) | 0 ) }.doc`
		} ).promise.then( res => {
			ToastAndroid.show( I18n.t( "user.downloadSuccess" ), ToastAndroid.SHORT );
		} );
	}, [] );
	if( Number( etusd ) > 0 )
	{
		return <ScrollView style = { styles.container } contentContainerStyle = { styles.contentContainer } showsVerticalScrollIndicator = { false }>
			<Text style = { styles.title }>矿机回购申请书</Text>
			<Text style = { styles.text }>香港数字有限公司: </Text>
			<Text style = { styles.text }>&emsp;&emsp;&emsp;&emsp;因我与贵公司自愿签订矿机投资合同, 根据《中华人民共和国经济合同法》等相关法律, 已合法生效. 在经营过程中, 因我方(1.合同有效期已满. 2.合同履行期内, 因家庭或个人等原因, 不能继续履行合同. 3.合同自动续签履约期内, 因本人原因不能保证保障合同继续履行)将向你方提出请求你方回购本人投资的矿机_______台. </Text>
			<Text style = { styles.text }>ID号____________________________________. </Text>
			<Text style = { styles.text }>希望取得你方审核同意. 望获准, 办理为感！</Text>
			<Text style = { styles.text }>特此申请.  </Text>
			<Text style = { styles.rightText }>申请人: ___________________</Text>
			<Text style = { styles.rightText }>身份证号码: _______________</Text>
			<Text style = { styles.rightText }>联系电话:  ________________</Text>
			<Text style = { styles.rightText }>日期: ______年_____月____日</Text>
			<TouchableOpacity onPress = { onPress }><Text style = { styles.downloadText }>&lt;点击下载矿机回购申请书&gt;</Text></TouchableOpacity>
			<Text style = { styles.text }>温馨提示: </Text>
			<Text style = { styles.text }>1.投资未满3个月的, 公司依据约定扣除投资额的20%作为违约金. </Text>
			<Text style = { styles.text }>2.本人双手执身份证照片一张和矿机回购申请书, 提交给客服确认. </Text>
			<Text style = { styles.text }>3.客服审查后, 7个工作日内办理完成. </Text>
			<Text style = { styles.text }>客服电话: 18244444404</Text>
		</ScrollView>;
	} else
	{
		return <View style = { styles.container }>
			<View style = { styles.errorBox }>
				<Text style = { styles.noDataText }>{ I18n.t( "user.noContract" ) }</Text>
			</View>
		</View>;
	};
} );

