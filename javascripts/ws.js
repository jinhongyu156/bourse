export default class Ws
{
	constructor( url, callback = {} )
	{
		this.url = url;														// url
		this.callback = callback;											// 回调函数
		this.ws = null;														// webSocket
		this.instance = null;												// Ws 实例
		this.timer = null;													// 心跳包 timer
		this.timeout = null;												// 重连 timer
		this._onopen = this.onopen.bind( this );
		this._onmessage = this.onmessage.bind( this );
		this._onerror = this.onerror.bind( this );
		this._onclose = this.onclose.bind( this );
	}
	/**
	 * 获取 WebSocket 单例
	 * @returns { Ws }
	 **/
	static getInstance( url, callback )
	{
		if ( !this.instance )
		{
			this.instance = new Ws( url, callback );
		};
		return this.instance;
	}
	/**
	 * 初始化 WebSocket
	 **/
	initWebSocket()
	{
		this.timer && clearInterval( this.timer );
		this.ws = new WebSocket( this.url );
		this.initWsEvent();
	}
	/**
	 * 初始化 WebSocket 事件
	 */
	initWsEvent()
	{
		this.ws.onopen = this._onopen;
		this.ws.onmessage = this._onmessage;
		this.ws.onerror = this._onerror;
		this.ws.onclose = this._onclose;
		/**
		 * 发送心跳包
		 **/
		this.timer = setInterval( () =>
		{
			if ( this.ws && this.ws.readyState === WebSocket.OPEN )
			{
				this.heartCheck && this.callback.heartCheck();
			};
		}, 5000 );
	}
	/**
	 * 发送消息: ws.send( msg )
	 */
	sendMessage( msg )
	{
		if ( this.ws && this.ws.readyState === WebSocket.OPEN )
		{
			this.ws.send( msg );
		};
	}
	/**
	 * 链接成功
	 **/
	onopen()
	{
		this.callback.onopen && this.callback.onopen();
	}
	/**
	 * 客户端接收服务端数据时触发
	 **/
	onmessage( event )
	{
		this.callback.onmessage && this.callback.onmessage( event.data );
	}
	/**
	 * 客户端链接服务端失败
	 **/
	onerror( error )
	{
		
		this.callback.onerror && this.callback.onerror( error );
		this.reconnect();
	}
	/**
	 * 链接被关闭
	 **/
	onclose()
	{
		this.callback.onclose && this.callback.onclose();
		this.reconnect();
	}
	/**
	 * 重连
	 **/
	reconnect()
	{
		this.timeout && clearTimeout( this.timeout );
		this.timeout = setTimeout( () =>
		{
			this.initWebSocket();
		}, 10000);
	}
};
