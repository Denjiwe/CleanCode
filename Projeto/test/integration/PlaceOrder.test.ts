import PlaceOrder from "../../src/application/usecase/PlaceOrder";
import PgPromiseConnectionAdapter from "../../src/infra/database/PgPromiseConnectionAdapter";
import CouponRepositoryDatabase from "../../src/infra/repository/database/CouponRepositoryDatabase";
import ItemRepositoryDatabase from "../../src/infra/repository/database/ItemRepositoryDatabase";
import OrderRepositoryDatabase from "../../src/infra/repository/database/OrderRepositoryDatabase";

let placeOrder: PlaceOrder;
let orderRepository: OrderRepositoryDatabase;

beforeEach(() => {
  const connection = new PgPromiseConnectionAdapter();
  const itemRepository = new ItemRepositoryDatabase(connection);
  const couponRepository = new CouponRepositoryDatabase(connection);
  orderRepository = new OrderRepositoryDatabase(connection);
  placeOrder = new PlaceOrder(itemRepository, orderRepository, couponRepository);
})

test("Should place an order", async function () {
  const input = {
    cpf: "839.435.452-10",
    orderItems: [
      { idItem: 1, quantity: 1 },
      { idItem: 2, quantity: 1 },
      { idItem: 3, quantity: 3 },
    ],
    date: new Date("2021-09-02"),
    coupon: "VALE20",
  };
  const output = await placeOrder.execute(input);
  expect(output.total).toBe(138);
});

test("Should place an order with freight", async function () {
  const input = {
    cpf: "839.435.452-10",
    orderItems: [
      { idItem: 4, quantity: 1 },
      { idItem: 5, quantity: 1 },
      { idItem: 6, quantity: 3 },
    ],
    date: new Date("2023-09-02"),
  };
  const output = await placeOrder.execute(input);
  expect(output.total).toBe(6350);
});

test("Should place an order with a code", async function () {
  const input = {
    cpf: "839.435.452-10",
    orderItems: [
      { idItem: 4, quantity: 1 },
      { idItem: 5, quantity: 1 },
      { idItem: 6, quantity: 3 },
    ],
    date: new Date("2023-09-02"),
  };
  const output = await placeOrder.execute(input);
  expect(output.code).toBe("202300000001");
});

afterEach(async () => {
  await orderRepository.clear();
})