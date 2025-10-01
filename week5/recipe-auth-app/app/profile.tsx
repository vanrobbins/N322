import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function ProfileScreen() {
	const { user } = useUser();
	return (
		<>
			<SignedIn>
				<View style={style.container}>
					<Text style={style.title}>Profild</Text>
					<Text>Email: {user?.primaryEmailAddress?.emailAddress}</Text>
				</View>
			</SignedIn>
			<SignedOut>
				<Redirect href="/sign-in"></Redirect>
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
