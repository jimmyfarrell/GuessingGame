// Defines global variables
var guessCount = 5;
var answer;
var currentGuess = "";
var allGuesses = [];
var gameOver = false;

// Listens for button clicks and ENTER key presses
$(document).ready(listening());
function listening() {
	$(".btn-guess").on("click", function() {
		if (!gameOver) {
			isValidNum();
		}
	});
	$(".player-guess").on("keypress", function(e) {
		if (e.which == 13 && $(".player-guess").val() != "") {
			if (!gameOver) {
				isValidNum();
			}
			return false;
		}
	});
	$(".btn-hint").on("click", function() {
		if (!gameOver) {
			giveHint();
		}
	});
	$(".btn-try-again").on("click", function() {
		startOver();
	});
}

// Checks for valid number 1-100 and starts game if valid
function isValidNum() {
	var valid = true;
	currentGuess = $(".player-guess").val();
	$(".player-guess").val("");
	for (var i = 0; i < allGuesses.length; i++) {
		if (currentGuess == allGuesses[i]) {
			valid = false;
			$(".current-status").text("You already guessed that").hide().fadeIn(1000);
		}
	}
	if (isNaN(currentGuess) || currentGuess === "") {
		valid = false;
		$(".current-status").text("Not a valid number").hide().fadeIn(1000);
	}
	if (currentGuess < 0 || currentGuess > 100) {
		valid = false;
		$(".current-status").text("I told you, 1 - 100!").hide().fadeIn(1000);
	}
	if (valid) {
		startGame();
	}
}

// Initiates game play
function startGame() {
	// Decrements guess counter and adds guess to array
	guessCount--;
	allGuesses.push(currentGuess);
	
	// Generates random number 1-100 if this is the first guess
	if (guessCount == 4) {
		answer = Math.floor((Math.random() * 100) + 1);
	}
	
	// Calls function to update visual list of guesses
	updateGuessList();
	
	// Checks if guess is correct and calls winning function
	if (currentGuess == answer) {
		gameWon();
	}
	
	// Checks if incorrect guess is the final guess and updates status and guesses left
	else {
		if (guessCount > 0) {
			$(".current-status").text(evaluateGuess()).hide().fadeIn(1000);
			updateGuessesLeft();
		}
		
		// Calls losing function if out of guesses
		else {
			gameLost();
		}
	}
}

// Updates visual list of guesses with current guess and guess evaluation
function updateGuessList() {
	if (currentGuess == answer) {
		$(".guess-list").prepend("<li><span>" + currentGuess + "</span>: That's the answer!</li>").hide();
		$(".guess-list li").first().find("span").addClass("correct-guess");
	}
	else {
		$(".guess-list").prepend("<li><span>" + currentGuess + "</span>: " + evaluateGuess() + "</li>").hide();
		$(".guess-list li").first().find("span").addClass("wrong-guess");
	}
	$(".guess-list").show();
	$(".guess-list").find("li").first().hide().slideDown(800);
}

// Evaluates current guess and tells whether to guess higher or lower
function evaluateGuess() {
	
	// If first guess, evaluates based on distance to answer
	if (guessCount == 4) {
		return howClose() + ", " + higherOrLower();
	}
	
	// If no first guess, evaluates based on whether closer or further away than previous guess
	else {
		return hotOrCold() + ", " + higherOrLower();
	}
}

// Compares current guess to previos guess to return "hotter" or "colder"
function hotOrCold() {
	var previousGuess = allGuesses[allGuesses.length - 2];
	if (Math.abs(answer - currentGuess) < Math.abs(answer - previousGuess)) {
		return "Hotter";
	}
	else {
		return "Colder";
	}
}

// Updates the text that informs player of how many guesses are left
function updateGuessesLeft() {
	if (guessCount === 1) {
		$(".guesses-left").text("Final guess...");
	}
	else {
		$(".guesses-left").text("Guesses left: " + guessCount);
	}
}

// Judges the distance between the current guess and the answer to return "hot" or "cold"
function howClose() {
	if (Math.abs(answer - currentGuess) <= 10) {
		return "Hot";
	}
	else {
		return "Cold";
	}
}

// Compares current guess and answer to return whether to guess higher or lower
function higherOrLower() {
	if (answer > currentGuess) {
		return "Guess higher";
	}
	else {
		return "Guess lower";
	}
}

// If the game is won, replaces numbertron image with animation and tells player they won
function gameWon() {
	$("#numbertron").attr("src","contents/numbertron-win.gif");
	$(".current-status").text("You won!").hide().fadeIn(1000);
	window.scrollTo(0,0);
	gameOver = true;
}

// If the game is lost, tells player they lost and provides the answer
function gameLost() {
	$(".guesses-left").text("Oh no! You lost... :(");
	$(".current-status").text("The answer was " + answer).hide().fadeIn(1000);
	gameOver = true;
}

// Resets game to original state
function startOver() {
	guessCount = 5;
	allGuesses = [];
	currentGuess = "";
	answer = undefined;
	gameOver = false;
	$("#numbertron").attr("src","contents/numbertron.png");
	$("ul").empty().hide();
	$(".current-status").text("It's between 1 and 100").hide().fadeIn();
	$(".guesses-left").text("Guesses left: " + guessCount);
	$(".player-guess").val("");
}

// Provides the answer
function giveHint() {
	if (guessCount == 5) {
		$(".current-status").text("At least try to guess!").hide().fadeIn();
	}
	else {
		$(".current-status").text("The answer is " + answer).hide().fadeIn();
	}
}