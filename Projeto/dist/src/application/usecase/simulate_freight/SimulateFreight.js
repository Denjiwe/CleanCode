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
const SimulateFreightOutput_1 = __importDefault(require("./SimulateFreightOutput"));
class SimulateFreight {
    constructor(itemRepository, freightCalculator) {
        this.itemRepository = itemRepository;
        this.freightCalculator = freightCalculator;
    }
    execute(input) {
        return __awaiter(this, void 0, void 0, function* () {
            let amount = 0;
            for (const orderItem of input.items) {
                const item = yield this.itemRepository.findById(orderItem.idItem);
                if (!item)
                    throw new Error("Item not found");
                amount += this.freightCalculator.calculate(item) * orderItem.quantity;
            }
            return new SimulateFreightOutput_1.default(amount);
        });
    }
}
exports.default = SimulateFreight;
