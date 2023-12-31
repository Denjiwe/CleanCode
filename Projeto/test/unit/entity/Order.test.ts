import Order from "../../../src/domain/entity/Order";
import Item from "../../../src/domain/entity/Item";
import Coupon from "../../../src/domain/entity/Coupon";
import FixedFreightCalculator from "../../../src/domain/entity/FixedFreightCalculator";

test("Should create an empty order with a valid CPF", function () {
    let cpf = "839.435.452-10";
    const order = new Order(cpf);
    const total = order.getTotal();
    expect(total).toBe(0);
});

test("Should try to create an empty order with an invalid CPF", function () {
    let cpf = "111.111.111-11";
    expect(() => new Order(cpf)).toThrow(new Error("Invalid CPF"));
});

test("Should create an order with 3 items", function () {
    let cpf = "839.435.452-10";
    const order = new Order(cpf);
    order.addItem(new Item(1, "Música", "Guitarra", 30), 3);
    order.addItem(new Item(1, "Vídeo", "DVD", 50, 20), 1);
    order.addItem(new Item(1, "Vídeo", "VHS", 10, 20), 2);
    const total = order.getTotal();
    expect(total).toBe(160);
});

test("Should create an order with 3 items and a discount ticket", function () {
    let cpf = "839.435.452-10";
    const order = new Order(cpf);
    order.addItem(new Item(1, "Música", "Guitarra", 30), 3);
    order.addItem(new Item(1, "Vídeo", "DVD", 50), 1);
    order.addItem(new Item(1, "Vídeo", "VHS", 10), 2);
    order.addCoupon(new Coupon("VALE20", 20));
    const total = order.getTotal();
    expect(total).toBe(128);
});

test("Should create an order with an expired discount ticket", function () {
    let cpf = "839.435.452-10";
    const order = new Order(cpf, new Date('2023-01-01'));
    order.addItem(new Item(1, "Música", "Guitarra", 30), 3);
    order.addCoupon(new Coupon("VALE20", 20, new Date('2022-01-01')));
    const total = order.getTotal();
    expect(total).toBe(90);
});

test("Should create an order with default shipping strategy", function () {
    let cpf = "839.435.452-10";
    const order = new Order(cpf);
    order.addItem(new Item(1, "Música", "Guitarra", 1000, 100, 30, 10, 3), 1);
    order.addItem(new Item(1, "Música", "Amplificador", 5000, 100, 50, 50, 20), 1);
    order.addItem(new Item(1, "Diversos", "Cabo", 30, 10, 10, 10, 0.9), 3);
    expect(order.getFreight()).toBe(260);
});

test("Should create an order with default fixed strategy", function () {
    let cpf = "839.435.452-10";
    const order = new Order(cpf, new Date(), new FixedFreightCalculator());
    order.addItem(new Item(1, "Música", "Guitarra", 30, 50, 30, 10, 0.3), 3);
    expect(order.getFreight()).toBe(30);
});

test("Should create an order with a code", function () {
    let cpf = "839.435.452-10";
    const order = new Order(cpf, new Date(), new FixedFreightCalculator());
    order.addItem(new Item(1, "Música", "Guitarra", 30, 50, 30, 10, 0.3), 3);
    expect(order.getCode()).toBe('202300000001');
});