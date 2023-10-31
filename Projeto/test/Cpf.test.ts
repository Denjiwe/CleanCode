import Cpf from "../src/Cpf";

test("Should validate a valid Cpf", function () {
    const cpf = new Cpf("839.435.452-10");
    expect(cpf.value).toBeTruthy();
});

test("Should validate a invalid Cpf", function () {
    expect(() => new Cpf("123.456.789-11")).toThrow(new Error("Invalid CPF"));
});

test("Should validate a Cpf with same digits", function () {
    expect(() => new Cpf("111.111.111-11")).toThrow(new Error("Invalid CPF"));
});

test("Should validate a Cpf with more than 11 digits", function () {
    expect(() => new Cpf("123.456.789-1100")).toThrow(new Error("Invalid CPF"));
});

test("Should validate a Cpf with less than 11 digits", function () {
    expect(() => new Cpf("123.45")).toThrow(new Error("Invalid CPF"));
});