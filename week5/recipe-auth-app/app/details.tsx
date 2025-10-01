import { SignedIn, SignedOut } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function DetailsScreen() {
	return (
		<>
			<SignedIn>
				<View style={style.container}>
					<Text style={style.title}>Recipe Details</Text>
					<Text>This is the recipe details page, but it is a protected route.</Text>
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
