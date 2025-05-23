export default class DOM {  
    renderHeaderAndMain() {
        const body = document.querySelector("body");

        body.innerHTML = `
                <header><span>BATTLE</span><span>SHIP</span>
                    <button id="button-drag-and-drop" title="Home"><i class="fa fa-home"></i></button>
                </header> 
                <main></main>                         
                `
    };

    renderMainSections(player) {
        const main = document.querySelector("main");
        main.innerHTML = "";
        
        main.appendChild(this.renderShipsPortSection());
        main.appendChild(this.renderPlayerSection(player));
    };
    
    renderBoard(parentElement, boardSize = 10) {      
        parentElement.innerHTML = "";

        const markersCol = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];      

        for (let row = 0; row < boardSize; row++) {
            const rowDiv = document.createElement("div");

            rowDiv.classList.add("board-row");           

            for (let col = 0; col < boardSize; col++) {
                const square = document.createElement("button");

                if (row === 0) {
                    const markerCol = document.createElement("div");

                    markerCol.classList.add("marker-col", "marker");
                    markerCol.innerHTML = markersCol[col];

                    square.appendChild(markerCol);
                };
                
                if (col === 0) {
                    const markerRow = document.createElement("div");

                    markerRow.classList.add("marker-row", "marker");
                    markerRow.innerHTML = row + 1;

                    square.appendChild(markerRow);
                };
                
                if (parentElement.id === "human") {
                    square.classList.add("board-cell-nohover");
                } else {
                    square.classList.add("board-cell");
                };
                
                square.setAttribute("data-row", row);
                square.setAttribute("data-col", col); 
                square.title = `Board cell row ${row} column ${col}`;        
              
                rowDiv.appendChild(square);                           
            };

            parentElement.appendChild(rowDiv);
        };       
     
        parentElement.append(this.renderShipsOverlay(parentElement.id));
        parentElement.append(this.renderExtraShipsOverlay());
        parentElement.append(this.renderBoardOverlay(parentElement.id));                 
    };

    renderShipsOverlay(parentElementId) {
        const overlay = document.createElement("div");         

        overlay.id = `ships-overlay-${parentElementId}`;

        return overlay;        
    };
    
    renderExtraShipsOverlay() {
        const overlay = document.createElement("div");         

        overlay.id = `ships-overlay-extra`;

        return overlay;        
    };
    
    renderBoardOverlay(parentElementId) {
        const overlay = document.createElement("div");         

        overlay.id = `board-overlay-${parentElementId}`;

        // if (parentElementId === "computer") {
        //     overlay.classList.add("selected-board")
        // };

        return overlay;        
    };
  
    renderShips(parentElement, ships) {
        for (const ship of ships) {
            const cell =  parentElement.querySelector(`button[data-row='${ship.row}'][data-col='${ship.col}']`);
            
            // const shipDiv = document.createElement("div");
            // shipDiv.classList.add("ship-draggable", "ship-overlay-blue");
   
            cell.classList.add("ship");   
        };   
    };

    renderShots(parentElement, shots) {      
        for (const shot of shots) {
            const row = shot.split(',')[0];
            const col = shot.split(',')[1];
                  
            const cell =  parentElement.querySelector(`button[data-row='${row}'][data-col='${col}']`);           
                   
            cell.classList.add("cell-shot");   
        };       
    };

    renderHits(parentElement, hits) {
        for (const hit of hits) {
            const cell =  parentElement.querySelector(`button[data-row='${hit.row}'][data-col='${hit.col}']`); 
                   
            cell.classList.add("cell-hit");   
        };       
    };

    renderPlayerSection(player) {
        const section = document.createElement("section");
        section.classList.add("section-player");
        
        let boardtitle;

        if (player.type === "human") {
            boardtitle = "Your board";
        } else {
            boardtitle = "Opponent's board"
        };
       
        section.innerHTML = `                  
                        <div class="board-title-${player.type}">${boardtitle}</div>
                        <div id="${player.type}"></div>                                                                   
                    `
        return section;
    };

    renderNotification() {
        const notificationWrap = document.createElement("div");

        notificationWrap.classList.add("notification-wrap")

        notificationWrap.innerHTML = `
                    <div class="notification">                 
                        <p class="message"></p>
                        <button class="button-rematch">Rematch</button>
                    </div>
                       `
        return notificationWrap;    
    };

    renderShipsPortSection() {
        const section = document.createElement("section");
        section.classList.add("section-ships");               
        
        section.innerHTML = `                      
                            <div class="draggable-ships-container">
                                <div class="draggable-ships-instruction">
                                    Drag the ships to the board. Click on any ship on the board to rotate.
                                </div>                           
                                <div class="ships-port">                                                  
                                </div>
                            </div>                                                                        
                        `
        return section;
    };

    renderShipsPortLines() {
        const shipsPort = document.querySelector(".ships-port");
        let shipLength = 4;

        for (let i = 1; i <= 4; i++) {
            const shipsPortLine = document.createElement("div");
            shipsPortLine.classList.add("ships-port-line");
            shipsPortLine.setAttribute("data-number-of-ships", i);
            shipsPortLine.setAttribute("data-ships-length", shipLength); 
            shipsPortLine.id = "ships-port-line-" + i;

            shipsPort.appendChild(shipsPortLine);

            shipLength = shipLength - 1;
        };
    };

    renderShipsBoxes() {     
        const portLines = document.querySelectorAll(".ships-port-line");

        for (const portLine of portLines) {
            const numberOfShips = portLine.getAttribute("data-number-of-ships");
            const shipLength = portLine.getAttribute("data-ships-length");
        
            for (let i = 0; i < numberOfShips; i++) {
                const shipBox = document.createElement("div");

                shipBox.classList.add("ship-box", "ship-box-length-" + shipLength);
                shipBox.setAttribute("data-length", shipLength);
                
                portLine.appendChild(shipBox);
            }; 
        };
    };

    renderShipsDivs(player) {
        let shipId = 1;

        if (player) {
            player.gameboard.ships.forEach((shipObject) => { 
                if (!shipObject) return;        
                const { ship, row, col } = shipObject;

                const parentElement = document.querySelector(`button[data-row='${row}'][data-col='${col}']`);

                const shipDiv = this.renderShipDiv(shipId, ship.length, ship.direction); 
                shipDiv.classList.add('ship-draggable', 'ship-overlay', 'ship-overlay-blue');               
                
                parentElement.append(shipDiv);
                
                shipId++;  
              });

              return;
        };
         
        const shipsPortLines = document.querySelectorAll(".ships-port-line");      
      
        for (const portLine of shipsPortLines) {
            const shipBoxes = portLine.querySelectorAll(".ship-box");            

            for (const shipBox of shipBoxes) {             
                const shipLength = shipBox.getAttribute("data-length");

                const shipDiv = this.renderShipDiv(shipId, shipLength);
                shipDiv.classList.add("ship-draggable");                

                shipBox.appendChild(shipDiv);

                shipId++;                       
            };
        };             
    };

    renderShipDiv(shipId, shipLength, direction = "horizontal") {
        const shipDiv = document.createElement("div");    
        
        shipDiv.id = "ship-" + shipId;
        shipDiv.setAttribute("data-length", shipLength);
        shipDiv.setAttribute("data-direction", direction);
        shipDiv.draggable = true;      

        for (let i = 0; i < shipLength; i++ ) {
            const cell = document.createElement("div");
            
            cell.setAttribute("data-offset", i);
            cell.classList.add("ship-cell");            
            shipDiv.appendChild(cell);
        };
        
        return shipDiv;
    };

    renderPreGameButtons() {
        const sectionPlayer = document.querySelector(".section-player");

        const buttonsContainer = document.createElement("div");

        buttonsContainer.classList.add("pre-game-buttons-container");
        buttonsContainer.innerHTML = `
                                <div>
                                    <button id="button-randomize">Randomize</button>                                                                    
                                </div>  
                                <div>                                                                  
                                    <button id="button-start-game" data-ship-placement="random" disabled>Start Game</button>
                                </div>    
                                `
        sectionPlayer.appendChild(buttonsContainer);
    };
};