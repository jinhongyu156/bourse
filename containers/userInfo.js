import React from "react";

import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

import I18n from "i18n-js";

// 用户信息展示容器高度
const USERINFOHEIGHT = 270;

// 用户信息展示行高度
const USERINFOROWHEIGHT = USERINFOHEIGHT / 3;

// 用户信息展示项目 icon 宽高
const USERINFOITEMICONSIZE = 30;

const styles = StyleSheet.create( {
	container: { marginTop: 6, height: USERINFOHEIGHT, backgroundColor: "#FFFFFF" },
	userInfoRow: { height: USERINFOROWHEIGHT, flexDirection: "row", justifyContent: "space-around", alignItems: "center" },
	userInfoItem: { flex: 1, alignItems: "center" },
	userInfoItemIcon: { width: USERINFOITEMICONSIZE, height: USERINFOITEMICONSIZE, marginBottom: 4 },
	userInfoItemTitle: { fontSize: 14, color: "#000000" },
	userInfoItemValue: { fontSize: 12, color: "#777777" }
} );

const UserInfoItem = React.memo( function UserInfoItem( { image, title, value } )
{
	return <View style = { styles.userInfoItem }>
		<Image style = { styles.userInfoItemIcon } source = { image } />
		<Text style = { styles.userInfoItemTitle }>{ title }</Text>
		<Text style = { styles.userInfoItemValue }>{ value }</Text>
	</View>;
} );

export default React.memo( function UserInfo( { data } )
{
	return <View style = { styles.container }>
		<View style = { styles.userInfoRow }>
			<UserInfoItem title = { I18n.t( "finance.userInfo.point" ) } value = { data[ "积分余额" ] } image = { require( "./../images/point.png" ) } />
			<UserInfoItem title = { I18n.t( "finance.userInfo.trading" ) } value = { data[ "交易金" ] } image = { require( "./../images/trading.png" ) } />
			<UserInfoItem title = { I18n.t( "finance.userInfo.power" ) } value = { data[ "机器算力" ] } image = { require( "./../images/power.png" ) } />
		</View>
		<View style = { styles.userInfoRow }>
			<UserInfoItem title = { I18n.t( "finance.userInfo.communityPerformance" ) } value = { data[ "团队业绩" ] } image = { require( "./../images/community_performance.png" ) } />
			<UserInfoItem title = { I18n.t( "finance.userInfo.communityLevel" ) } value = { data[ "社区等级" ] } image = { require( "./../images/community_level.png" ) } />
			<UserInfoItem title = { I18n.t( "finance.userInfo.numberOfTeam" ) } value = { data[ "团队人数" ] } image = { require( "./../images/number_of_team.png" ) } />
		</View>
		<View style = { styles.userInfoRow }>
			<UserInfoItem title = { I18n.t( "finance.userInfo.todayEarnings" ) } value = { data[ "今日收益" ] } image = { require( "./../images/today_earnings.png" ) } />
			<UserInfoItem title = { I18n.t( "finance.userInfo.yesterdayEarnings" ) } value = { data[ "昨日收益" ] } image = { require( "./../images/yesterday_earnings.png" ) } />
			<UserInfoItem title = { I18n.t( "finance.userInfo.allEarnings" ) } value = { data[ "总计收益" ] } image = { require( "./../images/all_earnings.png" ) } />
		</View>
	</View>;
} );
