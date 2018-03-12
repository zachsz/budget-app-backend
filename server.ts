import * as express from 'express';
import * as logger from 'morgan';
import * as http from 'http';
import * as mongoose from 'mongoose';
import * as winston from 'winston';

import config from './src/config';
import imports from './src/controllers/import';

const app = express();

app.use(logger('combined'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/import', imports);

const server = http.createServer(app);

server.on('listening', () => {
    console.log('Budgeting App Server running on port', config.port);
});

mongoose.connect(config.db);
const db = mongoose.connection;

db.on('error', winston.error.bind(winston, 'MongoDB connection error:'));
// db.once('open', () => {
// });

export default server;