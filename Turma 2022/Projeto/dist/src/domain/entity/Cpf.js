"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Cpf {
    constructor(value) {
        if (!this.validate(value))
            throw new Error("Invalid CPF");
        this.value = value;
    }
    validate(cpf) {
        if (!cpf)
            return false;
        cpf = this.clean(cpf);
        if (!this.hasMinimumLength(cpf))
            return false;
        if (this.isBlocked(cpf))
            return false;
        const digit1 = this.calculateDigit(cpf, 10);
        const digit2 = this.calculateDigit(cpf, 11);
        const actualDigit = cpf.slice(-2);
        const calculatedDigit = `${digit1}${digit2}`;
        return actualDigit === calculatedDigit;
    }
    calculateDigit(cpf, factor) {
        let total = 0;
        for (const digit of cpf) {
            if (factor > 1)
                total += parseInt(digit) * factor--;
        }
        const rest = total % 11;
        return rest < 2 ? 0 : 11 - rest;
    }
    clean(cpf) {
        return cpf.replace(/\D/g, '');
    }
    hasMinimumLength(cpf) {
        return cpf.length === 11;
    }
    isBlocked(cpf) {
        const [firstDigit] = cpf;
        return [...cpf].every(digit => digit === firstDigit);
    }
}
exports.default = Cpf;
