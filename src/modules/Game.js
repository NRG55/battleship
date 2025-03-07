import DOM from "./DOM.js";
import Gameboard from "./Gameboard.js";
import Player from "./Player.js";
import Ship from "./Ship.js";

export default class Game {
    constructor() {
        this.player1 = new Player("human", new Gameboard());
        this.player2 = new Player("computer", new Gameboard());       
        this.players = [this.player1, this.player2];
        this.dom = new DOM();       
        
        this.startGame();
        this.updateBoard(); 
        this.placeShipsRandomly(this.player2);             
    };

    addBoardEventListeners(parentElement, playerBoard) {
        const cells = parentElement.querySelectorAll("[data-row][data-col]");
       
        for (const cell of cells) {           
            cell.onclick = () => {
                const row = cell.getAttribute("data-row");
                const col = cell.getAttribute("data-col");               
                
                this.handleShot(row, col, playerBoard);
                console.log(playerBoard.missedAttacks); 

                this.updateBoard(playerBoard);                 
            };            
        };       
    };

    handleShot(row, col, playerBoard) {
        playerBoard.receiveAttack(row, col);          
    };

    updateBoard() {       
        for (const player of this.players) { 
            const parentElement = document.querySelector(`#${player.type}`); 
                
            this.dom.renderBoard(parentElement);           
           
            // this.dom.renderShips(parentElement, player.gameboard.ships);
            this.dom.renderShots(parentElement, player.gameboard.missedAttacks);
            this.dom.renderHits(parentElement, player.gameboard.hits);        
        
            this.addBoardEventListeners(parentElement, player.gameboard);          
        };       
    }; 

    startGame() {
        for (const player of this.players) {
            this.dom.renderPlayerSection(player);           
        };       
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

        // this.dom.renderShips(parentElement, player.gameboard.ships);
    };
};