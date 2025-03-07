import DOM from "./DOM.js";
import Player from "./Player.js";
import Ship from "./Ship.js";

export default class Game {
    constructor() {
        this.player = new Player();
        this.dom = new DOM();

        const tempParentElement = document.querySelector("body");

        this.testTempUpdateBoard(this.player.gameboard);
        this.addBoardEventListeners(tempParentElement, this.player.gameboard)
    };

    addBoardEventListeners(parentElement, playerBoard) {
        const cells = parentElement.querySelectorAll("[data-row][data-col]");
       
        for (const cell of cells) {           
            cell.onclick = () => {
                const row = cell.getAttribute("data-row");
                const col = cell.getAttribute("data-col");               
                
                this.handleShot(row, col, playerBoard);
                console.log(this.player.gameboard.missedAttacks); 

                this.updateBoard(playerBoard);                 
            };            
        };       
    };

    handleShot(row, col, playerBoard) {
        playerBoard.receiveAttack(row, col);          
    };

    updateBoard(playerBoard) {         
      this.testTempUpdateBoard(playerBoard);       
    };

    testTempUpdateBoard(playerBoard) {        
        const body = document.querySelector("body");       

        const ship = new Ship(4);
        const ship2 = new Ship(3);

        ship2.rotate();        

        playerBoard.placeShip([1, 1], ship);
        playerBoard.placeShip([5, 4], ship2);

        this.dom.renderBoard(body);
        this.dom.renderShips(body, playerBoard.ships);
        this.dom.renderShots(body, playerBoard.missedAttacks);        
      
        this.addBoardEventListeners(body, playerBoard);               
    };
};