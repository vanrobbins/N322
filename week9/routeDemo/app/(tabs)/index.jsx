import { Text, View, StyleSheet, Button, Image } from "react-native";
import { useRouter, Link } from "expo-router";

export default function HomeScreen() {
	const router = useRouter();
	return (
		<View style={styles.container}>
			<Image source={{ uri: "https://picsum.photos/400/240" }} style={styles.image} resizeMode="cover" />
			<Text style={styles.title}>Hello World</Text>
			<Text style={styles.body}>This is the home screen. Buttons below navigate and pass params</Text>
			<Button
				style={styles.button}
				title="Go to Profile /profile/42 (with name=Van)"
				onPress={() => router.push("/profile/42?name=Van")}
			/>
			<View style={{ height: 12 }} />
			<Link style={styles.link} href="/details?message=Via%20Link">
				Or Use a link to go to details
			</Link>
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
		textAlign: "center",
	},
	link: {
		color: "blue",
		textAlign: "center",
	},
});
