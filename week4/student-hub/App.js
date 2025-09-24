import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ResourcesScreen from "./screens/ResourcesScreen";
import DetailsScreen from "./screens/DetailsScreen";
import CreateAccountScreen from "./screens/CreateAccountScreen";
import LoginScreen from "./screens/LoginScreen";
import { Colors } from "./CommonStyles";
const RootTab = createBottomTabNavigator();
const ResourceStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();
const CreateAccountStack = createNativeStackNavigator();
function HomeStackScreen() {
	return (
		<HomeStack.Navigator
			screenOptions={{
				headerStyle: {
					backgroundColor: Colors.surface, // White background
					borderTopColor: Colors.border,
					shadowColor: "#000",
					shadowOffset: { width: 0, height: -2 },
					shadowOpacity: 0.1,
					shadowRadius: 3,
					elevation: 5,
				},
				headerTitleStyle: {
					fontWeight: "bold",
					fontSize: 18,
					color: Colors.text,
				},
			}}
		>
			<HomeStack.Screen
				name="HomeScreen"
				component={HomeScreen}
				options={{
					title: "Home",
				}}
			/>
		</HomeStack.Navigator>
	);
}
function ProfileStackScreen() {
	return (
		<ProfileStack.Navigator
			screenOptions={{
				headerStyle: {
					backgroundColor: Colors.surface, // White background
					borderTopColor: Colors.border,
					shadowColor: "#000",
					shadowOffset: { width: 0, height: -2 },
					shadowOpacity: 0.1,
					shadowRadius: 3,
					elevation: 5,
				},
				headerTitleStyle: {
					fontWeight: "bold",
					fontSize: 18,
					color: Colors.text,
				},
			}}
		>
			<ProfileStack.Screen
				name="ProfileScreen"
				component={ProfileScreen}
				options={{
					title: "Profile",
				}}
			/>
			<ProfileStack.Screen
				name="CreateAccountScreen"
				component={CreateAccountScreen}
				options={{
					title: "Create Account",
				}}
			/>
			<ProfileStack.Screen
				name="LoginScreen"
				component={LoginScreen}
				options={{
					title: "Login",
				}}
			/>
		</ProfileStack.Navigator>
	);
}
function ResourceStackScreen() {
	return (
		<ResourceStack.Navigator
			screenOptions={{
				headerStyle: {
					backgroundColor: Colors.surface, // White background
					borderTopColor: Colors.border,
					shadowColor: "#000",
					shadowOffset: { width: 0, height: -2 },
					shadowOpacity: 0.1,
					shadowRadius: 3,
					elevation: 5,
				},
				headerTitleStyle: {
					fontWeight: "bold",
					fontSize: 18,
					color: Colors.text,
				},
			}}
		>
			<ResourceStack.Screen
				name="Resources"
				component={ResourcesScreen}
				options={{
					title: "Resources",
				}}
			/>
			<ResourceStack.Screen
				name="Details"
				component={DetailsScreen}
				options={{
					title: "Details",
				}}
			/>
		</ResourceStack.Navigator>
	);
}
export default function App() {
	return (
		<NavigationContainer>
			<RootTab.Navigator
				screenOptions={({ route }) => ({
					tabBarIcon: ({ focused, color, size }) => {
						let iconName;
						if (route.name === "Home") {
							iconName = focused ? "home" : "home-outline";
						} else if (route.name === "Resource") {
							iconName = focused ? "library" : "library-outline";
						} else if (route.name === "Profile") {
							iconName = focused ? "person" : "person-outline";
						}

						return <Ionicons name={iconName} size={size} color={color} />;
					},
					tabBarActiveTintColor: Colors.accent,
					tabBarInactiveTintColor: Colors.inactive,
					headerShown: false, // Hide tab header since stack has its own
					tabBarStyle: {
						backgroundColor: Colors.surface, // White background
						borderTopColor: Colors.border,
						paddingTop: 10,
						shadowColor: "#000",
						shadowOffset: { width: 0, height: -2 },
						shadowOpacity: 0.1,
						shadowRadius: 3,
						elevation: 5,
					},
				})}
			>
				<RootTab.Screen name="Home" component={HomeStackScreen}></RootTab.Screen>
				<RootTab.Screen name="Resource" component={ResourceStackScreen} />
				<RootTab.Screen name="Profile" component={ProfileStackScreen}></RootTab.Screen>
			</RootTab.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
