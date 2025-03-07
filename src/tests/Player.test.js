import Player from "../modules/Player.js";
import Gameboard from "../modules/Gameboard.js";

describe('Player', () => {
    describe('human', () => {
        let playerHuman; 

        beforeEach(() => {
            // by default player type property set to 'human' 
            playerHuman = new Player("human", new Gameboard());
        });

        test('property set to - human', () => {
            expect(playerHuman.type).toBe('human');
        });

        test('property gameboard', () => {
            expect(playerHuman.gameboard).toBeInstanceOf(Gameboard);
        });
    });

    describe('computer', () => {
        let playerComputer; 

        beforeEach(() => {
            playerComputer = new Player('computer', new Gameboard);
        });

        test('property set to - human', () => {
            expect(playerComputer.type).toBe('computer');
        });

        test('property gameboard', () => {
            expect(playerComputer.gameboard).toBeInstanceOf(Gameboard);
        });
    });    
});