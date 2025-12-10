// app/(tabs)/_layout.js

import { Tabs, Redirect } from "expo-router";
import { useAuth } from "../../src/auth/AuthContext";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
	const { user, loading } = useAuth();
	if (!loading && !user) return <Redirect href="/(auth)/sign-in" />;
	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarStyle: {
					backgroundColor: "#1a1a2e",
					borderTopColor: "#6b4ce6",
					borderTopWidth: 2,
					height: 60,
					paddingBottom: 8,
				},
				tabBarActiveTintColor: "#6b4ce6",
				tabBarInactiveTintColor: "#8b8ba7",
				tabBarLabelStyle: {
					fontSize: 12,
					fontWeight: "600",
				},
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Notes",
					tabBarIcon: ({ color, size }) => <Ionicons name="document-text" size={size} color={color} />,
				}}
			/>
			<Tabs.Screen
				name="settings"
				options={{
					title: "Settings",
					tabBarIcon: ({ color, size }) => <Ionicons name="settings" size={size} color={color} />,
				}}
			/>
		</Tabs>
	);
}
