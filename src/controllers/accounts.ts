import * as express from 'express';
import * as db from '../services/db';
import * as account from '../models/account';

const router = express.Router();

router.get('/', (req, res) => {
    account.all().then((docs) => {
        res.send('accounts: ' + docs);
    });
});

router.post('/create', (req, res) => {
    account.create('1234', 250).then((data: any) => {
        console.log('created!', data.ops[0]);
        res.send(data.ops[0]);
    }).catch((err: Error) => {
        console.log('error creating account', err);
    })
});

export default router;
