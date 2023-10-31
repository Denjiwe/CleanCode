"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Cpf_1 = __importDefault(require("./Cpf"));
const OrderItem_1 = __importDefault(require("./OrderItem"));
class Order {
    constructor(cpf) {
        this.cpf = new Cpf_1.default(cpf);
        this.orderItems = [];
    }
    addItem(item, quantity) {
        this.orderItems.push(new OrderItem_1.default(item.idItem, item.price, quantity));
    }
    addCoupon(coupon) {
        this.coupon = coupon;
    }
    getTotal() {
        let total = 0;
        for (const item of this.orderItems) {
            total += item.getTotal();
        }
        if (this.coupon)
            total -= (total * this.coupon.percentage) / 100;
        if (total < 10)
            throw new Error("Order must have at least R$10");
        return total;
    }
}
exports.default = Order;
