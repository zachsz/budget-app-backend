import * as User from '../../src/models/user';
import { expect } from 'chai';
import * as DB from '../../src/services/db';
import {ObjectID} from 'mongodb';

describe.only('User model tests', () => {
    before((done) => {
        DB.connect(DB.MODE_TEST)
            .then(done, done);
    });

    beforeEach((done) => {
        DB.drop()
        .then(done, done);
    })

    describe('User creation', () => {
        it('should create a user with correct email, first name and last name', (done) => {
            let user: User.IUser = {
                email: 'user@email.com',
                firstName: 'James',
                lastName: 'Bond'
            }
            User.create(user)
            .then((id: ObjectID) => {
                return User.find({
                    _id: id
                });
            })
            .then((result) => {
                expect(result.length).to.equal(1);
                done();
            })
            .catch(done);
        });
    });
});
