"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Cpf_1 = __importDefault(require("./Cpf"));
const OrderItem_1 = __importDefault(require("./OrderItem"));
const DefaultFreightCalculator_1 = __importDefault(require("./DefaultFreightCalculator"));
const OrderCode_1 = __importDefault(require("./OrderCode"));
class Order {
    constructor(cpf, date = new Date(), freightCalculator = new DefaultFreightCalculator_1.default(), sequence = 1) {
        this.date = date;
        this.freightCalculator = freightCalculator;
        this.sequence = sequence;
        this.cpf = new Cpf_1.default(cpf);
        this.orderItems = [];
        this.freight = 0;
        this.code = new OrderCode_1.default(date, sequence);
    }
    addItem(item, quantity) {
        this.freight += this.freightCalculator.calculate(item) * quantity;
        this.orderItems.push(new OrderItem_1.default(item.idItem, item.price, quantity, item));
    }
    addCoupon(coupon) {
        if (coupon.isExpired(this.date))
            return;
        this.coupon = coupon;
    }
    getFreight() {
        return this.freight;
    }
    getCode() {
        return this.code.value;
    }
    getCpf() {
        return this.cpf.value;
    }
    getOrderItems() {
        return this.orderItems;
    }
    getTotal() {
        let total = 0;
        for (const item of this.orderItems) {
            total += item.getTotal();
        }
        if (this.coupon)
            total -= this.coupon.calculateDiscount(total, this.date);
        total += this.getFreight();
        return total;
    }
}
exports.default = Order;
