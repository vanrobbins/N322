import { Text, View, StyleSheet, Image } from "react-native";
import React, { Component } from "react";

export default class PickedImageCard extends Component<{ image }> {
	render() {
		const { image } = this.props;
		return (
			<View style={styles.card}>
				<Image
					source={{ uri: image.uri }}
					style={styles.image}
					resizeMode="cover"
					accessibilityLabel="Selected image preview"
				/>
				<Text style={styles.meta}>
					{Math.round(image.width)} x {Math.round(image.height)}
				</Text>
				<Text numberOfLines={1} style={styles.uri}>
					{image.uri}
				</Text>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	card: {
		borderRadius: 12,
		overflow: "hidden",
		borderWidth: 1,
		borderColor: "#2c2c35",
		backgroundColor: "#14141a",
	},
	image: {
		width: "100%",
		height: 280,
		backgroundColor: "#0f0f14",
	},
	meta: {
		color: "#fff",
		paddingHorizontal: 12,
		paddingTop: 10,
		fontWeight: "600",
	},
	uri: {
		color: "#bfbfcb",
		paddingHorizontal: 12,
		paddingTop: 12,
	},
});
