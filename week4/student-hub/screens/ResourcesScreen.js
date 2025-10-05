import { View, Text, Pressable, StyleSheet, FlatList, TextInput } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { CommonStyles, Colors, Typography, Spacing } from "../CommonStyles";
import { resourcesData, categories } from "../data/resourcesData";

export default function ResourcesScreen({ navigation }) {
	const [searchText, setSearchText] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("All");
	const [filteredData, setFilteredData] = useState(resourcesData);

	// Filter resources based on search and category
	const filterResources = () => {
		let filtered = resourcesData;

		// Filter by category
		if (selectedCategory !== "All") {
			filtered = filtered.filter((item) => item.category === selectedCategory);
		}

		// Filter by search text
		if (searchText) {
			filtered = filtered.filter(
				(item) =>
					item.title.toLowerCase().includes(searchText.toLowerCase()) ||
					item.description.toLowerCase().includes(searchText.toLowerCase()) ||
					item.tags.some((tag) => tag.toLowerCase().includes(searchText.toLowerCase()))
			);
		}

		setFilteredData(filtered);
	};

	// Update filters when search or category changes
	React.useEffect(() => {
		filterResources();
	}, [searchText, selectedCategory]);

	// Render individual resource item
	const renderResourceItem = ({ item }) => (
		<Pressable style={styles.resourceCard} onPress={() => navigation.navigate("Details", { resource: item })}>
			<View style={styles.cardHeader}>
				<Text style={styles.thumbnail}>{item.thumbnail}</Text>
				<View style={styles.cardContent}>
					<Text style={styles.resourceTitle}>{item.title}</Text>
					<Text style={styles.resourceDescription}>{item.description}</Text>
				</View>
				<Pressable style={styles.bookmarkButton}>
					<Ionicons
						name={item.isBookmarked ? "bookmark" : "bookmark-outline"}
						size={24}
						color={item.isBookmarked ? Colors.warning : Colors.textSecondary}
					/>
				</Pressable>
			</View>

			<View style={styles.cardFooter}>
				<View style={styles.metaInfo}>
					<Text style={styles.category}>{item.category}</Text>
					<Text style={styles.difficulty}>{item.difficulty}</Text>
					<Text style={styles.duration}>{item.duration}</Text>
				</View>
				<View style={styles.rating}>
					<Ionicons name="star" size={16} color={Colors.warning} />
					<Text style={styles.ratingText}>{item.rating}</Text>
				</View>
			</View>

			<Text style={styles.instructor}>By {item.instructor}</Text>
		</Pressable>
	);

	// Render category filter button
	const renderCategoryButton = (category) => (
		<Pressable
			key={category}
			style={[styles.categoryButton, selectedCategory === category && styles.selectedCategoryButton]}
			onPress={() => setSelectedCategory(category)}
		>
			<Text style={[styles.categoryButtonText, selectedCategory === category && styles.selectedCategoryButtonText]}>
				{category}
			</Text>
		</Pressable>
	);

	return (
		<View style={CommonStyles.container}>
			{/* Search Bar */}
			<View style={styles.searchContainer}>
				<Ionicons name="search" size={20} color={Colors.textSecondary} style={styles.searchIcon} />
				<TextInput
					style={styles.searchInput}
					placeholder="Search resources..."
					value={searchText}
					onChangeText={setSearchText}
				/>
			</View>

			{/* Category Filter */}
			<View style={styles.categoryContainer}>
				<FlatList
					horizontal
					showsHorizontalScrollIndicator={false}
					data={categories}
					renderItem={({ item }) => renderCategoryButton(item)}
					keyExtractor={(item) => item}
					contentContainerStyle={styles.categoryList}
				/>
			</View>

			{/* Results Count */}
			<Text style={styles.resultsCount}>
				{filteredData.length} resource{filteredData.length !== 1 ? "s" : ""} found
			</Text>

			{/* Resources List */}
			<FlatList
				data={filteredData}
				renderItem={renderResourceItem}
				keyExtractor={(item) => item.id}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={styles.listContainer}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	searchContainer: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: Colors.surface,
		borderRadius: 8,
		marginBottom: Spacing.md,
		paddingHorizontal: Spacing.md,
		borderWidth: 1,
		borderColor: Colors.border,
	},
	searchIcon: {
		marginRight: Spacing.sm,
	},
	searchInput: {
		flex: 1,
		paddingVertical: Spacing.md,
		fontSize: 16,
		color: Colors.text,
	},
	categoryContainer: {
		marginBottom: Spacing.md,
	},
	categoryList: {
		paddingHorizontal: Spacing.sm,
	},
	categoryButton: {
		backgroundColor: Colors.surface,
		paddingHorizontal: Spacing.md,
		paddingVertical: Spacing.sm,
		borderRadius: 20,
		marginHorizontal: Spacing.xs,
		borderWidth: 1,
		borderColor: Colors.border,
	},
	selectedCategoryButton: {
		backgroundColor: Colors.primary,
		borderColor: Colors.primary,
	},
	categoryButtonText: {
		color: Colors.textSecondary,
		fontSize: 14,
		fontWeight: "500",
	},
	selectedCategoryButtonText: {
		color: Colors.surface,
	},
	resultsCount: {
		...Typography.caption,
		marginBottom: Spacing.sm,
		color: Colors.textSecondary,
	},
	listContainer: {
		paddingBottom: Spacing.lg,
	},
	resourceCard: {
		...CommonStyles.card,
		marginBottom: Spacing.md,
	},
	cardHeader: {
		flexDirection: "row",
		alignItems: "flex-start",
		marginBottom: Spacing.md,
	},
	thumbnail: {
		fontSize: 32,
		marginRight: Spacing.md,
	},
	cardContent: {
		flex: 1,
	},
	resourceTitle: {
		...Typography.heading,
		marginBottom: Spacing.xs,
	},
	resourceDescription: {
		...Typography.body,
		color: Colors.textSecondary,
		lineHeight: 20,
	},
	bookmarkButton: {
		padding: Spacing.xs,
	},
	cardFooter: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: Spacing.sm,
	},
	metaInfo: {
		flexDirection: "row",
		alignItems: "center",
	},
	category: {
		...Typography.caption,
		backgroundColor: Colors.primary,
		color: Colors.surface,
		paddingHorizontal: Spacing.sm,
		paddingVertical: Spacing.xs,
		borderRadius: 12,
		marginRight: Spacing.sm,
		fontSize: 12,
		fontWeight: "600",
	},
	difficulty: {
		...Typography.caption,
		color: Colors.textSecondary,
		marginRight: Spacing.sm,
	},
	duration: {
		...Typography.caption,
		color: Colors.textSecondary,
	},
	rating: {
		flexDirection: "row",
		alignItems: "center",
	},
	ratingText: {
		...Typography.caption,
		marginLeft: Spacing.xs,
		fontWeight: "600",
	},
	instructor: {
		...Typography.caption,
		color: Colors.textSecondary,
		fontStyle: "italic",
	},
});
