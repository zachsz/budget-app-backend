import { AccountModel } from '../../src/models/AccountModel';
import { expect } from 'chai';

describe('AccountModel tests', () => {
    describe('Account creation', () => {
        it('should create an empty account', () => {
            let account = new AccountModel({});
            expect(account.balance).to.equal(0);
        });

        it('should create an account with balance of 100', () => {
            let account = new AccountModel({
                initialBalance: 100
            });
            expect(account.balance).to.equal(100);
        });
    });

    describe('Transactions', () => {
        let account;
        beforeEach(() => {
            account = new AccountModel({
                initialBalance: 10000
            });
        });

        it('should take out 50', () => {
            account.withdraw(50);
            expect(account.balance).to.equal(9950);
        });

        it('should take out 2366', () => {
            let expected = account.balance - 2366;
            account.withdraw(2366);
            expect(account.balance).to.equal(expected);
        });

        it('should not take out a negative amount', () => {
            account.withdraw(-100);
            expect(account.balance).to.equal(10000);
        });

        it('should handle fractions', () => {
            let expected = account.balance - 345.99;
            account.withdraw(345.99);
            expect(account.balance).to.equal(expected);
        });

        it('should deposit 50', () => {
            let expected = account.balance + 50;
            account.deposit(50);
            expect(account.balance).to.equal(expected);
        });

        it('should not allow negative deposits', () => {
            let expected = account.balance;
            account.deposit(-999);
            expect(account.balance).to.equal(expected);
        })
    });

});
