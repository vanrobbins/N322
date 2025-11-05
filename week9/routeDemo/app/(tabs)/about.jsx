import { View, Text, StyleSheet, Image, Button } from "react-native";
import { useRouter } from "expo-router";

export default function AboutScreen() {
	const router = useRouter();
	return (
		<View style={styles.container}>
			<Image source={{ uri: "https://picsum.photos/400/300" }} style={styles.image} resizeMode="cover" />
			<Text style={styles.title}>about</Text>
			<Text style={styles.body}>This is the about screen. Buttons below navigate and pass params</Text>
			<Button
				style={styles.button}
				title="Go to Details (from about)"
				onPress={() => router.push("/details?message=Hello from about screen.")}
			/>
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
	image: {
		width: "100%",
		height: 200,
		borderRadius: 8,
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
