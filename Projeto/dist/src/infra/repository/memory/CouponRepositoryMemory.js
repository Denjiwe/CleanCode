"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Coupon_1 = __importDefault(require("../../../domain/entity/Coupon"));
class CouponRepositoryMemory {
    constructor() {
        this.coupons = [
            new Coupon_1.default("VALE20", 20, new Date()),
            new Coupon_1.default("VALE50", 50, new Date()),
            new Coupon_1.default("VALE100", 100, new Date())
        ];
    }
    findByCode(code) {
        return Promise.resolve(this.coupons.find(coupon => coupon.code === code));
    }
}
exports.default = CouponRepositoryMemory;
