let currentPlayer = 'X'; // Initialize the current player


function handleCellClick(cell) {
    var move=0;
    // Check if the cell is already marked
    if (!cell.textContent.trim()) {
        // If not marked, set the text content to the current player
        cell.textContent = currentPlayer;
        if (currentPlayer === 'X') {
            cell.style.backgroundColor="red";
            
        }else {
            cell.style.backgroundColor="green"
        }
        // Switch to the next player
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

        
    }
    move +=1;

   
    checkWinner(currentPlayer, move);
 
}

function checkWinner(currentPlayer,move) {
    const gameStatus= 0;
    if (move ===9) {
        gameStatus =3;
    }

    for (let i= 0; i <3; i++) {

        const checkDown = array.from(document.getElementById('cell${i}'));

        if(checkDown.every(cell => cell.textContent=== currentPlayer)){
                if (currentPlayer === 'X') {
                    gameStatus = 1
                } else {
                    gameStatus = 2
                }

                
        }
        

    }
}

    
