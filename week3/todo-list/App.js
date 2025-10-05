import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, FlatList, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function App() {
	const [task, setTask] = useState("");
	const [list, setList] = useState([]);
	const hasCompleted = list.some((item) => item?.completed);
	const addTask = () => {
		if (task.trim().length !== 0) {
			const newItem = { id: Date.now().toString(), name: task, completed: false };
			setList((prev) => {
				const next = [...prev, newItem];
				console.log("list after add:", next);
				return next;
			});
			console.log("added item:", newItem);
			setTask("");
		}
	};

	const toggleCompleted = (id) => {
		if (id == null) return;
		setList((prev) => prev.map((item) => (item && item.id === id ? { ...item, completed: !item.completed } : item)));
	};

	const removeTask = (id) => {
		setList((prev) => prev.filter((item) => item && item.id !== id));
	};
	const removeComplete = () => {
		setList((prev) => prev.filter((item) => item && item.completed !== true));
	};
	return (
		<View style={styles.container}>
			<StatusBar style="auto" />
			<Text style={styles.title}>To Do List</Text>

			<View style={styles.inputRow}>
				<TextInput style={styles.input} placeholder="Add Task" value={task} onChangeText={setTask} />
				<Button title="Add" onPress={addTask} />
			</View>
			<View>
				<Button
					title="Clear Completed"
					onPress={removeComplete}
					color={hasCompleted ? styles.iconDelete.color : "gray"}
					disabled={!hasCompleted}
				/>
			</View>
			<FlatList
				data={list}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => {
					if (!item) return null;
					return (
						<View style={styles.itemRow}>
							<View style={styles.itemContent}>
								<Pressable onPress={() => toggleCompleted(item.id)} style={styles.checkboxPressable}>
									<Feather
										name={item.completed ? "check-circle" : "circle"}
										size={32}
										color={item.completed ? styles.iconDone.color : styles.icon.color}
									/>
								</Pressable>
								<Text style={[styles.itemText, item.completed ? styles.itemTextCompleted : null]}>{item.name}</Text>
							</View>

							<View style={styles.actionsRow}>
								<Pressable onPress={() => removeTask(item.id)} style={styles.actionPressable}>
									<Feather name="trash" size={24} color={styles.iconDelete.color} />
								</Pressable>
							</View>
						</View>
					);
				}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fafafa",
		padding: 20,
		paddingTop: "20%",
	},
	title: {
		fontSize: 18,
		fontWeight: "700",
		textAlign: "center",
		color: "#222",
		marginBottom: 8,
	},
	inputRow: {
		flexDirection: "row",
		marginBottom: 0,
		padding: 6,
		alignItems: "center",
	},
	input: {
		flex: 1,
		borderWidth: 1,
		borderColor: "#ddd",
		padding: 10,
		marginRight: 10,
		borderRadius: 12,
		backgroundColor: "#fff",
	},
	itemRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		backgroundColor: "#fff",
		padding: 12,
		marginBottom: 10,
		borderRadius: 12,
		shadowColor: "#000",
		shadowOpacity: 0.03,
		shadowRadius: 4,
		elevation: 2,
	},
	itemContent: {
		flexDirection: "row",
		alignItems: "center",
		flex: 1,
	},
	checkboxPressable: {
		marginRight: 12,
	},
	icon: {
		color: "#333",
	},
	iconDone: {
		color: "#4CAF50",
	},
	iconDelete: {
		color: "#E53935",
	},
	itemText: {
		fontSize: 16,
		color: "#111",
	},
	itemTextCompleted: {
		textDecorationLine: "line-through",
		color: "#999",
	},
	actionsRow: {
		flexDirection: "row",
	},
	actionPressable: {
		padding: 6,
		borderRadius: 10,
	},
});
