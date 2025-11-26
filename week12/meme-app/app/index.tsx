import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
const MEME_TEMPLATES = [
	{
		id: "1",
		name: "Distracted Boyfriend",
		imgUrl: "https://i.imgflip.com/1ur9b0.jpg",
	},
	{
		id: "2",
		name: "Drake Hotline bling",
		imgUrl: "https://i.imgflip.com/30b1gx.jpg",
	},
	{
		id: "3",
		name: "Two Buttons",
		imgUrl: "https://i.imgflip.com/1g8my4.jpg",
	},
];
export default function App() {
	const router = useRouter();
	function handleSelectTemplate(template) {
		router.push({
			pathname: "/editor",
			params: { imageUrl: template.imgUrl, templateName: template.name },
		});
	}
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Meme Generator</Text>
			<Text style={styles.subtitle}>Choose a template to get started.</Text>
			<FlatList
				data={MEME_TEMPLATES}
				keyExtractor={(item) => item.id}
				contentContainerStyle={styles.listContent}
				renderItem={({ item }) => (
					<TouchableOpacity style={styles.card} onPress={() => handleSelectTemplate(item)}>
						<Image source={{ uri: item.imgUrl }} style={styles.thumbnail} resizeMode="cover" />
						<Text style={styles.cardTitle}>{item.name}</Text>
					</TouchableOpacity>
				)}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		paddingTop: 32,
	},
	title: {
		fontSize: 28,
		fontWeight: "bold",
		color: "#fff",
		textAlign: "center",
	},
	subtitle: {
		fontSize: 14,
		color: "#ccc",
		textAlign: "center",
		marginBottom: 16,
	},
	listContent: {
		gap: 12,
	},
	card: {
		backgroundColor: "#252320",
		borderRadius: 12,
		overflow: "hidden",
		flexDirection: "row",
		alignItems: "center",
		padding: 8,
	},
	thumbnail: {
		width: 80,
		height: 80,
		borderRadius: 8,
		marginRight: 12,
	},
	cardTitle: {
		fontSize: 16,
		color: "#fff",
		fontWeight: "600",
	},
});
