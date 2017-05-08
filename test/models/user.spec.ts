import * as User from '../../src/models/user';
import { expect } from 'chai';
import * as DB from '../../src/services/db';
import * as mongo from 'mongodb';
const mockUsers = require('../data/users.json');

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
            (function _loop(i) {
                if (i < mockUsers.length) {
                    let user = mockUsers[i];
                    User.create(user)
                        .then((result: mongo.InsertOneWriteOpResult) => {
                            return User.find({
                                _id: result.insertedId
                            });
                        })
                        .then((result: any) => {
                            expect(result.email).to.equal(user.email);
                            expect(result.firstName).to.equal(user.firstName);
                            expect(result.lastName).to.equal(user.lastName);
                            _loop(++i);
                        })
                        .catch(done);
                } else {
                    done();
                }
            })(0);
        });

        it('should not create a user if email address is empty', (done) => {
            let user: User.IUser = {
                email: '',
                firstName: 'John',
                lastName: 'Doe'
            };

            User.create(user)
                .then((id: mongo.ObjectID) => {
                    done(new Error('Should not create user'));
                })
                .catch((err) => {
                    expect(err).to.be.an('error');
                    done();
                });
        });
    });
});
