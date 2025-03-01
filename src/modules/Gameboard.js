import Ship from "./Ship.js";

export default class Gameboard {
    #boardSize = 10;

    constructor() {
        this.board = this.createBoard();
        this.missedAttacks = [];
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

    placeShip([row, col], ship) { 
        for (let i = 0; i < ship.length; i++) {
            this.board[row][col + i] = ship; 
        };
    };

    receiveAttack([row, col]) {
        const target = this.board[row][col];

        if (target === null) {
            return this.missedAttacks.push([row, col]);
        };         

        target.hit();
    };
};