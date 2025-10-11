// app/(app)/(tabs)/recipes.js
import React, { useState } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from "react-native";
import useRecipes from "../../../hooks/useRecipes"; // adjust path if necessary
import { useAuthContext } from "../../../context/AuthContext";
import RecipeCard from "../../../components/RecipeCard";
import { addRecipe } from "../../../services/firestoreService";
import { COLORS, SIZES } from "../../../styles/theme";

export default function RecipesScreen() {
	const { recipes, loading } = useRecipes();
	const { user } = useAuthContext();
	const [title, setTitle] = useState("");
	const [desc, setDesc] = useState("");

	const onAdd = async () => {
		if (!title.trim()) {
			Alert.alert("Validation", "Recipe title is required");
			return;
		}
		try {
			await addRecipe(user, { title, description: desc });
			setTitle("");
			setDesc("");
		} catch (e) {
			console.error("Add recipe error:", e);
			Alert.alert("Error", "Could not add recipe.");
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.heading}>My Recipes</Text>

			<View style={styles.form}>
				<TextInput placeholder="Recipe title" value={title} onChangeText={setTitle} style={styles.input} />
				<TextInput
					placeholder="Short description"
					value={desc}
					onChangeText={setDesc}
					style={[styles.input, { height: 80 }]}
					multiline
				/>
				<Button title="Add Recipe" onPress={onAdd} color={COLORS.primary} />
			</View>

			{loading ? (
				<Text style={styles.empty}>Loading…</Text>
			) : (
				<FlatList
					data={recipes}
					keyExtractor={(i) => i.id}
					ListEmptyComponent={<Text style={styles.empty}>No recipes yet — add one above.</Text>}
					renderItem={({ item }) => (
						// When pressing a RecipeCard we might want to navigate to detail — add Link or router if desired
						<RecipeCard recipe={item} />
					)}
					style={{ marginTop: 12 }}
					contentContainerStyle={{ paddingBottom: 80 }}
				/>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, padding: SIZES.padding, backgroundColor: COLORS.background },
	heading: { fontSize: 22, fontWeight: "700", marginBottom: 12, color: COLORS.text },
	form: { marginBottom: 8, backgroundColor: COLORS.card, padding: 12, borderRadius: SIZES.radius },
	input: { borderWidth: 1, borderColor: "#eee", borderRadius: 8, padding: 8, marginBottom: 8, backgroundColor: "#fff" },
	empty: { textAlign: "center", marginTop: 24, color: COLORS.muted },
});
