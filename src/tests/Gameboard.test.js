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
        expect(gameboard.isValidCoordinates(0, 9)).toBeTruthy();
        expect(gameboard.isValidCoordinates(9, 0)).toBeTruthy();
        expect(() => gameboard.isValidCoordinates(10, 3)).toThrow("Wrong coordinates: out of bounds");   
        expect(() => gameboard.isValidCoordinates(1, -1)).toThrow("Wrong coordinates: out of bounds");
    });

    test('ship fits', () => {
        gameboard.placeShip([1, 1], ship); 
        
        expect(gameboard.isShipFits(0, 8, ship)).toBeTruthy(); 
        expect(() => gameboard.isShipFits(0, 9, ship)).toThrow("A ship is out of bounds");        
    });

    test('ship placement at given coordinates', () => {        
        gameboard.placeShip([1, 1], ship); 
        
        expect(gameboard.board[1][1]).toEqual({'ship': ship});
        expect(gameboard.board[1][2]).toEqual({'ship': ship});
        expect(gameboard.board[2][1]).toBe(null); 
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
    
    
});