import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useRouter } from "expo-router";

export default function SignUpScreen() {
	const router = useRouter();
	const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const onSignUp = async () => {
		if (!fullName.trim() || !email.trim() || !password.trim()) {
			Alert.alert("Missing info", "Full name, email, and password are required.");
			return;
		}
		try {
			const cred = await createUserWithEmailAndPassword(auth, email.trim(), password);
			// Save full name to Firebase Auth profile (displayName)
			await updateProfile(cred.user, { displayName: fullName.trim() });
			router.replace("/"); // Go to tabs (home)
		} catch (e: any) {
			Alert.alert("Sign up error", e.message ?? String(e));
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Create Account</Text>

			<TextInput style={styles.input} placeholder="Full Name" value={fullName} onChangeText={setFullName} />

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

			<Button title="Sign Up" onPress={onSignUp} />

			<Text style={styles.alt} onPress={() => router.push("/sign-in")}>
				Have an account? Sign in
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
