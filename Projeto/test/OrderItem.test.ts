import OrderItem from "../src/OrderItem";

test("Should create an order item", function () {
    const orderItem = new OrderItem(1, 1000, 10);
    expect(orderItem.getTotal()).toBe(10000);
})