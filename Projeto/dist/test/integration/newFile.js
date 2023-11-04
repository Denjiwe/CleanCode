"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PlaceOrder_1 = __importDefault(require("../../src/application/usecase/PlaceOrder"));
const PgPromiseConnectionAdapter_1 = __importDefault(require("../../src/infra/database/PgPromiseConnectionAdapter"));
const CouponRepositoryDatabase_1 = __importDefault(require("../../src/infra/repository/database/CouponRepositoryDatabase"));
const ItemRepositoryDatabase_1 = __importDefault(require("../../src/infra/repository/database/ItemRepositoryDatabase"));
const OrderRepositoryDatabase_1 = __importDefault(require("../../src/infra/repository/database/OrderRepositoryDatabase"));
const PlaceOrder_test_1 = require("./PlaceOrder.test");
beforeEach(() => {
    const connection = new PgPromiseConnectionAdapter_1.default();
    const itemRepository = new ItemRepositoryDatabase_1.default(connection);
    const couponRepository = new CouponRepositoryDatabase_1.default(connection);
    const orderRepository = new OrderRepositoryDatabase_1.default();
    PlaceOrder_test_1.placeOrder = new PlaceOrder_1.default(itemRepository, orderRepository, couponRepository);
});
