import db from "./firebase.js";
import {
	collection,
	addDoc,
	getDocs,
	query,
	where,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

const sbRef = collection(db, "score");

export const addScore = (name, time) => {
	const scoreObj = { Name: name, Time: time };
	addDoc(sbRef, scoreObj)
		.then(() => {
			alert("Score added!");
		})
		.catch((error) => {
			alert(error);
		});
};

export async function getScore(name = "") {
	const scores = [];
	try {
		const q = query(sbRef, where("Name", "==", name));
		const snapshot = name !== "" ? await getDocs(q) : await getDocs(sbRef);
		snapshot.forEach((doc) => scores.push({ ...doc.data() }));
	} catch (error) {
		alert(error);
	}
	return scores.sort((a, b) =>
		a.Time > b.Time ? 1 : a.Time < b.Time ? -1 : 0
	);
}
