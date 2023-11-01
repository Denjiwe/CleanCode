"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Cpf_1 = __importDefault(require("./Cpf"));
const OrderItem_1 = __importDefault(require("./OrderItem"));
const Shipping_1 = __importDefault(require("./Shipping"));
class Order {
    constructor(cpf, date = new Date()) {
        this.date = date;
        this.cpf = new Cpf_1.default(cpf);
        this.orderItems = [];
    }
    addItem(item, quantity) {
        this.orderItems.push(new OrderItem_1.default(item.idItem, item.price, quantity, item));
    }
    addCoupon(coupon) {
        if (coupon.isExpired())
            return;
        this.coupon = coupon;
    }
    getTotal() {
        let total = 0;
        for (const item of this.orderItems) {
            total += item.getTotal();
        }
        if (this.coupon)
            total -= (total * this.coupon.percentage) / 100;
        return total;
    }
    getTotalShipping() {
        let shipping = 0;
        for (const orderItem of this.orderItems) {
            const item = orderItem.item;
            if (!item)
                continue;
            const volume = item.getVolume(item.height, item.length, item.width);
            const density = item.getDensity(item.weight, volume);
            shipping += new Shipping_1.default(1000, volume, density).getShipping();
        }
        return shipping;
    }
}
exports.default = Order;
