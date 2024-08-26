const obj = (function () {
    const body = document.querySelector('body');
    const display = document.querySelector('.display');
    const container = document.querySelector('.container');
    const fields = document.querySelectorAll('.field');
    let board = ['', '', '', '', '', '', '', '', ''];
    const playerX = {moves: 0};
    const playerO = {moves: 0};
    return { body, display, container, fields, board, playerX, playerO};
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
                newGameButton();
                return 'PLAYER 1 WINS!';

            } else if (!winCombos[i].includes('X')
                && !winCombos[i].includes('')) {
                newGameButton();
                return 'PLAYER 2 WINS!';

            } else if (!obj.board.includes('') && i===winCombos.length-1) {
                newGameButton();
                return `IT'S A TIE!`;

            } else if (!obj.board.includes('X') 
                && !obj.board.includes('O')) {
                return 'MAKE YOUR MOVE!';
            };
        };
    };
    const newGameButton = () => {
        obj.body.appendChild(document.createElement('button'));
        const btn = document.querySelector('button');
        btn.textContent = 'NEW GAME';
        btn.addEventListener ('click', () => {
            startNewGame();            
        });
    };
    const startNewGame = () => {
        obj.playerX.moves = 0;
        obj.playerO.moves = 0;
        obj.display.textContent = '';
        obj.board = ['', '', '', '', '', '', '', '', ''];
        obj.fields.forEach((field) => {
            field.textContent = '';
        });
        const btn = document.querySelector('button');
        obj.body.removeChild(btn);
        func.greeting();
        func.whosTurn();
        func.playerMove();
    };
    return { greeting, whosTurn, playerMove, gameStatus, displayContent, newGameButton };
})();

func.greeting();
func.whosTurn();
func.playerMove();