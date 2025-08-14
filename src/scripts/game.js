// This file contains the JavaScript logic for the Tic Tac Toe game themed around tennis.

const board = document.querySelector('.game-board');
const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('restart');

let gameActive = true;
let currentPlayer = '🎾'; // Tennis ball emoji for Player 1
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(clickedCell, clickedCellIndex) {
    if (gameState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    checkForWinner();
}

function checkForWinner() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] === '' || gameState[b] === '' || gameState[c] === '') {
            continue;
        }
        if (gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.textContent = `Player ${currentPlayer} wins! 🎉`;
        gameActive = false;
        return;
    }

    if (!gameState.includes('')) {
        statusDisplay.textContent = 'It\'s a draw! 🤝';
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === '🎾' ? '🏸' : '🎾'; // Tennis ball and badminton shuttlecock
    statusDisplay.textContent = `It's ${currentPlayer}'s turn`;
}

function handleCellClickEvent() {
    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => handleCellClick(cell, index));
    });
}

function resetGame() {
    gameActive = true;
    currentPlayer = '🎾';
    gameState = ['', '', '', '', '', '', '', '', ''];
    statusDisplay.textContent = `It's ${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = '');
}

resetButton.addEventListener('click', resetGame);
handleCellClickEvent();