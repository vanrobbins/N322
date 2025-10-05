import { StyleSheet, Text, View, Image, ScrollView, Dimensions } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function App() {
	return (
		<ScrollView>
			<View style={styles.container}>
				<View style={styles.card}>
					<Image style={styles.avatar} source={{ uri: "https://picsum.photos/200/200" }} />
					<Text style={styles.title}>Van</Text>
					<Text style={styles.jobTitle}>Student</Text>
					<Text style={styles.contact}>vanrobbi@iu.edu</Text>
					<Text style={styles.contact}>555-123-4567</Text>
					<View style={styles.row}>
						<View style={styles.box}><Text>Item 1</Text></View>
						<View style={styles.box}><Text>Item 2</Text></View>
						<View style={styles.box}><Text>Item 3</Text></View>
						<View style={styles.box}><Text>Item 4</Text></View>
						<View style={styles.box}><Text>Item 5</Text></View>
						<View style={styles.box}><Text>Item 6</Text></View>
						<View style={styles.box}><Text>Item 7</Text></View>
					</View>
				</View>
				<View style={styles.card}>
					<Image style={styles.avatar} source={{ uri: "https://picsum.photos/200/200" }} />
					<Text style={styles.title}>Van</Text>
					<Text style={styles.jobTitle}>Student</Text>
					<Text style={styles.contact}>vanrobbi@iu.edu</Text>
					<Text style={styles.contact}>555-123-4567</Text>
					<View style={styles.row}>
						<View style={styles.box}><Text>Item 1</Text></View>
						<View style={styles.box}><Text>Item 2</Text></View>
						<View style={styles.box}><Text>Item 3</Text></View>
						<View style={styles.box}><Text>Item 4</Text></View>
						<View style={styles.box}><Text>Item 5</Text></View>
						<View style={styles.box}><Text>Item 6</Text></View>
						<View style={styles.box}><Text>Item 7</Text></View>
					</View>
				</View>
				<View style={styles.card}>
					<Image style={styles.avatar} source={{ uri: "https://picsum.photos/200/200" }} />
					<Text style={styles.title}>Van</Text>
					<Text style={styles.jobTitle}>Student</Text>
					<Text style={styles.contact}>vanrobbi@iu.edu</Text>
					<Text style={styles.contact}>555-123-4567</Text>
					<View style={styles.row}>
						<View style={styles.box}><Text>Item 1</Text></View>
						<View style={styles.box}><Text>Item 2</Text></View>
						<View style={styles.box}><Text>Item 3</Text></View>
						<View style={styles.box}><Text>Item 4</Text></View>
						<View style={styles.box}><Text>Item 5</Text></View>
						<View style={styles.box}><Text>Item 6</Text></View>
						<View style={styles.box}><Text>Item 7</Text></View>
					</View>
				</View>
				<View style={styles.card}>
					<Image style={styles.avatar} source={{ uri: "https://picsum.photos/200/200" }} />
					<Text style={styles.title}>Van</Text>
					<Text style={styles.jobTitle}>Student</Text>
					<Text style={styles.contact}>vanrobbi@iu.edu</Text>
					<Text style={styles.contact}>555-123-4567</Text>
					<View style={styles.row}>
						<View style={styles.box}><Text>Item 1</Text></View>
						<View style={styles.box}><Text>Item 2</Text></View>
						<View style={styles.box}><Text>Item 3</Text></View>
						<View style={styles.box}><Text>Item 4</Text></View>
						<View style={styles.box}><Text>Item 5</Text></View>
						<View style={styles.box}><Text>Item 6</Text></View>
						<View style={styles.box}><Text>Item 7</Text></View>
					</View>
				</View>
				<View style={styles.card}>
					<Image style={styles.avatar} source={{ uri: "https://picsum.photos/200/200" }} />
					<Text style={styles.title}>Van</Text>
					<Text style={styles.jobTitle}>Student</Text>
					<Text style={styles.contact}>vanrobbi@iu.edu</Text>
					<Text style={styles.contact}>555-123-4567</Text>
					<View style={styles.row}>
						<View style={styles.box}><Text>Item 1</Text></View>
						<View style={styles.box}><Text>Item 2</Text></View>
						<View style={styles.box}><Text>Item 3</Text></View>
						<View style={styles.box}><Text>Item 4</Text></View>
						<View style={styles.box}><Text>Item 5</Text></View>
						<View style={styles.box}><Text>Item 6</Text></View>
						<View style={styles.box}><Text>Item 7</Text></View>
					</View>
				</View>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#888",
		alignItems: "center",
		justifyContent: "center",
		gap: 20,
		padding: 20,
	},
	card: {
		backgroundColor: "#fff",
		maxWidth: SCREEN_WIDTH * 0.7,
		alignSelf: "flex-start",
		borderRadius: 12,
		padding: 20,
		alignItems: "center",
		shadowColor: "#000",
		shadowOpacity: 0.1,
		shadowOffset: { width: 0, height: 5 },
		shadowRadius: 10,
		elevation: 5,
		marginBottom: 20,
	},
	avatar: {
		width: 200,
		height: 200,
		borderRadius: 50,
		marginBottom: 15,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 5,
	},
	jobTitle: {
		fontSize: 18,
		color: "#333",
		marginBottom: 12,
	},
	contact: {
		fontSize: 14,
		color: "#555",
		marginTop: 5,
	},
	row: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 8,
		marginTop: 10,
		justifyContent: "center",
	},
	box: {
		backgroundColor: "#eee",
		padding: 10,
		margin: 2,
		borderRadius: 6,
		minWidth: 60,
		alignItems: "center",
	},
});
