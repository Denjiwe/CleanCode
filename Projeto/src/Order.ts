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
        this.orderItems.push(new OrderItem(item.idItem, item.price, quantity, item));
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
        let volume = 0;
        let density = 0;
        for (const orderItem of this.orderItems) {
            const item = orderItem.item;
            if (!item) continue;
            volume += item.getVolume(item.height, item.length, item.width);
            density += item.getDensity(item.weight, volume);
        }
        const shipping = new Shipping(1000, volume, density).getShipping();
        
        return shipping > 10 ? shipping : 10;
    }
}
