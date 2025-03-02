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

    checkCoordinates(row, col) {
        if (row < 0 || col < 0 || row >= this.#boardSize || col >= this.#boardSize) {
            throw new Error('Wrong coordinates: out of bounds');
        };

        return; 
    };

    checkShipInBounds(row, col, ship, direction = 'horizontal') {        
        let startNumber = col; 

        if (direction === "vertical") {
            startNumber = row;       
        }; 

        if (startNumber + ship.length > this.#boardSize) {
            throw new Error('A ship is out of bounds');
        }; 

        return;
    };

    isEmptySquare(row, col) {
        return this.board[row][col] === null;
    };

    placeShip([row, col], ship, direction = 'horizontal') {
        this.checkCoordinates(row, col);
        this.checkShipInBounds(row, col, ship, direction);        
        
        if (direction === 'vertical') {
            for (let i = 0; i < ship.length; i++) { 
                if (!this.isEmptySquare(row + i, col)) {
                    return;
                };

                this.board[row + i][col] = {ship}; 
            };

            return;
        }; 
        // direction is horizontal
        for (let i = 0; i < ship.length; i++) { 
            if (!this.isEmptySquare(row, col + i)) {
                return;
            };        

            this.board[row][col + i] = {ship}; 
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