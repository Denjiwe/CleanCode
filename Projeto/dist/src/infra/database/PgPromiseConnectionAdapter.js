"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_promise_1 = __importDefault(require("pg-promise"));
class PgPromiseConnectionAdapter {
    constructor() {
        this.pgp = (0, pg_promise_1.default)()("postgresql://postgres:12345678@localhost:5432/postgres");
    }
    query(statement, params) {
        return this.pgp.query(statement, params);
    }
}
exports.default = PgPromiseConnectionAdapter;
