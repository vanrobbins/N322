import { SignedIn, SignedOut, useSignIn } from "@clerk/clerk-expo";
import { SignIn } from "@clerk/clerk-react";
import { Redirect } from "expo-router";
import React from "react";
export default function SignInScreen() {
	const { signIn } = useSignIn();
	return (
		<>
			<SignedIn>
				<Redirect href={"/"}></Redirect>
			</SignedIn>
			<SignedOut>
				<SignIn path={"/sign-in"}></SignIn>
			</SignedOut>
		</>
	);
}
