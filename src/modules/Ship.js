export default class Ship {
    constructor(length) {
        this.id;
        this.length = length;
        this.hits = 0;
        this.sunk = false; 
        this.direction = 'horizontal';       
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

    rotate() {
        if (this.direction === 'horizontal') {
            this.direction = 'vertical';
          } else {
            this.direction = 'horizontal';
          };
    };
};