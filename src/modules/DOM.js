export default class DOM {  
    renderBoard(parentElement, boardSize = 10) {
        parentElement.innerHTML = "";

        for (let row = 0; row < boardSize; row++) {
            const rowDiv = document.createElement("div");

            rowDiv.classList.add("board-row");

            for (let col = 0; col < boardSize; col++) {
                const square = document.createElement("div");

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
            const cell =  parentElement.querySelector(`div[data-row='${shot.row}'][data-col='${shot.col}']`); 
                   
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
        document.querySelector("main").innerHTML += `
                                                <section>
                                                    <p class="player1-name">${player.type}</p>
                                                    <div id="${player.type}"></div>
                                                </section>                                                 
                                                `
    };
};