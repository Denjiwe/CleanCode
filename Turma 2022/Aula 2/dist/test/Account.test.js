"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Account_1 = __importDefault(require("../src/Account"));
const CurrencyAPIFake_1 = __importDefault(require("../src/CurrencyAPIFake"));
const sinon_1 = __importDefault(require("sinon"));
let account;
let currencyAPI;
beforeEach(function () {
    currencyAPI = new CurrencyAPIFake_1.default();
    account = new Account_1.default(currencyAPI);
});
test("Should create a new account", function () {
    const balance = account.getBalance();
    expect(balance).toBe(0);
});
test("Should credit an R$100,00", function () {
    account.credit(100);
    expect(account.getBalance()).toBe(100);
});
test("Should debit an amount R$50,00", function () {
    account.credit(100);
    account.debit(50);
    expect(account.getBalance()).toBe(50);
});
test("Should credit U$100,00 with fake", function () {
    account.credit(100, "USD");
    expect(account.getBalance()).toBe(500);
});
test("Should credit U$100,00 with stub", function () {
    sinon_1.default.stub(currencyAPI, "convert").returns(600);
    account.credit(100, "USD");
    expect(account.getBalance()).toBe(600);
});
test("Should get the account balance with spy", function () {
    const spy = sinon_1.default.spy(account, "getBalance");
    account.getBalance();
    sinon_1.default.assert.calledOnce(spy);
});
test("Should get the account balance with mock", function () {
    const mock = sinon_1.default.mock(account);
    mock.expects("credit").once().withArgs(100, 'USD');
    mock.expects("getBalance").once().returns(600);
    account.credit(100, "USD");
    account.getBalance();
    mock.verify();
});
