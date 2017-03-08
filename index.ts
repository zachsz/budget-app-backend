import * as express from 'express';
import * as db from './src/services/db';
import accounts from './src/controllers/accounts';
const app = express();

app.use('/accounts', accounts);

db.connect('mongodb://localhost:27017/budget-test').then(() => {
    return app.listen(3000)
}).then(() => {
    console.log('Budgeting App running on port 3000!');
}).catch(() => {
    console.log('Unable to connect to database');
});
