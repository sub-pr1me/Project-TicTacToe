const obj = (function () {
    const body = document.querySelector('body');
    const display = document.querySelector('.display');
    const container = document.querySelector('.container');
    const fields = document.querySelector('.field');
    const btn = document.querySelector('button');
    let board = ['', '', '', '', '', '', '', '', ''];
    const playerX = {moves: 0};
    const playerO = {moves: 0};
    return { body, display, container, fields, btn, board, playerX, playerO};
})();

const func = (function () {

    const greeting = () => {
        obj.display.textContent = 'MAKE YOUR MOVE!'
    };

    const whosTurn = () => {
        return (obj.playerX.moves > obj.playerO.moves) ? 'O' : 'X'; 
    };

    const playerMove = () => {
        obj.container.addEventListener('click', (e) => {
            if (e.target.classList.contains('field')
                && e.target.textContent === ''
                && obj.display.textContent !== 'PLAYER 1 WINS!'
                && obj.display.textContent !== 'PLAYER 2 WINS!'
                && obj.display.textContent !== `IT'S A TIE!`) {
                let num = e.target.className.slice(-1);
                obj.board[num-1] = whosTurn();
                e.target.textContent = whosTurn();

                if (e.target.textContent === 'X') {
                    obj.playerX.moves++
                } else {
                    obj.playerO.moves++
                };
                // console.log(obj.board);
                obj.display.textContent = displayContent(gameStatus());
            };            
        });
    };

    const displayContent = (status) => {
        return status ? status : 'GAME IN PROGRESS';
    };

    const gameStatus = () => {
        let winCombos = [
        [obj.board[0], obj.board[1], obj.board[2]],
        [obj.board[3], obj.board[4], obj.board[5]],
        [obj.board[6], obj.board[7], obj.board[8]],
        [obj.board[0], obj.board[3], obj.board[6]],
        [obj.board[1], obj.board[4], obj.board[7]],
        [obj.board[2], obj.board[5], obj.board[8]],
        [obj.board[0], obj.board[4], obj.board[8]],
        [obj.board[2], obj.board[4], obj.board[6]]];        
        for (let i=0; i<winCombos.length; i++) {
            if (!winCombos[i].includes('O')
                && !winCombos[i].includes('')) {
                return 'PLAYER 1 WINS!';

            } else if (!winCombos[i].includes('X')
                && !winCombos[i].includes('')) {
                return 'PLAYER 2 WINS!';

            } else if (!obj.board.includes('') && i===winCombos.length) {
                return `IT'S A TIE!`;

            } else if (!obj.board.includes('X') 
                && !obj.board.includes('O')) {
                return 'MAKE YOUR MOVE!';
            };
        };
    };
    return { greeting, whosTurn, playerMove, gameStatus, displayContent,};
})();

func.greeting();
func.whosTurn();
func.playerMove();