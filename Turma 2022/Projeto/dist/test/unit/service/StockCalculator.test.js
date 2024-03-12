"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const StockEntry_1 = __importDefault(require("../../../src/domain/entity/StockEntry"));
const StockCalculator_1 = __importDefault(require("../../../src/domain/service/StockCalculator"));
test("Should calculate a avaliable stock for an item", function () {
    const calculator = new StockCalculator_1.default();
    const stockEntries = [
        new StockEntry_1.default(1, "in", 10, new Date("2023-06-01T12:30:00")),
        new StockEntry_1.default(2, "out", 5, new Date("2023-06-01T12:30:00")),
    ];
    const total = calculator.calculate(stockEntries);
    expect(total).toBe(5);
});
