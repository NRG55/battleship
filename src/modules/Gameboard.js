import Ship from "./Ship.js";

export default class Gameboard {
    #boardSize = 10;

    constructor() {
        this.board = this.createBoard();
        this.missedAttacks = [];
        this.ships = [];
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
        return row >= 0 && col >= 0 && row < this.#boardSize && col < this.#boardSize; 
    };

    isInBounds(row, col, ship) {        
        let startNumber = col; 

        if (ship.direction === "vertical") {
            startNumber = row;       
        }; 

        return startNumber + ship.length <= this.#boardSize;
    };

    isEmptySquare(row, col) {
        return this.board[row][col] === null;
    };    

    getShipEdges(row, col, ship) {
        // horizontal
        const topRow = row - 1;
        const bottomRow = row + 1;
        const leftCol = col - 1;
        const rightCol = col + ship.length;

        let shipEdgesArray = [];
        
        for (let r = topRow; r <= bottomRow; r++) {
            for (let c = leftCol; c <= rightCol; c++) {
                if (!(r === row && c >= col && c < col + ship.length) &&
                this.isValidCoordinates(r, c)) {                   
                        shipEdgesArray.push([r, c]); 
                    };                                             
            };
        };      
      
        return shipEdgesArray;
    };

    placeShip([row, col], ship) {        
        if (!this.isValidCoordinates(row, col) || !this.isInBounds(row, col, ship)) {
            return;
        };             
      
        for (let i = 0; i < ship.length; i++) { 
            const rowCoord = ship.direction === 'horizontal' ? row : row + i;
            const colCoord = ship.direction === 'horizontal' ? col + i : col;

            if (!this.isEmptySquare(row, col + i)) {
                return;
            };           

            this.board[rowCoord][colCoord] = {ship}; 
            this.ships.push([rowCoord, colCoord]);
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