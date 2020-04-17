import React from "react";

import { WebView } from "react-native-webview";

import disclaimerStr from "./../containers/disclaimerStr.js";

const DISABLEZOOM = `
	const meta = document.createElement( "meta" ); 
	meta.setAttribute( "content", "initial-scale=1, maximum-scale=1, user-scalable=0" ); 
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
	return <WebView source = { { html: disclaimerStr } } injectedJavaScript = { INJECTEDJAVASCRIPT  } />
} );
