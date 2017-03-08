"use strict";
exports.__esModule = true;
var AccountModel_1 = require("../../src/models/AccountModel");
var chai_1 = require("chai");
describe('AccountModel tests', function () {
    describe('Account creation', function () {
        it('should create an empty account', function () {
            var account = new AccountModel_1.AccountModel({});
            chai_1.expect(account.balance).to.equal(0);
        });
        it('should create an account with balance of 100', function () {
            var account = new AccountModel_1.AccountModel({
                initialBalance: 100
            });
            chai_1.expect(account.balance).to.equal(100);
        });
    });
    describe('Transactions', function () {
        var account;
        beforeEach(function () {
            account = new AccountModel_1.AccountModel({
                initialBalance: 10000
            });
        });
        it('should take out 50', function () {
            account.withdraw(50);
            chai_1.expect(account.balance).to.equal(9950);
        });
        it('should take out 2366', function () {
            var expected = account.balance - 2366;
            account.withdraw(2366);
            chai_1.expect(account.balance).to.equal(expected);
        });
        it('should not take out a negative amount', function () {
            account.withdraw(-100);
            chai_1.expect(account.balance).to.equal(10000);
        });
        it('should handle fractions', function () {
            var expected = account.balance - 345.99;
            account.withdraw(345.99);
            chai_1.expect(account.balance).to.equal(expected);
        });
        it('should deposit 50', function () {
            var expected = account.balance + 50;
            account.deposit(50);
            chai_1.expect(account.balance).to.equal(expected);
        });
        it('should not allow negative deposits', function () {
            var expected = account.balance;
            account.deposit(-999);
            chai_1.expect(account.balance).to.equal(expected);
        });
    });
});
