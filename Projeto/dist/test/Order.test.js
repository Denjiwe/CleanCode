"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Order_1 = __importDefault(require("../src/Order"));
const Item_1 = __importDefault(require("../src/Item"));
const Coupon_1 = __importDefault(require("../src/Coupon"));
test("Should create an empty order with a valid CPF", function () {
    let cpf = "839.435.452-10";
    const order = new Order_1.default(cpf);
    const total = order.getTotal();
    expect(total).toBe(0);
});
test("Should attempt to create an empty order with an invalid CPF", function () {
    let cpf = "111.111.111-11";
    expect(() => new Order_1.default(cpf)).toThrow(new Error("Invalid CPF"));
});
test("Should create an order with 3 items", function () {
    let cpf = "839.435.452-10";
    const order = new Order_1.default(cpf);
    order.addItem(new Item_1.default(1, "Música", "Guitarra", 30, 50, 30, 10, 0.3), 3);
    order.addItem(new Item_1.default(1, "Vídeo", "DVD", 50, 20, 20, 3, 0.1), 1);
    order.addItem(new Item_1.default(1, "Vídeo", "VHS", 10, 20, 20, 3, 0.1), 2);
    const total = order.getTotal();
    expect(total).toBe(160);
});
test("Should create an order with 3 items and a discount ticket", function () {
    let cpf = "839.435.452-10";
    const order = new Order_1.default(cpf);
    order.addItem(new Item_1.default(1, "Música", "Guitarra", 30, 50, 30, 10, 0.3), 3);
    order.addItem(new Item_1.default(1, "Vídeo", "DVD", 50, 20, 20, 3, 0.1), 1);
    order.addItem(new Item_1.default(1, "Vídeo", "VHS", 10, 20, 20, 3, 0.1), 2);
    order.addCoupon(new Coupon_1.default("VALE20", 20, new Date('2024-01-01')));
    const total = order.getTotal();
    expect(total).toBe(128);
});
test("Should try to create an order with an expired discount ticket", function () {
    let cpf = "839.435.452-10";
    const order = new Order_1.default(cpf);
    order.addItem(new Item_1.default(1, "Música", "Guitarra", 30, 50, 30, 10, 0.3), 3);
    expect(() => order.addCoupon(new Coupon_1.default("VALE20", 20, new Date('2022-01-01')))).toThrow(new Error("Coupon expired"));
});
test("Should try to create an order with shipping", function () {
    let cpf = "839.435.452-10";
    const order = new Order_1.default(cpf);
    order.addItem(new Item_1.default(1, "Música", "Guitarra", 30, 50, 30, 10, 0.3), 3);
    expect(order.getTotalShipping()).toBe(10);
});
