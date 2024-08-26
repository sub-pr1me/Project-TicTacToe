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
        obj.display.textContent = `YOUR MOVE ${obj.playerX.name}!`
    };
    const whosTurn = () => {
        return (obj.playerX.moves > obj.playerO.moves) ? 'O' : 'X'; 
    };
    const gameFlow = () => {
        obj.playerX.name = prompt('ENTER THE NAME FOR PLAYER 1');
        obj.playerO.name = prompt('ENTER THE NAME FOR PLAYER 2');
        greeting();
        obj.container.addEventListener('click', (e) => {
            if (e.target.classList.contains('field')
                && e.target.textContent === ''
                && obj.display.textContent !== `${obj.playerX.name} WINS!`
                && obj.display.textContent !== `${obj.playerO.name} WINS!`
                && obj.display.textContent !== `IT'S A TIE!`) {
                let num = e.target.className.slice(-1);
                obj.board[num-1] = whosTurn();
                e.target.textContent = whosTurn();
                if (e.target.textContent === 'X') {
                    obj.playerX.moves++
                } else {
                    obj.playerO.moves++
                };
                obj.display.textContent = displayContent(gameStatus());
            };            
        });
    };
    const displayContent = (status) => {
        return status ? status : `YOUR MOVE ${obj['player' + `${whosTurn()}`].name}!`;
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
                return `${obj.playerX.name} WINS!`;
            } else if (!winCombos[i].includes('X')
                && !winCombos[i].includes('')) {
                newGameButton();
                return `${obj.playerO.name} WINS!`;
            } else if (!obj.board.includes('') && i===winCombos.length-1) {
                newGameButton();
                return `IT'S A TIE!`;
            } else if (!obj.board.includes('X') 
                && !obj.board.includes('O')) {
                return `YOUR MOVE ${obj.playerX.name}!`
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
        func.whosTurn();
        func.gameFlow();
    };
    return { whosTurn, gameFlow };
})();
func.whosTurn();
func.gameFlow();