import Gameboard from "../modules/Gameboard.js";

describe('Gameboard', () => {
    const gameboard = new Gameboard();

    test('10 rows', () => {
        expect(gameboard.board.length).toBe(10);
    });

    test('10 columns', () => {
        expect(gameboard.board[0].length).toBe(10);
    });
    
    // places a ship object with a ship length property on the board 
    gameboard.placeShip(1, 1); // takes row, col coordinates

    test('place a ship', () => {
        expect(gameboard.board[1][1]).toHaveProperty('length');
        expect(gameboard.board[1][2]).toHaveProperty('length');
        expect(gameboard.board[2][1]).toBe(null); // by default each unoccupied square on the board is equal null
    });
})