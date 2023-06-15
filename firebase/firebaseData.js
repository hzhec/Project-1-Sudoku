import db from "./firebase.js";
import {
	collection,
	addDoc,
	getDocs,
	query,
	where,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

// Reference from "score" collection database
const sbRef = collection(db, "score");

export const addScore = (name, time) => {
	const scoreObj = { Name: name, Time: time };
	// Add scoreObj to sbRef
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
		const q = query(sbRef, where("Name", "!=", ""));
		const snapshot = await getDocs(q);
		snapshot.forEach((doc) => scores.push({ ...doc.data() }));
	} catch (error) {
		alert(error);
	}
	return scores.sort((a, b) =>
		a.Time > b.Time ? 1 : a.Time < b.Time ? -1 : 0
	);
}

// export const getScore = async () => {
// 	const scores = [];
// 	const q = query(sbRef, where("Name", "!=", ""));

// 	await getDocs(q)
// 		.then((snapshot) => {
// 			snapshot.forEach((doc) => scores.push({ ...doc.data() }));
// 		})
// 		.catch((error) => alert(error));

// 	return scores.sort((a, b) =>
// 		a.Time > b.Time ? 1 : a.Time < b.Time ? -1 : 0
// 	);
// };
