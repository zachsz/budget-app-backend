import * as request from 'supertest';
import { readFileSync } from 'fs';
import * as path from 'path';

import app from '../../server';
import MasterCategory from '../../src/models/masterCategory';
import SubCategory from '../../src/models/subCategory';
import BudgetEntry from '../../src/models/budgetEntry';

describe.only('Import controller tests', function () {
    this.timeout(4000);
    
    beforeEach(() => {
        return Promise.all([
            MasterCategory.deleteMany({}),
            SubCategory.deleteMany({}),
            BudgetEntry.deleteMany({})
        ]);
    });
    
    it('should correctly import budget entries', () => {
        return request(app)
            .post('/import/budget')
            .attach('budget', readFileSync(path.resolve(process.cwd(), 'test/data/budget.csv')))
            .expect(200)
            .then((res) => {
                console.log('hello!', res.body);
            })
    });
})