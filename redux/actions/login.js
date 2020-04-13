/* action type */
export const ACTION_SET_ISLOADING = "ACTION_SET_ISLOADING";
export const ACTION_SET_LOGINTYPE = "ACTION_SET_LOGINTYPE";
export const ACTION_SET_INPUTTEXT = "ACTION_SET_INPUTTEXT";
export const ACTION_SET_INPUTERROR = "ACTION_SET_INPUTERROR";
export const ACTION_SET_CLEAR = "ACTION_SET_CLEAR";

/* action create */
const phoneNumberReg = /^1(3|4|5|7|8)\d{9}$/;
const emailTextReg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.{1}([a-zA-Z]{2,4})$/;

// 切换登录方式
export function setLoginType( loginType )
{
	return async function( dispatch, getState )
	{
		const { login } = getState();
		dispatch( { type: ACTION_SET_INPUTTEXT, payload: { code: "" } } );
		dispatch( { type: ACTION_SET_LOGINTYPE, payload: { loginType } } );
	};
};

// 设置输入文本
export function setInputText( key, value )
{
	return async function( dispatch, getState )
	{
		if( key === "phoneNumber" )
		{
			dispatch( { type: ACTION_SET_INPUTERROR, payload: phoneNumberReg.test( value ) ? "" : "phoneNumber" } );
			// dispatch( { type: ACTION_SET_SENDCODESTATUS, payload: phoneNumberReg.test( value ) ? 1 : 0 } );
			
		};
		if( key === "emailText" )
		{
			dispatch( { type: ACTION_SET_INPUTERROR, payload: emailTextReg.test( value ) ? "" : "emailText" } );
			// dispatch( { type: ACTION_SET_SENDCODESTATUS, payload: emailTextReg.test( value ) ? 1 : 0 } );
		};
		dispatch( { type: ACTION_SET_INPUTTEXT, payload: { [ key ]: value } } );

	};
};

// 登录页面 componentWillUnmount
export function clear() {
	return { type: ACTION_SET_CLEAR };
};

// 登录
export function fetchCityData()
{
	return async function( dispatch, getState )
	{
		const { home } = getState();

		if ( home.isLoading ) return;
	};
};

