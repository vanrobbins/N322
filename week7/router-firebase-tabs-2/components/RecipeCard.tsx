import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../styles/theme";
export default function RecipeCard({ recipe }) {
	const uri = recipe.imageUrl || "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80";
	return (
		<View style={styles.card}>
			<Image source={{ uri }} style={styles.thumb} />
			<View style={{ flex: 1 }}>
				<Text style={styles.title}>{recipe.title}</Text>
				<Text style={styles.subtitle} numberOfLines={2}>
					{recipe.description}
				</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: COLORS.card,
		padding: 12,
		borderRadius: SIZES.radius,
		marginBottom: 12,
		shadowColor: "#000",
		shadowOpacity: 0.06,
		shadowRadius: 8,
		elevation: 3,
	},
	thumb: {
		width: SIZES.cardThumb,
		height: SIZES.cardThumb,
		borderRadius: 8,
		marginRight: 12,
		backgroundColor: "#eee",
	},
	title: { fontSize: 16, fontWeight: "600", color: COLORS.text },
	subtitle: { fontSize: 13, color: COLORS.muted, marginTop: 6 },
});
