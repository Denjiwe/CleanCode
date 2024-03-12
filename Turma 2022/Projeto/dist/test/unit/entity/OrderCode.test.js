"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const OrderCode_1 = __importDefault(require("../../../src/domain/entity/OrderCode"));
test("Should create an order code", function () {
    const date = new Date("2021-01-02");
    const sequence = 1;
    const code = new OrderCode_1.default(date, sequence);
    expect(code.value).toBe("202100000001");
});
