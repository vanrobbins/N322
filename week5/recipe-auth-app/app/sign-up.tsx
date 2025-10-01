import { SignedIn, SignedOut } from "@clerk/clerk-expo";
import { SignUp } from "@clerk/clerk-react";
import { Redirect } from "expo-router";
import React from "react";

export default function SignUpScreen() {
	return (
		<>
			<SignedIn>
				<Redirect href={"/"}></Redirect>
			</SignedIn>
			<SignedOut>
				<SignUp path="/sign-up"></SignUp>
			</SignedOut>
		</>
	);
}
