import Ship from "../modules/Ship.js";

describe('Ship', () => {
    let ship = new Ship(1);

    test("ship length", () => {
        expect(ship.length).toBe(1);
    });
});