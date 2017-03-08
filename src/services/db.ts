import {MongoClient, Db} from 'mongodb';

let state: {db: Db} = {
    db: null
};

export function connect(url: string): Promise<Db> {
    return new Promise<any>((resolve, reject) => {
        if (state.db) {
            resolve();
        } else {
            MongoClient.connect(url).then((db) => {
                state.db = db;
                resolve();
            }).catch(reject);
        }
    });
}

export function get(): Db {
    return state.db;
}

export function close() {
    return new Promise<any>((resolve, reject) => {
        if (state.db) {
            state.db.close().then(resolve).catch(reject);
        } else {
            resolve();
        }
    });
}
