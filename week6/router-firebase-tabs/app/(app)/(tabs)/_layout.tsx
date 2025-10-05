import { Tabs } from "expo-router";

export default function TabsLayout() {
	return (
		<Tabs
			screenOptions={{
				headerStyle: { backgroundColor: "#6200ee" },
				headerTintColor: "#fff",
				tabBarActiveTintColor: "#6200ee",
			}}
		>
			<Tabs.Screen name="index" options={{ title: "Home" }} />
			<Tabs.Screen name="profile" options={{ title: "Profile" }} />
			<Tabs.Screen name="settings" options={{ title: "Settings" }} />
		</Tabs>
	);
}
