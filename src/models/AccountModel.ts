interface IAccountModelData {
    initialBalance?: number
}

export class AccountModel {
    balance: number;

    constructor(data: IAccountModelData) {
        this.balance = data.initialBalance || 0;
    }

    withdraw(amount: number) {
        if (amount > 0) {
            this.balance -= amount;
        }
    }

    deposit(amount:number) {
        if (amount > 0) {
            this.balance += amount;
        }
    }
}
