import React from "react";

import I18n from "i18n-js";

import { View, Text, Modal, TouchableOpacity, TextInput, ActivityIndicator, FlatList, Keyboard, StyleSheet } from "react-native";

// 页面头部高度
const HEADER_HEIGHT = 66;

// 页面头部 INPUT 高度
const HEADER_INPUT_BTN_HEIGHT = 34;

// 背景颜色
const LSIT_BACKGROUNDCOLOR = "#FFFFFF";

// 列表项高
const ITEM_HEIGHT = 52;

// 分割线高
const ITEM_SEPARATOR_HEIGHT = 1;

// 列表项左右间距
const LIST_ITEM_PADDING_HORIZONTAL = 14;

// 列表分区头左右间距
const LIST_HEADER_PADDING_HORIZONTAL = 20;

const styles = StyleSheet.create( {

	container: { flex: 1, paddingTop: 28 },

	header: { height: HEADER_HEIGHT, flexDirection: "row", justifyContent: "center", alignItems: "center", backgroundColor: LSIT_BACKGROUNDCOLOR },
	headerInput: { flex: 1, height: HEADER_INPUT_BTN_HEIGHT, borderRadius: 20, marginHorizontal: 10, paddingHorizontal: 20, paddingVertical: 0, backgroundColor: "#ECECEC" },
	headerBtn: { width: 60, height: HEADER_INPUT_BTN_HEIGHT, justifyContent: "center", alignItems: "center" },
	headerBtnText: { color: "#696DAC" },

	list: { flex: 1, backgroundColor: LSIT_BACKGROUNDCOLOR },
	listItem: { height: ITEM_HEIGHT, paddingHorizontal: LIST_ITEM_PADDING_HORIZONTAL, justifyContent: "center" },
	listItemText: { color: "#000000" },
	listItemSeparator: { height: ITEM_SEPARATOR_HEIGHT, marginHorizontal: LIST_HEADER_PADDING_HORIZONTAL, backgroundColor: "#ECECEC" },

	tipText: { fontSize: 16, marginTop: 100, textAlign: "center" }
} );

// 列表项 item
const ListItem = React.memo( function ( { id, text, onSelect } )
{
	return <TouchableOpacity style = { styles.listItem } onPress = { () => onSelect( id, text ) }>
		<Text style = { styles.listItemText }>{ text }</Text>
	</TouchableOpacity>;
} );

// 列表项 item 的分割线
const ItemSeparator = React.memo( function()
{
	return <View style = { styles.listItemSeparator }></View>;
} );

// 无数据时渲染的组件
const ListEmpty = React.memo( function()
{
	return <Text style = { styles.tipText }>{ I18n.t( "myBankCard.noDataText" ) }</Text>;
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

// 列表
const List = React.memo( function ( { data, error, isLoading, fetchData, onSelect } )
{
	React.useEffect( () => { fetchData() }, [] );

	const filterData = React.useMemo( () => data.filter( item => item.display ), [ data ] );

	const bindOnSelect = React.useCallback( ( id, text ) => onSelect( id, text ), [] );

	return <View style = { styles.list }>
		<FlatList
			data = { filterData }
			keyboardDismissMode = { "on-drag" }
			onScrollBeginDrag = { Keyboard.dismiss }
			renderItem = { ( { item, index } ) => <ListItem key = { index } id = { item.bankId } text = { item.bankName } onSelect = { bindOnSelect } /> }
			ListEmptyComponent = { () => error ? <ListError error = { error } /> : ( isLoading ? <ListLoading /> : <ListEmpty /> ) }
			ItemSeparatorComponent = { () => <ItemSeparator /> }
			showsVerticalScrollIndicator = { false }
			keyExtractor = { ( item, index ) => item + index }
			getItemLayout = { ( data, index ) => ( { length: ITEM_HEIGHT, offset: ( ITEM_HEIGHT + ITEM_SEPARATOR_HEIGHT ) * index, index: index } ) }
		/>
	</View>;
}, function( prevProps, nextProps )
{
	const isLoadingChanged = prevProps.isLoading === nextProps.isLoading;
	const onSelectChanged = prevProps.onSelect === nextProps.onSelect;
	const dataChanged = JSON.stringify( prevProps.data ) === JSON.stringify( nextProps.data );
	return isLoadingChanged && onSelectChanged && dataChanged;
} );

// 头部搜索框
const SelectorHeader = React.memo( function( { search, onBack } )
{
	const [ searchText, setSearchText ] = React.useState( "" );

	const searchKey = React.useMemo( () => searchText.trim(), [ searchText ] );

	React.useEffect( () => { search( { searchText: searchKey } ) }, [ searchKey ] );

	return <View style = { styles.header }>
		<TextInput
			style = { styles.headerInput }
			value = { searchText }
			placeholder = { I18n.t( "myBankCard.placeholderSearch" ) }
			onChangeText = { text => setSearchText( text ) }
		/>
		<TouchableOpacity style = { styles.headerBtn } onPress = { onBack }>
			<Text style = { styles.headerBtnText }>{ I18n.t( "myBankCard.back" ) }</Text>
		</TouchableOpacity>
	</View>
} );

export default React.memo( function ListSelector( props )
{
	return <Modal animationType ="slide" visible = { props.isShow } onRequestClose = { props.onBack }>
		<View style = { styles.container }>
			<SelectorHeader onBack = { props.onBack } search = { props.search } />
			<List data = { props.data } error = { props.error } isLoading = { props.isLoading } fetchData = { props.fetchData } onSelect = { props.onSelect } />
		</View>
	</Modal>;
} );
