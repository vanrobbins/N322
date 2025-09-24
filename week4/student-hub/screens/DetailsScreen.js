import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { CommonStyles, Colors, Typography, Spacing } from "../CommonStyles";

export default function DetailsScreen({ navigation, route }) {
	// Get the resource data passed from ResourcesScreen
	const { resource } = route.params || {};
	const [isBookmarked, setIsBookmarked] = useState(resource?.isBookmarked || false);

	// Handle case where no resource is passed
	if (!resource) {
		return (
			<View style={CommonStyles.centerContainer}>
				<Text style={Typography.heading}>No resource selected</Text>
				<Pressable style={CommonStyles.button} onPress={() => navigation.goBack()}>
					<Text style={CommonStyles.buttonText}>Go Back</Text>
				</Pressable>
			</View>
		);
	}

	// Update header with bookmark functionality
	useLayoutEffect(() => {
		navigation.setOptions({
			title: resource.title,
			headerRight: () => (
				<Pressable onPress={toggleBookmark} style={styles.headerButton}>
					<Ionicons name={isBookmarked ? "bookmark" : "bookmark-outline"} size={24} color={Colors.primary} />
				</Pressable>
			),
		});
	}, [navigation, isBookmarked, resource.title]);

	const toggleBookmark = () => {
		setIsBookmarked(!isBookmarked);
		// Here you could also update your data source or call an API
	};

	return (
		<ScrollView style={CommonStyles.container}>
			{/* Header Section */}
			<View style={styles.header}>
				<Text style={styles.thumbnail}>{resource.thumbnail}</Text>
				<View style={styles.headerContent}>
					<Text style={Typography.title}>{resource.title}</Text>
					<Text style={styles.instructor}>By {resource.instructor}</Text>
				</View>
			</View>

			{/* Rating and Bookmark Status */}
			<View style={styles.statsRow}>
				<View style={styles.rating}>
					<Ionicons name="star" size={20} color={Colors.warning} />
					<Text style={styles.ratingText}>{resource.rating} / 5.0</Text>
				</View>
				<View style={styles.bookmarkStatus}>
					<Ionicons
						name={isBookmarked ? "bookmark" : "bookmark-outline"}
						size={20}
						color={isBookmarked ? Colors.warning : Colors.textSecondary}
					/>
					<Text style={styles.bookmarkText}>{isBookmarked ? "Bookmarked" : "Not Bookmarked"}</Text>
				</View>
			</View>

			{/* Meta Information */}
			<View style={CommonStyles.card}>
				<Text style={Typography.heading}>Course Information</Text>
				<View style={styles.metaRow}>
					<View style={styles.metaItem}>
						<Ionicons name="folder" size={20} color={Colors.primary} />
						<Text style={styles.metaLabel}>Category:</Text>
						<Text style={styles.metaValue}>{resource.category}</Text>
					</View>

					<View style={styles.metaItem}>
						<Ionicons name="trending-up" size={20} color={Colors.secondary} />
						<Text style={styles.metaLabel}>Difficulty:</Text>
						<Text style={styles.metaValue}>{resource.difficulty}</Text>
					</View>

					<View style={styles.metaItem}>
						<Ionicons name="time" size={20} color={Colors.accent} />
						<Text style={styles.metaLabel}>Duration:</Text>
						<Text style={styles.metaValue}>{resource.duration}</Text>
					</View>
				</View>
			</View>

			{/* Description */}
			<View style={CommonStyles.card}>
				<Text style={Typography.heading}>Description</Text>
				<Text style={styles.description}>{resource.description}</Text>
			</View>

			{/* Tags */}
			<View style={CommonStyles.card}>
				<Text style={Typography.heading}>Tags</Text>
				<View style={styles.tagsContainer}>
					{resource.tags.map((tag, index) => (
						<View key={index} style={styles.tag}>
							<Text style={styles.tagText}>{tag}</Text>
						</View>
					))}
				</View>
			</View>

			{/* Action Buttons */}
			<View style={styles.actionButtons}>
				<Pressable style={[CommonStyles.button, styles.primaryButton]}>
					<Ionicons name="play" size={20} color={Colors.surface} />
					<Text style={[CommonStyles.buttonText, styles.buttonTextWithIcon]}>Start Learning</Text>
				</Pressable>

				<Pressable style={[CommonStyles.button, styles.secondaryButton]} onPress={toggleBookmark}>
					<Ionicons name={isBookmarked ? "bookmark" : "bookmark-outline"} size={20} color={Colors.primary} />
					<Text style={[styles.secondaryButtonText, styles.buttonTextWithIcon]}>
						{isBookmarked ? "Remove Bookmark" : "Add Bookmark"}
					</Text>
				</Pressable>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	header: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: Spacing.lg,
		paddingBottom: Spacing.md,
		borderBottomWidth: 1,
		borderBottomColor: Colors.border,
	},
	thumbnail: {
		fontSize: 48,
		marginRight: Spacing.md,
	},
	headerContent: {
		flex: 1,
	},
	instructor: {
		...Typography.body,
		color: Colors.textSecondary,
		fontStyle: "italic",
		marginTop: Spacing.xs,
	},
	headerButton: {
		padding: Spacing.sm,
	},
	statsRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: Spacing.lg,
		paddingHorizontal: Spacing.md,
	},
	rating: {
		flexDirection: "row",
		alignItems: "center",
	},
	ratingText: {
		...Typography.body,
		marginLeft: Spacing.sm,
		fontWeight: "600",
	},
	bookmarkStatus: {
		flexDirection: "row",
		alignItems: "center",
	},
	bookmarkText: {
		...Typography.body,
		marginLeft: Spacing.sm,
		color: Colors.textSecondary,
	},
	metaRow: {
		marginTop: Spacing.md,
	},
	metaItem: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: Spacing.md,
	},
	metaLabel: {
		...Typography.body,
		fontWeight: "600",
		marginLeft: Spacing.sm,
		marginRight: Spacing.sm,
		minWidth: 80,
	},
	metaValue: {
		...Typography.body,
		color: Colors.textSecondary,
	},
	description: {
		...Typography.body,
		lineHeight: 24,
		marginTop: Spacing.md,
		color: Colors.text,
	},
	tagsContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		marginTop: Spacing.md,
	},
	tag: {
		backgroundColor: Colors.primary,
		paddingHorizontal: Spacing.md,
		paddingVertical: Spacing.sm,
		borderRadius: 16,
		marginRight: Spacing.sm,
		marginBottom: Spacing.sm,
	},
	tagText: {
		color: Colors.surface,
		fontSize: 12,
		fontWeight: "600",
	},
	actionButtons: {
		marginTop: Spacing.lg,
		marginBottom: Spacing.xl,
	},
	primaryButton: {
		backgroundColor: Colors.primary,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	secondaryButton: {
		backgroundColor: Colors.surface,
		borderWidth: 2,
		borderColor: Colors.primary,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	secondaryButtonText: {
		color: Colors.primary,
		fontWeight: "bold",
		fontSize: 16,
	},
	buttonTextWithIcon: {
		marginLeft: Spacing.sm,
	},
});
