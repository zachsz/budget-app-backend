import { ObjectID } from 'mongodb';
import * as DB from '../services/db';
import * as crypto from 'crypto';

export interface IUser {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
}

export interface IUserSearchArgs {
    _id?: ObjectID;
    firstName?: string;
    lastName?: string;
}

export function create(email: string, firstName: string, lastName: string, password: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        if (!email || email.length === 0) {
            reject(new Error('Email address is required!'));
        }
        if (!password || password.length === 0) {
            reject(new Error('Password is required!'));
        }
        let user = {
            email: email,
            firstName: firstName,
            lastName: lastName,
            password: hash(password)
        };
        let collection = DB.get().collection('users');
        collection.insertOne(user).then(resolve).catch(reject);
    });
}

export function find(user: IUserSearchArgs): Promise<any> {
    let collection = DB.get().collection('users');
    return collection.findOne(user);
}

function _getRandomString(length: number): string {
    return crypto.randomBytes(Math.ceil(length / 2))
        .toString('hex')
        .slice(0, length);
}

export function hash(password: string, salt?: string): { hash: string, salt: string } {
    if (!salt) {
        salt = _getRandomString(16);
    }
    let hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    let value = hash.digest('hex');
    return {
        hash: value,
        salt: salt
    };
}
