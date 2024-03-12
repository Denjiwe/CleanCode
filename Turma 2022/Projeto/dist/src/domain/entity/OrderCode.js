"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OrderCode {
    constructor(date, sequence) {
        this.date = date;
        this.sequence = sequence;
        this.value = this.generateCode(date, sequence);
    }
    generateCode(date, sequence) {
        const year = date.getFullYear();
        return `${year}${sequence.toString().padStart(8, '0')}`;
    }
}
exports.default = OrderCode;
