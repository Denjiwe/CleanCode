"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SaveStockInput {
    constructor(idItem, operation, quantity) {
        this.idItem = idItem;
        this.operation = operation;
        this.quantity = quantity;
    }
}
exports.default = SaveStockInput;
