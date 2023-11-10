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
const SimulateFreight_1 = __importDefault(require("../../../src/application/usecase/simulate_freight/SimulateFreight"));
const SimulateFreightInput_1 = __importDefault(require("../../../src/application/usecase/simulate_freight/SimulateFreightInput"));
const DefaultFreightCalculator_1 = __importDefault(require("../../../src/domain/entity/DefaultFreightCalculator"));
const PgPromiseConnectionAdapter_1 = __importDefault(require("../../../src/infra/database/PgPromiseConnectionAdapter"));
const ItemRepositoryDatabase_1 = __importDefault(require("../../../src/infra/repository/database/ItemRepositoryDatabase"));
test("Should simulate a freight", function () {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = PgPromiseConnectionAdapter_1.default.getInstance();
        const itemRepository = new ItemRepositoryDatabase_1.default(connection);
        const freightCalculator = new DefaultFreightCalculator_1.default();
        const simulateFreight = new SimulateFreight_1.default(itemRepository, freightCalculator);
        const input = new SimulateFreightInput_1.default([
            { idItem: 4, quantity: 1 },
            { idItem: 5, quantity: 1 },
            { idItem: 6, quantity: 3 },
        ]);
        const output = yield simulateFreight.execute(input);
        expect(output.amount).toBe(260);
    });
});
