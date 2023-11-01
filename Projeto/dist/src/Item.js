"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Item {
    constructor(idItem, category, description, price, height, width, length, weight) {
        this.idItem = idItem;
        this.category = category;
        this.description = description;
        this.price = price;
        this.height = height;
        this.width = width;
        this.length = length;
        this.weight = weight;
    }
    getVolume(height, length, width) {
        return (height / 100) * (length / 100) * (width / 100);
    }
    getDensity(weight, volume) {
        return weight / volume;
    }
}
exports.default = Item;
