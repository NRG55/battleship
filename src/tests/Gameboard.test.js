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
    
    test('coordinates check', () => {
        expect(gameboard.isValidCoordinates(0, 9)).toBe(true);
        expect(gameboard.isValidCoordinates(9, 0)).toBe(true);
        expect(gameboard.isValidCoordinates(10, 3)).toBe(false);
        expect(gameboard.isValidCoordinates(1, -1)).toBe(false);       
    });

    test('ship in bounds', () => {
        ship.rotate();
        gameboard.placeShip([1, 1], ship); 
        
        expect(gameboard.isInBounds(8, 8, ship)).toBe(true);
        expect(gameboard.isInBounds(9, 0, ship)).toBe(false);        
    });

    test('square is empty', () => {        
        gameboard.placeShip([1, 1], ship); 
        
        expect(gameboard.isEmptySquare(1, 1)).toBe(false);
        expect(gameboard.isEmptySquare(1, 2)).toBe(false);
        expect(gameboard.isEmptySquare(1, 3)).toBe(true);        
    }); 

    test('ship placement horizontal', () => {        
        gameboard.placeShip([1, 1], ship); 
        
        expect(gameboard.board[1][1]).toEqual({'ship': ship});
        expect(gameboard.board[1][2]).toEqual({'ship': ship});
        expect(gameboard.board[2][1]).toBe(null); 
    }); 
    
    test('ship placement vertical', () => { 
        ship.rotate();       
        gameboard.placeShip([1, 1], ship);         
        
        expect(gameboard.board[1][1]).toEqual({'ship': ship});
        expect(gameboard.board[2][1]).toEqual({'ship': ship});
        expect(gameboard.board[1][2]).toBe(null); 
    });    

    test('receive an attack', () => {
        gameboard.placeShip([1, 1], ship);
        gameboard.receiveAttack([1, 1]);

        expect(ship.hits).toBe(1);
        expect(gameboard.board[1][1].ship).toHaveProperty('hits', 1);
    });    

    test('miss an attack: records the coordinates and mark the square', () => {
        gameboard.placeShip([1, 1], ship);
        gameboard.receiveAttack([2, 1]);

        expect(gameboard.missedAttacks[0]).toEqual([2, 1]);
        expect(gameboard.board[2][1]).toBe('Unavailable');
    }); 

    test('receive a ship edges coordinates', () => { 
        expect(gameboard.getShipEdges(0, 0, ship)).toEqual([[0, 2], [1, 0], [1, 1], [1, 2]]);
    });    
});