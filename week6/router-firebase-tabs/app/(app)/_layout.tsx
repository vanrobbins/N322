import { Redirect, Slot } from "expo-router";
import { View, ActivityIndicator } from "react-native";
import { useAuthContext } from "../../context/AuthContext";

export default function AppGroupLayout() {
	const { user, loading } = useAuthContext();

	if (loading) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<ActivityIndicator />
			</View>
		);
	}

	if (!user) {
		// Not signed in → go to auth
		return <Redirect href="/sign-in" />;
	}

	return <Slot />; // Render tabs/layout inside (app)
}
