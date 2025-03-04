export default class DOM {  
    renderBoard(parentElement, boardSize = 10) {
        parentElement.innerHTML = "";

        for (let row = 0; row < boardSize; row++) {
            const rowDiv = document.createElement("div");

            for (let col = 0; col < boardSize; col++) {
                const square = document.createElement("div");

                rowDiv.appendChild(square);
            };

            parentElement.appendChild(rowDiv);
        };
    };
};