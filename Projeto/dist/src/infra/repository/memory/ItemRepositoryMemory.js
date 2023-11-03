"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Item_1 = __importDefault(require("../../../domain/entity/Item"));
class ItemRepositoryMemory {
    constructor() {
        this.items = [
            new Item_1.default(1, "Música", "Guitarra", 30),
            new Item_1.default(2, "Vídeo", "DVD", 50),
            new Item_1.default(3, "Vídeo", "VHS", 10),
            new Item_1.default(4, "Música", "Guitarra", 1000, 100, 30, 10, 3),
            new Item_1.default(5, "Música", "Amplificador", 5000, 100, 50, 50, 20),
            new Item_1.default(6, "Diversos", "Cabo", 30, 10, 10, 10, 0.9),
        ];
    }
    findById(idItem) {
        return Promise.resolve(this.items.find(item => item.idItem === idItem));
    }
}
exports.default = ItemRepositoryMemory;
