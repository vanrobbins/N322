import { View, Text, StyleSheet } from "react-native";

export default function AboutScreen() {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>About Recipe App</Text>
			<Text style={styles.text}>This is a simple demo app to show navigation in react native.</Text>
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		padding: 20,
	},
	title: {
		fontSize: 22,
		fontWeight: "bold",
		marginBottom: 20,
	},
	text: {
		fontSize: 16,
		textAlign: "center",
	},
});
