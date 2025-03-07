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
    };

    addBoardEventListeners(parentElement, playerBoard) {
        const cells = parentElement.querySelectorAll("[data-row][data-col]");
       
        for (const cell of cells) {           
            cell.onclick = () => {
                const row = cell.getAttribute("data-row");
                const col = cell.getAttribute("data-col");               
                
                this.handleShot(row, col, playerBoard);
                console.log(this.player1.gameboard.missedAttacks); 

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
                        
            if (player.type === "computer") {
                const ship = new Ship(4);
                const ship2 = new Ship(3);

                ship2.rotate();

                player.gameboard.placeShip([1, 1], ship);
                player.gameboard.placeShip([5, 4], ship2);
            }; 
           
            this.dom.renderShips(parentElement, player.gameboard.ships);
            this.dom.renderShots(parentElement, player.gameboard.missedAttacks);        
        
            this.addBoardEventListeners(parentElement, player.gameboard);          
        };       
    }; 

    startGame() {
        for (const player of this.players) {
            this.dom.renderPlayerSection(player);
        };       
    };
};