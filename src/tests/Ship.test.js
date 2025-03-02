import Ship from "../modules/Ship.js";

describe('Ship', () => {
    let ship = new Ship(1);     
    
    ship.hit();

    test('length', () => {
        expect(ship.length).toBe(1);
    });     

    test('add hit', () => {
        expect(ship.hits).toBe(1);
    });

    test('is sunk', () => {
        expect(ship.isSunk()).toBe(true);
    });

    test('rotate', () => {        
        expect(ship.direction).toBe('horizontal');

        ship.rotate();

        expect(ship.direction).toBe('vertical');

        ship.rotate();

        expect(ship.direction).toBe('horizontal');
    });
});