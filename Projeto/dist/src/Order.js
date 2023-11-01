"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Cpf_1 = __importDefault(require("./Cpf"));
const OrderItem_1 = __importDefault(require("./OrderItem"));
const Shipping_1 = __importDefault(require("./Shipping"));
class Order {
    constructor(cpf) {
        this.cpf = new Cpf_1.default(cpf);
        this.orderItems = [];
    }
    addItem(item, quantity) {
        this.orderItems.push(new OrderItem_1.default(item.idItem, item.price, quantity, item));
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
        return total;
    }
    getTotalShipping() {
        let volume = 0;
        let density = 0;
        for (const orderItem of this.orderItems) {
            const item = orderItem.item;
            if (!item)
                continue;
            volume += item.getVolume(item.height, item.length, item.width);
            density += item.getDensity(item.weight, volume);
        }
        const shipping = new Shipping_1.default(1000, volume, density).getShipping();
        return shipping > 10 ? shipping : 10;
    }
}
exports.default = Order;
