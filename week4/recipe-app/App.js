import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Pressable, StyleSheet, Text } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import DetailsScreen from "./screens/DetailsScreen";
import AboutScreen from "./screens/AboutScreen";
const Stack = createNativeStackNavigator();
export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					name="Home"
					component={HomeScreen}
					options={({ navigation }) => ({
						headerRight: () => (
							<Pressable onPress={() => navigation.navigate("About")}>
								<Text style={styles.aboutBtn}>About</Text>
							</Pressable>
						),
					})}
				/>
				<Stack.Screen name="Details" component={DetailsScreen} />
				<Stack.Screen name="About" component={AboutScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	aboutBtn: {
		color: "blue",
	},
});
