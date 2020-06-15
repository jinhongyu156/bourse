import React from "react";

import { View, Text, Image, FlatList, RefreshControl, StyleSheet } from "react-native";

import { bindActionCreators } from "redux";

import { connect } from "react-redux";

import I18n from "i18n-js";

import { fetchData } from "./../redux/actions/article.js";

// 时间图标 size
const CIRCLESIZE = 14;

const styles = StyleSheet.create( {
	container: { flex: 1, backgroundColor: "#FFFFFF" },
	contentContainerStyle: { paddingHorizontal: 20, paddingVertical: 26 },

	timeBox: { flexDirection: "row", alignItems: "center" },
	circleIcon: { width: CIRCLESIZE, height: CIRCLESIZE, borderRadius: CIRCLESIZE, marginRight: 6, borderColor: "#696DAC", borderWidth: 2 },
	time: { fontSize: 16, color: "#10122A" },

	timeLine: { borderColor: "#D2D2D2", borderLeftWidth: 2 },
	detail: { marginLeft: 6, paddingLeft: 14, paddingBottom: 16 },
	titleBox: { justifyContent: "center", marginTop: 8 },
	title: { fontSize: 18, fontWeight: "bold", color: "#10122A" },
	contentBox: { marginVertical: 8 },
	content: { fontSize: 15, lineHeight: 26 },

	image: { width: "100%", height: 140 },

	item2: { alignItems: "center" },
	time2: { fontSize: 12, color: "#828385", paddingVertical: 10 },
	content2: { fontSize: 14, color: "#10122A", paddingVertical: 10 },

	errorBox: { height: 100, paddingHorizontal: 10, justifyContent: "center" },
	errorText: { color: "#F00" },

	noDataBox: { height: 100, justifyContent: "center", alignItems: "center" },
	noDataText: { color: "#777777" }
} );

const List1Item = React.memo( function( { title, time, img, content, isEnd } )
{
	return <React.Fragment>
		<View style = { styles.timeBox }>
			<View style = { styles.circleIcon } />
			<Text style = { styles.time }>{ time }</Text>
		</View>
		<View style = { [ styles.detail, isEnd ? {} : styles.timeLine ] }>
			<View style = { styles.titleBox }>
				<Text style = { styles.title }>{ title }</Text>
			</View>
			<View style = { styles.contentBox }>
				<Text style = { styles.content }>&emsp;&emsp;{ content }</Text>
			</View>
			{ img ? <View style = { styles.image }><Image resizeMode = { "contain" } style = { styles.image } source = { { uri: img } } /></View> : null }
		</View>
	</React.Fragment>;
} );

const List2Item = React.memo( function( { time, content } )
{
	return <View style = { styles.item2 }>
		<Text style = { styles.time2 }>{ time }</Text>
		<Text style = { styles.content2 }>&emsp;&emsp;{ content }</Text>
	</View>;
} );

const ListEmpty = React.memo( function()
{
	return <View style = { styles.noDataBox }>
		<Text style = { styles.noDataText }>{ I18n.t( "floatAction.noDataText" ) }</Text>
	</View>;
} );

const ListError = React.memo( function( { error } )
{
	return <View style = { styles.errorBox }>
		<Text style = { styles.errorText }>{ error }</Text>
	</View>;
} );

// const ListLoading = React.memo( function()
// {
// 	return <ActivityIndicator size = "small" color = "#696DAC" />;
// } );

const Article = React.memo( function( props )
{
	const fetchData = React.useCallback( function()
	{
		props.fetchData( props.route.params.index );
	}, [] )

	// 设置标题
	React.useEffect( () => {
		props.navigation.setOptions( { title: props.route.params.title } );
	}, [] );

	// 请求
	React.useEffect( () => {
		fetchData();
	}, [] );

	return <FlatList
		style = { styles.container }
		contentContainerStyle = { styles.contentContainerStyle }
		data = { props.data }
		renderItem = { ( { item, index } ) => props.route.params.index === 1
			? <List2Item key = { index } { ...item } />
			: <List1Item key = { index } isEnd = { props.data.length - 1 === index } { ...item } />
		}
		ListEmptyComponent = { () => props.error ? <ListError /> : props.loading ? null : <ListEmpty /> }
		showsVerticalScrollIndicator = { false }
		keyExtractor = { ( item, index ) => item + index }
		refreshControl = { <RefreshControl refreshing = { props.loading } onRefresh = { fetchData } /> }
	/>;
} );

export default connect(
	function mapStateToProps( state, ownProps )
	{
		const articleData = state.article;
		return {
			data: articleData.data,
			error: articleData.error,
			loading: articleData.loading
		};
	},
	function mapDispatchToProps( dispatch, ownProps )
	{
		return bindActionCreators( { fetchData }, dispatch );
	}
)( Article );
