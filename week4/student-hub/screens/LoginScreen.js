import { View, Text, TextInput, Pressable, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { CommonStyles, Colors, Typography, Spacing } from "../CommonStyles";

export default function LoginScreen({ navigation, route }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const validateForm = () => {
		if (!email.trim()) {
			Alert.alert("Error", "Please enter an email address");
			return false;
		}
		if (!email.includes("@")) {
			Alert.alert("Error", "Please enter a valid email address");
			return false;
		}
		if (!password) {
			Alert.alert("Error", "Please enter a password");
			return false;
		}
		return true;
	};

	const handleLogin = async () => {
		if (!validateForm()) return;

		setIsLoading(true);
		try {
			// Simulate API call
			console.log("Logging in:", email);

			// Simulate network delay
			await new Promise((resolve) => setTimeout(resolve, 1000));

			// Create user info object from login response
			const loggedInUserInfo = {
				name: "John Doe",
				email: email,
				joinDate: "September 2024",
				completedCourses: 12,
				totalHours: 48,
			};

			Alert.alert("Success", "Logged in successfully!", [
				{
					text: "OK",
					onPress: () => {
						// Use callback if provided, otherwise navigate normally
						if (route.params?.onSuccess) {
							route.params.onSuccess(loggedInUserInfo);
							navigation.goBack();
						} else {
							// Fallback navigation (shouldn't be needed with callback pattern)
							console.log("No callback provided, using fallback navigation");
							navigation.navigate("ProfileScreen", {
								loginSuccess: true,
								userInfo: loggedInUserInfo,
							});
						}
					},
				},
			]);
		} catch (error) {
			Alert.alert("Error", "Invalid email or password. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<View style={CommonStyles.container}>
			<View style={CommonStyles.header}>
				<Ionicons name="log-in" size={48} color={Colors.primary} />
				<Text style={Typography.title}>Welcome Back</Text>
				<Text style={CommonStyles.subtitle}>Sign in to your account</Text>
			</View>

			<View style={styles.formContainer}>
				<View style={CommonStyles.inputContainer}>
					<Ionicons name="mail" size={20} color={Colors.textSecondary} style={CommonStyles.iconSpacing} />
					<TextInput
						style={CommonStyles.inputWithIcon}
						placeholder="Email Address"
						value={email}
						onChangeText={setEmail}
						keyboardType="email-address"
						autoCapitalize="none"
						autoCorrect={false}
					/>
				</View>

				<View style={CommonStyles.inputContainer}>
					<Ionicons name="lock-closed" size={20} color={Colors.textSecondary} style={CommonStyles.iconSpacing} />
					<TextInput
						style={CommonStyles.inputWithIcon}
						placeholder="Password"
						value={password}
						onChangeText={setPassword}
						secureTextEntry
					/>
				</View>

				<Pressable style={styles.forgotPassword}>
					<Text style={styles.forgotPasswordText}>Forgot Password?</Text>
				</Pressable>

				<Pressable
					style={[CommonStyles.button, isLoading && styles.disabledButton]}
					onPress={handleLogin}
					disabled={isLoading}
				>
					{isLoading ? (
						<Text style={CommonStyles.buttonText}>Signing In...</Text>
					) : (
						<View style={CommonStyles.buttonRow}>
							<Ionicons name="checkmark-circle" size={20} color={Colors.surface} style={CommonStyles.iconSpacing} />
							<Text style={CommonStyles.buttonText}>Sign In</Text>
						</View>
					)}
				</Pressable>

				<Pressable style={CommonStyles.buttonSecondary} onPress={() => navigation.navigate("CreateAccountScreen")}>
					<View style={CommonStyles.buttonRow}>
						<Ionicons name="person-add" size={20} color={Colors.primary} style={CommonStyles.iconSpacing} />
						<Text style={CommonStyles.buttonTextSecondary}>Don't have an account? Sign Up</Text>
					</View>
				</Pressable>
			</View>

			<Pressable onPress={() => navigation.goBack()} style={styles.backLink}>
				<Ionicons name="arrow-back" size={16} color={Colors.primary} style={CommonStyles.iconSpacing} />
				<Text style={styles.linkText}>Back to Profile</Text>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	formContainer: {
		flex: 1,
		justifyContent: "center",
	},
	forgotPassword: {
		alignSelf: "flex-end",
		marginVertical: Spacing.sm,
	},
	forgotPasswordText: {
		color: Colors.primary,
		fontSize: 14,
	},
	disabledButton: {
		backgroundColor: Colors.textSecondary,
		opacity: 0.6,
	},
	backLink: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		marginTop: Spacing.lg,
		padding: Spacing.md,
	},
	linkText: {
		color: Colors.primary,
		fontSize: 16,
		marginLeft: Spacing.xs,
	},
});
