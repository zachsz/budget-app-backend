import { Router, Request } from 'express';
import * as Busboy from 'busboy';

import MasterCategory from '../models/masterCategory';
import SubCategory from '../models/subCategory';
import BudgetEntry from '../models/budgetEntry';
import masterCategory from '../models/masterCategory';
import subCategory from '../models/subCategory';

const router = Router();

interface UploadBudgetReq extends Request {
    budget: Buffer;
}

router.post('/budget', (req: UploadBudgetReq, res, next) => {
    const busboy = new Busboy({ headers: req.headers });
    const budgetFound = false;

    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
        let budget: Buffer = new Buffer('', 'utf8');

        file.on('data', (chunk: any) => {
            budget += chunk;
        });

        file.on('end', () => {
            req.budget = budget;
            next();
        });
    });

    req.pipe(busboy);
}, async (req: UploadBudgetReq, res) => {
    const lines = req.budget.toString().split(/(?:\r\n|\r|\n)/g);

    const keys = lines[0].replace(/(\")/g, '').replace(/ /g, '_').replace('\ufeff', '').toLowerCase().split(',');

    const budgetData: any[] = [];

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        const parts = line.replace(/(\")/g, '').split(',');
        const obj: any = {};
        keys.forEach((key, index) => {
            if (parts[index]) {
                obj[key] = parts[index];
            }
        });
        if (obj.month) {
            budgetData.push(obj);
        }
    }

    const months: any = {};
    const categories: any = {};
    const subCategories: any = {};
    let currentMasterCatId = 0;
    let currentSubCatId = 0;

    (function _loop(i) {
        if (i < budgetData.length) {
            let entry = budgetData[i];
            if (entry.master_category) {
                let masterCat: any;
                let subCat: any;
                MasterCategory.findOne({ title: entry.master_category })
                    .then((masterCategory) => {
                        if (masterCategory) {
                            return masterCategory;
                        } else {
                            return MasterCategory.create({ title: entry.master_category });
                        }
                    })
                    .then((masterCategory) => {
                        masterCat = masterCategory;
                        if (entry.sub_category) {
                            return SubCategory.findOne({ title: entry.sub_category, masterCategory: masterCat._id });
                        } else {
                            return Promise.reject('no sub cat!');
                        }
                    })
                    .then((subCategory) => {
                        if (subCategory) {
                            return subCategory;
                        } else {
                            return SubCategory.create({ title: entry.sub_category, masterCategory: masterCat._id })
                        }
                    })
                    .then((subCategory) => {
                        subCat = subCategory;
                        // console.log('entry month???', !!entry.month);
                        if (entry.month) {
                            const budgeted = entry.budgeted || '£0.00';
                            const outflows = entry.outflows || '£0.00';
                            const balance = entry.balance || '£0.00';
                            return BudgetEntry.create({
                                month: entry.month,
                                masterCategory: masterCat._id,
                                subCategory: subCat._id,
                                budgeted: budgeted.replace('£', ''),
                                outflows: outflows.replace('£', ''),
                                balance: balance.replace('£', '')
                            })
                        } else {
                            return Promise.reject('no month!');
                        }
                    })
                    .then((budgetEntry) => {
                        _loop(++i);
                    })
                    .catch((err) => {
                        _loop(++i);
                    });
            } else {
                _loop(++i);
            }
        } else {
            res.send('all done here...');
        }
    })(0);
});

export default router;
