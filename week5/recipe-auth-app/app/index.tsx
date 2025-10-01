import { SignedIn, SignedOut, useAuth, useUser } from "@clerk/clerk-expo";
import { Link, Redirect } from "expo-router";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
export default function HomeScreen() {
	const { user } = useUser();
	const { signOut } = useAuth();
	return (
		<>
			<SignedIn>
				<View style={style.container}>
					<Text style={style.title}> Welcome: {user?.firstName}</Text>
					<Link style={style.link} href="/details">
						Go To Recipe Details
					</Link>
					<Link style={style.link} href="/profile">
						Go To Profile
					</Link>
					<Button title="Sign Out" onPress={() => signOut()}></Button>
				</View>
			</SignedIn>
			<SignedOut>
				<Redirect href="/sign-in" />
			</SignedOut>
		</>
	);
}
const style = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	title: {
		fontSize: 22,
		marginBottom: 20,
	},
	link: {
		fontSize: 18,
		color: "blue",
		marginBottom: 10,
	},
});
