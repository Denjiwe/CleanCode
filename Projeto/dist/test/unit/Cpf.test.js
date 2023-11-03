"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Cpf_1 = __importDefault(require("../../src/domain/entity/Cpf"));
test("Should validate a valid Cpf", function () {
    const cpf = new Cpf_1.default("839.435.452-10");
    expect(cpf.value).toBeTruthy();
});
test("Should validate a invalid Cpf", function () {
    expect(() => new Cpf_1.default("123.456.789-11")).toThrow(new Error("Invalid CPF"));
});
test("Should validate a Cpf with same digits", function () {
    expect(() => new Cpf_1.default("111.111.111-11")).toThrow(new Error("Invalid CPF"));
});
test("Should validate a Cpf with more than 11 digits", function () {
    expect(() => new Cpf_1.default("123.456.789-1100")).toThrow(new Error("Invalid CPF"));
});
test("Should validate a Cpf with less than 11 digits", function () {
    expect(() => new Cpf_1.default("123.45")).toThrow(new Error("Invalid CPF"));
});
