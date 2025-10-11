import { Pressable, Text } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { SIZES, COLORS } from "../styles/theme";
export default function IconButton({ name, onPress, color = COLORS.text, size = SIZES.icon }) {
	return (
		<Pressable onPress={onPress} style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1, padding: 8 }]}>
			<Feather name={name} size={size} color={color} />
		</Pressable>
	);
}
