"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GetOrdersOutput {
    constructor() {
        this.orders = [];
    }
    addOrder(code, total) {
        this.orders.push({ code, total });
    }
}
exports.default = GetOrdersOutput;
