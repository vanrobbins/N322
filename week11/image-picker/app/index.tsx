import { View, Text, StyleSheet, Pressable, Alert, Platform } from "react-native";
import { useState, useCallback } from "react";
import * as ImagePicker from "expo-image-picker";
import PickedImageCard from "../components/PickedImageCard";

export default function Home() {
	const [image, setImage] = useState(null);
	const requestPermission = useCallback(async () => {
		const lib = await ImagePicker.requestMediaLibraryPermissionsAsync();
		const cam = await ImagePicker.requestCameraPermissionsAsync();
		const ok = lib.status === "granted" && cam.status === "granted";
		if (!ok) Alert.alert("Permission denied", "You need to give permission to camera");
		return ok;
	}, []);
	const pickFromLibrary = useCallback(async () => {
		const granted = await ImagePicker.requestMediaLibraryPermissionsAsync();
		if (granted.status !== "granted") {
			Alert.alert("Permission required", "Allow photo library access to continue");
			return;
		}
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			quality: 0.9,
			allowsEditing: true,
			aspect: [4, 3],
			base64: Platform.OS === "web" ? false : false,
		});
		if (!result.canceled) {
			const asset = result[0];
			setImage({
				uri: asset.uri,
				width: asset.width,
				height: asset.height,
			});
		}
	}, []);

	const clearImage = useCallback(() => setImage(null), []);
	const takePhoto = useCallback(async () => {
		const granted = await ImagePicker.requestCameraPermissionsAsync();
		if (granted.status !== "granted") {
			Alert.alert("Permission required", "Allow camera access to continue.");
			return;
		}

		const result = await ImagePicker.launchCameraAsync({
			allowsEditing: true,
			aspect: [4, 3],
			quality: 0.9,
		});

		if (!result.canceled) {
			const asset = result.assets[0];
			setImage({
				uri: asset.uri,
				width: asset.width,
				height: asset.height,
			});
		}
	}, []);
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Image Picker Demo</Text>

			<View style={styles.row}>
				<Pressable style={styles.btn} onPress={pickFromLibrary}>
					<Text style={styles.btnText}>Pick from Library</Text>
				</Pressable>

				<Pressable style={styles.btn} onPress={takePhoto}>
					<Text style={styles.btnText}>Take Photo</Text>
				</Pressable>
			</View>

			{image ? (
				<>
					<PickedImageCard image={image} />
					<Pressable style={[styles.btn, styles.clear]} onPress={clearImage}>
						<Text style={styles.btnText}>Clear</Text>
					</Pressable>
				</>
			) : (
				<Text style={styles.helper}>No image selected yet. Choose “Pick from Library” or “Take Photo”.</Text>
			)}
		</View>
	);
}
const styles = StyleSheet.create({
	container: { flex: 1, padding: 16, gap: 16, backgroundColor: "#0b0b0c" },
	title: { fontSize: 22, fontWeight: "700", color: "white", marginTop: 8 },
	row: { flexDirection: "row", gap: 12 },
	btn: {
		backgroundColor: "#3a3a97",
		borderRadius: 10,
		paddingVertical: 12,
		paddingHorizontal: 14,
	},
	clear: { backgroundColor: "#953a3a" },
	btnText: { color: "white", fontWeight: "600" },
	helper: { color: "#c9c9d4" },
});
