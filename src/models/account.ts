import * as db from '../services/db';
import {ObjectID} from 'mongodb';

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

export function get(id: string): Promise<any> {
    let collection = db.get().collection('accounts');
    return collection.findOne({"_id": new ObjectID(id)});
}
