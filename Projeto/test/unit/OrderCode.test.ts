import OrderCode from "../../src/domain/entity/OrderCode";

test("Should create an order code", function () {
  const date = new Date("2021-01-02");
  const sequence = 1;
  const code = new OrderCode(date, sequence);
  expect(code.value).toBe("202100000001");
});