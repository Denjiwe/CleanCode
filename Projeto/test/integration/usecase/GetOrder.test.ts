import GetOrder from "../../../src/application/usecase/get_order/GetOrder";
import PlaceOrder from "../../../src/application/usecase/place_order/PlaceOrder";
import Broker from "../../../src/infra/broker/Broker";
import PgPromiseConnectionAdapter from "../../../src/infra/database/PgPromiseConnectionAdapter";
import DatabaseRepositoryFactory from "../../../src/infra/factory/DatabaseRepositoryFactory";
import OrderRepositoryDatabase from "../../../src/infra/repository/database/OrderRepositoryDatabase";

let placeOrder: PlaceOrder;
let getOrder: GetOrder;
let orderRepository: OrderRepositoryDatabase;

beforeEach(() => {
  const connection = PgPromiseConnectionAdapter.getInstance();
  orderRepository = new OrderRepositoryDatabase(connection);
  const repositoryFactory = new DatabaseRepositoryFactory();
  const broker = new Broker();
  placeOrder = new PlaceOrder(repositoryFactory, broker);
  getOrder = new GetOrder(repositoryFactory);
})

test("Should get an order by code", async function () {
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
  const placeOrderOutput = await placeOrder.execute(input);
  const getOrderOutput = await getOrder.execute(placeOrderOutput.code);
  expect(getOrderOutput.code).toBe("202100000001");
  expect(getOrderOutput.total).toBe(138);
});

afterEach(async function () {
  await orderRepository.clear();
})