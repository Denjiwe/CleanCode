import Cpf from "./Cpf";
import Item from "./Item";
import OrderItem from "./OrderItem";
import Coupon from "./Coupon";
import Shipping from "./Shipping";

export default class Order {
    cpf: Cpf;
    orderItems: OrderItem[];
    coupon?: Coupon;

    constructor (cpf: string) {
        this.cpf = new Cpf(cpf);
        this.orderItems = [];
    }

    addItem(item: Item, quantity: number): void {
        this.orderItems.push(new OrderItem(item.idItem, item.price, quantity));
    }

    addCoupon(coupon: Coupon) {
        this.coupon = coupon;
    }

    getTotal(): number {
        let total = 0;
        for (const item of this.orderItems) {
            total += item.getTotal();
        }
        if(this.coupon) total -= (total * this.coupon.percentage) / 100;
        return total;
    }

    getTotalShipping(): number {
        let shipping = 0;
        for (const orderItem of this.orderItems) {
            const item = orderItem.item;
            shipping += new Shipping(1000, item.getVolume(), item.getDensity()).getShipping();
        }
        return shipping;
    }
}