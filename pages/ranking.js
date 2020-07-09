import React from "react";

import { bindActionCreators } from "redux";

import { connect } from "react-redux";

import { Image, View, Text, FlatList, TouchableOpacity, RefreshControl, StyleSheet } from "react-native";

import { fetchRanking, fetchFocus, fetchCancel } from "./../redux/actions/ranking.js";

import I18n from "i18n-js";

const ROWHEIGHT = 50;
const HEADERHEIGHT = 30;

const styles = StyleSheet.create( {
	container: { flex: 1, backgroundColor: "#F6F6F6" },

	header: { flexDirection: "row", alignItems: "center", backgroundColor: "#F6F6F6", height: HEADERHEIGHT, paddingHorizontal: 10 },
	headerText: { flex: 1, color: "#000000", textAlign: "center" },

	row: { flexDirection: "row", alignItems: "center", height: ROWHEIGHT, paddingHorizontal: 10, marginBottom: 1, backgroundColor: "#FFFFFF" },
	rowText: { flex: 1, color: "#777777", textAlign: "center" },

	imageBox: { flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" },
	image: { width: 20, height: 20 },
	tip: { fontSize: 12 },

	hold: { flex: 1 },
	btn: { flex: 1, justifyContent: "center", alignItems: "center" },
	btnText: { paddingTop: 4, paddingBottom: 4, color: "#FFFFFF" },

	errorBox: { height: 100, paddingHorizontal: 10, justifyContent: "center" },
	errorText: { color: "#F00" },

	noDataBox: { height: 100, justifyContent: "center", alignItems: "center" },
	noDataText: { color: "#777777" }
} );

// 列表行
const Row = React.memo( function( { index, data, selfId, targetId, fetchFocus, fetchCancel } )
{
	const bindFetchFocus = React.useCallback( function()
	{
		fetchFocus( data[ "uid" ], data[ "系统" ] )
	}, [] )

	const bindFetchCancel = React.useCallback( function()
	{
		fetchCancel( data[ "系统" ] )
	}, [] )

	return <View style = { [ styles.row, selfId == data[ "uid" ] ? { backgroundColor: "#EFEFEF" } : {} ] }>
		{
			index === 1
				? <View style = { styles.imageBox }>
					<Image style = { styles.image } source = { require( "./../images/index1.png" ) } />
				</View>
			: index === 2
				? <View style = { styles.imageBox }>
					<Image style = { styles.image } source = { require( "./../images/index2.png" ) } />
				</View>
			: index === 3
				? <View style = { styles.imageBox }>
					<Image style = { styles.image } source = { require( "./../images/index3.png" ) } />
				</View>
			: <Text style = { [ styles.rowText, styles.tip ] }>{ index }</Text>
		}
		<Text style = { styles.rowText }>{ data[ "uid" ] ? data[ "uid" ] : "-" }</Text>
		<Text style = { styles.rowText }>{ data[ "交易笔数" ] ? data[ "交易笔数" ] : "-" }</Text>
		<Text style = { styles.rowText }>{ data[ "交易金额" ] ? data[ "交易金额" ] : "-" }</Text>
		<Text style = { styles.rowText }>{ data[ "胜率" ] ? `${ data[ "胜率" ] }%` : "-" }</Text>
		{
			selfId == data[ "uid" ]
				? <View style = { styles.hold } />
				: <View style = { [ styles.btn, data[ "系统" ] === "ETU" ? { backgroundColor: "#696DAC" } : { backgroundColor: "#999999" } ] }>
				{
					targetId == data[ "uid" ]
						? <TouchableOpacity activeOpacity = { data[ "系统" ] === "ETU" ? 0.2 : 1 } onPress = { bindFetchCancel }><Text style = { styles.btnText }>{ I18n.t( "ranking.cancel" ) }</Text></TouchableOpacity>
						: <TouchableOpacity activeOpacity = { data[ "系统" ] === "ETU" ? 0.2 : 1 } onPress = { bindFetchFocus }><Text style = { styles.btnText }>{ I18n.t( "ranking.focus" ) }</Text></TouchableOpacity>
				}
				</View>
		}
	</View>
} );

// 列表头
const Header = React.memo( function()
{
	return <View style = { styles.header }>
		<Text style = { styles.headerText }>{ I18n.t( "ranking.index" ) }</Text>
		<Text style = { styles.headerText }>UID</Text>
		<Text style = { styles.headerText }>{ I18n.t( "ranking.number" ) }</Text>
		<Text style = { styles.headerText }>{ I18n.t( "ranking.amount" ) }</Text>
		<Text style = { styles.headerText }>{ I18n.t( "ranking.odds" ) }</Text>
		<Text style = { styles.headerText }>{ I18n.t( "ranking.focus" ) }</Text>
	</View>
} );

const Ranking = function ( props )
{
	React.useEffect( function()
	{
		props.fetchRanking();
	}, [] )

	return <FlatList
		data = { props.data }
		style = { styles.container }
		showsVerticalScrollIndicator = { false }
		ListHeaderComponent = { <Header /> }
		renderItem = { ( { item, index } ) => <Row key = { index } index = { index + 1 } data = { item } fetchFocus = { props.fetchFocus } fetchCancel = { props.fetchCancel } selfId = { props.selfId } targetId = { props.targetId } /> }
		keyExtractor = { ( item, index ) => item + index }
		refreshControl = { <RefreshControl refreshing = { props.loading } onRefresh = { props.fetchRanking } /> }
	/>;
};

export default connect(
	function mapStateToProps( state, ownProps )
	{
		const rankingData = state.ranking;

		return {
			data: rankingData.data,
			selfId: rankingData.selfId,
			targetId: rankingData.targetId,
			loading: rankingData.loading,
			error: rankingData.error
		};
	},
	function mapDispatchToProps( dispatch, ownProps )
	{
		return bindActionCreators( { fetchRanking, fetchFocus, fetchCancel }, dispatch );
	}
)( Ranking );

