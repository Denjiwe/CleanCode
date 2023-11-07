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
const GetOrdersOutput_1 = __importDefault(require("./GetOrdersOutput"));
class GetOrders {
    constructor(repositoryFactory) {
        this.repositoryFactory = repositoryFactory;
        this.orderRepository = repositoryFactory.createOrderRepository();
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            const orders = yield this.orderRepository.findAll();
            const getOrdersOutput = new GetOrdersOutput_1.default();
            for (const order of orders) {
                getOrdersOutput.addOrder(order.getCode(), order.getTotal());
            }
            return getOrdersOutput;
        });
    }
}
exports.default = GetOrders;
