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
const StockEntry_1 = __importDefault(require("../../../domain/entity/StockEntry"));
class StockEntryRepositoryDatabase {
    constructor(connection) {
        this.connection = connection;
    }
    getByIdItem(idItem) {
        return __awaiter(this, void 0, void 0, function* () {
            const stockEntriesData = yield this.connection.query("select * from ccca.stock_entry where id_item = $1", [idItem]);
            const stockEntries = [];
            for (const stockEntryData of stockEntriesData) {
                stockEntries.push(new StockEntry_1.default(stockEntryData.id_item, stockEntryData.operation, stockEntryData.quantity, new Date(stockEntryData.entry_date)));
            }
            return stockEntries;
        });
    }
    save(stockEntry) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connection.query("insert into ccca.stock_entry (id_item, operation, quantity, entry_date) values ($1, $2, $3, $4)", [
                stockEntry.idItem,
                stockEntry.operation,
                stockEntry.quantity,
                stockEntry.date
            ]);
        });
    }
    clear() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connection.query("delete from ccca.stock_entry", []);
        });
    }
}
exports.default = StockEntryRepositoryDatabase;
