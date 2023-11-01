"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Coupon {
    constructor(code, percentage, expireDate) {
        this.code = code;
        this.percentage = percentage;
        this.expireDate = expireDate;
    }
    isValid(today = new Date()) {
        if (!this.expireDate)
            return true;
        return this.expireDate.getTime() >= today.getTime();
    }
    isExpired(today = new Date()) {
        return !this.isValid(today);
    }
}
exports.default = Coupon;
