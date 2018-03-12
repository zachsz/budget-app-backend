import { Router, Request } from 'express';
import * as Busboy from 'busboy';

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
}, (req: UploadBudgetReq, res) => {
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

    budgetData.forEach(entry => {
        if (!months[entry.month]) {
            months[entry.month] = {};
        }
        if (!months[entry.month]['categories']) {
            months[entry.month]['categories'] = {};
        }

        if (!months[entry.month]['categories'][entry.master_category]) {
            months[entry.month]['categories'][entry.master_category] = {
                id: currentMasterCatId.toString(),
                title: entry.master_category
            };
            currentMasterCatId++;
        }

        if (!months[entry.month]['subCategories']) {
            months[entry.month]['subCategories'] = {};
        }
        if (!months[entry.month]['subCategories'][entry.sub_category]) {
            months[entry.month]['subCategories'][entry.sub_category] = {
                id: currentSubCatId.toString(),
                categoryId: months[entry.month]['categories'][entry.master_category].id,
                title: entry.sub_category,
                budgeted: parseFloat(entry.budgeted.replace('£', ''))
            };
            currentSubCatId++;
        }
    });

    // budgetData.forEach((entry) => {
    //     if (!categories[entry.master_category]) {
    //         categories[entry.master_category] = {
    //             id: currentMasterCatId.toString(),
    //             name: entry.master_category
    //         };
    //         currentMasterCatId++;
    //     }

    //     if (!subCategories[entry.sub_category]) {
    //         subCategories[entry.sub_category] = {
    //             id: currentSubCatId.toString(),
    //             categoryId: categories[entry.master_category].id,
    //             title: entry.sub_category,
    //             budgeted: parseFloat(entry.budgeted.replace('£', ''))
    //         };
    //     }
    //     currentSubCatId++;
    // });

    res.send(months);
});

export default router;
