import * as db from '../services/db';

export function create(user: any, initialBalance: number): Promise<any> {
    let account = {
        user: user,
        balance: initialBalance,
        createdAt: new Date().toString()
    };

    let collection = db.get().collection('accounts');
    return collection.insertOne(account);
}

export function all(): Promise<any> {
    let collection = db.get().collection('accounts');
    return collection.find().toArray();
}
