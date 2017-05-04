import {ObjectID} from 'mongodb';

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
        resolve(new ObjectID());
    });
}

export function find(user: IUserSearchArgs): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        resolve({
            length: 1
        });
    })
}
