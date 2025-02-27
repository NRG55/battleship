export default class Ship {
    #hits = 0;
    #sunk = false;

    constructor(length) {
        this.length = length;        
    };   

    isSunk() {
        if (this.#hits === this.length) {
            this.#sunk = true;
        };

        return this.#sunk;
    };

    hit() {
        if (this.#hits < this.length) {
            this.#hits++;           
        };

        return this.#hits;
    };
};