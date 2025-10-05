import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, FlatList, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function App() {
	const [item, setItem] = useState("");
	const [list, setList] = useState([]);
	const [editId, setEditID] = useState(null);
	const [editText, setEditText] = useState("");

	const addItem = () => {
		console.log("add item:", item);
		if (item.trim().length != 0) {
			setList([...list, { id: Date.now().toString(), name: item }]);
			setItem("");
		}
		return;
	};
	const removeItem = (id) => {
		setList(list.filter((g) => g.id !== id));
	};

	const startEdit = (id, name) => {
		setEditID(id);
		setEditText(name);
	};
	const saveEdit = (id) => {
		setList(list.map((g) => (g.id === id ? { ...g, name: editText } : g)));
		setEditID(null);
		setEditingText("");
	};
	return (
		<View style={styles.container}>
			<StatusBar style="auto" />
			<Text style={styles.title}>Shopping List</Text>
			<View style={styles.inputRow}>
				<TextInput style={styles.input} placeholder="Add shopping Item" value={item} onChangeText={setItem} />
				<Button title="Add" onPress={addItem} />
			</View>

			<FlatList
				data={list}
				keyExtractor={(g) => g.id}
				renderItem={({ item }) => {
					return (
						<View style={styles.itemRow}>
							{editId === item.id ? (
								<TextInput
									style={styles.input}
									value={editText}
									onChangeText={setEditText}
									onSubmitEditing={() => saveEdit(item.id)}
									autoFocus
								/>
							) : (
								<Text style={styles.itemText}>{item.name}</Text>
							)}
							<View style={{ flexDirection: "row" }}>
								{editId === item.id ? (
									<Pressable onPress={() => saveItem(item.id)}>
										<Feather name="save" size={24} color="green" style={styles.saveButton} />
									</Pressable>
								) : (
									<Pressable onPress={() => startEdit(item.id, item.name)}>
										<Feather name="edit" size={24} color="blue" style={styles.editButton} />
									</Pressable>
								)}

								<Pressable onPress={() => removeItem(item.id)}>
									<Feather name="trash" size={24} color="red" style={styles.deleteButton} />
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
		backgroundColor: "#eee",
		padding: 20,
		paddingTop: "12.5%",
	},
	title: {
		fontSize: 16,
		fontWeight: "bold",
		textAlign: "center",
	},
	inputRow: {
		flexDirection: "row",
		marginBottom: 15,
		padding: 5,
	},
	input: {
		flex: 1,
		borderWidth: 1,
		borderColor: "#ccc",
		padding: 8,
		marginRight: 10,
		borderRadius: 12,
		backgroundColor: "#eee",
	},
	itemRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		backgroundColor: "#eee",
		padding: 12,
		marginBottom: 10,
		borderRadius: 12,
		shadowColor: "#111",
		shadowOpacity: 0.001,
		shadowRadius: 1,
		elevation: 2,
	},
	itemText: {
		fontSize: 16,
	},
	deleteButton: {
		fontSize: 18,
		color: "red",
		backgroundColor: "#ddd",
		borderRadius: 12,
	},
	editButton: {
		marginRight: 10,
		color: "green",
		backgroundColor: "#ddd",
		borderRadius: 12,
	},
	saveButton: {
		marginRight: 10,
		color: "blue",
		backgroundColor: "#ddd",
		borderRadius: 12,
	},
});
