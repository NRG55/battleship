import DOM from "./DOM.js";
import Gameboard from "./Gameboard.js";
import Player from "./Player.js";
import Ship from "./Ship.js";

export default class Game {
    constructor() {
        this.player1 = new Player("human", new Gameboard());
        this.player2 = new Player("computer", new Gameboard());       
        this.players = [this.player1, this.player2];
        this.currentPlayer = this.player1;       
        this.dom = new DOM();       
        
        this.startGame(); 
                  
    };

    addBoardEventListeners(parentElement, playerBoard) {
        const cells = parentElement.querySelectorAll("[data-row][data-col]");
       
        for (const cell of cells) {           
            cell.onclick = () => {
                const row = cell.getAttribute("data-row");
                const col = cell.getAttribute("data-col");               
                
                this.handleShot(row, col, playerBoard);                               
            };            
        };       
    };
   
    updateBoards() {       
        for (const player of this.players) { 
            const parentElement = document.querySelector(`#${player.type}`); 
                
            this.dom.renderBoard(parentElement);            
            this.dom.renderShips(parentElement, player.gameboard.ships);
            this.drawShipsOverlay(player);
            this.dom.renderShots(parentElement, player.gameboard.missedAttacks);
            this.dom.renderHits(parentElement, player.gameboard.hits);        
        
            this.addBoardEventListeners(parentElement, player.gameboard);          
        };            
    }; 

    startGame() {
        for (const player of this.players) {
            this.dom.renderPlayerSection(player);           
        };
        
        this.updateBoards();
        this.placeShipsRandomly(this.player1); 
        this.placeShipsRandomly(this.player2);
        this.drawShipsOverlay(this.player1); 
        this.drawShipsOverlay(this.player2);       
    };

    placeShipsRandomly(player) {                
        const shipsLengths = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
       
        for (const length of shipsLengths) {           
            const ship = new Ship(length);

            if (Math.random() < 0.5) {
                ship.rotate();
            };

            let isInBounds = false;

            while(!isInBounds) {
                const row = Math.floor(Math.random() * 10);
                const col = Math.floor(Math.random() * 10);

                isInBounds = player.gameboard.placeShip([row, col], ship);             
            };
        };

        const parentElement = document.querySelector(`#${player.type}`); 

        this.dom.renderShips(parentElement, player.gameboard.ships);
    };

    drawShipsOverlay(player) {           
        const overlay = document.getElementById(`ships-overlay-${player.type}`);      
       
        overlay.innerHTML = '';            
        
        player.gameboard.ships.forEach((shipObject) => {          
          const {  ship, row, col } = shipObject;
          
          const shipDiv = document.createElement('div');         
          // calculates a start points in percents for a ship div placement
          const cellSize = 10; // board 10 x 10, each cell is 10%
          const top = row * cellSize;
          const left = col * cellSize;

          let width;
          let height;
          // calculates size of the ship div
          if (ship.direction === 'horizontal') {            
            width = ship.length * cellSize;            
            height = cellSize;
          } else {           
            width = cellSize;          
            height = ship.length * cellSize;
          };          

          shipDiv.style.top = `${top}%`;
          shipDiv.style.left = `${left}%`;
          shipDiv.style.width = `${width}%`;
          shipDiv.style.height = `${height}%`;           

          shipDiv.classList.add('ship-overlay');

          if (player.type === "human") {
            shipDiv.classList.add('ship-overlay-color');
          }; 

          if (ship.sunk) {
            shipDiv.classList.add('ship-overlay-sunk');
          }; 
          
          overlay.appendChild(shipDiv);
        });
    };

    handleShot(row, col, playerBoard) {      
        playerBoard.receiveAttack(row, col);
        
        this.updateBoards();
        this.switchPlayer();          
    };

    switchPlayer() {
        this.currentPlayer = this.currentPlayer === this.player1 ? this.player2 : this.player1;
   
        if (this.currentPlayer === this.player2) {         
            this.handleComputerTurn();
        };
    };

    handleComputerTurn() { 
        const {row, col} = this.getRandomCoordinates();

        this.handleShot(row, col, this.player1.gameboard);           
    };

    getRandomCoordinates() {
        let row = Math.floor(Math.random() * 10);
        let col = Math.floor(Math.random() * 10);
        
        while (this.player1.gameboard.missedAttacks.has(`${row},${col}`)) {
          row = Math.floor(Math.random() * 10);
          col = Math.floor(Math.random() * 10);
        };
    
        this.player1.gameboard.missedAttacks.add(`${row},${col}`);
     
        return { row, col };
    };
};