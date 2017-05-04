import * as express from 'express';
import * as Account from '../models/account';

const router = express.Router();

router.get('/', (req, res) => {
    Account.all().then((docs) => {
        res.send(JSON.stringify(docs, null, 2));
    });
});

router.get('/:id', (req, res) => {
    Account.get(req.params.id).then((docs) => {
        res.send(JSON.stringify(docs, null, 2));
    })
});

router.post('/create', (req, res) => {
    Account.create(req.user.id, req.body.initialBalance).then((data: any) => {
        res.send(data.ops[0]);
    }).catch((err: Error) => {
        res.status(500).send('Could not create an account!');
    })
});

export default router;
