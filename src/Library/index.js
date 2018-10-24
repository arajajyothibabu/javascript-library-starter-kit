/**
 * Library interface
 */
export default class Library {

    constructor(){
        this.counter = 0;
    }

    increment = (by = 1) => {
        this.counter += by;
    };

    decrement = (by = 1) => {
        this.counter -= by;
    };

}