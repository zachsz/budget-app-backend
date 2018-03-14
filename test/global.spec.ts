import * as mongoose from 'mongoose';
import config from '../src/config';

beforeEach((done) => {
    if (mongoose.connection.readyState === 1 || mongoose.connection.readyState === 2) {
        done();
    } else {
        mongoose.connect(config.db, (err) => {
            done(err);
        });
    }
});
