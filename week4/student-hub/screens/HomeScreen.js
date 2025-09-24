import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { CommonStyles, Colors, Typography, Spacing } from "../CommonStyles";

export default function HomeScreen({ navigation }) {
	return (
		<View style={CommonStyles.container}>
			<View style={CommonStyles.header}>
				<Text style={Typography.title}>Welcome to the Student Hub</Text>
				<Text style={Typography.body}>Your central place for learning and growth</Text>
			</View>

			<View style={CommonStyles.card}>
				<Text style={Typography.heading}>Quick Actions</Text>
				<View style={styles.actionGrid}>
					<Pressable style={styles.actionButton} onPress={() => navigation.navigate("Resource")}>
						<Ionicons name="library" size={32} color={Colors.primary} />
						<Text style={styles.actionText}>Browse Resources</Text>
					</Pressable>

					<Pressable style={styles.actionButton} onPress={() => navigation.navigate("Profile")}>
						<Ionicons name="person" size={32} color={Colors.secondary} />
						<Text style={styles.actionText}>My Profile</Text>
					</Pressable>
				</View>
			</View>

			<View style={CommonStyles.card}>
				<Text style={Typography.heading}>Recent Activity</Text>
				<View style={styles.activityItem}>
					<Ionicons name="checkmark-circle" size={24} color={Colors.success} />
					<View style={styles.activityText}>
						<Text style={Typography.body}>Completed JavaScript Basics</Text>
						<Text style={Typography.caption}>2 hours ago</Text>
					</View>
				</View>

				<View style={styles.activityItem}>
					<Ionicons name="bookmark" size={24} color={Colors.warning} />
					<View style={styles.activityText}>
						<Text style={Typography.body}>Bookmarked React Tutorial</Text>
						<Text style={Typography.caption}>Yesterday</Text>
					</View>
				</View>
			</View>

			<View style={CommonStyles.card}>
				<Text style={Typography.heading}>Study Stats</Text>
				<View style={styles.statsContainer}>
					<View style={styles.statItem}>
						<Text style={styles.statNumber}>12</Text>
						<Text style={Typography.caption}>Resources Completed</Text>
					</View>
					<View style={styles.statItem}>
						<Text style={styles.statNumber}>5</Text>
						<Text style={Typography.caption}>Hours This Week</Text>
					</View>
					<View style={styles.statItem}>
						<Text style={styles.statNumber}>8</Text>
						<Text style={Typography.caption}>Bookmarks</Text>
					</View>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	actionGrid: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginTop: Spacing.md,
	},
	actionButton: {
		alignItems: "center",
		padding: Spacing.md,
		borderRadius: 8,
		backgroundColor: Colors.background,
		minWidth: 120,
	},
	actionText: {
		...Typography.caption,
		marginTop: Spacing.sm,
		textAlign: "center",
		fontWeight: "bold",
	},
	activityItem: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: Spacing.sm,
		borderBottomWidth: 1,
		borderBottomColor: Colors.border,
	},
	activityText: {
		marginLeft: Spacing.md,
		flex: 1,
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
		fontSize: 32,
		fontWeight: "bold",
		color: Colors.primary,
	},
});
