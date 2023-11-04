import Cpf from "./Cpf";
import Item from "./Item";
import OrderItem from "./OrderItem";
import Coupon from "./Coupon";
import FreightCalculator from "./FreightCalculator";
import DefaultFreightCalculator from "./DefaultFreightCalculator";
import OrderCode from "./OrderCode";

export default class Order {
    cpf: Cpf;
    private orderItems: OrderItem[];
    coupon?: Coupon;
    private freight: number;
    private code: OrderCode;

    constructor (cpf: string, readonly date: Date = new Date(), readonly freightCalculator: FreightCalculator = new DefaultFreightCalculator(), readonly sequence: number = 1) {
        this.cpf = new Cpf(cpf);
        this.orderItems = [];
        this.freight = 0;
        this.code = new OrderCode(date, sequence);
    }

    addItem(item: Item, quantity: number): void {
        this.freight += this.freightCalculator.calculate(item) * quantity;
        this.orderItems.push(new OrderItem(item.idItem, item.price, quantity, item));
    }

    addCoupon(coupon: Coupon) {
        if (coupon.isExpired(this.date)) return;
        this.coupon = coupon;
    }

    getFreight(): number {
        return this.freight;
    }

    getCode() {
        return this.code.value;
    }

    getTotal(): number {
        let total = 0;
        for (const item of this.orderItems) {
            total += item.getTotal();
        }
        if(this.coupon) total -= this.coupon.calculateDiscount(total, this.date);
        total += this.getFreight();
        return total;
    }
}
