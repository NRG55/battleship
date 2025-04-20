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
        this.dom.renderHeaderAndMain();         
        this.dom.renderShipsPortSection();
        this.dom.renderShipsPortLines();
        this.dom.renderShipsBoxes();
        this.dom.renderShipsDivs();       

        this.dom.renderPlayerSection(player); 

        const parentElement = document.querySelector(`#${player.type}`);
                
        this.dom.renderBoard(parentElement);     
        this.dom.renderPreGameButtons();      
        this.addListenersPreGameButtons(player);
        this.handleDragAndDrop(player);  
    };

    addBoardEventListeners(parentElement, player) {
        const cells = parentElement.querySelectorAll("[data-row][data-col]");
        
        if (player.type === "human") return;

        for (const cell of cells) { 
            if (cell.classList.contains("cell-shot") || cell.classList.contains("cell-hit")) {
                cell.classList.add("cell-disabled");
            };

            cell.onclick = () => {
                const row = cell.getAttribute("data-row");
                const col = cell.getAttribute("data-col");                               
                
                this.handleShot(row, col, player.gameboard);              
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
        
            this.addBoardEventListeners(parentElement, player);             
        };            
    }; 

    startGame() {
        for (const player of this.players) {
            this.dom.renderPlayerSection(player);           
        };
        
        this.updateBoards();        
        this.placeShipsRandomly(this.player2);       
        this.drawShipsOverlay(this.player2);

        const humanBoard = document.getElementById("human");
        
        humanBoard.classList.add("board-disabled");       
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
        if (playerBoard.receiveAttack(row, col)) {
            this.updateBoards();

            if (this.currentPlayer.type === "computer") {
                this.handleComputerTurn();
            };

            this.updateBoards();

            if (playerBoard.isAllShipsSunk()) {           
                return this.handleWin();
            }; 

            return;
        };         

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
        const humanBoard = document.getElementById("human");
        const computerBoard = document.getElementById("computer");

        humanBoard.classList.remove("board-disabled");
        computerBoard.classList.add("board-disabled");       
        
        setTimeout(() => { 
            const {row, col} = this.getRandomCoordinates();       

            this.handleShot(row, col, this.player1.gameboard); 
        }, 400);

         
        setTimeout(() => { 
            humanBoard.classList.add("board-disabled");
            computerBoard.classList.remove("board-disabled");            
        }, 800);      
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
            message.innerHTML = `Game over. You win.`
        };        
       
        rematchButton.addEventListener("click", () => {
            for (const player of this.players) {
                player.gameboard.clearBoard();
            };

            location.reload();            
        });           
    };   

    addListenersPreGameButtons(player) {
        const main = document.querySelector("main");
        const parentElement = document.querySelector(`#${player.type}`);
        const buttonRandomize = document.getElementById("button-randomize");
        const buttonDragAndDrop = document.getElementById("button-drag-and-drop");
        const buttonStartGame = document.getElementById("button-start-game");
        const shipsSection = document.querySelector(".ships-port")
      
        buttonRandomize.onclick = () => {
            player.gameboard.clearBoard();            
                
            this.dom.renderBoard(parentElement); 
            this.placeShipsRandomly(player);        
            this.drawShipsOverlay(player);
            
            shipsSection.innerHTML = "";
            this.createDraggableShips();

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

        buttonStartGame.onclick = (e) => {            
            const shipPlacement = e.target.getAttribute("data-ship-placement");
            
            main.innerHTML = "";

            if (shipPlacement === "manual") {            
                const ships = player.gameboard.ships;

                player.gameboard.clearBoard();
                player.gameboard.ships = ships;              
              
                for (const ship of ships) {                
                    player.gameboard.placeShip([ship.row, ship.col], ship.ship);                   
                };
              
                this.players.push(this.player2);
                this.startGame(); 

                return;
            }; 
            
            this.players.push(this.player2);                     
            this.startGame();           
        };
    };

    handleDragAndDrop(player) {
        const body = document.querySelector("body");        
        const cells = document.querySelectorAll("button[data-col][data-row]");
        const shipsDivs = document.querySelectorAll(".ship-draggable");    
             
        const tempPlayer = new Player("human", new Gameboard());
        let offset; // to get the first cell of the ship 
        let shipLength;
        let direction; 
        let shipId;           

        for (const shipDiv of shipsDivs) {
            const shipCells = shipDiv.childNodes;            
            
            shipDiv.addEventListener("dragstart", () => {               
                shipDiv.classList.remove("ship-overlay-blue");
            });
            
            shipDiv.addEventListener("drag", () => { 
                const shipData = player.gameboard.getPreviousShipData(shipDiv);               
               
                if (shipData) { 
                    let shipById = player.gameboard.getShipById(shipDiv.id) 
                                 
                    player.gameboard.removePreviousShip(shipById.ship, shipData[0], shipData[1]);
                    player.gameboard.clearShipEdges(shipData[3]);

                    for (const placedShip of player.gameboard.ships) {
                        if (placedShip.ship.id !== shipDiv.id) {
                            player.gameboard.markShipEdges(placedShip.ship.edges);
                        };                                           
                    };                   
                };
                
                shipId = shipDiv.id;         
                shipLength = Number(shipDiv.getAttribute("data-length"));
                direction = shipDiv.getAttribute("data-direction");
                shipDiv.classList.add("hidden");                                                         
            });            
           
            for (const shipCell of shipCells) {
                shipCell.addEventListener("mouseover", () => {             
                    offset = shipCell.getAttribute("data-offset");                     
                });
            };                    

            shipDiv.addEventListener("dragend", () => {                            
                const cellDivs = document.querySelectorAll(".ship-overlay-green");
                
                if (cellDivs.length === 0) {              
                    return shipDiv.classList.remove("hidden");                          
                };

                for (const cellDiv of cellDivs) {
                    cellDiv.classList.remove("ship-overlay-green");                                              
                };               
                // shipObject { ship: {}, row: number, col: number }
                const shipObject = tempPlayer.gameboard.ships[0];
                
                this.handleShipPlacement(player, shipObject);
                this.shipDivPlacement(shipDiv, shipObject);
                this.checkAllShipsPlaced(player);                
               
                shipDiv.classList.add("ship-overlay-blue");
                shipDiv.onclick = () => {
                    this.handleShipRotation(player, shipDiv, shipObject, direction);
                };                       
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

                let ship = new Ship(shipLength);                   
          
                ship.direction = direction;
                ship.id = shipId;

                tempPlayer.gameboard.ships.push({ ship: ship, row: startCoords[0], col: startCoords[1]});
               
                if (!player.gameboard.isDropPossible(ship, startCoords[0], startCoords[1])) {
                    return;
                };

                this.drawShipsOverlay(tempPlayer, false);                
              
                return tempPlayer;
            });         
        };

        body.addEventListener("dragenter", () => { 
            const cellDivs = document.querySelectorAll(".ship-overlay-green");

            for (const cellDiv of cellDivs) {
                cellDiv.classList.remove("ship-overlay-green");
            };
        });
    };   
    
    handleShipPlacement(player, shipObject) {
        if (player.gameboard.isShipExist(shipObject.ship)) {
            // shipData is [row, col, direction, array of ship edges]
            const shipData = player.gameboard.getPreviousShipData(shipObject.ship);                                    
          
            player.gameboard.removePreviousShip(shipObject.ship, shipData[0], shipData[1]);                  
            player.gameboard.clearShipEdges(shipData[3]);                    
            player.gameboard.removeShipFromArray(shipObject.ship);
             
            shipObject.ship.edges = player.gameboard.getShipEdges(shipObject.row, shipObject.col, shipObject.ship);
            player.gameboard.updateShipData(shipObject.ship, shipObject.row, shipObject.col, shipObject.ship.edges );                   
            
            player.gameboard.placeShip([shipObject.row, shipObject.col], shipObject.ship);                  
            player.gameboard.markShipEdges(shipObject.ship.edges);                
                            
        } else {                  
            player.gameboard.placeShip([shipObject.row, shipObject.col], shipObject.ship);
            shipObject.ship.edges = player.gameboard.getShipEdges(shipObject.row, shipObject.col, shipObject.ship);
            player.gameboard.markShipEdges(shipObject.ship.edges);              
        };

        for (const placedShip of  player.gameboard.ships) {
            player.gameboard.markShipEdges(placedShip.ship.edges);                    
        };
    };
    
    handleShipRotation(player, currentShipDiv, shipObject, direction) {
        direction = currentShipDiv.getAttribute("data-direction");                                        
        direction = direction === "horizontal" ? "vertical" : "horizontal";                   
        // shipData is [row, col, direction, array of ship edges]
        const shipData = player.gameboard.getPreviousShipData(shipObject.ship);
        
        if (!player.gameboard.isRotationPossible(shipObject.ship, direction, shipData[0], shipData[1])) {
            currentShipDiv.classList.add("ship-rotation-error");                          
                
            setTimeout(() => {
            currentShipDiv.classList.remove("ship-rotation-error");
            }, 400);
        
            return;
        };

        currentShipDiv.setAttribute("data-direction", direction);                    
        
        player.gameboard.removePreviousShip(shipObject.ship, shipData[0], shipData[1]);
        player.gameboard.clearShipEdges(shipData[3]); 
        player.gameboard.removeShipFromArray(shipObject.ship); 
        
        shipObject.ship.direction = direction;
        shipObject.ship.edges = player.gameboard.getShipEdges(shipObject.row, shipObject.col, shipObject.ship);
        
        player.gameboard.updateShipData(shipObject.ship, shipObject.row, shipObject.col, shipObject.ship.edges, shipObject.ship.direction);                    
        
        player.gameboard.placeShip([shipObject.row, shipObject.col], shipObject.ship);
        player.gameboard.markShipEdges(shipObject.ship.edges);                 

        for (const placedShip of  player.gameboard.ships) {
            player.gameboard.markShipEdges(placedShip.ship.edges);                    
        };
    };
    
    shipDivPlacement(shipDiv, shipObject) {
        const currentCell = document.querySelector(`[data-row="${shipObject.row}"][data-col="${shipObject.col}"]`);

        currentCell.appendChild(shipDiv);
        shipDiv.classList.remove("hidden");
    };

    checkAllShipsPlaced(player) {
        if (player.gameboard.ships.length === 10) {
            const buttonStartGame = document.getElementById("button-start-game");

            buttonStartGame.setAttribute("data-ship-placement", "manual");                
            buttonStartGame.disabled = false;                    
        };
    };
};