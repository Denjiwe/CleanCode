"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PgPromiseConnectionAdapter_1 = __importDefault(require("../database/PgPromiseConnectionAdapter"));
const CouponRepositoryDatabase_1 = __importDefault(require("../repository/database/CouponRepositoryDatabase"));
const ItemRepositoryDatabase_1 = __importDefault(require("../repository/database/ItemRepositoryDatabase"));
const OrderRepositoryDatabase_1 = __importDefault(require("../repository/database/OrderRepositoryDatabase"));
class DatabaseRepositoryFactory {
    constructor() {
    }
    createItemRepository() {
        return new ItemRepositoryDatabase_1.default(PgPromiseConnectionAdapter_1.default.getInstance());
    }
    createOrderRepository() {
        return new OrderRepositoryDatabase_1.default(PgPromiseConnectionAdapter_1.default.getInstance());
    }
    createCouponRepository() {
        return new CouponRepositoryDatabase_1.default(PgPromiseConnectionAdapter_1.default.getInstance());
    }
}
exports.default = DatabaseRepositoryFactory;
