import "react-native-gesture-handler";
import "react-native-get-random-values"

import SplashScreen from "react-native-splash-screen";
import { RootSiblingParent } from "react-native-root-siblings";

import React from "react";
import { AppState, View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar, Image } from "react-native";

/** react-navigation */
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

/** redux provider */
import { Provider } from "react-redux";
/** redux store */
import store from "./redux/store/index.js";
import { asyncStorageToRedux } from "./redux/actions/storageToRedux.js";

import { closeWs as closeWs1, ws as ws1 } from "./redux/actions/ctc.js"
import { closeWs as closeWs2, ws as ws2 } from "./redux/actions/contract.js"
import { closeWs as closeWs3, ws as ws3 } from "./redux/actions/notice.js"
import { closeWs as closeWs4, ws as ws4 } from "./redux/actions/simulator.js"

/** I18n */
import I18n from "./i18n/index.js";

/** pages*/
// used by StackNavigator
import Login from "./pages/login.js";
import Register from "./pages/register.js";
import Disclaimer from "./pages/disclaimer.js";
import Access from "./pages/access.js";
import MyQrCode from "./pages/myQrCode.js";
import Chart from "./pages/chart.js";
import Article from "./pages/article.js";
import UsdtRecharge from "./pages/usdtRecharge.js";
import UsdtMention from "./pages/usdtMention.js";
import MyBankCard from "./pages/myBankCard.js";
import History from "./pages/history.js";
import Auth from "./pages/auth.js";
import Camera from "./pages/camera.js";
import Activity from "./pages/activity.js";
import Ranking from "./pages/ranking.js";
import Simulator from "./pages/simulator.js";
import SimulatorAccess from "./pages/simulatorAccess.js";

// used by BottomTabNavigator
import Finance from "./pages/finance.js";
import Contract from "./pages/contract.js";
import Ctc from "./pages/ctc.js";
import User from "./pages/user.js";

// 限制 TextInput 长度不超过 50;
TextInput.defaultProps = Object.assign( {}, TextInput.defaultProps, { maxLength: 50 } );

/** create Navigators */
// StackNavigator
const Stack = createStackNavigator();
// BottomTabNavigator
const Tab = createBottomTabNavigator();

// 底部导航 icon size
const ICONSIZE = 24;

const styles = StyleSheet.create( { image: { width: ICONSIZE, height: ICONSIZE } } );

function TabBar( { state, descriptors, navigation } )
{
	return <View style = { { flexDirection: "row", height: 50 } }>
	{
		state.routes.map( ( route, index ) => {
			const { options } = descriptors[ route.key ];
			const isFocused = state.index === index;
			const onPress = () => {
				const event = navigation.emit( { type: "tabPress", target: route.key, canPreventDefault: true } );
				!isFocused && !event.defaultPrevented && navigation.navigate( route.name );
			};
			return <TouchableOpacity key = { index } onPress = { onPress } style = { { flex: 1, justifyContent: "space-around", alignItems: "center" } }>
				{ options.tabBarIcon( isFocused ) }
				{ options.title( isFocused ) }
			</TouchableOpacity>;
		} )
	}
	</View>;
};

function TabNavigator( props )
{
	return <Tab.Navigator tabBar = { props => <TabBar { ...props } /> }>
		<Tab.Screen name = "Finance" component = { Finance } options = { {
			title: focused => <Text style = { { color: focused ? "#696DAC" : "#DEE1E4" } }>{ I18n.t( "bottomTabNavigator.finance" ) }</Text>,
			tabBarIcon: focused => focused
				? <Image style = { styles.image } source = { require( "./images/finance_active.png" ) } />
				: <Image style = { styles.image } source = { require( "./images/finance_inactive.png" ) } />
		} } />
		<Tab.Screen name = "Contract" component = { Contract } options = { {
			title: focused => <Text style = { { color: focused ? "#696DAC" : "#DEE1E4" } }>{ I18n.t( "bottomTabNavigator.contract" ) }</Text>,
			tabBarIcon: ( focused ) => focused
				? <Image style = { styles.image } source = { require( "./images/contract_active.png" ) } />
				: <Image style = { styles.image } source = { require( "./images/contract_inactive.png" ) } />
		} } />
		<Tab.Screen name = "Simulator" component = { Simulator } options = { {
			title: focused => <Text style = { { color: focused ? "#696DAC" : "#DEE1E4" } }>{ I18n.t( "bottomTabNavigator.simulator" ) }</Text>,
			tabBarIcon: ( focused ) => focused
				? <Image style = { styles.image } source = { require( "./images/simulator_inactive.png" ) } />
				: <Image style = { styles.image } source = { require( "./images/simulator_active.png" ) } />
		} } />

		<Tab.Screen name = "Ctc" component = { Ctc } options = { {
			title: focused => <Text style = { { color: focused ? "#696DAC" : "#DEE1E4" } }>{ I18n.t( "bottomTabNavigator.ctc" ) }</Text>,
			tabBarIcon: ( focused ) => focused
				? <Image style = { styles.image } source = { require( "./images/ctc_active.png" ) } />
				: <Image style = { styles.image } source = { require( "./images/ctc_inactive.png" ) } />
		} } />
		<Tab.Screen name = "User" component = { User } options = { {
			title: focused => <Text style = { { color: focused ? "#696DAC" : "#DEE1E4" } }>{ I18n.t( "bottomTabNavigator.user" ) }</Text>,
			tabBarIcon: ( focused ) => focused
				? <Image style = { styles.image } source = { require( "./images/user_active.png" ) } />
				: <Image style = { styles.image } source = { require( "./images/user_inactive.png" ) } />
		} } />
	</Tab.Navigator>;
};

