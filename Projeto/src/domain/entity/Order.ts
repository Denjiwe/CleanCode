import Cpf from "./Cpf";
import Item from "./Item";
import OrderItem from "./OrderItem";
import Coupon from "./Coupon";
import FreightCalculator from "./FreightCalculator";
import DefaultFreightCalculator from "./DefaultFreightCalculator";

export default class Order {
    cpf: Cpf;
    private orderItems: OrderItem[];
    coupon?: Coupon;
    private freight: number;

    constructor (cpf: string, readonly date: Date = new Date(), readonly freightCalculator: FreightCalculator = new DefaultFreightCalculator()) {
        this.cpf = new Cpf(cpf);
        this.orderItems = [];
        this.freight = 0;
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
