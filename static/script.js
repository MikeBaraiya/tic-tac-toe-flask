async function makeMove(position) {
    try {
        const response = await fetch('/make_move', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ position: position })
        });
        
        const data = await response.json();
        
        if (data.status === 'invalid') {
            return;
        }
        
        // Update the board
        updateBoard(data.board);
        
        if (data.status === 'win') {
            document.getElementById('current-player').textContent = `${data.player} wins!`;
            highlightWinningCombination(data.board, data.player);
        } else if (data.status === 'draw') {
            document.getElementById('current-player').textContent = 'Draw!';
        } else {
            document.getElementById('current-player').textContent = `${data.player}'s turn`;
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function resetGame() {
    try {
        const response = await fetch('/reset', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        
        const data = await response.json();
        updateBoard(data.board);
        document.getElementById('current-player').textContent = `${data.player}'s turn`;
        document.querySelectorAll('.cell').forEach(cell => {
            cell.classList.remove('winning-cell');
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

function updateBoard(board) {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        cell.textContent = board[index];
    });
}

function highlightWinningCombination(board, player) {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];
    
    for (const combination of winningCombinations) {
        if (combination.every(index => board[index] === player)) {
            combination.forEach(index => {
                document.querySelector(`.cell[data-cell="${index}"]`).classList.add('winning-cell');
            });
            break;
        }
    }
}