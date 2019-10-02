import * as express from 'express';
import MasterCategory from '../models/masterCategory';

const router = express.Router();

// router.get('/', (req, res) => {
//     Account.all().then((docs) => {
//         res.send(JSON.stringify(docs, null, 2));
//     });
// });

// router.get('/:id', (req, res) => {
//     Account.get(req.params.id).then((docs) => {
//         res.send(JSON.stringify(docs, null, 2));
//     })
// });

router.post('/', (req, res) => {
    MasterCategory.create({title: req.body.title}).then((masterCategory) => {
        res.send(masterCategory);
    }).catch((err: Error) => {
        console.log('>>> error', err);
        res.status(500).send('Could not create a master category!');
    })
});

export default router;
