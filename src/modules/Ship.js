export default class Ship {
    constructor(length) {
        this.length = length;
        this.hits = 0;
        this.sunk = false;        
    };   

    isSunk() {
        if (this.hits === this.length) {
            this.sunk = true;
        };

        return this.sunk;
    };

    hit() {
        if (this.hits < this.length) {
            this.hits++;           
        };        
    };
};