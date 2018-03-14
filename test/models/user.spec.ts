// import * as User from '../../src/models/user';
// import { expect } from 'chai';
// import * as DB from '../../src/services/db';
// import * as mongo from 'mongodb';
// const mockUsers = require('../data/users.json');

// describe.only('User model tests', () => {
//     before((done) => {
//         DB.connect(DB.MODE_TEST)
//             .then(done, done);
//     });

//     beforeEach((done) => {
//         DB.drop()
//             .then(done, done);
//     })

//     describe('User creation', () => {
//         it('should create a user with correct email, first name and last name', (done) => {
//             (function _loop(i) {
//                 if (i < mockUsers.length) {
//                     let user = mockUsers[i];
//                     User.create(user.email, user.firstName, user.lastName, user.password)
//                         .then((result: mongo.InsertOneWriteOpResult) => {
//                             return User.find(result.insertedId);
//                         })
//                         .then((result: any) => {
//                             expect(result.email).to.equal(user.email);
//                             expect(result.firstName).to.equal(user.firstName);
//                             expect(result.lastName).to.equal(user.lastName);
//                             _loop(++i);
//                         })
//                         .catch(done);
//                 } else {
//                     done();
//                 }
//             })(0);
//         });

//         it('should not create a user if email address is empty', (done) => {
//             let user: User.IUser = {
//                 email: '',
//                 firstName: 'John',
//                 lastName: 'Doe',
//                 password: '12345'
//             };

//             User.create(user.email, user.firstName, user.lastName, user.password)
//                 .then((id: mongo.ObjectID) => {
//                     done(new Error('Should not create user'));
//                 })
//                 .catch((err) => {
//                     expect(err).to.be.an('error');
//                     done();
//                 });
//         });

//         it('should not create a user if password is missing', (done) => {
//             let user: User.IUser = {
//                 email: 'john@doe.com',
//                 firstName: 'John',
//                 lastName: 'Doe',
//                 password: ''
//             };

//             User.create(user.email, user.firstName, user.lastName, user.password)
//                 .then(() => {
//                     done(new Error('Should not create user'));
//                 })
//                 .catch((err) => {
//                     expect(err).to.be.an('error');
//                     done();
//                 })
//         });

//         it('should not store passwords as plaintext', (done) => {
//             (function _loop(i) {
//                 if (i < mockUsers.length) {
//                     let user = mockUsers[i];
//                     User.create(user.email, user.firstName, user.lastName, user.password)
//                         .then((result: mongo.InsertOneWriteOpResult) => {
//                             return User.find(result.insertedId);
//                         })
//                         .then((result: any) => {
//                             expect(result.password).to.not.equal(user.password);
//                             _loop(++i);
//                         })
//                         .catch(done);
//                 } else {
//                     done();
//                 }
//             })(0);
//         });

//         it('should match passwords after hashing', (done) => {
//             (function _loop(i) {
//                 if (i < mockUsers.length) {
//                     let user = mockUsers[i];
//                     User.create(user.email, user.firstName, user.lastName, user.password)
//                         .then((result: mongo.InsertOneWriteOpResult) => {
//                             return User.find(result.insertedId);
//                         })
//                         .then((result: any) => {
//                             let userPassword = User.hash(user.password, result.password.salt);
//                             expect(result.password.hash).to.equal(userPassword.hash);
//                             _loop(++i);
//                         })
//                         .catch(done);
//                 } else {
//                     done();
//                 }
//             })(0);
//         });

//         it('should not match a wrong password', (done) => {
//             let user: User.IUser = {
//                 email: 'john@doe.com',
//                 firstName: 'John',
//                 lastName: 'Doe',
//                 password: '12345'
//             };

//             User.create(user.email, user.firstName, user.lastName, user.password)
//                 .then((result: mongo.InsertOneWriteOpResult) => {
//                     return User.find(result.insertedId);
//                 })
//                 .then((result: any) => {
//                     let userPassword = User.hash('123456', result.password.salt);
//                     expect(result.password.hash).to.not.equal(userPassword.hash);
//                     done();
//                 })
//                 .catch(done);
//         });

//         it('should create a 1000 users', (done) => {
//             (function _loop(i) {
//                 if (i < mockUsers.length) {
//                     let user = mockUsers[i];
//                     User.create(user.email, user.firstName, user.lastName, user.password)
//                         .then((result: mongo.InsertOneWriteOpResult) => {
//                             _loop(++i);
//                         })
//                         .catch(done);
//                 } else {
//                     User.all().then((result: any) => {
//                         expect(result.length).to.equal(mockUsers.length);
//                         done();                        
//                     });
//                 }
//             })(0);
//         });

//         it('should remove 1 user', (done) => {
//             let userIdToRemove;
//             (function _loop(i) {
//                 if (i < mockUsers.length) {
//                     let user = mockUsers[i];
//                     User.create(user.email, user.firstName, user.lastName, user.password)
//                         .then((result: mongo.InsertOneWriteOpResult) => {
//                             if (i === 0)
//                                 userIdToRemove = result.insertedId;
//                             _loop(++i);
//                         })
//                         .catch(done);
//                 } else {
//                     User.remove(userIdToRemove).then(() => {
//                         return User.all();             
//                     })
//                     .then((result) => {
//                         expect(result.length).to.equal(mockUsers.length - 1);
//                         done();
//                     })
//                     .catch(done);
//                 }
//             })(0);
//         })
//     });
// });
