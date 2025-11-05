import { Stack } from "expo-router";

export default function RootLayout() {
	return (
		<Stack>
			<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
			<Stack.Screen name="details" options={{ title: "Details" }} />
			<Stack.Screen name="profile/[id]" options={{ title: "Profile" }} />
		</Stack>
	);
}
