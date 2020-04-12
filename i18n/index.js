import I18n from "i18n-js";
import * as RNLocalize from "react-native-localize";
import en from "./en.js";														// 英文语言包
import zh from "./zh.js";														// 中文语言包
import store from "./../redux/store/index.js";
import RNRestart from "react-native-restart";

/**
 * I18n.translations[ "zh" ] = { test1: "你好 % {name}", test2: "测试2" };
 * I18n.translations[ "en" ] = { test1: "Hello % {name}", test2: "test2" };
 * I18n.translations[ "ja" ] = { test1: "こんにちは % {name}", test2: "テスト2" };
 * console.log( 1, I18n.currentLocale() );										// 返回 I18n.locale
 * console.log( 2, I18n.t( "test1", { name: "John Doe" } ) );					// 传入 key, 并插值的方式获取信息
 * console.log( 4, I18n.t( "test2", { locale: "en" } ) );						// 显示指定返回信息的预言环境
 * console.log( 3, I18n.t( "test3", { defaultValue: "A default message" } ) );	// 传入 key, 设置不存在该 key 时默认返回的信息
 * console.log( 5, I18n.t( "test2", { locale: "fr" } ) );						// 默认情况下缺少 translations, 则从 I18n.defaultLocale 中获取
 **/

const localeArr = RNLocalize.getLocales();										// 按顺序返回用户首选的语言环境
const systemLocaleCode = localeArr[ 0 ] ? localeArr[ 0 ].languageCode: null;	// 用户所使用的的语言

I18n.defaultLocale = "zh";														// 为 i18n 设置默认语言环境 locale
I18n.locale = systemLocaleCode ? systemLocaleCode : "zh";						// 为 i18n 设置语言环境 locale

I18n.fallbacks = true;

I18n.translations = { en, zh };

let prevUserLanguage = store.getState().language.userLanguage;

store.subscribe( () => {
	const { language } = store.getState();
	if( language.userLanguage && prevUserLanguage !== language.userLanguage )
	{
		console.log( "===sssssssss" );
		I18n.locale = language.userLanguage;
		prevUserLanguage = language.userLanguage;
		// RNRestart.Restart();
	};
} );

export default I18n;
