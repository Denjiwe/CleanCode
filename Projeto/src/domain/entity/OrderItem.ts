import Item from "./Item";

export default class OrderItem {
    constructor(
        readonly idItem: number, 
        readonly price: number, 
        readonly quantity: number,
        readonly item?: Item
        ) {
    }

    getTotal(): number {
        return this.price * this.quantity;
    }
}
