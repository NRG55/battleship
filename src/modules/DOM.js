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
        ships.forEach((ship) => {
            const cell =  parentElement.querySelector(`div[data-row='${ship.rowCoord}'][data-col='${ship.colCoord}']`);              
        
            cell.classList.add("ship");       
        });        
    };
};