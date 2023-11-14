let player1 = 0;
let player2 = 6;
let player1W = 0;
let player2W = 0; 

function playGame(gameStatus) {
    resetBoard(); 
    document.getElementsByClassName('playgamepopup')[0].style.visibility = "hidden";
    document.getElementsByClassName('bigcontainer')[0].style.visibility = "visible";

    if (gameStatus === 1) {
        console.log("Player X wins");
        gameEnd(gameStatus);
    
    } else if (gameStatus === 2) {
        console.log("Player O wins");
        gameEnd(gameStatus);
        
    } else if (gameStatus === 3) {
        console.log("Tie");
        gameEnd(gameStatus);
    } else {
        return;
    }
}

function gameEnd(status) {
    if (status === 1) {
        if (player1 === 6) {
            newGame(player1W);
            return;
        }
        document.getElementById(`r${player1 + 1}`).style.backgroundColor = "green";
        player1 += 1;
        playAgain(player1);
    } else if (status === 2) {
        if (player2 === 12) {
            newGame(player2W);
            return;
        }
        document.getElementById(`p${player2 - 5}`).style.backgroundColor = "green";
        player2 += 1;
        playAgain(player2);
    } else {
        playAgain(99);
    }
}

let currentPlayer = 'X'; // Initialize the current player
let move = 0;

// Function to reset the board state
function resetBoard() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.backgroundColor = ''; // Reset cell background color
    });

    currentPlayer = currentPlayer === 'X' ? 'X' : 'O';
    document.getElementsByClassName('turnorder')[0].innerHTML = " First Turn " + currentPlayer;
    move = 0;
}

function handleCellClick(cell) {
    if (!cell.textContent.trim()) {
        cell.textContent = currentPlayer;
        if (currentPlayer === 'X') {
            cell.style.backgroundColor = "red";
        } else {
            cell.style.backgroundColor = "green";
        }

        checkWinner(currentPlayer, move += 1);

        if (move === 9) {
            playGame(3); // Tie
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            document.getElementsByClassName('turnorder')[0].innerHTML = "It's " + currentPlayer + "'s turn";

        }
    }
}

function playAgain(value) {
    let gameNum = 1;
    resetBoard(); // Call the resetBoard function

    document.getElementsByClassName('playgamepopup')[0].style.visibility = "visible";
    document.getElementsByClassName('bigcontainer')[0].style.visibility = "visible";
    
    if (value > 0 && value < 6) {
        document.getElementById('intro').innerHTML = "Player X Wins" ;
        player1W += 1;
        newGame(player1W);
    } else if (value > 6 && value < 12) {
        document.getElementById('intro').innerHTML = "Player O Wins" ;
        player2W += 1;
        newGame(player2W);
    } else {
        document.getElementById('intro').innerHTML = "It's a Tie";
    }

    document.getElementById('playgame').innerHTML = "Next Round";
}

function checkWinner(currentPlayer, move) {
    // Check Rows, Columns, and Diagonals
    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const condition of winningConditions) {
        const [a, b, c] = condition;
        const cells = [document.getElementById(`cell${a}`), document.getElementById(`cell${b}`), document.getElementById(`cell${c}`)];

        if (cells.every(cell => cell.textContent === currentPlayer)) {
            let status = currentPlayer === 'X' ? 1 : 2;
            playGame(status);
            return; 
        }
    }

    // Check for a tie after checking all conditions
    if (move === 9) {
        playGame(3); // Tie
    }
}

function newGame(wins) {
    if (wins === 5) {
        if (currentPlayer ==='O') {
            document.getElementById('intro').innerHTML = "Player 0 has won 5 games. Starting a new set of games.";
        } else { 
            document.getElementById('intro').innerHTML = "Player X has won 5 games. Starting a new set of games.";
        }
        
        player1W = 0;
        player2W = 0;
        player1 = 0;
        player2 = 6;

        for ( let i = 1 ; i <=5; i++) {
            document.getElementById(`r${i}`).style.backgroundColor = "#868889";
            document.getElementById(`p${i}`).style.backgroundColor = "#868889";
        }
    }
    document.getElementById('playgame').innerHTML = "New Game";

}
