/////////////
/// Timer ///
/////////////

let minute = 0;
let second = 0;
let myTimer;

const timer = () => {
	// Increment of 1 for second once timer function invoked
	if ((second += 1) == 60) {
		second = 0;
		minute++;
	}
	document.querySelector("#minute").innerText = returnData(minute);
	document.querySelector("#second").innerText = returnData(second);
};

const returnData = (input) => {
	return input > 9 ? input : `0${input}`;
};

export const timeStart = () => {
	myTimer = setInterval(() => {
		timer();
	}, 1000);
};

export const timePause = () => {
	clearInterval(myTimer);
};

export const timeReset = () => {
	minute = 0;
	second = 0;
	document.querySelector("#minute").innerText = "00";
	document.querySelector("#second").innerText = "00";
};
