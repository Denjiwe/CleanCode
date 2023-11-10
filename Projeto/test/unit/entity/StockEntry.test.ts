import StockEntry from "../../../src/domain/entity/StockEntry";

test("Should create a entry to the stock", function () {
  const stockEntry = new StockEntry(1, "in", 10, new Date("2023-06-01T12:30:00"));
  expect(stockEntry.idItem).toBe(1);
});