export default function()
{
	const index = React.useRef( [] );

	const [ status, setStatus ] = React.useState( false );

	status || store.dispatch( asyncStorageToRedux( () => setStatus( true ) ) );

	React.useEffect( function()
	{
		SplashScreen.hide();
	}, [] );

	React.useEffect( () => {
		AppState.addEventListener( "change", _handleAppStateChange );
		return () => {
			AppState.removeEventListener( "change", _handleAppStateChange );
		};
	}, [] );

	const _handleAppStateChange = nextAppState => {
		if( nextAppState === "background" )
		{
			( ws1 && ws1.ws.readyState === WebSocket.OPEN ) && index.current.push( 1 ) && closeWs1();
			( ws2 && ws2.ws.readyState === WebSocket.OPEN ) && index.current.push( 2 ) && closeWs2();
			( ws3 && ws3.ws.readyState === WebSocket.OPEN ) && index.current.push( 3 ) && closeWs3();
			( ws4 && ws4.ws.readyState === WebSocket.OPEN ) && index.current.push( 4 ) && closeWs4();
			
		};
		if( nextAppState === "active" )
		{
			index.current.includes( 1 ) && ws1.reconnect();
			index.current.includes( 2 ) && ws2.reconnect();
			index.current.includes( 3 ) && ws3.reconnect();
			index.current.includes( 4 ) && ws3.reconnect();
			index.current = [];
		};
	};

	return status && <React.Fragment>
		<StatusBar barStyle = "dark-content" backgroundColor = "rgba( 0, 0, 0, 0 )" translucent = { true } />
		<Provider store = { store }>
			<RootSiblingParent>
				<NavigationContainer>
					<Stack.Navigator initialRouteName = { store.getState().login.isLogin ? "TabNavigator" : "Login" }>
						<Stack.Screen name = "Login" component = { Login } options = { () => ( { headerShown: false, headerTitle: I18n.t( "login.title" ) } ) } />
						<Stack.Screen name = "Register" component = { Register } options = { () => ( { headerShown: false, headerTitle: I18n.t( "register.title" ) } ) } />
						<Stack.Screen name = "Disclaimer" component = { Disclaimer } options = { { title: I18n.t( "register.disclaimer" ) } } />
						<Stack.Screen name = "TabNavigator" component = { TabNavigator } options = { () => ( { headerShown: false, headerTitle: I18n.t( "finance.title" ) } ) } />
						<Stack.Screen name = "Access" component = { Access } />
						<Stack.Screen name = "MyQrCode" component = { MyQrCode } options = { () => ( { headerShown: false } ) } />
						<Stack.Screen name = "Chart" component = { Chart } />
						<Stack.Screen name = "Article" component = { Article } />
						<Stack.Screen name = "UsdtRecharge" component = { UsdtRecharge } options = { () => ( { title: I18n.t( "usdtRecharge.title" ) } ) } />
						<Stack.Screen name = "UsdtMention" component = { UsdtMention } options = { () => ( { title: I18n.t( "usdtMention.title" ) } ) } />
						<Stack.Screen name = "MyBankCard" component = { MyBankCard } options = { () => ( { title: I18n.t( "myBankCard.title" ) } ) } />
						<Stack.Screen name = "History" component = { History } options = { () => ( { title: I18n.t( "history.title" ) } ) } />
						<Stack.Screen name = "Auth" component = { Auth } options = { () => ( { title: I18n.t( "auth.title" ) } ) } />
						<Stack.Screen name = "Camera" component = { Camera } options = { () => ( { headerShown: false, title: I18n.t( "camera.pageTitle" ) } ) } />
						<Stack.Screen name = "Activity" component = { Activity } options = { () => ( { title: I18n.t( "activity.title" ) } ) } />
						<Stack.Screen name = "Ranking" component = { Ranking } options = { () => ( { title: I18n.t( "ranking.title" ) } ) } />
						<Stack.Screen name = "SimulatorAccess" component = { SimulatorAccess } />
						
					</Stack.Navigator>
				</NavigationContainer>
			</RootSiblingParent>
		</Provider>
	</React.Fragment>;
};
