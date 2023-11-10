"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Broker {
    constructor() {
        this.handlers = [];
    }
    register(handler) {
        this.handlers.push(handler);
    }
    publish(event) {
        for (const handler of this.handlers) {
            if (handler.name === event.name) {
                handler.handle(event);
            }
        }
    }
}
exports.default = Broker;
