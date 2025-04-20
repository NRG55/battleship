export default class DOM {  
    renderHeaderAndMain() {
        const body = document.querySelector("body");

        body.innerHTML = `
                <header><span>BATTLE</span><span>SHIP</span></header> 
                <main></main>                         
                `
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
              
                rowDiv.appendChild(square);                           
            };

            parentElement.appendChild(rowDiv);
        };       
     
        parentElement.append(this.renderShipsOverlay(parentElement.id));
        parentElement.append(this.renderExtraShipsOverlay());                
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
        let boardtitle;

        if (player.type === "human") {
            boardtitle = "Your board";
        } else {
            boardtitle = "Opponent's board"
        };

        document.querySelector("main")
            .innerHTML += `
                        <section>
                            <div class="board-title">${boardtitle}</div>
                            <div id="${player.type}"></div>
                        </section>                                                 
                        `
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
        document.querySelector("main")
            .innerHTML += `
                        <section>
                            <div class="draggable-ships-container">
                                <div class="draggable-ships-instruction">
                                    Drag the ships to the board. Click on any ship on the board to rotate.
                                </div>                           
                                <div class="ships-port">                                                  
                                </div>
                            </div>
                        </section>                                                 
                        `
    };

    renderShipsPortLines() {
        const shipsPortLines = document.querySelector(".ships-port");

        for (let i = 1; i <= 4; i++) {
            const shipsRow = document.createElement("div");
            shipsRow.classList.add("ships-port-line");
            shipsRow.id = "ships-port-line-" + i;

            shipsPortLines.appendChild(shipsRow);
        };
    };

    renderShipsBoxes() {
        const shipPortLineOne = document.getElementById("ships-port-line-1");
        const shipPortLineTwo= document.getElementById("ships-port-line-2");
        const shipPortLineThree = document.getElementById("ships-port-line-3");
        const shipPortLineFour = document.getElementById("ships-port-line-4");

        const shipsLengths = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];

        for (const shipLength of shipsLengths) {
            const shipBox = document.createElement("div");
            shipBox.classList.add("ship-box", "ship-box-length-" + shipLength);
            shipBox.setAttribute("data-length", shipLength)          

            if (shipLength === 4) {
                shipPortLineOne.appendChild(shipBox);             
            };

            if (shipLength === 3) {
                shipPortLineTwo.appendChild(shipBox);               
            };

            if (shipLength === 2) {
                shipPortLineThree.appendChild(shipBox);              
            };

            if (shipLength === 1) {
                shipPortLineFour.appendChild(shipBox);              
            };        
        };
    };

    renderShipsDivs() {
        const shipsPortLines = document.querySelectorAll(".ships-port-line");     
        let shipId = 1;
     
        for (const portLine of shipsPortLines) {
            const shipBoxes = portLine.querySelectorAll(".ship-box");            

            for (const shipBox of shipBoxes) {             
                const shipLength = shipBox.getAttribute("data-length");                
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
            };
        };             
    };

    renderPreGameButtons() {
        const main = document.querySelector("main");

        const buttonsContainer = document.createElement("div");

        buttonsContainer.classList.add("pre-game-buttons-container");
        buttonsContainer.innerHTML = `
                                <div>
                                    <button id="button-drag-and-drop">Drag & Drop</button>                                   
                                </div>  
                                <div> 
                                    <button id="button-randomize">Randomize</button>                             
                                    <button id="button-start-game" data-ship-placement="random" disabled>Start Game</button>
                                </div>    
                                `
        main.appendChild(buttonsContainer);
    };
};