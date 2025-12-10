import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	FlatList,
	TouchableOpacity,
	StyleSheet,
	TextInput,
	Modal,
	Alert,
	ActivityIndicator,
	Platform,
} from "react-native";
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useAuth } from "../auth/AuthContext";

export default function NotesList() {
	const { user } = useAuth();
	const [notes, setNotes] = useState([]);
	const [loading, setLoading] = useState(true);
	const [modalVisible, setModalVisible] = useState(false);
	const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
	const [noteToDelete, setNoteToDelete] = useState(null);
	const [editingNote, setEditingNote] = useState(null);
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");

	useEffect(() => {
		if (!user) return;

		const notesRef = collection(db, "users", user.uid, "notes");
		const q = query(notesRef, orderBy("updatedAt", "desc"));

		const unsubscribe = onSnapshot(
			q,
			(snapshot) => {
				const notesData = snapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				setNotes(notesData);
				setLoading(false);
			},
			(error) => {
				console.error("Error fetching notes:", error);
				setLoading(false);
			}
		);

		return () => unsubscribe();
	}, [user]);

	const openAddModal = () => {
		setEditingNote(null);
		setTitle("");
		setContent("");
		setModalVisible(true);
	};

	const openEditModal = (note) => {
		setEditingNote(note);
		setTitle(note.title);
		setContent(note.content);
		setModalVisible(true);
	};

	const saveNote = async () => {
		if (!title.trim()) {
			Alert.alert("Error", "Please enter a title");
			return;
		}

		try {
			const notesRef = collection(db, "users", user.uid, "notes");

			if (editingNote) {
				const noteDoc = doc(db, "users", user.uid, "notes", editingNote.id);
				await updateDoc(noteDoc, {
					title: title.trim(),
					content: content.trim(),
					updatedAt: new Date(),
				});
			} else {
				await addDoc(notesRef, {
					title: title.trim(),
					content: content.trim(),
					createdAt: new Date(),
					updatedAt: new Date(),
				});
			}

			setModalVisible(false);
			setTitle("");
			setContent("");
		} catch (error) {
			console.error("Error saving note:", error);
			Alert.alert("Error", "Failed to save note");
		}
	};

	const deleteNote = (note) => {
		setNoteToDelete(note);
		setDeleteConfirmVisible(true);
	};

	const confirmDelete = async () => {
		if (!noteToDelete) return;

		try {
			const noteDoc = doc(db, "users", user.uid, "notes", noteToDelete.id);
			await deleteDoc(noteDoc);
			setDeleteConfirmVisible(false);
			setNoteToDelete(null);
		} catch (error) {
			console.error("Error deleting note:", error);
			setDeleteConfirmVisible(false);
		}
	};

	const renderNote = ({ item }) => (
		<TouchableOpacity style={styles.noteCard} onPress={() => openEditModal(item)} onLongPress={() => deleteNote(item)}>
			<Text style={styles.noteTitle}>{item.title}</Text>
			{item.content ? (
				<Text style={styles.noteContent} numberOfLines={2}>
					{item.content}
				</Text>
			) : null}
			<Text style={styles.noteDate}>{item.updatedAt?.toDate?.().toLocaleDateString() || "Recently"}</Text>
		</TouchableOpacity>
	);

	if (loading) {
		return (
			<View style={styles.centered}>
				<ActivityIndicator size="large" color="#6b4ce6" />
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.headerTitle}>My Notes</Text>
				<TouchableOpacity style={styles.addButton} onPress={openAddModal}>
					<Text style={styles.addButtonText}>+ New Note</Text>
				</TouchableOpacity>
			</View>

			{notes.length === 0 ? (
				<View style={styles.emptyContainer}>
					<Text style={styles.emptyText}>No notes yet</Text>
					<Text style={styles.emptySubtext}>Tap "New Note" to create your first note</Text>
				</View>
			) : (
				<FlatList
					data={notes}
					renderItem={renderNote}
					keyExtractor={(item) => item.id}
					contentContainerStyle={styles.listContent}
				/>
			)}

			<Modal
				animationType="slide"
				transparent={false}
				visible={modalVisible}
				onRequestClose={() => setModalVisible(false)}
			>
				<View style={styles.modalContainer}>
					<View style={styles.modalHeader}>
						<TouchableOpacity onPress={() => setModalVisible(false)}>
							<Text style={styles.cancelButton}>Cancel</Text>
						</TouchableOpacity>
						<Text style={styles.modalTitle}>{editingNote ? "Edit Note" : "New Note"}</Text>
						<TouchableOpacity onPress={saveNote}>
							<Text style={styles.saveButton}>Save</Text>
						</TouchableOpacity>
					</View>
					<TextInput
						style={styles.titleInput}
						placeholder="Title"
						placeholderTextColor="#8b8ba7"
						value={title}
						onChangeText={setTitle}
						autoFocus
					/>
					<TextInput
						style={styles.contentInput}
						placeholder="Note content..."
						placeholderTextColor="#8b8ba7"
						value={content}
						onChangeText={setContent}
						multiline
						textAlignVertical="top"
					/>

					{editingNote && (
						<TouchableOpacity
							style={styles.deleteButton}
							onPress={() => {
								setModalVisible(false);
								deleteNote(editingNote);
							}}
						>
							<Text style={styles.deleteButtonText}>Delete Note</Text>
						</TouchableOpacity>
					)}
				</View>
			</Modal>

			<Modal
				animationType="fade"
				transparent={true}
				visible={deleteConfirmVisible}
				onRequestClose={() => setDeleteConfirmVisible(false)}
			>
				<View style={styles.confirmOverlay}>
					<View style={styles.confirmBox}>
						<Text style={styles.confirmTitle}>Delete Note</Text>
						<Text style={styles.confirmMessage}>Are you sure you want to delete "{noteToDelete?.title}"?</Text>
						<View style={styles.confirmButtons}>
							<TouchableOpacity style={styles.confirmCancelButton} onPress={() => setDeleteConfirmVisible(false)}>
								<Text style={styles.confirmCancelText}>Cancel</Text>
							</TouchableOpacity>
							<TouchableOpacity style={styles.confirmDeleteButton} onPress={confirmDelete}>
								<Text style={styles.confirmDeleteText}>Delete</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#0f0f1e",
	},
	centered: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#0f0f1e",
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 20,
		paddingTop: 60,
		backgroundColor: "#1a1a2e",
		borderBottomWidth: 2,
		borderBottomColor: "#6b4ce6",
	},
	headerTitle: {
		fontSize: 32,
		fontWeight: "800",
		color: "#ffffff",
		letterSpacing: 0.5,
	},
	addButton: {
		backgroundColor: "#6b4ce6",
		paddingHorizontal: 20,
		paddingVertical: 12,
		borderRadius: 25,
		shadowColor: "#6b4ce6",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.4,
		shadowRadius: 8,
		elevation: 6,
	},
	addButtonText: {
		color: "#fff",
		fontSize: 15,
		fontWeight: "700",
		letterSpacing: 0.3,
	},
	listContent: {
		padding: 16,
		paddingBottom: 30,
	},
	noteCard: {
		backgroundColor: "#1a1a2e",
		padding: 20,
		borderRadius: 16,
		marginBottom: 14,
		borderWidth: 1,
		borderColor: "#2d2d44",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 8,
		elevation: 5,
	},
	noteTitle: {
		fontSize: 20,
		fontWeight: "700",
		marginBottom: 8,
		color: "#ffffff",
		letterSpacing: 0.3,
	},
	noteContent: {
		fontSize: 15,
		color: "#b8b8d1",
		marginBottom: 12,
		lineHeight: 22,
	},
	noteDate: {
		fontSize: 12,
		color: "#8b8ba7",
		fontWeight: "500",
	},
	emptyContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 32,
	},
	emptyText: {
		fontSize: 24,
		fontWeight: "700",
		color: "#ffffff",
		marginBottom: 10,
	},
	emptySubtext: {
		fontSize: 16,
		color: "#8b8ba7",
		textAlign: "center",
		lineHeight: 24,
	},
	modalContainer: {
		flex: 1,
		backgroundColor: "#0f0f1e",
	},
	modalHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 20,
		paddingTop: 60,
		backgroundColor: "#1a1a2e",
		borderBottomWidth: 2,
		borderBottomColor: "#6b4ce6",
	},
	modalTitle: {
		fontSize: 20,
		fontWeight: "700",
		color: "#ffffff",
		letterSpacing: 0.5,
	},
	cancelButton: {
		fontSize: 16,
		color: "#8b8ba7",
		fontWeight: "600",
	},
	saveButton: {
		fontSize: 16,
		color: "#6b4ce6",
		fontWeight: "700",
	},
	titleInput: {
		fontSize: 26,
		fontWeight: "700",
		padding: 20,
		backgroundColor: "#1a1a2e",
		color: "#ffffff",
		borderBottomWidth: 2,
		borderBottomColor: "#2d2d44",
		marginBottom: 2,
	},
	contentInput: {
		flex: 1,
		fontSize: 16,
		padding: 20,
		backgroundColor: "#1a1a2e",
		color: "#b8b8d1",
		lineHeight: 24,
	},
	deleteButton: {
		margin: 20,
		padding: 18,
		backgroundColor: "#e63946",
		borderRadius: 14,
		alignItems: "center",
		shadowColor: "#e63946",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 8,
		elevation: 5,
	},
	deleteButtonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "700",
		letterSpacing: 0.5,
	},
	confirmOverlay: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.7)",
		justifyContent: "center",
		alignItems: "center",
	},
	confirmBox: {
		backgroundColor: "#1a1a2e",
		borderRadius: 20,
		padding: 24,
		width: "85%",
		maxWidth: 400,
		borderWidth: 2,
		borderColor: "#6b4ce6",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 8 },
		shadowOpacity: 0.4,
		shadowRadius: 16,
		elevation: 10,
	},
	confirmTitle: {
		fontSize: 22,
		fontWeight: "800",
		color: "#ffffff",
		marginBottom: 12,
		textAlign: "center",
	},
	confirmMessage: {
		fontSize: 16,
		color: "#b8b8d1",
		marginBottom: 24,
		textAlign: "center",
		lineHeight: 22,
	},
	confirmButtons: {
		flexDirection: "row",
		gap: 12,
	},
	confirmCancelButton: {
		flex: 1,
		padding: 14,
		backgroundColor: "transparent",
		borderRadius: 12,
		borderWidth: 2,
		borderColor: "#8b8ba7",
		alignItems: "center",
	},
	confirmCancelText: {
		color: "#8b8ba7",
		fontSize: 16,
		fontWeight: "700",
	},
	confirmDeleteButton: {
		flex: 1,
		padding: 14,
		backgroundColor: "#e63946",
		borderRadius: 12,
		alignItems: "center",
		shadowColor: "#e63946",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 8,
		elevation: 5,
	},
	confirmDeleteText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "700",
	},
});
