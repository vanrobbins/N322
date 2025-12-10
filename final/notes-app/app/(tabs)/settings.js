import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useAuth } from "../../src/auth/AuthContext";

export default function Settings() {
	const { user, signOut } = useAuth();
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.headerTitle}>Settings</Text>
			</View>

			<View style={styles.content}>
				<View style={styles.infoCard}>
					<Text style={styles.label}>Account</Text>
					<Text style={styles.email}>{user?.email}</Text>
				</View>

				<TouchableOpacity style={styles.signOutButton} onPress={signOut}>
					<Text style={styles.signOutText}>Sign Out</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#0f0f1e",
	},
	header: {
		padding: 20,
		paddingTop: 60,
		backgroundColor: "#1a1a2e",
		borderBottomWidth: 2,
		borderBottomColor: "#6b4ce6",
	},
	headerTitle: {
		fontSize: 32,
		fontWeight: "800",
		color: "#ffffff",
		letterSpacing: 0.5,
	},
	content: {
		padding: 20,
	},
	infoCard: {
		backgroundColor: "#1a1a2e",
		padding: 20,
		borderRadius: 16,
		borderWidth: 1,
		borderColor: "#2d2d44",
		marginBottom: 24,
	},
	label: {
		fontSize: 14,
		fontWeight: "600",
		color: "#8b8ba7",
		marginBottom: 8,
		textTransform: "uppercase",
		letterSpacing: 1,
	},
	email: {
		fontSize: 18,
		fontWeight: "600",
		color: "#ffffff",
	},
	signOutButton: {
		backgroundColor: "#e63946",
		padding: 18,
		borderRadius: 14,
		alignItems: "center",
		shadowColor: "#e63946",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 8,
		elevation: 5,
	},
	signOutText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "700",
		letterSpacing: 0.5,
	},
});
