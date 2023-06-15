import db from "./firebase.js";
import {
	collection,
	addDoc,
	getDocs,
	query,
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

export async function getScore() {
	const scores = [];
	try {
		const q = query(sbRef);
		const snapshot = await getDocs(q);
		snapshot.forEach((doc) => scores.push({ ...doc.data() }));
	} catch (error) {
		alert(error);
	}
	return scores.sort((a, b) =>
		a.Time > b.Time ? 1 : a.Time < b.Time ? -1 : 0
	);
}
