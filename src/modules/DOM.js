export default class DOM {  
    renderBoard(parentElement, boardSize = 10) {
        parentElement.innerHTML = "";

        const markersCol = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];      

        for (let row = 0; row < boardSize; row++) {
            const rowDiv = document.createElement("div");

            rowDiv.classList.add("board-row");           

            for (let col = 0; col < boardSize; col++) {
                const square = document.createElement("div");

                // if (row === 0) {
                //     const markerCol = document.createElement("div");

                //     markerCol.classList.add("marker-col", "marker");
                //     markerCol.innerHTML = markersCol[col];

                //     square.appendChild(markerCol);
                // };
                
                // if (col === 0) {
                //     const markerRow = document.createElement("div");

                //     markerRow.classList.add("marker-row", "marker");
                //     markerRow.innerHTML = row + 1;

                //     square.appendChild(markerRow);
                // }; 

                square.classList.add("board-cell");
                square.setAttribute("data-row", row);
                square.setAttribute("data-col", col);         
              
                rowDiv.appendChild(square);                           
            };

            parentElement.appendChild(rowDiv);
        };       
     
        parentElement.append(this.renderShipsOverlay(parentElement.id));               
    };

    renderShipsOverlay(parentElementId) {
        const overlay = document.createElement("div");         

        overlay.id = `ships-overlay-${parentElementId}`;

        return overlay;        
    };    
  
    renderShips(parentElement, ships) {
        for (const ship of ships) {
            const cell =  parentElement.querySelector(`div[data-row='${ship.row}'][data-col='${ship.col}']`);              
        
            cell.classList.add("ship");   
        };   
    };

    renderShots(parentElement, shots) {      
        for (const shot of shots) {
            const row = shot.split(',')[0];
            const col = shot.split(',')[1];
                  
            const cell =  parentElement.querySelector(`div[data-row='${row}'][data-col='${col}']`);           
                   
            cell.classList.add("cell-shot");   
        };       
    };

    renderHits(parentElement, hits) {
        for (const hit of hits) {
            const cell =  parentElement.querySelector(`div[data-row='${hit.row}'][data-col='${hit.col}']`); 
                   
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

    renderShipsSection() {
        document.querySelector("main")
            .innerHTML += `
                        <section>
                            <div class="draggable-ships-container">
                                <div class="draggable-ships-instruction">
                                    Drag the ships to the board. Click on any ship on the board to rotate.
                                </div>                           
                                <div class="ships-rows">                                                  
                                </div>
                            </div>
                        </section>                                                 
                        `
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
                                    <button id="button-start-game" disabled>Start Game</button>
                                </div>    
                                `
        main.appendChild(buttonsContainer);
    };
};