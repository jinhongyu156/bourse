import React from "react";

import { WebView } from "react-native-webview";

import { Dimensions } from "react-native";

const WIDTH = Dimensions.get( "window" ).width;

const DISABLEZOOM = `
	const meta = document.createElement( "meta" ); 
	meta.setAttribute( "name", "viewport" ); 
	document.getElementsByTagName( "head" )[ 0 ].appendChild( meta );
`;

const DISABLEHREF = `
	const a = document.getElementsByTagName( "a" );
	for( let i = 0; i < a.length; i++ )
	{
		a[ i ].onclick = function ( event )
		{
			event.preventDefault();
		}
	}
`;

const INJECTEDJAVASCRIPT = DISABLEZOOM + DISABLEHREF;

export default React.memo( function( props )
{
	// 设置标题
	React.useEffect( () => {
		props.navigation.setOptions( { title: `${ props.route.params.title }` } );
	}, [] );

	return <WebView source = { { html: `<html><head></head><body style = "background-color: #FFFFFF;">${ props.route.params.content }</body></html>` } } injectedJavaScript = { INJECTEDJAVASCRIPT  } containerStyle = { { width: WIDTH } } />
} );
