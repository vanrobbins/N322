import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { CommonStyles, Colors, Typography, Spacing } from "../CommonStyles";

export default function ProfileScreen({ navigation, route }) {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userInfo, setUserInfo] = useState({
		name: "John Doe",
		email: "john.doe@example.com",
		joinDate: "September 2024",
		completedCourses: 12,
		totalHours: 48,
	});

	const handleLogout = () => {
		setIsLoggedIn(false);
	};

	// Test function to manually set logged in state
	const handleTestLogin = () => {
		setIsLoggedIn(true);
		setUserInfo({
			name: "Test User",
			email: "test@example.com",
			joinDate: "September 2024",
			completedCourses: 5,
			totalHours: 20,
		});
	};

	if (isLoggedIn) {
		return (
			<ScrollView style={CommonStyles.container}>
				<View style={styles.profileHeader}>
					<View style={styles.avatarContainer}>
						<Ionicons name="person-circle" size={80} color={Colors.primary} />
					</View>
					<Text style={Typography.title}>{userInfo.name}</Text>
					<Text style={styles.email}>{userInfo.email}</Text>
					<Text style={styles.joinDate}>Member since {userInfo.joinDate}</Text>
				</View>

				<View style={CommonStyles.card}>
					<Text style={Typography.heading}>Learning Stats</Text>
					<View style={styles.statsContainer}>
						<View style={styles.statItem}>
							<Text style={styles.statNumber}>{userInfo.completedCourses}</Text>
							<Text style={styles.statLabel}>Courses Completed</Text>
						</View>
						<View style={styles.statItem}>
							<Text style={styles.statNumber}>{userInfo.totalHours}</Text>
							<Text style={styles.statLabel}>Hours Studied</Text>
						</View>
					</View>
				</View>

				<View style={CommonStyles.card}>
					<Text style={Typography.heading}>Account Actions</Text>
					<Pressable style={CommonStyles.actionButton}>
						<Ionicons name="settings" size={24} color={Colors.textSecondary} />
						<Text style={CommonStyles.actionText}>Settings</Text>
						<Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
					</Pressable>

					<Pressable style={CommonStyles.actionButton}>
						<Ionicons name="bookmark" size={24} color={Colors.textSecondary} />
						<Text style={CommonStyles.actionText}>Bookmarked Resources</Text>
						<Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
					</Pressable>

					<Pressable style={CommonStyles.actionButton}>
						<Ionicons name="help-circle" size={24} color={Colors.textSecondary} />
						<Text style={CommonStyles.actionText}>Help & Support</Text>
						<Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
					</Pressable>
				</View>

				<Pressable style={CommonStyles.buttonError} onPress={handleLogout}>
					<View style={CommonStyles.buttonRow}>
						<Ionicons name="log-out" size={20} color={Colors.error} style={CommonStyles.iconSpacing} />
						<Text style={CommonStyles.buttonTextError}>Sign Out</Text>
					</View>
				</Pressable>
			</ScrollView>
		);
	}

	return (
		<ScrollView style={CommonStyles.container}>
			<View style={CommonStyles.header}>
				<Ionicons name="person-circle" size={60} color={Colors.primary} />
				<Text style={Typography.title}>Welcome!</Text>
				<Text style={CommonStyles.subtitle}>Join Student Hub to start your learning journey</Text>
			</View>

			<View style={CommonStyles.card}>
				<Text style={Typography.heading}>Get Started</Text>
				<Text style={styles.description}>
					Create an account or sign in to access personalized learning resources, track your progress, and bookmark your
					favorite content.
				</Text>

				<View style={styles.buttonContainer}>
					<Pressable
						style={CommonStyles.button}
						onPress={() =>
							navigation.navigate("CreateAccountScreen", {
								onSuccess: (userInfo) => {
									setIsLoggedIn(true);
									setUserInfo(userInfo);
								},
							})
						}
					>
						<View style={CommonStyles.buttonRow}>
							<Ionicons name="person-add" size={20} color={Colors.surface} style={CommonStyles.iconSpacing} />
							<Text style={CommonStyles.buttonText}>Create Account</Text>
						</View>
					</Pressable>

					<Pressable
						style={CommonStyles.buttonSecondary}
						onPress={() =>
							navigation.navigate("LoginScreen", {
								onSuccess: (userInfo) => {
									setIsLoggedIn(true);
									setUserInfo(userInfo);
								},
							})
						}
					>
						<View style={CommonStyles.buttonRow}>
							<Ionicons name="log-in" size={20} color={Colors.primary} style={CommonStyles.iconSpacing} />
							<Text style={CommonStyles.buttonTextSecondary}>Sign In</Text>
						</View>
					</Pressable>

					<Pressable style={[CommonStyles.button, { backgroundColor: Colors.success }]} onPress={handleTestLogin}>
						<Text style={CommonStyles.buttonText}>Test Login (Debug)</Text>
					</Pressable>
				</View>
			</View>

			<View style={CommonStyles.card}>
				<Text style={Typography.heading}>Why Join Student Hub?</Text>
				<View style={styles.featureList}>
					<View style={styles.featureItem}>
						<Ionicons name="checkmark-circle" size={20} color={Colors.success} />
						<Text style={styles.featureText}>Access to premium learning resources</Text>
					</View>
					<View style={styles.featureItem}>
						<Ionicons name="checkmark-circle" size={20} color={Colors.success} />
						<Text style={styles.featureText}>Track your learning progress</Text>
					</View>
					<View style={styles.featureItem}>
						<Ionicons name="checkmark-circle" size={20} color={Colors.success} />
						<Text style={styles.featureText}>Bookmark favorite content</Text>
					</View>
					<View style={styles.featureItem}>
						<Ionicons name="checkmark-circle" size={20} color={Colors.success} />
						<Text style={styles.featureText}>Personalized recommendations</Text>
					</View>
				</View>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	profileHeader: {
		alignItems: "center",
		paddingVertical: Spacing.xl,
	},
	avatarContainer: {
		marginBottom: Spacing.md,
	},
	email: {
		...Typography.body,
		color: Colors.textSecondary,
		marginTop: Spacing.xs,
	},
	joinDate: {
		...Typography.caption,
		color: Colors.textSecondary,
		marginTop: Spacing.xs,
	},
	statsContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginTop: Spacing.md,
	},
	statItem: {
		alignItems: "center",
	},
	statNumber: {
		...Typography.title,
		color: Colors.primary,
		fontSize: 32,
		fontWeight: "bold",
	},
	statLabel: {
		...Typography.caption,
		color: Colors.textSecondary,
		marginTop: Spacing.xs,
		textAlign: "center",
	},
	description: {
		...Typography.body,
		color: Colors.textSecondary,
		lineHeight: 22,
		marginTop: Spacing.sm,
	},
	buttonContainer: {
		marginTop: Spacing.lg,
	},
	featureList: {
		marginTop: Spacing.md,
	},
	featureItem: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: Spacing.sm,
	},
	featureText: {
		...Typography.body,
		marginLeft: Spacing.sm,
		color: Colors.textSecondary,
	},
});
