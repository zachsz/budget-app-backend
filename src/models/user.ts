import { ObjectID } from 'mongodb';
import * as DB from '../services/db';

export interface IUser {
    email: string;
    firstName: string;
    lastName: string;
}

export interface IUserSearchArgs {
    _id?: ObjectID;
    firstName?: string;
    lastName?: string;
}

export function create(user: IUser): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        if (user.email && user.email.length > 1) {
            let collection = DB.get().collection('users');
            collection.insertOne(user).then(resolve).catch(reject);
        } else {
            reject(new Error('Email address is required!'));
        }
    });
}

export function find(user: IUserSearchArgs): Promise<any> {
    let collection =  DB.get().collection('users');
    return collection.findOne(user);
}
