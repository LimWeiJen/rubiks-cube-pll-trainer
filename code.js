let seconds = 0; 
let tens = 0; 
let Interval;
let currAlg;

function startTimer () {
	clearInterval(Interval);
	Interval = setInterval(_moveTimer, 10);
}

function stopTimer () {
	clearInterval(Interval);
	let currRecord = localStorage.getItem(currAlg.name);
	if (currRecord === null) currRecord = '';
	currRecord += ` ${seconds}:${tens}`
	localStorage.setItem(currAlg.name, currRecord);
	$('.record').remove();
	$('body').append('<div class="record"></div>');
	listOfAlgs.forEach((alg) => {
		$('.record').append(`<li>${alg.name} - ${localStorage.getItem(alg.name)}</li>`);
	})
	newAlg();
}

function resetTimer () {
	clearInterval(Interval);
	tens = 0;
	seconds = 0;
	$('.tens').html(tens.toString());
	$('.seconds').html(seconds.toString());
}

function _moveTimer () {
	tens++; 
	
	$('.tens').html(tens.toString());
	$('.seconds').html(seconds.toString());

	if (tens > 99) {
		seconds++;
		tens = 0;
	}
}

function newAlg () {
	currAlg = listOfAlgs[Math.floor(Math.random() * listOfAlgs.length)];
	$('.alg').html(currAlg.alg);
	$('.alg-name').html(currAlg.name);

	listOfAlgs.forEach((alg, i) => {
		$(`.list-of-algs>li:eq(${i})`).html(alg.name);
		if (alg.name === currAlg.name) $(`.list-of-algs>li:eq(${i})`).css('color', 'red');
		else $(`.list-of-algs>li:eq(${i})`).css('color', 'black');
	})
}

const listOfAlgs = [
	{ name: 'Ae', alg: "D2 R B' R F2 R' B R F2 R2 D2" },
	{ name: 'Ab', alg: "B' R2 D' L D R' D' L' D R' B" },
	{ name: 'E', alg: "R2 B2 U' R2 U B2 U' R2 D B2 D'" },
	{ name: 'F', alg: "L' D2 B' D R D' B D2 L D' B' R' B U' D" },
	{ name: 'Ga', alg: "F2 U L2 U' D' B2 L2 U B2 U' L2 U2 B2 D F2" },
	{ name: 'Gb', alg: "B' R2 L' D L2 F' L2 D' R2 B2 L B U B2" },
	{ name: 'Gc', alg: "B' D' F D2 B' D F U' F2 U D2 B2 U' R2" },
	{ name: 'Gd', alg: "L D R' D2 L D' R' B2 U2 D L2 D' R2 D2" },
	{ name: 'H', alg: "F2 R2 B' F' R U' D' R2 U D R' B F'" },
	{ name: 'Ja', alg: "F' U' L F L' U F U2 F U F' U' R' F2 R" },
	{ name: 'Jb', alg: "D' L2 U' F' B L2 F B U' B2 L2 U' L2 D L2" },
	{ name: 'Na', alg: "B2 U B2 D B2 L' F' L B2 L' F L' U2 L2 D'" },
	{ name: 'Nb', alg: "R U' R2 D L B2 L2 D L' D R F2 D' L2 D2" },
	{ name: 'Ra', alg: "B2 U2 R2 F' U B' U2 F U' B' U' B2 U' R2" },
	{ name: 'Rb', alg: "B2 R' B' U' B R B2 U' L B U2 B' U L'" },
	{ name: 'T', alg: "L2 R2 D L2 U F2 L2 B2 L2 U F2 D' F2 D F2" },
	{ name: 'Ua', alg: "F2 L2 R2 B2 D2 F D' F L2 R2 B' U B'" },
	{ name: 'Ub', alg: "R L U2 R' L' U B F' L2 B' F' L2 F2" },
	{ name: 'V', alg: "D' B2 U2 R2 U B' F' R2 D2 B' F D F2 D2 L2" },
	{ name: 'Y', alg: "L2 B2 R' D R' F2 R D' R U' L2 U L2 U B2" },
	{ name: 'Z', alg: "F' U2 F L' F' U' L2 D R' F2 R D' L2 F L" },
]

let isHoldingDownSpace = false;
let timerStarted = false;

$('body').keydown(function (e) { 
	if (e.key === ' ' && !isHoldingDownSpace && !timerStarted) {
		$('.timer').css('color', 'green');
		isHoldingDownSpace = true;
	}
	if (e.key === ' ' && timerStarted) {
		$('.timer').css('color', 'red');
		timerStarted = false;
		stopTimer();
	}
});

$('body').keyup(function (e) { 
	if (e.key === ' ' && isHoldingDownSpace && !timerStarted) {
		isHoldingDownSpace = false;
		resetTimer();
		startTimer();
		timerStarted = true;
		$('.timer').css('color', 'black');
	}
});

$('.reset').click(function (e) { 
	e.preventDefault();
	listOfAlgs.forEach((alg) => {
		localStorage.removeItem(alg.name);
		location.reload();
	})
});

$(() => {
	listOfAlgs.forEach((alg) => {
		$('.record').append(`<li>${alg.name} - ${localStorage.getItem(alg.name)}</li>`);
	})

	newAlg();
})