import { getScore } from "../firebase/firebaseData.js";
const tableDetails = document.querySelector("tbody");

export const updateScoreBoard = () => {
	getScore().then((results) => {
		for (let i = 0; i < (results.length <= 10 ? results.length : 10); i++) {
			// console.log(results[i]);
			const tr = document.createElement("tr");
			tr.classList.add("result");
			const tdRank = document.createElement("td");
			tdRank.innerText = i + 1;
			tr.appendChild(tdRank);
			tableDetails.appendChild(tr);

			const tdName = document.createElement("td");
			tdName.innerText = results[i].Name;
			tr.appendChild(tdName);
			tableDetails.appendChild(tr);

			const tdTime = document.createElement("td");
			tdTime.innerText = results[i].Time;
			tr.appendChild(tdTime);
			tableDetails.appendChild(tr);
		}
	});
	// console.log(getScore());
};
