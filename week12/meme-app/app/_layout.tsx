import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";

export default function RootLayout() {
	return (
		<>
			<StatusBar style="light" />
			<Stack
				screenOptions={{
					headerTitle: "Memes",
					headerStyle: { backgroundColor: "#121212" },
					headerTitleStyle: { color: "#fff" },
					headerTintColor: "#fff",
					contentStyle: { backgroundColor: "#1a1a1f" },
				}}
			/>
		</>
	);
}
