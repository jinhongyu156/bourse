// 域名
export const domain = "http://ca.slb.one";

// 拼接 GET 请求查询参数
export function setSearch( { url, params } )
{
	return ( url ? url.concat( "?" ) : "" ).concat( Object.keys( params ).map( item => `${ item }=${ params[ item ] }` ).join( "&" ) );
};

// 传入数字字符串str 保留 num 位小数, 并且不四舍五入( 若小数点后不足 num 个, 则补齐 )
export function getNum( str, num )
{
	if( str.indexOf( "." ) === -1 )
	{
		return str.concat( "." ).concat( "0".repeat( num ) );
	} else if( str.length - 1 - str.indexOf( "." ) < num )
	{
		return str.concat( "0".repeat( num - ( str.length - 1 - str.indexOf( "." ) ) ) );
	} else
	{
		return str.substring( 0, str.indexOf( "." ) + num + 1 );
	};
};

// 将对象中指定的 key 对应的 value 值做 getNum 操作
export function objectValueGetNum( obj, keys = [], num = 2 )
{
	const newObj = Object.assign( {}, obj );
	for ( let i = keys.length - 1; i >= 0; i-- )
	{
		newObj[ keys[ i ] ] = getNum( String( newObj[ keys[ i ] ] ), num );
	};
	return newObj;
};

// 判断是否为对象
export function isObject( obj )
{
	return Object.prototype.toString.call( obj ) === "[object Object]";
};

// 判断是否为数组
export function isArray( array )
{
	return Object.prototype.toString.call( array ) === "[object Array]";
};

// 将时间戳转化为时间字符串
export function dateFormat( timestamp )
{
	const time = new Date( timestamp );
	return `${ time.getFullYear() }-${ time.getMonth() + 1 }-${ time.getDate() } ${ time.getHours() }:${ time.getMinutes() }:${ time.getSeconds() }`
};

// 判断字符串是否为 json
export function isJSON( str )
{
	let bool = false;
	try
	{
		const obj = JSON.parse( str );
		if( obj && typeof obj == "object" )
		{
			bool = true;
		} else
		{
			bool = false;
		};
	} catch( e ) {
		return false;
	};
	return bool;
};

// unicode 字符串转化为中文字符串
function unicodeToChinese( str )
{
	return decodeURI( str );
};

// post fetch
export function fetchPost( url, data, config = {} )
{
	const mergeConfig = Object.assign( {}, { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" }, body: setSearch( { params: data } ) }, config );

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
			if( isJSON( String( res ) ) )
			{
				resolve( JSON.parse( String( res ) ) );
			} else
			{
				resolve( res );
			};
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
		return fetch( setSearch( { url: domain.concat( url ), params: data } ), config ).then( async function( response )
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
			if( isJSON( res ) )
			{
				resolve( JSON.parse( unicodeToChinese( res ) ) );
			} else
			{
				resolve( res );
			};
		} ).catch( function( err )
		{
			reject( { type: "catch", err: err } );
		} )
	} );
};
