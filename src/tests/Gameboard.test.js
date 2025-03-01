import Gameboard from "../modules/Gameboard.js";
import Ship from "../modules/Ship.js";

describe('Gameboard', () => {
    let gameboard;
    let ship;
    
    beforeEach(() => {
        gameboard = new Gameboard();
        ship = new Ship(2);
    });

    test('initialization 10 x 10 array', () => {
        expect(gameboard.board).toBeDefined();
        expect(gameboard.board.length).toBe(10);
        gameboard.board.forEach((row) => {
            expect(row.length).toBe(10);
            row.forEach((col) => {
                expect(col).toBe(null);
            });
        });
    });     

    test('place a ship', () => {
         // places a ship object with a ship length property on the board 
        gameboard.placeShip([1, 1], ship); // takes row, col coordinates

        expect(gameboard.board[1][1]).toHaveProperty('length');
        expect(gameboard.board[1][2]).toHaveProperty('length');
        expect(gameboard.board[2][1]).toBe(null); // by default each unoccupied square on the board is equal to null
    });    

    test('receive an attack', () => {
        gameboard.placeShip([1, 1], ship);
        gameboard.receiveAttack([1, 1]);

        expect(gameboard.board[1][1]).toHaveProperty('hits', 1);
    });    

    test('miss an attack', () => {
        gameboard.placeShip([1, 1], ship);
        gameboard.receiveAttack([2, 1]);

        expect(gameboard.missedAttacks[0]).toEqual([2, 1]);
    });
})