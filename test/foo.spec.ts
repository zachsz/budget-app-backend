import { expect } from 'chai';
import MasterCategory from '../src/models/masterCategory';
import SubCategory from '../src/models/subCategory';
import BudgetEntry from '../src/models/budgetEntry';

describe('basic model tests', () => {
    beforeEach(() => {
        return Promise.all([
            MasterCategory.deleteMany({}),
            SubCategory.deleteMany({}),
            BudgetEntry.deleteMany({})
        ]);
    });

    it('should create a master category', () => {
        return MasterCategory.create({
            title: 'Monthly Bills'
        })
            .then((result: any) => {
                expect(result.title).to.equal('Monthly Bills');
            });
    });

    it('should create a subcategory belonging to a master category', () => {
        let masterCat: any;
        return MasterCategory.create({
            title: 'Test Category'
        })
            .then((result) => {
                masterCat = result;
                return SubCategory.create({
                    title: 'Test Sub Category',
                    masterCategory: masterCat._id
                });
            })
            .then((subCategory: any) => {
                expect(subCategory.title).to.equal('Test Sub Category');
                expect(subCategory.masterCategory).to.equal(masterCat._id);
            });
    });

    it('should create a budget entry for a test subcategory', () => {
        let masterCat: any;
        let subCat: any;
        return MasterCategory.create({
            title: 'Test Category'
        })
            .then((result) => {
                masterCat = result;
                expect(masterCat.title).to.equal('Test Category');
                return SubCategory.create({
                    title: 'Test Sub Category',
                    masterCategory: masterCat._id
                });
            })
            .then((result: any) => {
                subCat = result;
                expect(subCat.title).to.equal('Test Sub Category');
                expect(subCat.masterCategory).to.equal(masterCat._id);
                return BudgetEntry.create({
                    month: 'January 2018',
                    subCategory: subCat._id
                });
            })
            .then((budgetEntry: any) => {
                expect(budgetEntry.month).to.equal('January 2018');
                expect(budgetEntry.subCategory).to.equal(subCat._id);
                expect(budgetEntry.budgeted).to.equal(0.00);
                expect(budgetEntry.outflows).to.equal(0.00);
                expect(budgetEntry.balance).to.equal(0.00);
            });
    });
});
