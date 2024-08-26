const game = (function () {
    let board = ['','','','','','','','','',];
    const playerX = {score: 0, moves: 0};
    const playerO = {score: 0, moves: 0};

    const whichTurn = () => {
        return (playerX.moves > playerO.moves) ? 'O' : 'X'; 
    };
    const startGame = () => {
        const fields = document.querySelectorAll('.field');
            fields.forEach((field) => {
            field.addEventListener('click', () => {
                let num = field.className.slice(-1);
                board[num-1] = whichTurn();
                field.textContent = board[num-1];
                if (field.textContent === 'X') {
                    playerX.moves++
                } else {
                    playerO.moves++
                };
                gameStatus();
            }, { once: true });
        });
    };
    const gameStatus = () => {
        const win = [
            [board[0],board[1],board[2]],
            [board[3],board[4],board[5]],
            [board[6],board[7],board[8]],
            [board[0],board[3],board[6]],
            [board[1],board[4],board[7]],
            [board[2],board[5],board[8]],
            [board[0],board[4],board[8]],
            [board[2],board[4],board[6]]];
        const display = document.querySelector('.display');
        for (item of win) {
            if (!item.includes('O') && !item.includes('')) {
                display.textContent = 'PLAYER 1 WINS!';
                break;                
            } else if (!item.includes('X') && !item.includes('')) {
                display.textContent = 'PLAYER 2 WINS!';
                break;                
            } else if (item.includes('X') && item.includes('O') && !board.includes('')) {
                display.textContent = `IT'S A TIE!`;            
            } else {
                display.textContent = 'GAME IN PROGRESS';
            };
        };
    };
    return {board, playerX, playerO, whichTurn, startGame, gameStatus};
})();
game.startGame();