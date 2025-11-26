import { StyleSheet, Text, View, ImageBackground, Dimensions, ScrollView } from "react-native";
import React from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
const { width } = Dimensions.get("window");
export default function ResultScreen() {
	const { imageUrl, templateName, topText, bottomText } = useLocalSearchParams();
	const router = useRouter();
	return (
		<ScrollView>
			<Text style={styles.header}>Your Meme: {templateName}</Text>
			<View style={styles.memeContainer}>
				<ImageBackground source={{ uri: imageUrl }} style={styles.memeImage} resizeMode="cover">
					<Text style={[styles.memeText, styles.topText]}>{(topText || "").toUpperCase()}</Text>
					<Text style={[styles.memeText, styles.bottomText]}>{(bottomText || "").toUpperCase()}</Text>
				</ImageBackground>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	scrollContent: {
		padding: 16,
		paddingTop: 24,
		alignItems: "center",
	},
	header: {
		fontSize: 20,
		fontWeight: "bold",
		color: "#fff",
		marginBottom: 16,
		textAlign: "center",
	},
	memeContainer: {
		backgroundColor: "#000",
		borderRadius: 12,
		overflow: "hidden",
	},
	memeImage: {
		width: width - 32,
		height: (width - 32) * 0.75, // 4:3-ish ratio
		justifyContent: "space-between",
		padding: 12,
	},
	memeText: {
		color: "#fff",
		fontSize: 22,
		fontWeight: "900",
		textAlign: "center",
		textShadowColor: "#000",
		textShadowOffset: { width: 2, height: 2 },
		textShadowRadius: 4,
		letterSpacing: 1,
	},
	topText: {
		marginTop: 4,
	},
	bottomText: {
		marginBottom: 4,
	},
});
