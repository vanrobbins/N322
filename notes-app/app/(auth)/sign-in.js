import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";
import { useAuth } from "../../src/auth/AuthContext";
import { auth } from "../../src/firebase/firebaseConfig";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

export default function SignIn() {
	const { user } = useAuth();
	const [email, setEmail] = useState("");
	const [pw, setPw] = useState("");
	const [error, setError] = useState("");

	useEffect(() => {
		if (user) router.replace("/(tabs)");
	}, [user]);

	const onSignIn = async () => {
		setError("");
		try {
			await signInWithEmailAndPassword(auth, email.trim(), pw);
		} catch (e) {
			setError(e.message);
		}
	};

	const onSignUp = async () => {
		setError("");
		try {
			await createUserWithEmailAndPassword(auth, email.trim(), pw);
		} catch (e) {
			setError(e.message);
		}
	};

	return (
		<View style={s.container}>
			<View style={s.header}>
				<Text style={s.title}>Welcome</Text>
				<Text style={s.subtitle}>Sign in to your notes</Text>
			</View>

			<View style={s.form}>
				<TextInput
					style={s.input}
					placeholder="Email"
					placeholderTextColor="#8b8ba7"
					autoCapitalize="none"
					value={email}
					onChangeText={setEmail}
				/>
				<TextInput
					style={s.input}
					placeholder="Password"
					placeholderTextColor="#8b8ba7"
					secureTextEntry
					value={pw}
					onChangeText={setPw}
				/>
				{!!error && <Text style={s.error}>{error}</Text>}

				<TouchableOpacity style={s.signInButton} onPress={onSignIn}>
					<Text style={s.signInText}>Sign In</Text>
				</TouchableOpacity>

				<TouchableOpacity style={s.signUpButton} onPress={onSignUp}>
					<Text style={s.signUpText}>Create Account</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const s = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#0f0f1e",
	},
	header: {
		paddingTop: 100,
		paddingHorizontal: 24,
		marginBottom: 40,
	},
	title: {
		fontSize: 42,
		fontWeight: "800",
		color: "#ffffff",
		marginBottom: 8,
		letterSpacing: 0.5,
	},
	subtitle: {
		fontSize: 18,
		color: "#8b8ba7",
		fontWeight: "500",
	},
	form: {
		paddingHorizontal: 24,
	},
	input: {
		backgroundColor: "#1a1a2e",
		borderWidth: 2,
		borderColor: "#2d2d44",
		color: "#ffffff",
		padding: 18,
		borderRadius: 14,
		marginBottom: 16,
		fontSize: 16,
		fontWeight: "500",
	},
	error: {
		color: "#e63946",
		marginBottom: 16,
		fontSize: 14,
		fontWeight: "600",
	},
	signInButton: {
		backgroundColor: "#6b4ce6",
		padding: 18,
		borderRadius: 14,
		alignItems: "center",
		marginTop: 8,
		shadowColor: "#6b4ce6",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.4,
		shadowRadius: 8,
		elevation: 6,
	},
	signInText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "700",
		letterSpacing: 0.5,
	},
	signUpButton: {
		backgroundColor: "transparent",
		borderWidth: 2,
		borderColor: "#6b4ce6",
		padding: 18,
		borderRadius: 14,
		alignItems: "center",
		marginTop: 12,
	},
	signUpText: {
		color: "#6b4ce6",
		fontSize: 16,
		fontWeight: "700",
		letterSpacing: 0.5,
	},
});
