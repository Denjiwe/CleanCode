"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Shipping {
    constructor(distance, volume, density) {
        this.distance = distance;
        this.volume = volume;
        this.density = density;
    }
    getShipping() {
        return this.distance * this.volume * (this.density / 100);
    }
}
exports.default = Shipping;
