import { View, Text, StyleSheet } from "react-native";

export default function SettingsTab() {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Settings</Text>
			<Text style={styles.text}>Future app preferences will live here.</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, padding: 20, justifyContent: "center", alignItems: "center" },
	title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
	text: { fontSize: 16, textAlign: "center" },
});
