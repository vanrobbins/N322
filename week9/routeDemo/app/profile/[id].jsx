import { View, Text, Button, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
export default function ProfileScreen() {
	const router = useRouter();
	const { id, name } = useLocalSearchParams();
	return (
		<View style={styles.container}>
			<Text style={styles.title}>ProfileScreen</Text>
			<Text style={styles.body}>ID Param: (path param): {String(id)}</Text>
			<Text style={styles.body}>Name (querey param): {name ? String(name) : "(no name)"}</Text>
			<Button title="Back to Home" onPress={() => router.push("/(tabs)/")} />
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		gap: 12,
		justifyContent: "center",
	},
	title: {
		fontSize: 32,
		fontWeight: "600",
	},
	body: {
		fontSize: 16,
		opacity: 0.8,
	},
});
