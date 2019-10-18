const express = require('express');
const logger = require('morgan');
const http = require('http');
const config = require('./src/config');

const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
})
app.use(logger('combined'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const server = http.createServer(app);

server.on('listening', () => {
    console.log('Budgeting App Server running on port', config.port);
});

module.exports = server;
