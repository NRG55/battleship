import DOM from "./DOM.js";
import Gameboard from "./Gameboard.js";
import Player from "./Player.js";
import Ship from "./Ship.js";

export default class Game {
    constructor() {
        this.player1 = new Player("human", new Gameboard());
        this.player2 = new Player("computer", new Gameboard());       
        this.players = [this.player1];
        this.currentPlayer = this.player1;       
        this.dom = new DOM();       
      
        this.preGameSetup(this.player1);                  
    };

    preGameSetup(player) {         
        this.dom.renderShipsSection();
        this.createDraggableShips();

        this.dom.renderPlayerSection(player); 

        const parentElement = document.querySelector(`#${player.type}`);
                
        this.dom.renderBoard(parentElement);
        this.dom.renderPreGameButtons();      
        this.addListenersPreGameButtons(player);
        this.addDragAndDropListeners(player);  
    };

    createDraggableShips() { 
        const shipsRows = document.querySelector(".ships-rows");
        const shipsLengths = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
        let shipBoxId = 0;

        for (let i = 0; i < 4; i++) {
            const shipsRow = document.createElement("div");
            shipsRow.classList.add("ships-row");
            shipsRow.id = "ships-row-" + i;

            shipsRows.appendChild(shipsRow);
        };
       
        for (const shipLength of shipsLengths) {
            const shipBox = document.createElement("div");
            shipBox.classList.add("ship-box");    
            shipBox.id = "ship-box-" + shipBoxId++;
           
            const shipDiv = document.createElement("div");
            shipDiv.classList.add("ship-draggable");
            shipDiv.setAttribute("data-length", shipLength);
            shipDiv.setAttribute("data-direction", "horizontal");
            shipDiv.draggable = true;

            shipBox.appendChild(shipDiv)

            for (let i = 0; i < shipLength; i++ ) {
                const cell = document.createElement("div");
                
                cell.setAttribute("data-offset", i);
                cell.classList.add("ship-cell");            
                shipDiv.appendChild(cell);
            };           
            
            const shipRowOne = document.getElementById("ships-row-0");
            const shipRowTwo= document.getElementById("ships-row-1");
            const shipRowThree = document.getElementById("ships-row-2");
            const shipRowFour = document.getElementById("ships-row-3");

            if (shipLength === 4) {
                shipRowOne.appendChild(shipBox);
                shipBox.appendChild(shipDiv);
            };

            if (shipLength === 3) {
                shipRowTwo.appendChild(shipBox);
                shipBox.appendChild(shipDiv);
            };

            if (shipLength === 2) {
                shipRowThree.appendChild(shipBox);
                shipBox.appendChild(shipDiv);
            };

            if (shipLength === 1) {
                shipRowFour.appendChild(shipBox);
                shipBox.appendChild(shipDiv);
            };        
        };      
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
        this.placeShipsRandomly(this.player2);       
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
        console.log(player.gameboard.ships) 

        const parentElement = document.querySelector(`#${player.type}`); 

        this.dom.renderShips(parentElement, player.gameboard.ships);
    };

    drawShipsOverlay(player, random = true) {           
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

          if (player.type === "human" && random === true) {
            shipDiv.classList.add('ship-overlay-blue');
          };
          
          if (random === false) {
            if (left > 60) return;             
            shipDiv.classList.add('ship-overlay-green');
          };          

          if (ship.sunk) {
            shipDiv.classList.add('ship-overlay-red');
          }; 
          
          overlay.appendChild(shipDiv);
        });
    };

    handleShot(row, col, playerBoard) {      
        playerBoard.receiveAttack(row, col);         
      
        this.updateBoards();
     
        if (playerBoard.isAllShipsSunk()) {         
            
            return this.handleWin();
        };

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

    handleWin() {
        const body = document.querySelector("body");

        body.appendChild(this.dom.renderNotification());        

        const nonification = document.querySelector(".notification");      
        const rematchButton = document.querySelector(".button-rematch");
        const message = document.querySelector(".message"); 

        if (this.currentPlayer.type === "computer") {
            nonification.classList.add("notification-lose");
            message.innerHTML = "Game over. You lose."
        } else {
            nonification.classList.add("notification-win");
            message.innerHTML = `Game over. ${this.currentPlayer.type} win.`
        };        
       
        rematchButton.addEventListener("click", () => {      
        });           
    };   

    addListenersPreGameButtons(player) {
        const main = document.querySelector("main");
        const parentElement = document.querySelector(`#${player.type}`);
        const buttonRandomize = document.getElementById("button-randomize");
        const buttonDragAndDrop = document.getElementById("button-drag-and-drop");
        const buttonStartGame = document.getElementById("button-start-game");
        const shipsSection = document.querySelector(".ships-rows")
      
        buttonRandomize.onclick = () => {
            player.gameboard.clearBoard();            
                
            this.dom.renderBoard(parentElement); 
            this.placeShipsRandomly(player);        
            this.drawShipsOverlay(player);
            
            shipsSection.classList.add("disabled");
            buttonDragAndDrop.style.display = "block";    
            buttonStartGame.disabled = false;           
        };

        buttonDragAndDrop.onclick = () => {
            player.gameboard.clearBoard();            
                
            this.dom.renderBoard(parentElement);        
            
            shipsSection.classList.remove("disabled");
            buttonDragAndDrop.style.display = "none";    
            buttonStartGame.disabled = true;           
        };

        buttonStartGame.onclick = () => { 
            main.innerHTML = "";

            this.players.push(this.player2);
            this.startGame();           
        };
    };

    addDragAndDropListeners(player) {
        const body = document.querySelector("body");        
        const cells = document.querySelectorAll("div[data-col][data-row]");
        const ships = document.querySelectorAll(".ship-draggable");    
             
        let offset; // to get the first cell of the ship 
        let shipLength;
        
        for (const ship of ships) {
            const shipCells = ship.childNodes; 

            ship.addEventListener("drag", (e) => {           
                e.target.classList.add("transparent");
                shipLength = Number(ship.getAttribute("data-length"));              
            });            
           
            for (const cell of shipCells) {
                cell.addEventListener("mouseover", (e) => {             
                    offset = e.target.getAttribute("data-offset");                     
                });
            };       
           
            for (const cell of cells) { 
                cell.addEventListener("dragover", (e) => {                                               
                    const col = Number(e.target.getAttribute("data-col"));
                    const row = Number(e.target.getAttribute("data-row"));
                   
                    player.gameboard.ships = [];                             
                    const coordinates = [];
                    let colStart = col - offset;               
               
                    for (let i = 0; i < shipLength; i++) {
                        const newCol = colStart + i;
                        
                        if (newCol < 10 && row >= 0 && colStart >= 0) {
                            coordinates.push([row, newCol]);                                                                      
                        };                    
                    }; 

                    const startCoords = coordinates[0]; 
                           
                    let shipObgect = new Ship(shipLength);
                
                    if (startCoords === undefined) return;
                    player.gameboard.ships.push({ ship: shipObgect, row: startCoords[0], col: startCoords[1]});
                // console.log(player.gameboard.ships)
                    this.drawShipsOverlay(player, false);
                });
            };          

            ship.addEventListener("dragend", (e) => {            
                e.target.classList.remove("transparent");
            });
        };    

        body.addEventListener("dragenter", () => {            
            for (const cellDiv of document.querySelectorAll(".ship-overlay-green")) {
                cellDiv.classList.remove("ship-overlay-green");
            };
        });
    };    
};