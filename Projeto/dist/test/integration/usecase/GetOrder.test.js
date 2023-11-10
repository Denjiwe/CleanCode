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
const GetOrder_1 = __importDefault(require("../../../src/application/usecase/get_order/GetOrder"));
const PlaceOrder_1 = __importDefault(require("../../../src/application/usecase/place_order/PlaceOrder"));
const Broker_1 = __importDefault(require("../../../src/infra/broker/Broker"));
const PgPromiseConnectionAdapter_1 = __importDefault(require("../../../src/infra/database/PgPromiseConnectionAdapter"));
const DatabaseRepositoryFactory_1 = __importDefault(require("../../../src/infra/factory/DatabaseRepositoryFactory"));
const OrderRepositoryDatabase_1 = __importDefault(require("../../../src/infra/repository/database/OrderRepositoryDatabase"));
let placeOrder;
let getOrder;
let orderRepository;
beforeEach(() => {
    const connection = PgPromiseConnectionAdapter_1.default.getInstance();
    orderRepository = new OrderRepositoryDatabase_1.default(connection);
    const repositoryFactory = new DatabaseRepositoryFactory_1.default();
    const broker = new Broker_1.default();
    placeOrder = new PlaceOrder_1.default(repositoryFactory, broker);
    getOrder = new GetOrder_1.default(repositoryFactory);
});
test("Should get an order by code", function () {
    return __awaiter(this, void 0, void 0, function* () {
        const input = {
            cpf: "839.435.452-10",
            orderItems: [
                { idItem: 1, quantity: 1 },
                { idItem: 2, quantity: 1 },
                { idItem: 3, quantity: 3 },
            ],
            date: new Date("2021-09-02"),
            coupon: "VALE20",
        };
        const placeOrderOutput = yield placeOrder.execute(input);
        const getOrderOutput = yield getOrder.execute(placeOrderOutput.code);
        expect(getOrderOutput.code).toBe("202100000001");
        expect(getOrderOutput.total).toBe(138);
    });
});
afterEach(function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield orderRepository.clear();
    });
});
