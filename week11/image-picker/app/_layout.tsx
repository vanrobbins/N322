import { View, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function _layout() {
	return (
		<View style={styles.container}>
			<StatusBar style="light" />
			<Stack
				screenOptions={{
					headerStyle: { backgroundColor: "#121216" },
					headerTitleStyle: { color: "#fff" },
					headerTintColor: "#fff",
				}}
			/>
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#0b0b0c",
	},
});
