import Ship from "./Ship.js";

export default class Gameboard {
    #boardSize = 10;

    constructor() {
        this.board = this.createBoard();
        this.missedAttacks = [];
        this.hits = [];
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
        //rows and columns a ship occupies depending on its direction
        const rowLength = ship.direction === 'horizontal' ? 1 : ship.length;
        const colLength = ship.direction === 'horizontal' ? ship.length : 1;     

        const topRow = row - 1;
        const bottomRow = row + rowLength;
        const leftCol = col - 1;
        const rightCol = col + colLength;

        let shipEdgesArray = [];
        
        for (let r = topRow; r <= bottomRow; r++) {
            for (let c = leftCol; c <= rightCol; c++) {
                if (!(r >= row && c >= col && r < row + rowLength && c < col + colLength) &&
                this.isValidCoordinates(r, c)) {                   
                        shipEdgesArray.push([r, c]); 
                    };                                             
            };
        };      
      
        return shipEdgesArray;
    };

    placeShip([row, col], ship) {        
        if (!this.isValidCoordinates(row, col) || !this.isInBounds(row, col, ship)) {
            return false;
        };             
      
        for (let i = 0; i < ship.length; i++) { 
            const rowCoord = ship.direction === 'horizontal' ? row : row + i;
            const colCoord = ship.direction === 'horizontal' ? col + i : col;

            if (!this.isEmptySquare(rowCoord, colCoord)) {
                return false;
            };
            
            const shipEdges = this.getShipEdges(row, col, ship);

            for (const [row, col] of shipEdges) {
                if (this.board[row][col] !== null) {
                    return false;
                };
            };

            this.board[rowCoord][colCoord] = {ship, hit: false}; 
            this.ships.push({ship, row: rowCoord, col: colCoord});
        }; 

        return true;                
    };

    receiveAttack(row, col) {      
        let square = this.board[row][col];

        if (square === null) {
            this.missedAttacks.push({row, col});
            // mark an empty square           
            this.board[row][col] = "Missed shot"; 

            return; 
        };       

        if (square.hit === true || square === "Missed shot") {
            return;
        };         

        square.ship.hit();
        this.hits.push({row, col});
        this.board[row][col].hit = true;      
        // square.ship.isSunk();
    };

    isAllShipsSunk() {
        return this.ships.every((element) => element.ship.isSunk());
    };
};