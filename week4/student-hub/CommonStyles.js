import { StyleSheet } from "react-native";

// Color palette - centralized colors
export const Colors = {
	primary: "#990000",
	secondary: "#F41C40",
	accent: "#6D0808",
	background: "#F8EFE2",
	surface: "#F5E3CC",
	text: "#072332",
	textSecondary: "#B9C1C6",
	border: "#EEEEF0",
	inactive: "#072332",
	error: "#ff1d43ff",
	success: "#4CAF50",
	warning: "#FF9800",
};

// Typography - consistent font sizing
export const Typography = {
	title: {
		fontSize: 28,
		fontWeight: "bold",
		color: Colors.text,
	},
	heading: {
		fontSize: 20,
		fontWeight: "bold",
		color: Colors.text,
	},
	body: {
		fontSize: 16,
		color: Colors.text,
	},
	caption: {
		fontSize: 14,
		color: Colors.textSecondary,
	},
	button: {
		fontSize: 16,
		fontWeight: "bold",
	},
};

// Spacing - consistent spacing values
export const Spacing = {
	xs: 4,
	sm: 8,
	md: 16,
	lg: 24,
	xl: 32,
};

// Common styles
export const CommonStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.background,
		padding: Spacing.md,
	},
	centerContainer: {
		flex: 1,
		backgroundColor: Colors.background,
		alignItems: "center",
		justifyContent: "center",
		padding: Spacing.md,
	},
	card: {
		backgroundColor: Colors.surface,
		borderRadius: 8,
		padding: Spacing.md,
		marginVertical: Spacing.sm,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.1,
		shadowRadius: 3.84,
		elevation: 5,
	},
	button: {
		backgroundColor: Colors.primary,
		padding: Spacing.md,
		borderRadius: 8,
		alignItems: "center",
		marginVertical: Spacing.sm,
	},
	buttonSecondary: {
		backgroundColor: "transparent",
		borderWidth: 1,
		borderColor: Colors.primary,
		padding: Spacing.md,
		borderRadius: 8,
		alignItems: "center",
		marginVertical: Spacing.sm,
	},
	buttonError: {
		backgroundColor: "transparent",
		borderWidth: 1,
		borderColor: Colors.error,
		padding: Spacing.md,
		borderRadius: 8,
		alignItems: "center",
		marginVertical: Spacing.sm,
	},
	buttonRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	buttonText: {
		color: Colors.surface,
		fontWeight: "bold",
		fontSize: 16,
	},
	buttonTextSecondary: {
		color: Colors.primary,
		fontWeight: "bold",
		fontSize: 16,
	},
	buttonTextError: {
		color: Colors.error,
		fontWeight: "bold",
		fontSize: 16,
	},
	input: {
		backgroundColor: Colors.surface,
		borderWidth: 1,
		borderColor: Colors.border,
		borderRadius: 8,
		padding: Spacing.md,
		marginVertical: Spacing.sm,
		fontSize: 16,
	},
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: Colors.surface,
		borderWidth: 1,
		borderColor: Colors.border,
		borderRadius: 8,
		paddingHorizontal: Spacing.md,
		marginVertical: Spacing.sm,
	},
	inputWithIcon: {
		flex: 1,
		padding: Spacing.md,
		fontSize: 16,
		color: Colors.text,
	},
	header: {
		alignItems: "center",
		paddingVertical: Spacing.xl,
	},
	subtitle: {
		...Typography.body,
		color: Colors.textSecondary,
		textAlign: "center",
		marginTop: Spacing.sm,
	},
	actionButton: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: Spacing.md,
		borderBottomWidth: 1,
		borderBottomColor: Colors.border,
	},
	actionText: {
		...Typography.body,
		flex: 1,
		marginLeft: Spacing.md,
	},
	iconSpacing: {
		marginRight: Spacing.sm,
	},
});
