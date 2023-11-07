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
const Coupon_1 = __importDefault(require("../../../domain/entity/Coupon"));
const DefaultFreightCalculator_1 = __importDefault(require("../../../domain/entity/DefaultFreightCalculator"));
const Item_1 = __importDefault(require("../../../domain/entity/Item"));
const Order_1 = __importDefault(require("../../../domain/entity/Order"));
class OrderRepositoryDatabase {
    constructor(connection) {
        this.connection = connection;
    }
    save(order) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const [orderData] = yield this.connection.query("insert into ccca.order (code, cpf, issue_date, freight, sequence, coupon) values ($1, $2, $3, $4, $5, $6) returning *", [
                order.getCode(),
                order.getCpf(),
                order.date,
                order.getFreight(),
                order.sequence,
                (_a = order.coupon) === null || _a === void 0 ? void 0 : _a.code
            ]);
            for (const orderItem of order.getOrderItems()) {
                yield this.connection.query("insert into ccca.order_item (id_order, id_item, price, quantity) values ($1, $2, $3, $4)", [
                    orderData.id_order,
                    orderItem.idItem,
                    orderItem.price,
                    orderItem.quantity
                ]);
            }
        });
    }
    get(code) {
        return __awaiter(this, void 0, void 0, function* () {
            const [orderData] = yield this.connection.query("select * from ccca.order where code = $1", [code]);
            if (!orderData)
                throw new Error("Order not found");
            const order = new Order_1.default(orderData.cpf, orderData.issue_date, new DefaultFreightCalculator_1.default(), orderData.sequence);
            const orderItemsData = yield this.connection.query("select * from ccca.order_item where id_order = $1", [orderData.id_order]);
            for (const orderItemData of orderItemsData) {
                const [itemData] = yield this.connection.query("select * from ccca.item where id_item = $1", [orderItemData.id_item]);
                const item = new Item_1.default(itemData.id_item, itemData.category, itemData.description, parseFloat(itemData.price), itemData.height, itemData.width, itemData.length, itemData.weight);
                order.addItem(item, orderItemData.quantity);
            }
            if (orderData.coupon) {
                const [couponData] = yield this.connection.query("select * from ccca.coupon where code = $1", [orderData.coupon]);
                const coupon = new Coupon_1.default(couponData.code, couponData.percentage, couponData.expire_date);
                order.addCoupon(coupon);
            }
            return order;
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const orders = [];
            const ordersData = yield this.connection.query("select * from ccca.order", []);
            for (const orderData of ordersData) {
                const order = yield this.get(orderData.code);
                orders.push(order);
            }
            return orders;
        });
    }
    count() {
        return __awaiter(this, void 0, void 0, function* () {
            const [orderData] = yield this.connection.query("select count(*)::int as count from ccca.order", []);
            return orderData.count;
        });
    }
    clear() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connection.query("delete from ccca.order_item", []);
            yield this.connection.query("delete from ccca.order", []);
        });
    }
}
exports.default = OrderRepositoryDatabase;
