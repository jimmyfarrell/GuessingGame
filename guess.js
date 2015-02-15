var guessCount = 5;
var answer;
var currentGuess;
var allGuesses = [];

// $(document).ready(listening());
//
//
// function listening() {
// 	$(".btn-guess").on("click", isValidNum());
// 	$(".btn-guess").on("keyup", function(e) {
// 		if (e.keyup == 13) {
// 			isValidNum();
// 		});
// 	$(".btn-hint").on("click", giveHint());
// 	$(".btn-try-again").on("click", startOver());
// }

function isValidNum() {
	var valid = true;
	currentGuess = $(".player-guess").val();
	$(".player-guess").val("");
	for (var i = 0; i < allGuesses.length; i++) {
		if (currentGuess == allGuesses[i]) {
			valid = false;
			$(".current-status").text("You already guessed that number");
		}
	}
	if (isNaN(currentGuess) || currentGuess === "") {
		valid = false;
		$(".current-status").text("Not a valid number");
	}
	if (currentGuess < 0 || currentGuess > 100) {
		valid = false;
		$(".current-status").text("I told you, 1-100!");
	}
	if (valid) {
		startGame();
	}
}

function startGame() {
	guessCount--;
	if (guessCount == 4) {
		answer = Math.floor((Math.random() * 100) + 1);
	}
	updateGuessList();
	if (currentGuess == answer) {
		gameWon();
	}
	else {
		if (guessCount > 0) {
			allGuesses.push(currentGuess);
			evaluateGuess();
		}
		else {
			gameLost();
		}
	}
}

function updateGuessList() {
	if (currentGuess == answer) {
		$(".guess-list").prepend("<li>Guess #" + (5 - guessCount) + ": <span>" + currentGuess + "</span></li>").hide();
		$(".guess-list li").first().find("span").addClass("correct-guess");
	}
	else {
		$(".guess-list").prepend("<li>Guess #" + (5 - guessCount) + ": <span>" + currentGuess + "</span></li>");
		$(".guess-list li").first().find("span").addClass("wrong-guess");
	}
	$(".guess-list").show();
	$(".guess-list").find("li").first().hide().slideDown(800);
}

function evaluateGuess() {
	if (guessCount == 4) {
		$(".current-status").text(howClose() + " — " + higherOrLower());
	}
	else {
		$(".current-status").text(hotOrCold() + " — " + higherOrLower());
	}
	updateGuessesLeft();
}

function hotOrCold() {
	var previousGuess = allGuesses[allGuesses.length - 2];
	if (Math.abs(answer - currentGuess) < Math.abs(answer - previousGuess)) {
		return "hotter";
	}
	else {
		return "colder";
	}
}

function updateGuessesLeft() {
	if (guessCount === 1) {
		$(".guesses-left").text("Final guess...");
	}
	else {
		$(".guesses-left").text("Guesses left: " + guessCount);
	}
}

function howClose() {
	if (Math.abs(answer - currentGuess) <= 5) {
		return "So HOT";
	}
	else if (Math.abs(answer - currentGuess) <= 10) {
		return "Pretty hot";
	}
	else if (Math.abs(answer - currentGuess) <= 20) {
		return "Cold";
	}
	else if (Math.abs(answer - currentGuess) > 20) {
		return "Ice cold";
	}
}

function higherOrLower() {
	if (answer > currentGuess) {
		return "Guess higher";
	}
	else {
		return "Guess lower";
	}
}

function gameWon() {
	$(".current-status").text("You won!");
}

function gameLost() {
	$(".current-status").text("Oh no! You lost... :(");
}

function startOver() {
	guessCount = 5;
	allGuesses = [];
	$("ul").empty().hide();
	$(".current-status").text("It's between 1 and 100");
	$(".guesses-left").text("Guesses left: " + guessCount);
}

function giveHint() {
	if (guessCount == 5) {
		$(".current-status").text("At least try to guess!");
	}
	else {
		$(".current-status").text("The answer is " + answer);
	}
}