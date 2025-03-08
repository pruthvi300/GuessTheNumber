let randomNumber = Math.floor(Math.random() * 100) + 1;

const submit = document.getElementById('subt');
const userInput = document.getElementById('guessField');
const guessSlot = document.querySelector('.guesses');
const guessRemaining = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const form = document.querySelector('.form');
const startover = document.querySelector('.resultParas');

const p = document.createElement('p');

let prevGuesses = [];
let numGuess = 1;
let playGame = true;

if (playGame) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const guess = parseInt(userInput.value);
        validateGuess(guess);
    });
}

function validateGuess(guess) {
    if (isNaN(guess) || guess < 1 || guess > 100) {
        alert('Please enter a valid number between 1 and 100');
    } else {
        prevGuesses.push(guess);
        displayGuess(guess);
        checkGuess(guess);
    }
}

function checkGuess(guess) {
    if (guess === randomNumber) {
        displayMessage('🎉 You guessed it right! 🎉');
        endGame();
    } else if (numGuess === 10) {
        displayMessage(`Game Over! The correct number was ${randomNumber}`);
        endGame();
    } else if (guess < randomNumber) {
        displayMessage('⬆ Number is Too Low');
    } else {
        displayMessage('⬇ Number is Too High');
    }
}

function displayGuess(guess) {
    userInput.value = '';
    guessSlot.innerHTML += `${guess}, `;
    numGuess++;
    guessRemaining.innerHTML = `${11 - numGuess}`;
}

function displayMessage(message) {
    lowOrHi.innerHTML = `<h2>${message}</h2>`;
}

function endGame() {
    userInput.value = '';
    userInput.setAttribute('disabled', 'true');
    
    p.classList.add('button');
    p.innerHTML = `<h2 id="newGame">Start New Game</h2>`;
    
    startover.appendChild(p);
    playGame = false;

    newGame();
}

function newGame() {
    const newGameButton = document.getElementById('newGame');
    newGameButton.addEventListener('click', function () {
        randomNumber = Math.floor(Math.random() * 100) + 1;
        prevGuesses = [];
        numGuess = 1;
        guessSlot.innerHTML = '';
        guessRemaining.innerHTML = '10';
        lowOrHi.innerHTML = '';

        userInput.removeAttribute('disabled');
        startover.removeChild(p);
        playGame = true;
    });
}
