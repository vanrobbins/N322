import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";

export default function App() {
	return (
		<View style={styles.container}>
			<View style={styles.card}>
				<Image style={styles.pfp} source={require("./assets/van-pfp.jpg")} />
				<Text style={[styles.baseText, styles.headerL]}>Van Robbins</Text>
			</View>
			<View style={styles.card}>
				<Text style={[styles.baseText, styles.headerM]}>About Me</Text>
				<Text style={styles.baseText}>Junior Computer Science Student at IU Indy</Text>
			</View>
			<View style={[styles.card, styles.cardLong]}>
				<Text style={[styles.baseText, styles.headerM]}>Fun Facts</Text>
			</View>
			<View style={styles.cardSet}>
				<View style={styles.card}>
					<Text style={[styles.baseText, styles.headerS]}>Recently found out about Board Games</Text>
				</View>
				<View style={styles.card}>
					<Text style={[styles.baseText, styles.headerS]}>Likes to cook</Text>
				</View>
				<View style={styles.card}>
					<Text style={[styles.baseText, styles.headerS]}>Loves to travel</Text>
				</View>
				<View style={styles.card}>
					<Text style={[styles.baseText, styles.headerS]}>Dog Person</Text>
				</View>
			</View>

			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#72b6ffff",
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
		gap: 10,
	},
	card: {
		padding: 20,
		maxWidth: "85%",
		flexDirection: "column",
		backgroundColor: "#407bbbff",
		alignItems: "center",
		borderRadius: 20,
		shadowColor: "#111",
		shadowOpacity: 0.1,
		shadowOffset: { width: 0, height: 5 },
		shadowRadius: 10,
		elevation: 5,
	},
	cardLong: {
		marginTop: 15,
		width: "85%",
		paddingBottom: 24,
	},
	cardSet: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		flexWrap: "wrap",
		gap: 10,
	},
	pfp: {
		width: 200,
		height: 200,
		borderRadius: 20,
	},
	baseText: {
		color: "#eee",
		fontSize: 16,
		marginTop: 4,
		flexShrink: 1,
		textAlign: "center",
	},
	headerL: {
		marginTop: 20,
		fontSize: 24,
		fontWeight: "bold",
	},
	headerM: {
		fontSize: 20,
		fontWeight: "bold",
	},
	headerS: {
		margin: 6,
		fontSize: 18,
		fontWeight: "medium",
	},
});
