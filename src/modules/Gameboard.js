import Ship from "./Ship.js";

export default class Gameboard {
    #boardSize = 10;

    constructor() {
        this.board = this.createBoard();      
        this.missedAttacks = new Set();
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
                if (this.board[row][col] !== null && this.board[row][col] !== 'X') {
                 
                    return false;
                };
            };

            this.board[rowCoord][colCoord] = {ship, shipStartRow: row, shipStartCol: col, hit: false};           
        };         

        this.ships.push({ship, row: row, col: col});

        return true;                
    };

    receiveAttack(row, col) {      
        let cell = this.board[row][col];

        if (cell === null) {
            this.missedAttacks.add(`${row},${col}`);
          
            // mark an empty square           
            this.board[row][col] = "Missed shot"; 

            return; 
        };       

        if (cell.hit === true || cell === "Missed shot") {
            return;
        };
        
        this.board[row][col].hit = true;
        this.hits.push({row, col});

        cell.ship.hit(); 

        if (cell.ship.isSunk()) {
            const cellEdges = this.getShipEdges(cell.shipStartRow, cell.shipStartCol, cell.ship);            

            for (const cell of cellEdges) {
                this.missedAttacks.add(`${cell[0]},${cell[1]}`);                         
            };            
        };
        
        return true;
    };

    isAllShipsSunk() {
        return this.ships.every((element) => element.ship.isSunk());
    };   

    isShipExist(ship) {       
        return this.ships.some((object) => object.ship.id === ship.id); 
    };

    getShipById(shipId) {
        const shipArray = this.ships.filter((el) => el.ship.id === shipId);
        return shipArray[0];
    };    

    updateShipData(ship, row, col, edges, direction) {      
        for (const object of this.ships) {           
            if (object.ship.id === ship.id) {              
                object.row = row;
                object.col = col;
                object.ship.edges = edges; 
                object.ship.direction = direction;           
            }; 
        };
    };

    getPreviousShipData(ship) {          
        for (const object of this.ships) {           
            if (object.ship.id === ship.id) {                          
               return [object.row, object.col, object.ship.direction, object.ship.edges]
            }; 
        };
    };

    removePreviousShip(ship, row, col) {               
        for (let i = 0; i < ship.length; i++) {
            const rowCoord = ship.direction === 'horizontal' ? row : row + i;
            const colCoord = ship.direction === 'horizontal' ? col + i : col;

            this.board[rowCoord][colCoord] = null;                      
        };
    };

    removeShipFromArray(ship) {     
        return this.ships = this.ships.filter((el) => el.ship.id !== ship.id)
    };

    isRotationPossible(ship, direction, row, col) {
        this.clearShipEdges(ship.edges);         
        
        if (ship.length === 2) {
            for (const placedShip of  this.ships) {               
                if (placedShip.ship.id !== ship.id) {
                    this.markShipEdges(placedShip.ship.edges); 
                };                   
            };
        };

        for (let i = 1; i < ship.length; i++) {
            const rowCoord = direction === 'horizontal' ? row : row + i;
            const colCoord = direction === 'horizontal' ? col + i : col;
            
            if (!this.isValidCoordinates(rowCoord, colCoord)) return false;

            if (this.board[rowCoord][colCoord] !== null) {
                this.markShipEdges(ship.edges);
                return false;
            };                        
        };

        return true;
    };

    isDropPossible(ship, row, col) {
        if (!this.isInBounds(row, col, ship)) return;       
    
        for (let i = 0; i < ship.length; i++) {
            const rowCoord = ship.direction === 'horizontal' ? row : row + i;
            const colCoord = ship.direction === 'horizontal' ? col + i : col; 

            if (this.board[rowCoord][colCoord] !== null) {
                return false;
            };                      
        };

        return true;
    };

    markShipEdges(shipEdgesArray) {
        for (const [row, col] of shipEdgesArray) {        
            this.board[row][col] = "X";
        };
    };

    clearShipEdges(shipEdgesArray) {
        for (const [row, col] of shipEdgesArray) {            
            this.board[row][col] = null;
        };
    };

    clearBoard() {
        this.board = this.createBoard(); 
        this.missedAttacks = new Set();
        this.hits = [];
        this.ships = [];
    };
};