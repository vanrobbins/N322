import {
	getFirestore,
	collection,
	addDoc,
	doc,
	updateDoc,
	deleteDoc,
	query,
	where,
	onSnapshot,
	getDoc,
	serverTimestamp,
} from "firebase/firestore";
import { auth } from "../firebaseConfig";
const db = getFirestore();
// collection name should be 'recipes' (was misspelled 'recipess')
const recipesCol = collection(db, "recipes");

/**
 * This function adds a recipe for a user.
 * @param user - User object containing information about the user adding the recipe. This could
 * include details such as username, email, and user ID.
 * @param recipe - Recipe object containing details such as name, ingredients, instructions, etc.
 */
export async function addRecipe(user, recipe) {
	if (!user || !user.uid) {
		throw new Error("No valid user. Can't add recipe");
	}
	const payload = {
		title: recipe.title || "New Recipe",
		description: recipe.description || "",
		ingredients: recipe.ingredients || [],
		steps: recipe.steps || [],
		tags: recipe.tags || [],
		ownerId: user.uid,
		ownerName: user.displayName ?? user.email ?? "",
		createdAt: serverTimestamp(),
		updatedAt: Date.now(),
		imageUrl: recipe.imageUrl ?? null,
		public: !!recipe.public,
	};
	const ref = await addDoc(recipesCol, payload);
	return ref.id;
}
/**
 * This function updates a recipe for a specific user based on the provided updates.
 * @param user - The `user` parameter likely represents the user who is updating the recipe. This could
 * be the user object or ID of the user making the update.
 * @param recipeId - The `recipeId` parameter is the unique identifier of the recipe that you want to
 * update. It is used to identify the specific recipe in the database so that the updates can be
 * applied to the correct recipe.
 * @param updates - Updates is an object that contains the new information you want to update for the
 * recipe. This could include fields such as the recipe name, ingredients, instructions, cooking time,
 * etc.
 */
export async function updateRecipe(user, recipeId, updates) {
	if (!user || !user.uid) {
		throw new Error("No valid user. Can't add recipe");
	}
	const ref = doc(db, "recipes", recipeId);
	await updateDoc(ref, {
		...updates,
		updatedAt: serverTimestamp(),
	});
}
/**
 * This function is used to delete a recipe owned by a specific user.
 * @param user - The `user` parameter likely refers to the user who is currently logged in and
 * attempting to delete a recipe. This user must have the necessary permissions to delete the recipe.
 * @param recipeOwner - The `recipeOwner` parameter typically refers to the user who owns the recipe
 * that is being deleted. This parameter helps in ensuring that the user deleting the recipe has the
 * necessary permissions to do so.
 * @param recipeId - The `recipeId` parameter is the unique identifier of the recipe that you want to
 * delete. It is used to specify which recipe should be deleted from the database.
 * @param updates - The `updates` parameter typically refers to any changes or modifications that need
 * to be made to the recipe before deleting it. This could include things like updating the recipe
 * title, ingredients, instructions, or any other details associated with the recipe.
 */
export async function deleteRecipe(user, recipeOwner, recipeId, updates) {
	if (!user || !user.uid) {
		throw new Error("No valid user. Can't add recipe");
	} else if (user != recipeOwner) {
		throw new Error("You are not the recipe owner");
	}
	const ref = doc(db, "recipes", recipeId);
	await deleteDoc(ref);
}
/**
 * This function listens to the user's recipes and triggers an update function when changes occur.
 * @param user - The `user` parameter is the user object that contains information about the user, such
 * as their username, preferences, and saved recipes.
 * @param onUpdate - A function that will be called whenever there is an update to the user's recipes.
 */
export function listenToUserRecipes(user, onUpdate) {
	if (!user || !user.uid) {
		throw new Error("No valid user. Can't add recipe");
		onUpdate([]);
		return () => {};
	}
	const q = query(recipesCol, where("ownerId", "==", user.uid));
	return onSnapshot(
		q,
		(snap) => {
			console.log("onSnapshot - user recipes", snap.size);
			const docs = snap.docs.map((r) => ({ id: r.id, ...r.data() }));
			console.log("snapshot, ", docs);
			// pass the array of docs, not an array containing the array
			onUpdate(docs);
		},
		(err) => {
			console.error("Error listening to user recipes", err);
			onUpdate([]);
		}
	);
}
/**
 * This function is designed to retrieve a recipe based on the provided ID.
 * @param id - The `id` parameter in the `getRecipeOnce` function is used to specify the unique
 * identifier of the recipe that you want to retrieve. This identifier is typically used to fetch a
 * specific recipe from a data source or database.
 */
export async function getRecipeOnce(id) {
	try {
		const recipeId = Array.isArray(id) ? id[0] : id;
		if (!recipeId || typeof recipeId !== "string") {
			console.warn("getRecipeOnce: invalid recipe id", id);
			return null;
		}
		const ref = doc(db, "recipes", recipeId);
		const snap = await getDoc(ref);
		if (!snap.exists()) return null;
		return { id: snap.id, ...snap.data() };
	} catch {
		console.error("error getting recipe", error);
		throw error;
	}
}
