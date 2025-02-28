import Gameboard from "../modules/Gameboard.js";

describe('Gameboard', () => {
    const gameboard = new Gameboard();

    test('10 rows', () => {
        expect(gameboard.board.length).toBe(10);
    });

    test('10 columns', () => {
        expect(gameboard.board[0].length).toBe(10);
    });
})