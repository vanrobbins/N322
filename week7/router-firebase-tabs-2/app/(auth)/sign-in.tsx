import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useRouter } from "expo-router";

export default function SignInScreen() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const onSignIn = async () => {
		if (!email.trim() || !password.trim()) {
			Alert.alert("Missing info", "Email and password are required.");
			return;
		}
		try {
			await signInWithEmailAndPassword(auth, email.trim(), password);
			router.replace("/"); // Go to tabs (home)
		} catch (e: any) {
			Alert.alert("Sign in error", e.message ?? String(e));
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Welcome back</Text>

			<TextInput
				style={styles.input}
				placeholder="Email"
				autoCapitalize="none"
				keyboardType="email-address"
				value={email}
				onChangeText={setEmail}
			/>

			<TextInput
				style={styles.input}
				placeholder="Password"
				secureTextEntry
				value={password}
				onChangeText={setPassword}
			/>

			<Button title="Sign In" onPress={onSignIn} />

			<Text style={styles.alt} onPress={() => router.push("/sign-up")}>
				New here? Create an account
			</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, padding: 20, gap: 12, justifyContent: "center" },
	title: { fontSize: 24, fontWeight: "600", textAlign: "center", marginBottom: 12 },
	input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 12, backgroundColor: "#fff" },
	alt: { textAlign: "center", color: "#2962ff", marginTop: 12 },
});
