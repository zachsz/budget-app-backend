import { MongoClient, Db } from 'mongodb';
import * as async from 'async';

const DEV_URI = 'mongodb://localhost:27017/budget-dev';
const TEST_URI = 'mongodb://localhost:27017/budget-test';

let state: { db: Db, mode: string } = {
    db: null,
    mode: null
};

export function connect(mode: string): Promise<Db> {
    return new Promise<any>((resolve, reject) => {
        if (state.db) {
            resolve();
        } else {
            let uri = mode === exports.MODE_TEST ? TEST_URI : DEV_URI;
            MongoClient.connect(uri).then((db) => {
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

export function drop(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        if (!state.db) {
            resolve();
        } else {
            state.db.collections()
                .then((collections) => {
                    async.each(collections, (collection, cb) => {
                        if (collection.collectionName.indexOf('system') === 0) {
                            return cb();
                        }
                        collection.remove(cb);
                    }, resolve);
                })
                .catch(reject);
        }
    })
}

export const MODE_TEST = 'MODE_TEST';
export const MODE_DEV = 'MODE_DEV';
