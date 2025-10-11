import { useState, useEffect } from "react";
import { listenToUserRecipes } from "../services/firestoreService";
import { useAuthContext } from "../context/AuthContext";
/* The `export default function useRecipes() {` statement is defining a custom React hook named
`useRecipes`. This hook is responsible for managing the state of recipes and loading status related
to a user's recipes. It uses the `useState` and `useEffect` hooks from React to handle state and
side effects respectively. */
export default function useRecipes() {
	const { user } = useAuthContext();
	const [recipes, setRecipes] = useState([]);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		setLoading(true);
		if (!user) {
			setRecipes([]);
			setLoading(false);
			return;
		}
		const unsub = listenToUserRecipes(user, (docs) => {
			setRecipes(docs);
			setLoading(false);
		});
		return () => {
			if (typeof unsub === "function") {
				unsub();
			}
		};
	}, [user]);
	return { recipes, loading };
}
