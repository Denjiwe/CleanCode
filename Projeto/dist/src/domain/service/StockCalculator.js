"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StockCalculator {
    calculate(stockEntries) {
        let total = 0;
        for (const stockEntry of stockEntries) {
            if (stockEntry.operation == "in")
                total += stockEntry.quantity;
            if (stockEntry.operation == "out")
                total -= stockEntry.quantity;
        }
        return total;
    }
}
exports.default = StockCalculator;
