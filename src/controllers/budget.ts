import { Router } from 'express';
import BudgetEntry from '../models/budgetEntry';
import SubCategory from '../models/subCategory';
import MasterCategory from '../models/masterCategory';

const router = Router();

router.get('/:month', (req, res) => {
    let subCategories: any[] = [];
    let masterCategories: any[] = [];
    let masterCategoriesObj: any = {};
    return BudgetEntry.find({ month: req.params.month })
        .populate('subCategory')
        .populate('masterCategory')
        .then((entries) => {
            entries.forEach((entry: any) => {
                if (!masterCategoriesObj[entry.masterCategory._id]) {
                    masterCategoriesObj[entry.masterCategory._id] = {
                        id: entry.masterCategory._id,
                        title: entry.masterCategory.title
                    }
                }
                subCategories.push({
                    id: entry.subCategory._id,
                    categoryId: entry.masterCategory._id,
                    title: entry.subCategory.title,
                    budgeted: entry.budgeted,
                    outflows: entry.outflows,
                    balance: entry.balance,
                });
            });

            for (const key in masterCategoriesObj) {
                masterCategories.push(masterCategoriesObj[key]);
            }

            res.send({
                month: req.params.month,
                masterCategories,
                subCategories,
            });
        })
        .catch((err) => {
            console.log('error', err);
            res.send(err);
        });
});

export default router;
