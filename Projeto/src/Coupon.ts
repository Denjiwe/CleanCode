export default class Coupon {
    constructor (readonly code: string, readonly percentage: number, readonly validOn: Date) {
        if (this.isExpired(this.validOn)) throw new Error("Coupon expired");
    }

    private isExpired(date: Date) {
        return date < new Date();
    }
}