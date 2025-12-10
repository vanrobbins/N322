// app/_layout.js

import { Stack } from "expo-router";
import { AuthProvider, useAuth } from "../src/auth/AuthContext";
import { View, ActivityIndicator } from "react-native";

function Gate({ children }) {
	const { loading } = useAuth();
	if (loading) {
		return (
			<View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#0f0f1e" }}>
				<ActivityIndicator size="large" color="#6b4ce6" />
			</View>
		);
	}
	return children;
}

export default function RootLayout() {
	return (
		<AuthProvider>
			<Gate>
				<Stack screenOptions={{ headerShown: false }} />
			</Gate>
		</AuthProvider>
	);
}
