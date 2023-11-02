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
    getVolume() {
        return (this.height / 100) * (this.length / 100) * (this.width / 100);
    }
    getDensity() {
        return this.weight / this.getVolume();
    }
}
exports.default = Item;
