// 域名
export const domain = "http://ca.slb.one";

// 拼接 GET 请求查询参数
export function setSearch( { url, params } )
{
	return ( url ? url.concat( "?" ) : "" ).concat( Object.keys( params ).map( item => `${ item }=${ params[ item ] }` ).join( "&" ) );
};

// 判断是否为对象
export function isObject( obj )
{
	return Object.prototype.toString.call( obj ) === "[object Object]";
};

// post fetch
export function fetchPost( url, data, config = {} )
{
	const mergeConfig = Object.assign( {}, {
		method: "POST",
		headers: { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" },
		body: setSearch( { params: data } )
	}, config );

	return new Promise( function( resolve, reject )
	{
		fetch( domain.concat( url ), mergeConfig ).then( function( response )
		{
			if( response.status === 200 )
			{
				return response.text();
			} else
			{
				reject( { type: "network", status: response.status } );
			};
		} ).then( function( res )
		{
			resolve( res );
		} ).catch( function( err )
		{
			reject( { type: "catch", err: err } );
		} );
	} );
};

// get img fetch
export function fetchImage( url, data, config = {} )
{
	return new Promise( function( resolve, reject )
	{
		return fetch( setSearch( { url: domain.concat( url ), params: data } ), config ).then( function( response )
		{
			if( response.status === 200 )
			{
				return response.blob();
			} else
			{
				reject( { type: "network", status: response.status } );
			};
		} ).then( function( blob )
		{
			const reader = new FileReader();

			reader.onload = function( e )
			{
				resolve( e.target.result.split( "base64," )[ 1 ] );
			};
			reader.readAsDataURL( blob );
		} ).catch( function( err )
		{
			reject( { type: "catch", err: err } );
		} )
	} )
	
};

// get fetch
export function fetchGet( url, data, config = {} )
{
	return new Promise( function( resolve, reject )
	{
		return fetch( setSearch( { url: domain.concat( url ), params: data } ), config ).then( function( response )
		{
			if( response.status === 200 )
			{
				return response.text();
			} else
			{
				reject( { type: "network", status: response.status } );
			};
		} ).then( function( res )
		{
			resolve( res );
		} ).catch( function( err )
		{
			reject( { type: "catch", err: err } );
		} )
	} );
};