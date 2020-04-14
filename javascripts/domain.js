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
