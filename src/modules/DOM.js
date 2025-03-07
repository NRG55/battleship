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
        
            cell.classList.add("shot");   
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