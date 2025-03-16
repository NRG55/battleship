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
        this.handleDragAndDrop(player);  
    };

    createDraggableShips() { 
        const shipsRows = document.querySelector(".ships-rows");
        const shipsLengths = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
        let shipId = 1;

        for (let i = 0; i < 4; i++) {
            const shipsRow = document.createElement("div");
            shipsRow.classList.add("ships-row");
            shipsRow.id = "ships-row-" + i;

            shipsRows.appendChild(shipsRow);
        };
       
        for (const shipLength of shipsLengths) {
            const shipBox = document.createElement("div");
            shipBox.classList.add("ship-box", "ship-box-" + shipLength);        
           
            const shipDiv = document.createElement("div");
            shipDiv.classList.add("ship-draggable");
            shipDiv.id = "ship-" + shipId++;
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
        let overlay = document.getElementById(`ships-overlay-${player.type}`);       
        
        if (random === false) {
            overlay = document.getElementById("ships-overlay-extra");
            overlay.innerHTML = ''; 
        };

        overlay.innerHTML = "";

        player.gameboard.ships.forEach((shipObject) => { 
          if (!shipObject) return;        
          const { ship, row, col } = shipObject;
          
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
            if (ship.direction === 'horizontal') {            
                if (left > 60 && ship.length === 4) return; 
                if (left > 70 && ship.length === 3) return;
                if (left > 80 && ship.length === 2) return; 
                if (left > 90 && ship.length === 1) return; 
            } else {
                if (top > 60 && ship.length === 4) return; 
                if (top > 70 && ship.length === 3) return;
                if (top > 80 && ship.length === 2) return; 
                if (top > 90 && ship.length === 1) return; 
            };
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
            main.innerHTML = "";
            
            player.gameboard.clearBoard();
            this.preGameSetup(player);                 
            
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

    handleDragAndDrop(player) {
        const body = document.querySelector("body");        
        const cells = document.querySelectorAll("div[data-col][data-row]");
        const ships = document.querySelectorAll(".ship-draggable");    
             
        const tempPlayer = new Player("human", new Gameboard());
        let offset; // to get the first cell of the ship 
        let shipLength;
        let direction; 
        let shipId;           

        for (const ship of ships) {
            const shipCells = ship.childNodes;
            let currentShip = null; 
            
            ship.addEventListener("drag", (e) => { 
                currentShip = e.target;                                  
                e.target.classList.add("hidden");
                shipId = currentShip.id;         
                shipLength = Number(ship.getAttribute("data-length"));
                direction =  ship.getAttribute("data-direction");                                         
            });            
           
            for (const shipCell of shipCells) {
                shipCell.addEventListener("mouseover", (e) => {             
                    offset = e.target.getAttribute("data-offset");                     
                });
            };       
           
            for (const cell of cells) {               
                cell.addEventListener("dragover", (e) => {
                    e.preventDefault();

                    if (e.target.classList.contains("ship-cell") || 
                        e.target.classList.contains("ship-draggable")) return;

                    const row = Number(e.target.getAttribute("data-row"));                                                                                 
                    const col = Number(e.target.getAttribute("data-col"));                              
                   
                    tempPlayer.gameboard.ships = [];                             
                    const coordinates = [];                    
                    const colStart = direction === 'horizontal' ? (col - offset) : col;
                   
                    if (colStart < 10 && colStart >= 0 && row >= 0 ) {
                        coordinates.push([row, colStart]);                                                                      
                    };               

                    const startCoords = coordinates[0];                 
                
                    if (startCoords === undefined) return;

                    let shipObgect = new Ship(shipLength);
              
                    shipObgect.direction = direction;
                    shipObgect.id = shipId;

                    tempPlayer.gameboard.ships.push({ ship: shipObgect, row: startCoords[0], col: startCoords[1]});
                   
                    this.drawShipsOverlay(tempPlayer, false);                
                  
                    return tempPlayer;
                });         
            };          

            ship.addEventListener("dragend", (e) => {                            
                const cellDivs = document.querySelectorAll(".ship-overlay-green");
                console.log(player.gameboard)  
                if (cellDivs.length === 0) {              
                    return e.target.classList.remove("hidden");                          
                };

                for (const cellDiv of cellDivs) {
                    cellDiv.classList.remove("ship-overlay-green");                                              
                };                    
                // object has ship, row and col properties
                let object = tempPlayer.gameboard.ships[0];             
             
                if (player.gameboard.isShipExist(object.ship)) {
                    const coords = player.gameboard.getPreviousShipCoordinates(object.ship);
                 
                    player.gameboard.removePreviousShip(object.ship, coords[0], coords[1]);                       
                    player.gameboard.updateShipCoordinates(object.ship, object.row, object.col);
                    player.gameboard.placeShip([object.row, object.col], object.ship);
                    console.log(player.gameboard)                  
                } else {                  
                    player.gameboard.placeShip([object.row, object.col], object.ship);                  
                };
         
                let currentCell = document.querySelector(`[data-row="${object.row}"][data-col="${object.col}"]`);

                currentCell.appendChild(currentShip);
                currentShip.classList.remove("hidden"); 
                
                currentShip.onclick = () => {
                    direction = currentShip.getAttribute("data-direction");                        
                    direction = direction === "horizontal" ? "vertical" : "horizontal";                                          
                    currentShip.setAttribute("data-direction", direction);          

                    object.ship.direction = direction;
                };                       
            });
        };     

        body.addEventListener("dragenter", () => { 
            const cellDivs = document.querySelectorAll(".ship-overlay-green");

            for (const cellDiv of cellDivs) {
                cellDiv.classList.remove("ship-overlay-green");
            };
        });
    };    
};