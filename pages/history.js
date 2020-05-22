import React from "react";

import I18n from "i18n-js";

import { View, Text, ActivityIndicator, FlatList, Keyboard, StyleSheet } from "react-native";

import { bindActionCreators } from "redux";

import { connect } from "react-redux";

import { setHistoryType, fetchHistoryData, fetchSubmit } from "./../redux/actions/history.js";

import Tab from "./../components/tab.js";

import TabBar from "./../containers/tabBar.js";

import SubmitBtn from "./../containers/submit.js";

import { AccordionItem } from "./../components/accordion.js";

// 背景颜色
const LSIT_BACKGROUNDCOLOR = "#FFFFFF";

// 列表项高
const ITEM_HEIGHT = 50;

// 分割线高
const ITEM_SEPARATOR_HEIGHT = 1;

// 选项卡导航高度
const TABBARHEIGHT = 50;

const styles = StyleSheet.create( {

	container: { flex: 1 },

	tabBar: { justifyContent: "space-around", height: TABBARHEIGHT, backgroundColor: "#FFFFFF", marginTop: 10 },

	list: { flex: 1, backgroundColor: LSIT_BACKGROUNDCOLOR },
	listTitle: { flexDirection: "row", height: ITEM_HEIGHT, paddingHorizontal: 14, alignItems: "center", backgroundColor: LSIT_BACKGROUNDCOLOR },
	listTitleItem: { flex: 2, alignItems: "center" },
	listTitleLongItem: { flex: 3 },

	listContent: { paddingHorizontal: 20 },
	listContentItem: { height: 36, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
	listContentItemKeyText: { fontSize: 12, color: "#4E4C58" },
	listContentItemValueText: { fontSize: 12, color: "#585862" },

	submitBtn: { width: "70%", height: 32, alignSelf: "center", marginVertical: 10 },

	listItemSeparator: { height: ITEM_SEPARATOR_HEIGHT, marginHorizontal: 20, backgroundColor: "#ECECEC" },

	tipText: { fontSize: 16, marginTop: 100, textAlign: "center" }
} );



const RowHeader = React.memo( function()
{
	return <View style = { styles.listTitle }>
		<View style = { styles.listTitleItem }><Text>{ I18n.t( "history.rate" ) }</Text></View>
		<View style = { styles.listTitleItem }><Text>{ I18n.t( "history.amount" ) }</Text></View>
		<View style = { styles.listTitleItem }><Text>{ I18n.t( "history.number" ) }</Text></View>
		<View style = { [ styles.listTitleItem, styles.listTitleLongItem ] }><Text>{ I18n.t( "history.state" ) }</Text></View>
	</View>

} );

const RowTitle = React.memo( function( item )
{
	const state = item[ "订单状态" ] === "0" ? I18n.t( "history.state0Tip" )
		: item[ "订单状态" ] === "1" ? I18n.t( "history.state1Tip" )
		: item[ "订单状态" ] === "2" ? I18n.t( "history.state2Tip" )
		: item[ "订单状态" ] === "3" ? I18n.t( "history.state3Tip" )
		: item[ "订单状态" ] === "4" ? I18n.t( "history.state4Tip" )
		: ""
	return <View style = { styles.listTitle }>
		<View style = { styles.listTitleItem }><Text>{ item[ "汇率" ] ? item[ "汇率" ] : "---" }</Text></View>
		<View style = { styles.listTitleItem }><Text>{ item[ "充值金额" ] }</Text></View>
		<View style = { styles.listTitleItem }><Text>{ Number( item[ "充币数量" ] ).toFixed( 2 ) }</Text></View>
		<View style = { [ styles.listTitleItem, styles.listTitleLongItem ] }><Text>{ state }</Text></View>
	</View>;
} );

const RowContent = React.memo( function( item )
{
	const onSubmit = React.useCallback( function()
	{
		item.submit( item[ "订单号" ] );
	}, [ item[ "订单号" ] ] );
	return <View style = { styles.listContent }>
		<View style = { styles.listContentItem }>
			<Text style = { styles.listContentItemKeyText }>{ I18n.t( "history.order" ) }:</Text>
			<Text style = { styles.listContentItemValueText }>{ item[ "订单号" ] }</Text>
		</View>
		<View style = { styles.listContentItem }>
			<Text style = { styles.listContentItemKeyText }>{ I18n.t( "history.type" ) }:</Text>
			<Text style = { styles.listContentItemValueText }>{ item[ "充值方式" ] }</Text>
		</View>
		
		<View style = { styles.listContentItem }>
			<Text style = { styles.listContentItemKeyText }>{ I18n.t( "history.createTime" ) }:</Text>
			<Text style = { styles.listContentItemValueText }>{ item[ "创建时间" ] ? item[ "创建时间" ] : "---" }</Text>
		</View>
		<View style = { styles.listContentItem }>
			<Text style = { styles.listContentItemKeyText }>{ I18n.t( "history.endTime" ) }:</Text>
			<Text style = { styles.listContentItemValueText }>{ item[ "完成时间" ] ? item[ "完成时间" ] : "---" }</Text>
		</View>
		{
			( item.historyType === 1 && item[ "订单状态" ] === "1" )
				? <SubmitBtn
					title = { I18n.t( "history.submitText" ) }
					submitBtnStyle = { styles.submitBtn }
					loading = { item.loading }
					onSubmit = { onSubmit }
				/>
				: null
		}
	</View>;
} );

// 列表项 item
const ListItem = React.memo( function ( item )
{
	return <AccordionItem
		index = { item[ "订单号" ] }
		expanded = { [] }
		renderTitle = { () => <RowTitle { ...item } /> }
		renderContent = { () => <RowContent { ...item } /> }
	/>;
} );

// 列表项 item 的分割线
const ItemSeparator = React.memo( function()
{
	return <View style = { styles.listItemSeparator }></View>;
} );

// 无数据时渲染的组件
const ListEmpty = React.memo( function()
{
	return <Text style = { styles.tipText }>{ I18n.t( "history.noDataText" ) }</Text>;
} );

// 错误时渲染的组件
const ListError = React.memo( function( { error } )
{
	return <Text style = { styles.tipText }>{ error }</Text>;
} );

// 加载时渲染的组件
const ListLoading = React.memo( function()
{
	return <ActivityIndicator size = "small" color = "#696DAC" />;
} );

const TabItem = React.memo( function( { historyType, submit, loading, data, submitLoading, error } )
{
	return <React.Fragment>
		<RowHeader />
		<FlatList
			data = { data }
			keyboardDismissMode = { "on-drag" }
			onScrollBeginDrag = { Keyboard.dismiss }
			renderItem = { ( { item, index } ) => <ListItem key = { index } historyType = { historyType } submit = { submit } loading = { submitLoading } { ...item } /> }
			ListEmptyComponent = { () => error ? <ListError error = { error } /> : ( loading ? <ListLoading /> : <ListEmpty /> ) }
			ItemSeparatorComponent = { () => <ItemSeparator /> }
			showsVerticalScrollIndicator = { false }
			keyExtractor = { ( item, index ) => item + index }
			getItemLayout = { ( data, index ) => ( { length: ITEM_HEIGHT, offset: ( ITEM_HEIGHT + ITEM_SEPARATOR_HEIGHT ) * index, index: index } ) }
		/>
	</React.Fragment>;
} )

const History = function History( props )
{

	React.useEffect( function()
	{
		props.fetchHistoryData()
	}, [] );

	const renderTabBar = React.useCallback( function( { tabs, activeTab, goToPage } )
	{
		return <TabBar tabs = { tabs } type = { "default" } tabBarStyle = { styles.tabBar } activeTab = { activeTab } goToPage = { goToPage } />;
	}, [] );

	return <TabItem
		tabLabel = { I18n.t( "history.tabText1" ) }
		historyType = { props.historyType }
		submit = { props.fetchSubmit }
		submitLoading = { props.fetchSubmitLoading }
		data = { props.historyData }
		loading = { props.fetchHistoryDataLoading }
		error = { props.fetchHistoryDataError }
	/>;

	return <View style = { styles.container }>
		<Tab
			renderTabBar = { renderTabBar }
			containerStyle = { styles.container }
			page = { props.historyType }
			onChangeTab = { props.setHistoryType }
		>
			<TabItem
				tabLabel = { I18n.t( "history.tabText1" ) }
				historyType = { props.historyType }
				submit = { props.fetchSubmit }
				submitLoading = { props.fetchSubmitLoading }
				data = { props.historyData }
				loading = { props.fetchHistoryDataLoading }
				error = { props.fetchHistoryDataError }
			/>
			<TabItem
				tabLabel = { I18n.t( "history.tabText2" ) }
				historyType = { props.historyType }
				submit = { props.fetchSubmit }
				submitLoading = { props.fetchSubmitLoading }
				data = { props.historyData }
				loading = { props.fetchHistoryDataLoading }
				error = { props.fetchHistoryDataError }
			/>
		</Tab>
	</View>;
};

export default connect(
	function mapStateToProps( state, ownProps )
	{
		const historyData = state.history;
		return {
			historyType: historyData.historyType,
			historyData: historyData.historyData,
			fetchHistoryDataLoading: historyData.fetchHistoryDataLoading,
			fetchHistoryDataError: historyData.fetchHistoryDataError,

			fetchSubmitLoading: historyData.fetchSubmitLoading
		};
	},
	function mapDispatchToProps( dispatch, ownProps )
	{
		return bindActionCreators( { setHistoryType, fetchHistoryData, fetchSubmit }, dispatch );
	}
)( History );
