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
const ValidateCoupon_1 = __importDefault(require("../../src/application/usecase/validate_coupon/ValidateCoupon"));
const PgPromiseConnectionAdapter_1 = __importDefault(require("../../src/infra/database/PgPromiseConnectionAdapter"));
const CouponRepositoryDatabase_1 = __importDefault(require("../../src/infra/repository/database/CouponRepositoryDatabase"));
test("Should validate a coupon", function () {
    return __awaiter(this, void 0, void 0, function* () {
        const connection = PgPromiseConnectionAdapter_1.default.getInstance();
        const couponRepository = new CouponRepositoryDatabase_1.default(connection);
        const validateCoupon = new ValidateCoupon_1.default(couponRepository);
        const isValid = yield validateCoupon.execute("VALE20");
        expect(isValid).toBeTruthy();
    });
});
