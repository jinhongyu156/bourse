import "react-native-gesture-handler";
import React from "react";
/** react-navigation */
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

/** redux provider */
import { Provider } from "react-redux";
/** redux store */
import store from "./redux/store/index.js";
import { getAsyncStorage } from "./redux/actions/language.js";

/** pages*/
// used by StackNavigator
import Login from "./pages/login.js";
import Register from "./pages/register.js";

// used by BottomTabNavigator
import Finance from "./pages/finance.js";
import Contract from "./pages/contract.js";
import Ctc from "./pages/ctc.js";
import User from "./pages/user.js";
/** Icon */
import Icon from "react-native-vector-icons/FontAwesome5";

/** create Navigators */
// StackNavigator
const Stack = createStackNavigator();
// BottomTabNavigator
const Tab = createBottomTabNavigator();

const ICONSIZE = 18;

function TabNavigator()
{
	return <Tab.Navigator
		initialRouteName = { "Finance" }
		tabBarOptions = { { activeTintColor: "#F27B82", inactiveTintColor: "#76AEC0" } }
	>
		<Tab.Screen name = "Finance" component = { Finance } options = { {
			title: "金融",
			tabBarIcon: ( { color, size } ) => <Icon name = "coins" color = { color } size = { ICONSIZE } />
		} } />
		<Tab.Screen name = "Contract" component = { Contract } options = { {
			title: "合约",
			tabBarIcon: ( { color, size } ) => <Icon name = "file-contract" color = { color } size = { ICONSIZE } />
		} } />
		<Tab.Screen name = "Ctc" component = { Ctc } options = { {
			title: "币币",
			tabBarIcon: ( { color, size } ) => <Icon name = "coins" color = { color } size = { ICONSIZE } />
		} } />
		<Tab.Screen name = "User" component = { User } options = { {
			title: "用户",
			tabBarIcon: ( { color, size } ) => {
				return <Icon name = "user" color = { color } size = { ICONSIZE } />
			}
		} } />
	</Tab.Navigator>;
};


export default function()
{
	const [ status, setStatus ] = React.useState( false );

	status || store.dispatch( getAsyncStorage( () => setStatus( true ) ) );
	
	return status && <Provider store = { store }>
		<NavigationContainer>
			<Stack.Navigator initialRouteName = "Login">
				<Stack.Screen name = "Login" component = { Login } options = { () => ( { headerShown: false } ) } />
				<Stack.Screen name = "Register" component = { Register } options = { () => ( { headerShown: false } ) } />
				<Stack.Screen name = "TabNavigator" component = { TabNavigator } options = { () => ( { headerShown: false } ) } />
			</Stack.Navigator>
		</NavigationContainer>
	</Provider>;
};
