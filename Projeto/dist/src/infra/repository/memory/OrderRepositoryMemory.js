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
    count() {
        return Promise.resolve(this.orders.length);
    }
}
exports.default = OrderRepositoryMemory;
