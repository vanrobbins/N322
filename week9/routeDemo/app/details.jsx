import { View, Text, Button, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function DetailScreen() {
	const router = useRouter();
	const { message } = useLocalSearchParams();
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Details</Text>
			<Text style={styles.body}>Message param: {message ? String(message) : "no message provided"}</Text>
			<Button title="Go Back" onPress={() => router.back()} />
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
	button: {
		margin: 0,
		borderRadius: 5,
		backgroundColor: "#f5f5f5",
		textAlign: "center",
	},
});
