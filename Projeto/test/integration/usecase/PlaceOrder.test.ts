import GetStock from "../../../src/application/usecase/get_stock/GetStock";
import PlaceOrder from "../../../src/application/usecase/place_order/PlaceOrder";
import PgPromiseConnectionAdapter from "../../../src/infra/database/PgPromiseConnectionAdapter";
import DatabaseRepositoryFactory from "../../../src/infra/factory/DatabaseRepositoryFactory";
import MemoryRepositoryFactory from "../../../src/infra/factory/MemoryRepositoryFactory";
import OrderRepositoryDatabase from "../../../src/infra/repository/database/OrderRepositoryDatabase";
import StockEntryRepositoryDatabase from "../../../src/infra/repository/database/StockEntryRepositoryDatabase";

let placeOrder: PlaceOrder;
let getStock: GetStock;
let orderRepository: OrderRepositoryDatabase;
let stockEntryRepository: StockEntryRepositoryDatabase;

beforeEach(() => {
  const connection = PgPromiseConnectionAdapter.getInstance();
  orderRepository = new OrderRepositoryDatabase(connection);
  stockEntryRepository = new StockEntryRepositoryDatabase(connection);
  const repositoryFactory = new DatabaseRepositoryFactory();
  // const repositoryFactory = new MemoryRepositoryFactory();
  placeOrder = new PlaceOrder(repositoryFactory);
  getStock = new GetStock(repositoryFactory);
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

test("Should place an order and debit the stock", async function () {
  const input = {
    cpf: "839.435.452-10",
    orderItems: [
      { idItem: 4, quantity: 1 },
      { idItem: 5, quantity: 1 },
      { idItem: 6, quantity: 3 },
    ],
    date: new Date("2023-09-02"),
  };
  await placeOrder.execute(input);
  const totala = await getStock.execute(4);
  const totalb = await getStock.execute(5);
  const totalc = await getStock.execute(6);
  expect(totala).toBe(-1);
  expect(totalb).toBe(-1);
  expect(totalc).toBe(-3);
});

afterEach(async function() {
  await orderRepository.clear();
  await stockEntryRepository.clear();
})