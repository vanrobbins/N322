import { View, Text, StyleSheet, FlatList } from "react-native";

export default function DetailsScreen({ route }) {
	const { recipe } = route.params;
	return (
		<View style={styles.container}>
			<Text style={styles.title}>{recipe.name}</Text>
			{recipe.description ? <Text style={styles.description}>{recipe.description}</Text> : null}
			<View style={styles.descRow}>
				<Text style={styles.descItem}>Prep: {recipe.prepTime}</Text>
				<Text style={styles.descItem}>Cook: {recipe.cookTime}</Text>
				<Text style={styles.descItem}>Serves: {recipe.servings}</Text>
			</View>
			<View>
				<Text style={styles.header}>Ingredients</Text>
				<FlatList
					data={recipe.ingredients}
					keyExtractor={(item, index) => index.toString()}
					renderItem={({ item }) => <Text style={styles.ingredient}>• {item}</Text>}
				/>
			</View>
			<View>
				<Text style={styles.header}>Steps</Text>
				<FlatList
					data={recipe.steps}
					keyExtractor={(item, index) => index.toString()}
					renderItem={({ item, index }) => (
						<Text style={styles.step}>
							{index + 1}. {item}
						</Text>
					)}
				/>
			</View>
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 30,
		alignItems: "stretch",
	},
	descRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: "100%",
		marginVertical: 12,
	},
	descItem: {
		flex: 1,
		textAlign: "center",
	},
	title: {
		fontSize: 26,
		fontWeight: "bold",
		marginBottom: 15,
	},
	description: {
		fontSize: 16,
		textAlign: "center",
	},
	header: {
		fontSize: 20,
		marginTop: 15,
		marginBottom: 10,
	},
	ingredient: {
		fontSize: 16,
		marginBottom: 6,
	},
	step: {
		fontSize: 16,
		marginBottom: 8,
	},
});
