import { ClerkProvider } from "@clerk/clerk-expo";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import "react-native-reanimated";
const CLERK_PUBLISHABLE_KEY = "pk_test_cm9tYW50aWMtbW9sZS01OS5jbGVyay5hY2NvdW50cy5kZXYk";

export default function RootLayout() {
	const colorScheme = useColorScheme();

	return (
		<ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
			<StatusBar style="auto" />
			<Stack screenOptions={{ headerStyle: { backgroundColor: "#6464" } }} />
		</ClerkProvider>
	);
}
