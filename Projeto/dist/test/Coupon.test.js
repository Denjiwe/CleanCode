"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Coupon_1 = __importDefault(require("../src/Coupon"));
test("Should create a valid coupon", () => {
    const coupon = new Coupon_1.default("VALE20", 20, new Date('2024-01-01'));
    const today = new Date('2023-01-01');
    const isValid = coupon.isValid(today);
    expect(isValid).toBeTruthy();
});
test("Should try create an expired coupon", () => {
    const coupon = new Coupon_1.default("VALE20", 20, new Date('2021-01-01'));
    const today = new Date('2022-01-01');
    const isExpired = coupon.isExpired(today);
    expect(isExpired).toBeTruthy();
});
