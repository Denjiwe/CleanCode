"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const StockEntry_1 = __importDefault(require("../../domain/entity/StockEntry"));
class OrderPlacedStockHandler {
    constructor(repositoryFactory) {
        this.repositoryFactory = repositoryFactory;
        this.name = "OrderPlaced";
        this.stockEntryRepository = repositoryFactory.createStockEntryRepository();
    }
    handle(event) {
        for (const orderItem of event.order.getOrderItems()) {
            this.stockEntryRepository.save(new StockEntry_1.default(orderItem.idItem, "out", orderItem.quantity, event.order.date));
        }
    }
}
exports.default = OrderPlacedStockHandler;
