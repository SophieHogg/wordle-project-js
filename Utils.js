//For pure functions

export function selectWord(words) {
    const wordsLength = words.length;
    let number = Math.floor(Math.random() * wordsLength);
    return words[number];
}

export function failureResponse(wordToBeGuessed) {
    return `You failed to guess ${wordToBeGuessed} in 6 attempts.`;
}

export function successResponse(wordToBeGuessed, guessesTaken) {
    let attemptWord = "attempts";
    if (guessesTaken == 1) {
        attemptWord = "attempt";
    }
    return `Congratulations, you guessed ${wordToBeGuessed} in ${guessesTaken} ${attemptWord}!`;
}

export function initBoard(numberOfGuesses) {
    let board = document.getElementById("board");

    for (let i = 0; i < numberOfGuesses; i++) {
        let row = document.createElement("div");
        row.className = "board__letter-row";

        for (let j = 0; j < 5; j++) {
            let box = document.createElement("div");
            box.className = "board__letter-row--letter-box";
            row.appendChild(box);
        }

        board.appendChild(row);
    }
}

export function insertLetter(
    pressedKey,
    guessesRemaining,
    currentGuess,
    nextLetter
) {
    if (nextLetter === 5) {
        return;
    }
    pressedKey = pressedKey.toLowerCase();

    let row =
        document.getElementsByClassName("board__letter-row")[
            6 - guessesRemaining
        ];
    let box = row.children[nextLetter];
    box.textContent = pressedKey;
    currentGuess.push(pressedKey);
}

export function backspaceLetter(guessesRemaining, nextLetter, currentGuess) {
    let row =
        document.getElementsByClassName("board__letter-row")[
            6 - guessesRemaining
        ];
    let box = row.children[nextLetter - 1];
    box.textContent = "";
    currentGuess.pop();
}
