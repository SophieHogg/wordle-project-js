import { words } from "./words.js";
import {
    selectWord,
    initBoard,
    insertLetter,
    backspaceLetter,
    successResponse,
} from "./Utils.js";

const numberOfGuesses = 6;
let guessesRemaining = numberOfGuesses;
let currentGuess = [];
let nextLetter = 0;
let wordToBeGuessed = selectWord(words);
console.log(wordToBeGuessed);

initBoard(numberOfGuesses);

document.addEventListener("keyup", (e) => {
    if (guessesRemaining == 0) {
        return;
    }
    let pressedKey = String(e.key);
    if (pressedKey == "Enter") {
        checkGuess(wordToBeGuessed);
        return;
    } else if (pressedKey == "Backspace" && nextLetter != 0) {
        backspaceLetter(guessesRemaining, nextLetter, currentGuess);
        minusNextLetter(); //this enables backspaceLetter to be pure for testing purposes
    } else if (pressedKey.match(/[a-z]/gi) && pressedKey.length == 1) {
        insertLetter(pressedKey, guessesRemaining, currentGuess, nextLetter);
        addNextLetter(); //this enables insertLetter to be pure, for testing purposes.
    } else {
        return;
    }
});

function addNextLetter() {
    if (nextLetter == 5) {
        return;
    } else {
        nextLetter += 1;
    }
}

function minusNextLetter() {
    nextLetter -= 1;
}

function checkGuess(wordToBeGuessed) {
    let row =
        document.getElementsByClassName("board__letter-row")[
            6 - guessesRemaining
        ];
    let guessString = currentGuess.join("");
    console.log(guessString);
    let arrayCorrectWord = Array.from(wordToBeGuessed);
    console.log;
    if (guessString.length != 5) {
        return;
    }
    for (let i = 0; i < 5; i++) {
        let letterColour = "";
        let box = row.children[i];
        let letterPosition = arrayCorrectWord.indexOf(currentGuess[i]);
        if (letterPosition === -1) {
            letterColour = "#bab1ca";
        } else if (currentGuess[i] === arrayCorrectWord[i]) {
            letterColour = "#51693d";
        } else {
            letterColour = "#f0f0d3";
        }
        box.style.backgroundColor = letterColour;
    }

    if (guessString == wordToBeGuessed) {
        console.log(
            successResponse(
                wordToBeGuessed,
                numberOfGuesses - guessesRemaining + 1
            )
        );
    }
    guessesRemaining = guessesRemaining - 1;
    nextLetter = 0;
    currentGuess = [];
}
