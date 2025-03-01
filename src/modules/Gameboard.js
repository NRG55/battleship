import Ship from "./Ship.js";

export default class Gameboard {
    #boardSize = 10;

    constructor() {
        this.board = this.createBoard();
        this.missedShots = [];
    };

    createBoard() {
        const board = [];

        for (let row = 0; row < this.#boardSize; row++) {
            board[row] = [];
            for (let col = 0; col < this.#boardSize; col++) {
                board[row][col] = null;
            };
        };

        return board;
    };

    placeShip([row, col], shipType = 2) {
        const ship = new Ship(shipType);

        for (let i = 0; i < ship.length; i++) {
            this.board[row][col + i] = ship; 
        };
    };

    receiveAttack([row, col]) {
        const square = this.board[row][col];

        if (square === null) {
            return this.missedShots.push([row, col]);
        };        
       
        const ship = square;

        ship.hit();
    };
};