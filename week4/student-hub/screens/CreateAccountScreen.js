import { View, Text, TextInput, Pressable, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { CommonStyles, Colors, Typography, Spacing } from "../CommonStyles";

export default function CreateAccountScreen({ navigation, route }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
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
		if (password.length < 6) {
			Alert.alert("Error", "Password must be at least 6 characters long");
			return false;
		}
		if (password !== confirmPassword) {
			Alert.alert("Error", "Passwords do not match");
			return false;
		}
		return true;
	};

	const handleCreateAccount = async () => {
		if (!validateForm()) return;

		setIsLoading(true);
		try {
			// Simulate API call
			console.log("Creating account for:", email);

			// Simulate network delay
			await new Promise((resolve) => setTimeout(resolve, 1000));

			// Create user info object for new account
			const newUserInfo = {
				name: "New User",
				email: email,
				joinDate: "September 2025",
				completedCourses: 0,
				totalHours: 0,
			};

			Alert.alert("Success", "Account created successfully!", [
				{
					text: "OK",
					onPress: () => {
						// Use callback if provided, otherwise navigate normally
						if (route.params?.onSuccess) {
							route.params.onSuccess(newUserInfo);
							navigation.goBack();
						} else {
							// Fallback navigation (shouldn't be needed with callback pattern)
							navigation.navigate("ProfileScreen", {
								loginSuccess: true,
								userInfo: newUserInfo,
							});
						}
					},
				},
			]);
		} catch (error) {
			Alert.alert("Error", "Failed to create account. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<View style={CommonStyles.container}>
			<View style={CommonStyles.header}>
				<Ionicons name="person-add" size={48} color={Colors.primary} />
				<Text style={Typography.title}>Create Account</Text>
				<Text style={CommonStyles.subtitle}>Join Student Hub today</Text>
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

				<View style={CommonStyles.inputContainer}>
					<Ionicons name="lock-closed" size={20} color={Colors.textSecondary} style={CommonStyles.iconSpacing} />
					<TextInput
						style={CommonStyles.inputWithIcon}
						placeholder="Confirm Password"
						value={confirmPassword}
						onChangeText={setConfirmPassword}
						secureTextEntry
					/>
				</View>

				<Pressable
					style={[CommonStyles.button, isLoading && styles.disabledButton]}
					onPress={handleCreateAccount}
					disabled={isLoading}
				>
					{isLoading ? (
						<Text style={CommonStyles.buttonText}>Creating Account...</Text>
					) : (
						<View style={CommonStyles.buttonRow}>
							<Ionicons name="checkmark-circle" size={20} color={Colors.surface} style={CommonStyles.iconSpacing} />
							<Text style={CommonStyles.buttonText}>Create Account</Text>
						</View>
					)}
				</Pressable>

				<Pressable style={CommonStyles.buttonSecondary} onPress={() => navigation.navigate("LoginScreen")}>
					<View style={CommonStyles.buttonRow}>
						<Ionicons name="log-in" size={20} color={Colors.primary} style={CommonStyles.iconSpacing} />
						<Text style={CommonStyles.buttonTextSecondary}>Already have an account? Login</Text>
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
