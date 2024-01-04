let currentPlayer;
let board;
let gameActive;
let scores;

const boardElement = document.getElementById('board');
const scorecardElement = document.getElementById('scorecard');
const symbolSelectionElement = document.getElementById('symbol-selection');



function startGame(selectedSymbol) {
    currentPlayer = selectedSymbol;
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    scores = { 'X': 0, 'O': 0 };

    // Clear symbol selection
    symbolSelectionElement.style.display = 'none';

    // Create cells
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', handleCellClick);
        boardElement.appendChild(cell);
    }

    // Initial update of scorecard
    updateScorecard();

    // Create restart button
    const restartButton = document.createElement('button');
    restartButton.textContent = 'Restart Game';
    restartButton.classList.add('restart-button'); 
    restartButton.addEventListener('click', restartGame);
    document.body.appendChild(restartButton);

}


function handleCellClick(event) {
    const clickedIndex = event.target.dataset.index;

    if (board[clickedIndex] === '' && gameActive) {
        board[clickedIndex] = currentPlayer;
        event.target.textContent = currentPlayer;
        if (currentPlayer === 'X') {
            event.target.style.color = 'indigo';
            console.log(currentPlayer);
            

        } else {
            event.target.style.color = 'pink';
            console.log(currentPlayer);
        }

        if (checkWin() || checkDraw()) {
            endGame();
        } else {
            switchPlayer();
        }
    }
}

function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            document.querySelector(`[data-index="${a}"]`).style.color = 'white';
            document.querySelector(`[data-index="${b}"]`).style.color = 'white';
            document.querySelector(`[data-index="${c}"]`).style.color = 'white';

            scores[currentPlayer]++;
            updateScorecard();
            return true;
        }
    }

    return false;
}

function checkDraw() {
    if (board.every(cell => cell !== '')) {
        updateScorecard();
        return true;
    }

    return false;
}

function updateScorecard() {
    scorecardElement.textContent = `Player X: ${scores['X']} | Player O: ${scores['O']}`;
}

function endGame() {
    gameActive = false;
    setTimeout(() => {
        alert(checkDraw() ? 'It\'s a draw!' : `Player ${currentPlayer} wins!`);
        // resetGame();  // Don't reset the game immediately after alert
    }, 100);
}

function restartGame() {
    // Clear the board
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;

    // Remove existing cells
    boardElement.innerHTML = '';

    // Create new cells
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', handleCellClick);
        boardElement.appendChild(cell);
    }

    // Initial update of scorecard
    updateScorecard();
}


