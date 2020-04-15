import React from "react";

import { View, Text, TouchableOpacity, Image } from "react-native";

/**
 * [description]			图片验证码
 * @imageBlob				{string}		[description] img.src
 * @codeImageBtnBoxStyle	{Object}		[description] imgbox.style
 * @codeImageBtnStyle		{Object}		[description] img.style
 * @errorColorStyle			{Object}		[description] errorText.style
 * @fetchImageError			{string}		[description] error info
 * @fetchImageCode			{function}		[description] fetch img.src
 * @return					{ele}			[description]
 **/

export default React.memo( function( { imageBlob, codeImageBtnBoxStyle, codeImageBtnStyle, errorColorStyle, fetchImageError, fetchImageCode } )
{
	if( imageBlob && !fetchImageError )
	{
		return <TouchableOpacity style = { codeImageBtnBoxStyle } onPress = { fetchImageCode }>
			<Image resizeMode = { "cover" } style = { codeImageBtnStyle } source = { { uri: `data:image/png;base64,${ imageBlob }` } } />
		</TouchableOpacity>;
	} else
	{
		return <View style = { codeImageBtnBoxStyle }>
			<Text style = { errorColorStyle }>{ fetchImageError }</Text>
		</View>;
	};
} );
