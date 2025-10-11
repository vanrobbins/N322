import { useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import { useAuthContext } from "../../../context/AuthContext";
import { useNavigation } from "expo-router";

export default function HomeTab() {
	const { user } = useAuthContext();
	const navigation = useNavigation();

	// Set the header title to the user's display name (or email) when mounted
	useEffect(() => {
		navigation.setOptions({
			title: user?.displayName ? `Hi, ${user.displayName}` : user?.email ?? "Home",
		});
	}, [navigation, user]);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Welcome {user?.displayName ?? user?.email ?? "there"} 👋</Text>
			<Text style={styles.text}>This tab is only visible when signed in.</Text>
			<Button title="Sign Out" onPress={() => signOut(auth)} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, padding: 20, justifyContent: "center", alignItems: "center" },
	title: { fontSize: 22, marginBottom: 12, textAlign: "center" },
	text: { fontSize: 16, textAlign: "center", marginBottom: 16 },
});
