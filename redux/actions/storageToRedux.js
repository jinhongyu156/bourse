import AsyncStorage from "@react-native-community/async-storage"; 
import systemLocale from "./../../i18n/systemLocale.js";

export const ACTION_SET_STORAGETOREDUX_ISSYNC = "ACTION_SET_STORAGETOREDUX_ISSYNC";

import { setLanguage } from "./language.js";
import { setIsLogin } from "./login.js";

export function asyncStorageToRedux( callback )
{
	return async function( dispatch )
	{
		try
		{
			const keys = await AsyncStorage.getAllKeys();
			for ( let i = keys.length - 1; i >= 0; i-- )
			{
				if( keys[ i ] === "userLanguage" )
				{
					const userLanguage = await AsyncStorage.getItem( keys[ i ] );
					if( userLanguage )
					{
						dispatch( setLanguage( userLanguage, true ) );
					} else 
					{
						await AsyncStorage.setItem( "userLanguage", systemLocale );
						dispatch( setLanguage( systemLocale, true ) );
					};
				};
				if ( keys[ i ] === "isLogin" )
				{
					const isLogin = await AsyncStorage.getItem( keys[ i ] );
					if( isLogin === "true" )
					{
						dispatch( setIsLogin( true ) );
					} else
					{
						await AsyncStorage.setItem( "isLogin", "false" );
						dispatch( setIsLogin( false ) );
					};
				};
			};
			callback();
			dispatch( { type: ACTION_SET_STORAGETOREDUX_ISSYNC, payload: true } );

		} catch( e ) {

			dispatch( { type: ACTION_SET_STORAGETOREDUX_ISSYNC, payload: false } );

		};
	};
};
