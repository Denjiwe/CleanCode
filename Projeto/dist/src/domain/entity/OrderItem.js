"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OrderItem {
    constructor(idItem, price, quantity, item) {
        this.idItem = idItem;
        this.price = price;
        this.quantity = quantity;
        this.item = item;
    }
    getTotal() {
        return this.price * this.quantity;
    }
}
exports.default = OrderItem;
