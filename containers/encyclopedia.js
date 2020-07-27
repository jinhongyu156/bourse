import React from "react";

import { View, Text, SectionList, StyleSheet } from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";

import Dropdown from "./../components/dropdown.js";

import I18n from "i18n-js";

// 头部高度
const HEADER_HEIGHT = 50;

// 下拉菜单按钮宽
const DROPDOWN_BUTTON_WIDTH = 180;

// 下拉菜单按钮高
const DROPDOWN_BUTTON_HEIGHT = 40;

// 下拉菜单行高度
const DROPDOWN_ROW_HEIGHT = 40;

// 列表行高度
const LIST_ROW_HEIGHT = 80;

const styles = StyleSheet.create( {
	container: { flex: 1, backgroundColor: "#FFFFFF" },

	header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", height: HEADER_HEIGHT, paddingHorizontal: 24, backgroundColor: "#FFFFFF" },
	headerText: { fontSize: 18, fontWeight: "bold" },
	dropdownButton: { width: DROPDOWN_BUTTON_WIDTH, height: DROPDOWN_BUTTON_HEIGHT, flexDirection: "row", justifyContent: "center", alignItems: "center" },
	dropdownButtonText: { marginRight: 8 },
	dropdown: { width: DROPDOWN_BUTTON_WIDTH, height: DROPDOWN_ROW_HEIGHT * 5, marginTop: 2 },
	dropdownRow: { height: DROPDOWN_ROW_HEIGHT, paddingHorizontal: 6, justifyContent: "center" },
	dropdownRowText: { fontSize: 12 },

	row: { height: LIST_ROW_HEIGHT, backgroundColor: "#FFFFFF", justifyContent: "center" },
	rowBox: { paddingHorizontal: 10, paddingVertical: 2, marginHorizontal: 12, backgroundColor: "#F5F5F5" },
	rowText1: { fontSize: 14, fontWeight: "bold", marginVertical: 2 },
	rowText2: { fontSize: 12, color: "#999999", marginVertical: 2 },
	sectionHeader: { justifyContent: "center", height: LIST_ROW_HEIGHT, paddingHorizontal: 12, backgroundColor: "#FFFFFF" },
	noDataBox: { height: 100, justifyContent: "center", alignItems: "center" },
	noDataText: { color: "#777777" }
} );

const data = [ {
	title: "香港数字有限公司百科",
	data: [
		{"question":"香港数字有限公司注册地在香港什么地方?","answer":"荃湾嘉达环球中心"},
		{"question":"香港数字有限公司股东是谁","answer":"加拿大SLB数字资产交易公司"},
		{"question":"香港数字有限公司与哪家律师事务所签订顾问协议","answer":"四川良旭律师事务所"},
		{"question":"香港数字有限公司委托哪家公司组装、托管、维修矿机","answer":"中外矿业"},
		{"question":"香港数字有限公司矿机数量由哪些单位监督","answer":"各大管理中心"},
		{"question":"香港数字有限公司在哪些电视台报道","answer":"四川电视台、成都电视台、香港卫视、康巴卫视"},
		{"question":"香港数字有限公司矿机产业托管合作方中外矿业有限公司是什么性质的企业","answer":"国有控股企业全资子公司"}
	]
}, {
	title: "ETU金融问答",
	data: [
		{"question":"ETU金融是由哪个机构推出的荣誉理财项目","answer":"香港数字有限公司"},
		{"question":"ETU金融平台与哪一家数字交易所合作，用户可以使用USDT和交易金便捷交易","answer":"BIFX.com(爱沙尼亚双牌照平台)"},
		{"question":"ETU金融当前投资什么矿机","answer":"BTC/ETH主流矿机"},
		{"question":"ETU金融会员最低购买多少台矿机","answer":"0.1台"},
		{"question":"用户怎样参与ETU金融","answer":"购买矿机"},
		{"question":"ETU金融代币支持哪些平台和钱包","answer":"imtoken等以太坊公链离线钱包和已上线的交易平台"},
		{"question":"线下转账ETU需要哪种矿工费","answer":"ETH"},
		{"question":"ETU代币的技术标准为","answer":"使用以太坊底层技术，与USDT泰达币同类技术，不可串改"},
		{"question":"ETU金融的使命是什么","answer":"打造无一人亏损的平台"},
		{"question":"ETU金融将完成一个什么样的产业","answer":"区块链全生态产业链"},
		{"question":"ETU金融矿机定投的预期时间为","answer":"5-7年"},
		{"question":"ETU金融传统融资板块包含","answer":"水电站、芯片公司、区块链科技公司、数字资产交易所"},
		{"question":"ETU金融与会员签订协议的是哪家公司","answer":"香港数字有限公司"}
	]
}, {
	title: "矿机频道",
	data: [
		{"question":"ETU金融比特币矿机功率为","answer":"3300瓦左右"},
		{"question":"ETU金融以太坊矿机功率为","answer":"1100瓦左右"},
		{"question":"ETU金融的矿机使用寿命为","answer":"5-7年"},
		{"question":"会员的矿机在哪家保险公司参保","answer":"阳光保险"},
		{"question":"ETU金融矿机到期后在什么时间可以申请回购","answer":"需在到期后七个工作日内申请回购，未申请回购自动续约，点位奖金收益继续"},
		{"question":"ETU金融1.0-泰达时代会员的矿机到期申请回购按什么标准","answer":"按1.0标准到期回购"}
	]
}, {
	title: "ETU收益分红",
	data: [
		{"question":"ETU金融的挖矿收益和各种奖励如何判断会员收益达到三倍","answer":"所有收益从算力中释放"},
		{"question":"算力不足无法领取推广奖励该怎么办","answer":"兑换算力"},
		{"question":"原点复投后的交易金增加方式为","answer":"先补足原交易金的算力再增加交易金"},
		{"question":"使用交易金参与了合约交易，交易金发生了盈亏，每日挖矿分红该怎么计算","answer":"交易金的千分之三"},
		{"question":"交易金发生盈亏，推广奖和销售奖代数如何考核","answer":"系统按累计投资考核"},
		{"question":"交易金亏损到无法领取，各项奖金怎么释放","answer":"照常从算力中释放"},
		{"question":"兑换了算力，交易金在推广奖和销售奖代数考核标准中未达标，该怎么办","answer":"系统按累计投资考核"},
		{"question":"推广收益为何会浮动","answer":"旗下会员忘记领取收益或交易金发生了增减"},
		{"question":"管理收益为何会浮动","answer":"升级管理奖增加，被旗下平级超越伯乐奖增加"},
		{"question":"交易金盈利增加，每日挖矿分红是否会增加","answer":"会"},
	]
}, {
	title: "ETU金融2.0",
	data: [
		{"question":"ETU金融2.0-电力时代会员矿机投资时间是","answer":"一年期"},
		{"question":"ETU金融2.0-电力时代会员每次投资最大收益达到多少则机器归公司所有","answer":"投资额的3倍"},
		{"question":"ETU金融2.0-电力时代为投资者匹配多少交易金","answer":"矿机投资额等值的交易金"},
		{"question":"ETU金融2.0-电力时代会员挖矿分红按什么标准计算","answer":"交易金的千分之三/天"}
	]
} ]


