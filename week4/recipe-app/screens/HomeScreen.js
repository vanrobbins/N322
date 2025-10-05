import { View, Text, StyleSheet, Pressable, Button, FlatList } from "react-native";
import recipes from "../data/recipes";
export default function HomeScreen({ navigation }) {
	return (
		<View style={styles.container}>
			<Text style={styles.heading}>Recipes</Text>
			<FlatList
				data={recipes}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<Pressable style={styles.card} onPress={() => navigation.navigate("Details", { recipe: item })}>
						<Text style={styles.cardTitle}>{item.name}</Text>
					</Pressable>
				)}
			/>
			<Button title="About This App" onPress={() => navigation.navigate("About")}></Button>
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
	heading: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 15,
	},
	card: {
		backgroundColor: "#ddd",
		padding: 15,
		margin: 10,
		borderRadius: 8,
		elevation: 2,
	},
	cardTitle: {
		fontSize: 18,
	},
});
