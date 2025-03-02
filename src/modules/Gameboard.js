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

    isValidCoordinates(row, col) {
        if (row < 0 || col < 0 || row >= this.#boardSize || col >= this.#boardSize) {
            throw new Error('Wrong coordinates: out of bounds');
        };

        return true; 
    };

    isShipFits(row, col, ship) {
        if (row + ship.length > this.#boardSize || col + ship.length > this.#boardSize) {
            throw new Error('A ship is out of bounds');
        };

        return true;
    };

    placeShip([row, col], ship) {
        if (this.isValidCoordinates(row, col)) {
            for (let i = 0; i < ship.length; i++) {
                this.board[row][col + i] = {ship}; 
            };
        };         
    };

    receiveAttack([row, col]) {
        let square = this.board[row][col];      

        if (square === null) {
            this.missedAttacks.push([row, col]);
            // mark an empty square           
            this.board[row][col] = "Unavailable"; 

            return; 
        };

        square.ship.hit();
    };
};