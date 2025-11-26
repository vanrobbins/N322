import {
	View,
	Text,
	StyleSheet,
	TextInput,
	Image,
	KeyboardAvoidingView,
	Platform,
	TouchableOpacity,
	ScrollView,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useState } from "react";

export default function Editor() {
	const router = useRouter();
	const { imageUrl, templateName } = useLocalSearchParams();
	const [topText, setTopText] = useState("");
	const [bottomText, setBottomText] = useState("");
	function handlePreview() {
		router.push({
			pathname: "/result",
			params: {
				imageUrl,
				templateName,
				topText,
				bottomText,
			},
		});
	}
	return (
		<KeyboardAvoidingView
			keyboardVerticalOffset={100}
			style={styles.flex}
			behavior={Platform.OS === "ios" ? "padding" : "height"}
		>
			<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
				<View style={styles.container}>
					<Text style={styles.header}>Editing: {templateName}</Text>
					<Image source={{ uri: imageUrl }} style={styles.previewImage} resizeMode="contain" />
					<View style={styles.form}>
						<Text style={styles.label}>Top Text</Text>
						<TextInput
							style={styles.input}
							value={topText}
							onChangeText={setTopText}
							placeholderTextColor="#777"
							placeholder="When it's finals week..."
						/>
						<Text style={styles.label}>Bottom Text</Text>
						<TextInput
							style={styles.input}
							value={bottomText}
							onChangeText={setBottomText}
							placeholderTextColor="#777"
							placeholder="...but you have memes to make"
						/>
						<TouchableOpacity style={styles.button} onPress={handlePreview}>
							<Text style={styles.buttonText}>Preview Meme</Text>
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}
const styles = StyleSheet.create({
	flex: {
		flex: 1,
	},
	container: {
		flex: 1,
		padding: 16,
		paddingTop: 24,
	},
	header: {
		fontSize: 20,
		fontWeight: "bold",
		color: "#fff",
		marginBottom: 12,
		textAlign: "center",
	},
	previewImage: {
		width: "100%",
		height: 220,
		borderRadius: 12,
		marginBottom: 16,
		backgroundColor: "#000",
	},
	form: {
		gap: 12,
	},
	label: {
		color: "#ddd",
		fontSize: 14,
		marginBottom: 4,
	},
	input: {
		backgroundColor: "#252530",
		color: "#fff",
		borderRadius: 8,
		paddingHorizontal: 12,
		paddingVertical: 10,
		fontSize: 14,
	},
	button: {
		backgroundColor: "#ff5c5c",
		marginTop: 16,
		borderRadius: 8,
		paddingVertical: 12,
		alignItems: "center",
	},
	buttonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: 600,
	},
});
