import * as express from 'express';
import * as logger from 'morgan';
import * as http from 'http';
import * as mongoose from 'mongoose';
import * as winston from 'winston';

import config from './src/config';
import imports from './src/controllers/import';
import budget from './src/controllers/budget';
import masterCategories from './src/controllers/masterCategories';

const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
})
app.use(logger('combined'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/import', imports);
app.use('/budget', budget);
app.use('/master-categories', masterCategories);

const server = http.createServer(app);

server.on('listening', () => {
    console.log('Budgeting App Server running on port', config.port);
});

const db = mongoose.connection;

db.on('error', winston.error.bind(winston, 'MongoDB connection error:'));
// db.once('open', () => {
// });

export default server;
