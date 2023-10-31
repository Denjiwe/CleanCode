"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Coupon {
    constructor(code, percentage, validOn) {
        this.code = code;
        this.percentage = percentage;
        this.validOn = validOn;
        if (this.isExpired(this.validOn))
            throw new Error("Coupon expired");
    }
    isExpired(date) {
        return date < new Date();
    }
}
exports.default = Coupon;