const Header = React.memo( function( { scrollToLocation } )
{

	const onSelect = React.useCallback( function( index )
	{
		scrollToLocation( { itemIndex: 0, sectionIndex: index, viewOffset: 0 } );
	}, [] )

	const dropdownButton = React.useCallback( function( buttonText )
	{
		return <View style = { styles.dropdownButton }>
			<Text style = { styles.dropdownButtonText }>{ buttonText }</Text>
			<Icon name = "caret-down" size = { 18 } color = "#000000" />
		</View>;
	}, [] );

	return <View style = { styles.header }>
		<Text style = { styles.headerText }>{ I18n.t( "classroom.encyclopedia.title" ) }</Text>
		<Dropdown
			options = { [ "香港数字有限公司百科", "ETU金融问答", "矿机频道", "ETU收益分红", "ETU金融2.0" ] }
			hasStatusBar = { true }
			dropdownStyle = { styles.dropdown }
			rowTextStyle = { styles.dropdownRowText }
			rowStyle = { styles.dropdownRow }
			renderButton = { dropdownButton }
			onSelect = { onSelect }
		/>
	</View>
} );

const Row = React.memo( function( { data, index } )
{
	return <View style = { styles.row }>
		<View style = { styles.rowBox }>
			<Text style = { styles.rowText1 }>{ index + 1 }: { data.question }</Text>
			<Text style = { styles.rowText2 }>{ I18n.t( "classroom.encyclopedia.answer" ) }: { data.answer }</Text>
		</View>
	</View>;
} );

const SectionHeader = React.memo( function( { text } )
{

	return <View style = { styles.sectionHeader }>
		<Text>{ text }: </Text>
	</View>;
} );

const ListEmpty = React.memo( function()
{
	return <View style = { styles.noDataBox }>
		<Text style = { styles.noDataText }>{ I18n.t( "classroom.encyclopedia.noDataText" ) }</Text>
	</View>;
} );

export default React.memo( function( {} )
{

	const sectionListRef = React.useRef( null );

	const scrollToLocation = React.useCallback( obj => sectionListRef.current.scrollToLocation( obj ), [ sectionListRef ] );


	return <React.Fragment>
		<Header scrollToLocation = { scrollToLocation } />
		<SectionList
			style = { styles.container }
			ref = { sectionListRef }
			renderItem = { ( { item, index } ) => <Row data = { item } index = { index } /> }
			renderSectionHeader = { ( { section: { title } } ) => <SectionHeader text = { title } /> }
			ListEmptyComponent = { () => <ListEmpty /> }
			showsVerticalScrollIndicator = { false }
			stickySectionHeadersEnabled = { true }
			sections = { data }
			keyExtractor = { ( item, index ) => item + index }
			getItemLayout = { ( data, index ) => ( { length: LIST_ROW_HEIGHT, offset: LIST_ROW_HEIGHT * index, index: index } ) }
		/>
	</React.Fragment>
} );

