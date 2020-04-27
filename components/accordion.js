import React from "react";

import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const styles = StyleSheet.create( {
	accordionItemContent: { overflow: "hidden" }
} );

export const AccordionItem = React.memo( function( { index, rowStyle, expanded, renderTitle, renderContent, ...args } )
{
	const [ open, setOpen ] = React.useState( expanded.includes( index ) );

	return <View style = { rowStyle }>
		<TouchableOpacity onPress = { () => setOpen( prev => !prev ) }>
			{ renderTitle( open, index, args ) }
		</TouchableOpacity>
		<View style = { [ styles.accordionItemContent, open ? { height: "auto" } : { height: 0 } ] }>
			{ renderContent( open, index, args ) }
		</View>
	</View>;
} );

/**
 * [description]		手风琴组件
 * @data				{Array}			[description] 数据数组( 需要包含 id 字段 )
 * @expanded			{Array}			[description] 默认打开的项
 * @renderTitle			{function}		[description] 项的标题
 * @renderContent		{function}		[description] 项的内容
 * @return				{ele}			[description]
 **/

export const Accordion = React.memo( function( { data, rowStyle, expanded, renderTitle, renderContent } )
{
	return data.map( ( item, index ) => <AccordionItem
		key = { item.id }
		index = { index }
		rowStyle = { rowStyle }
		expanded = { expanded }
		renderTitle = { renderTitle }
		renderContent = { renderContent }
		{ ...item }
	/> )
} );

