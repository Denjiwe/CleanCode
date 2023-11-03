"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OrderRepositoryMemory {
    constructor() {
        this.orders = [];
        this.orders = [];
    }
    save(order) {
        this.orders.push(order);
        return Promise.resolve();
    }
}
exports.default = OrderRepositoryMemory;
