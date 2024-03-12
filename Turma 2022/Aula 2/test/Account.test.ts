import Account from "../src/Account";
import CurrencyAPIFake from "../src/CurrencyAPIFake";
import CurrencyAPI from "../src/CurrencyAPI";
import sinon from "sinon";

let account: Account;
let currencyAPI: CurrencyAPI;

beforeEach(function () {
    currencyAPI = new CurrencyAPIFake();
    account = new Account(currencyAPI);
})

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
    sinon.stub(currencyAPI, "convert").returns(600);
    account.credit(100, "USD");
    expect(account.getBalance()).toBe(600);
});

test("Should get the account balance with spy", function () {
    const spy = sinon.spy(account, "getBalance");
    account.getBalance();
    sinon.assert.calledOnce(spy);
});

test("Should get the account balance with mock", function () {
    const mock = sinon.mock(account);
    mock.expects("credit").once().withArgs(100, 'USD');
    mock.expects("getBalance").once().returns(600);
    account.credit(100, "USD");
    account.getBalance();
    mock.verify();
});