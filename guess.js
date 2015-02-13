var guessCount = 5;
var answer;
var playerGuess;
var allGuesses = [];
var guessesLeft = document.getElementById("guesses-left");
var statusText = document.getElementById("status");

function getRandomNum() {
	var randomNum = Math.floor((Math.random() * 100) + 1);
	return randomNum;
}

function howClose() {
	var distance = ""
	if (Math.abs(answer - playerGuess) <= 5) {
		distance = "so so so close";
	}
	else if (Math.abs(answer - playerGuess) <= 10) {
		distance = "pretty close";
	}
	else if (Math.abs(answer - playerGuess) <= 20) {
		distance = "not very close";
	}
	else if (Math.abs(answer - playerGuess) > 20) {
		distance = "far away";
	}
	return distance;
}

function higherOrLower() {
	statusText.style.display = "block"
	if (answer > playerGuess) {
		statusText.innerHTML = "You're " + howClose() + ".<br>Try guessing higher.";
	}
	else {
		statusText.innerHTML = "You're " + howClose() + ".<br>Try guessing lower.";
	}
}

function gameOver() {
	statusText.innerHTML = "You lost! :(";
}

function compareNums() {
	if (playerGuess == answer) {
		statusText.innerHTML = "You won!";
	}
	else {
		if (guessCount > 0) {
			if (guessCount === 0) {
				statusText.innerHTML = "This is your last guess...";
			}
			statusText.innerHTML = guessCount + " guesses left!";
			allGuesses.push(playerGuess);
			higherOrLower();
		}
		else {
			gameOver();
		}
	}
}

function startGame() {
	answer = getRandomNum();
	compareNums();
}

function isValidNum() {
	playerGuess = parseInt(document.getElementById("playerGuess").value);
	statusText.style.display = "block";
	document.getElementById("playerGuess").value = '';
	if (isNaN(playerGuess)) {
		statusText.innerHTML = "Not a number. Please guess again.";
	}
	else if (guessCount == 5) {
		guessCount--;
		startGame();
	}
	else {
		guessCount--;
		compareNums();
	}
}

function startOver() {
	guessCount = 5;
	allGuess = [];
	statusText.innerHTML = "Remember, you only have 5 guesses.";
}