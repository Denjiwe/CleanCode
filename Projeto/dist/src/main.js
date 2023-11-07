"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DatabaseRepositoryFactory_1 = __importDefault(require("./infra/factory/DatabaseRepositoryFactory"));
const ExpressAdapter_1 = __importDefault(require("./infra/http/ExpressAdapter"));
const RouterConfig_1 = __importDefault(require("./infra/http/RouterConfig"));
const repositoryFactory = new DatabaseRepositoryFactory_1.default();
const httpAdapter = new ExpressAdapter_1.default();
new RouterConfig_1.default(httpAdapter, repositoryFactory);
httpAdapter.listen(3000);
