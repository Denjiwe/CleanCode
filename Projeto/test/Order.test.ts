import Order from "../src/Order";
import Item from "../src/Item";
import Coupon from "../src/Coupon";

test("Should create an empty order with a valid CPF", function () {
    let cpf = "839.435.452-10";
    const order = new Order(cpf);
    const total = order.getTotal();
    expect(total).toBe(0);
});

test("Should attempt to create an empty order with an invalid CPF", function () {
    let cpf = "111.111.111-11";
    expect(() => new Order(cpf)).toThrow(new Error("Invalid CPF"));
});

test("Should create an order with 3 items", function () {
    let cpf = "839.435.452-10";
    const order = new Order(cpf);
    order.addItem(new Item(1, "Música", "Guitarra", 30, 50, 30, 10, 0.3), 3);
    order.addItem(new Item(1, "Vídeo", "DVD", 50, 20, 20, 3, 0.1), 1);
    order.addItem(new Item(1, "Vídeo", "VHS", 10, 20, 20, 3, 0.1), 2);
    const total = order.getTotal();
    expect(total).toBe(160);
});

test("Should create an order with 3 items and a discount ticket", function () {
    let cpf = "839.435.452-10";
    const order = new Order(cpf);
    order.addItem(new Item(1, "Música", "Guitarra", 30, 50, 30, 10, 0.3), 3);
    order.addItem(new Item(1, "Vídeo", "DVD", 50, 20, 20, 3, 0.1), 1);
    order.addItem(new Item(1, "Vídeo", "VHS", 10, 20, 20, 3, 0.1), 2);
    order.addCoupon(new Coupon("VALE20", 20, new Date('2024-01-01')));
    const total = order.getTotal();
    expect(total).toBe(128);
});

test("Should try to create an order with an expired discount ticket", function () {
    let cpf = "839.435.452-10";
    const order = new Order(cpf, new Date('2023-01-01'));
    order.addItem(new Item(1, "Música", "Guitarra", 30, 50, 30, 10, 0.3), 3);
    order.addCoupon(new Coupon("VALE20", 20, new Date('2022-01-01')));
    const total = order.getTotal();
    expect(total).toBe(90);
});

test("Should try to create an order with shipping", function () {
    let cpf = "839.435.452-10";
    const order = new Order(cpf);
    order.addItem(new Item(1, "Música", "Guitarra", 30, 50, 30, 10, 0.3), 3);
    expect(order.getTotalShipping()).toBe(3);
});
