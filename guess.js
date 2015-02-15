var guessCount = 5;
var answer;
var playerGuess;
var previousGuess;
var allGuesses = [];
var guessList = document.getElementById("guess-list");
var guessesLeft = document.getElementById("guesses-left");
var statusText = document.getElementById("current-status");
var hintText = document.getElementById("hint");

function isValidNum() {
	var valid = true;
	playerGuess = document.getElementById("player-guess").value;
	document.getElementById("player-guess").value = "";
	for (var i = 0; i < allGuesses.length; i++) {
		if (playerGuess == allGuesses[i]) {
			valid = false;
			statusText.innerHTML = "You already guessed that number.";
		}
	}
	if (isNaN(playerGuess)) {
		valid = false
		statusText.innerHTML = "Not a number. Please guess again.";
	}
	if (valid) {
		startGame();
	}
}

function startGame() {
	guessCount--;
	if (guessCount == 4) {
		answer = getRandomNum();
	}
	if (playerGuess == answer) {
		$("#guess-list").prepend("<li><span style='font-size: 18px; color: #3a2006;'>Guess #" + (5 - guessCount) + ": </span><span style='color: #257a7c;'>" + playerGuess + "</span></li>");
		statusText.innerHTML = "You won!";
	}
	else {
		$("#guess-list").prepend("<li><span style='font-size: 18px; color: #3a2006;'>Guess #" + (5 - guessCount) + ": </span>" + playerGuess + "</li>");
		if (guessCount > 0) {
			allGuesses.push(playerGuess);
			evaluateGuess();
		}
		else {
			gameLost();
		}
	}
}

function getRandomNum() {
	var randomNum = Math.floor((Math.random() * 100) + 1);
	return randomNum;
}

function evaluateGuess() {
	if (guessCount == 4) {
		statusText.innerHTML = howClose() + " " + higherOrLower();
	}
	else {
		statusText.innerHTML = hotOrCold() + " " + higherOrLower();
	}
	updateGuessList();
}

function hotOrCold() {
	previousGuess = allGuesses[allGuesses.length - 2];
	var hotCold = "";
	if (Math.abs(answer - playerGuess) < Math.abs(answer - previousGuess)) {
		hotCold = "hotter —";
	}
	else {
		hotCold = "colder —";
	}
	return hotCold;
}

function updateGuessList() {
	if (guessCount === 0) {
		guessesLeft.innerHTML = "This is your last guess...";
	}
	else {
		guessesLeft.innerHTML = "Guesses left: " + guessCount;
	}
}

function howClose() {
	var firstHint = "";
	if (Math.abs(answer - playerGuess) <= 5) {
		firstHint = "So HOT —";
	}
	else if (Math.abs(answer - playerGuess) <= 10) {
		firstHint = "Pretty hot —";
	}
	else if (Math.abs(answer - playerGuess) <= 20) {
		firstHint = "Cold —";
	}
	else if (Math.abs(answer - playerGuess) > 20) {
		firstHint = "Ice cold —";
	}
	return firstHint;
}

function higherOrLower() {
	var highLow = "";
	if (answer > playerGuess) {
		highLow += "Guess higher";
	}
	else {
		highLow += "Guess lower";
	}
	return highLow;
}

function gameLost() {
	statusText.innerHTML = "Oh no! You lost... :(";
}

function startOver() {
	guessCount = 5;
	allGuesses = [];
	$("ul").empty();
	statusText.innerHTML = "It's between 1 and 100";
	guessesLeft.innerHTML = "Guesses left: " + guessCount;
}

function giveHint() {
	if (guessCount == 5) {
		statusText.innerHTML = "At least try to guess!";
	}
	else {
		statusText.innerHTML = "The answer is " + answer;
	}
}