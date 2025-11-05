// app/(tabs)/_layout.js

import { Tabs, Redirect } from "expo-router";
import { useAuth } from "../../src/auth/AuthContext";

export default function TabsLayout() {
	const { user, loading } = useAuth();
	if (!loading && !user) return <Redirect href="/(auth)/sign-in" />;
	return (
		<Tabs screenOptions={{ headerTitleAlign: "center" }}>
			<Tabs.Screen name="index" options={{ title: "Words" }} />
			<Tabs.Screen name="settings" options={{ title: "Settings" }} />
		</Tabs>
	);
}
