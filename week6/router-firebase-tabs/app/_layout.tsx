import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AuthProvider } from "../context/AuthContext";

export default function RootLayout() {
	return (
		<AuthProvider>
			<StatusBar></StatusBar>
			<Stack
				screenOptions={{
					headerShown: false, //Hide upper header
					headerStyle: { backgroundColor: "#6200ee" },
					headerTintColor: "white",
				}}
			/>
		</AuthProvider>
	);
}
