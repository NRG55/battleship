import "./style.css"
import DOM from "./modules/DOM.js";
import Gameboard from "./modules/Gameboard.js";
import Ship from "./modules/Ship.js";

const dom = new DOM();
const body = document.querySelector("body");

dom.renderBoard(body);

const board = new Gameboard();
const ship = new Ship(4);
const ship2 = new Ship(3);

ship2.rotate();

board.placeShip([1, 1], ship );
board.placeShip([5, 4], ship2);

dom.renderShips(body, board.ships);

board.receiveAttack([3, 2]);
board.receiveAttack([6, 8]);
board.receiveAttack([9, 6]);

dom.renderShots(body, board.missedAttacks);
   
