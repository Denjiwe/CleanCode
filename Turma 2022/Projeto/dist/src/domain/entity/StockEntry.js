"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StockEntry {
    constructor(idItem, operation, quantity, date) {
        this.idItem = idItem;
        this.operation = operation;
        this.quantity = quantity;
        this.date = date;
    }
}
exports.default = StockEntry;
