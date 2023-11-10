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
const GetStock_1 = __importDefault(require("../../../src/application/usecase/get_stock/GetStock"));
const SaveStock_1 = __importDefault(require("../../../src/application/usecase/save_stock/SaveStock"));
const DatabaseRepositoryFactory_1 = __importDefault(require("../../../src/infra/factory/DatabaseRepositoryFactory"));
test("Should get the stock from an item", function () {
    return __awaiter(this, void 0, void 0, function* () {
        const repositoryFactory = new DatabaseRepositoryFactory_1.default();
        const stockEntryRepository = repositoryFactory.createStockEntryRepository();
        yield stockEntryRepository.clear();
        const saveStock = new SaveStock_1.default(repositoryFactory);
        const saveStockInputa = {
            idItem: 1,
            operation: "in",
            quantity: 10
        };
        yield saveStock.execute(saveStockInputa);
        const saveStockInputb = {
            idItem: 1,
            operation: "out",
            quantity: 5
        };
        yield saveStock.execute(saveStockInputb);
        const getStock = new GetStock_1.default(repositoryFactory);
        const total = yield getStock.execute(1);
        expect(total).toBe(5);
    });
});
