"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const StockEntry_1 = __importDefault(require("../../../src/domain/entity/StockEntry"));
test("Should create a entry to the stock", function () {
    const stockEntry = new StockEntry_1.default(1, "in", 10, new Date("2023-06-01T12:30:00"));
    expect(stockEntry.idItem).toBe(1);
});
