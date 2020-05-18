import AsyncStorage from "@react-native-community/async-storage"; 
import systemLocale from "./../../i18n/systemLocale.js";

export const ACTION_SET_STORAGETOREDUX_ISSYNC = "ACTION_SET_STORAGETOREDUX_ISSYNC";

import { setLanguage } from "./language.js";
import { setIsLogin } from "./login.js";
import { setTheme } from "./theme.js";
import { setIsShowPrevState } from "./ustdRecharge.js";

export function asyncStorageToRedux( callback )
{
	return async function( dispatch )
	{
		try
		{
			const keys = await AsyncStorage.getAllKeys();

			if( !keys.includes( "userLanguage" ) )
			{
				await AsyncStorage.setItem( "userLanguage", systemLocale );
				dispatch( setLanguage( systemLocale, true ) );
			};

			if( !keys.includes( "isLogin" ) )
			{
				await AsyncStorage.setItem( "isLogin", "false" );
				dispatch( setIsLogin( false ) );
			};

			if( !keys.includes( "theme" ) )
			{
				await AsyncStorage.setItem( "theme", "0" );
				dispatch( setTheme( 0, true ) );
			};

			if( !keys.includes( "isShowPrevState" ) )
			{
				await AsyncStorage.setItem( "isShowPrevState", "false" );
				dispatch( setIsShowPrevState( false, true ) );
			};

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
				if( keys[ i ] === "theme" )
				{
					const theme = await AsyncStorage.getItem( keys[ i ] );
					if( theme )
					{
						dispatch( setTheme( theme, true ) );
					} else
					{
						await AsyncStorage.setItem( "theme", 0 );
						dispatch( setTheme( 0, true ) );
					};
				};
				if( keys[ i ] === "isShowPrevState" )
				{
					const isShowPrevState = await AsyncStorage.getItem( keys[ i ] );
					if( isShowPrevState === "true" )
					{
						dispatch( setIsShowPrevState( true, true ) );
					} else
					{
						dispatch( setIsShowPrevState( false, true ) );
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
