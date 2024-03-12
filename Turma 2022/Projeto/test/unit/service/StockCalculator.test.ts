import StockEntry from "../../../src/domain/entity/StockEntry";
import StockCalculator from "../../../src/domain/service/StockCalculator";

test("Should calculate a avaliable stock for an item", function () {
  const calculator = new StockCalculator();
  const stockEntries = [
    new StockEntry(1, "in", 10, new Date("2023-06-01T12:30:00")),
    new StockEntry(2, "out", 5, new Date("2023-06-01T12:30:00")),
  ];
  const total = calculator.calculate(stockEntries);
  expect(total).toBe(5);
});