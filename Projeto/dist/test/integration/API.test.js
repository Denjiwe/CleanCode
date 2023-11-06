"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
test("Deve testar a API /orders (POST)", function () {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield (0, axios_1.default)({
            url: "http://localhost:3000/orders",
            method: "post",
            data: {
                cpf: "839.435.452-10",
                orderItems: [
                    { idItem: 1, quantity: 1 },
                    { idItem: 2, quantity: 1 },
                    { idItem: 3, quantity: 3 }
                ],
                date: new Date("2021-12-10"),
                coupon: "VALE20"
            }
        });
        const order = response.data;
        expect(order.total).toBe(138);
    });
});
test("Deve testar a API /simulateFreight (POST)", function () {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield (0, axios_1.default)({
            url: "http://localhost:3000/simulateFreight",
            method: "post",
            data: {
                items: [
                    { idItem: 4, quantity: 1 },
                    { idItem: 5, quantity: 1 },
                    { idItem: 6, quantity: 3 }
                ],
            }
        });
        const output = response.data;
        expect(output.amount).toBe(260);
    });
});
