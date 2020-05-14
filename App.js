import "react-native-gesture-handler";
import "react-native-get-random-values"

import React from "react";
import { StyleSheet, StatusBar, Image } from "react-native";

/** react-navigation */
import { NavigationContainer, CommonActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

/** redux provider */
import { Provider } from "react-redux";
/** redux store */
import store from "./redux/store/index.js";
import { asyncStorageToRedux } from "./redux/actions/storageToRedux.js";

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

// used by BottomTabNavigator
import Finance from "./pages/finance.js";
import Contract from "./pages/contract.js";
import Ctc from "./pages/ctc.js";
import User from "./pages/user.js";

/** create Navigators */
// StackNavigator
const Stack = createStackNavigator();
// BottomTabNavigator
const Tab = createBottomTabNavigator();

// 底部导航 icon size
const ICONSIZE = 24;

const styles = StyleSheet.create( { image: { width: ICONSIZE, height: ICONSIZE } } );

function TabNavigator( props )
{
	return <React.Fragment>
		<Tab.Navigator
			initialRouteName = { "Finance" }
			tabBarOptions = { { activeTintColor: "#696DAC", inactiveTintColor: "#dEE1E4", keyboardHidesTabBar: true, style: { height: 50 } } }
		>
			<Tab.Screen name = "Finance" component = { Finance } options = { {
				title: I18n.t( "bottomTabNavigator.finance" ),
				tabBarIcon: ( { focused, size } ) => focused
					? <Image style = { styles.image } source = { require( "./images/finance_active.png" ) } />
					: <Image style = { styles.image } source = { require( "./images/finance_inactive.png" ) } />
			} } />
			<Tab.Screen name = "Contract" component = { Contract } options = { {
				title: I18n.t( "bottomTabNavigator.contract" ),
				tabBarIcon: ( { focused, size } ) => focused
					? <Image style = { styles.image } source = { require( "./images/contract_active.png" ) } />
					: <Image style = { styles.image } source = { require( "./images/contract_inactive.png" ) } />
			} } />
			<Tab.Screen name = "Ctc" component = { Ctc } options = { {
				title: I18n.t( "bottomTabNavigator.ctc" ),
				tabBarIcon: ( { focused, size } ) => focused
					? <Image style = { styles.image } source = { require( "./images/ctc_active.png" ) } />
					: <Image style = { styles.image } source = { require( "./images/ctc_inactive.png" ) } />
			} } />
			<Tab.Screen name = "User" component = { User } options = { {
				title: I18n.t( "bottomTabNavigator.user" ),
				tabBarIcon: ( { focused, size } ) => focused
					? <Image style = { styles.image } source = { require( "./images/user_active.png" ) } />
					: <Image style = { styles.image } source = { require( "./images/user_inactive.png" ) } />
			} } />
		</Tab.Navigator>
	</React.Fragment>;
};

export default function()
{
	const [ status, setStatus ] = React.useState( false );

	status || store.dispatch( asyncStorageToRedux( () => setStatus( true ) ) );

	return status && <React.Fragment>
		<StatusBar barStyle = "dark-content" backgroundColor = "rgba( 0, 0, 0, 0 )" translucent = { true } />
		<Provider store = { store }>
			<NavigationContainer>
				<Stack.Navigator initialRouteName = { store.getState().login.isLogin ? "TabNavigator" : "Login" }>
					<Stack.Screen name = "Login" component = { Login } options = { () => ( { headerShown: false } ) } />
					<Stack.Screen name = "Register" component = { Register } options = { () => ( { headerShown: false } ) } />
					<Stack.Screen name = "Disclaimer" component = { Disclaimer } options = { { title: I18n.t( "register.disclaimer" ) } } />
					<Stack.Screen name = "TabNavigator" component = { TabNavigator } options = { () => ( { headerShown: false } ) } />
					<Stack.Screen name = "Access" component = { Access } />
					<Stack.Screen name = "MyQrCode" component = { MyQrCode } options = { () => ( { headerShown: false } ) } />
					<Stack.Screen name = "Chart" component = { Chart } options = { () => ( { headerShown: false } ) } />
					<Stack.Screen name = "Article" component = { Article } />
				</Stack.Navigator>
			</NavigationContainer>
		</Provider>
	</React.Fragment>;
};


