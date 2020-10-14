const { expect } = require( 'chai' );
const api = require( './api' );
const connectDb = require( '../startup/db' );
const models = require( '../models' );

const mongoose = require( 'mongoose' );

let db;
let expectedUser;
let expectedAdminUser;

beforeAll( async () => {
    db = await connectDb();

    const users = await models.User.find();

    const user = users.filter(
        user => user.role !== 'admin',
    )[ 0 ];

    expectedUser = user && user._doc ? user._doc : {};

    let admin = users.filter(
        user => user.role === 'admin',
    )[ 0 ];

    expectedAdminUser = admin && admin._doc ? admin._doc : {};
} );

describe( 'users', () => {
    describe( 'user(id: String!): User', () => {
        it( 'returns a user when user can be found', async () => {
            const expectedResult = {
                data: {
                    user: {
                        _id: expectedUser._id ? expectedUser._id.toString() : '',
                        username: expectedUser.username,
                        name: expectedUser.name,
                        role: expectedUser.role,
                    },
                },
            };

            const result = await api.user( { id: expectedUser._id.toString() } );

            expect( result.data ).to.eql( expectedResult );
        } );

        it( 'returns null when user cannot be found', async () => {
            const expectedResult = {
                data: {
                    user: null,
                },
            };

            const result = await api.user( {
                id: new mongoose.Types.ObjectId(),
            } );

            expect( result.data ).to.eql( expectedResult );
        } );
    } );

    describe( 'users: [User!]', () => {
        it( 'returns a list of users', async () => {
            const expectedResult = {
                data: {
                    users: [
                        {
                            _id: expectedAdminUser._id ? expectedAdminUser._id.toString() : '',
                            username: expectedAdminUser.username,
                            name: expectedAdminUser.name,
                            role: expectedAdminUser.role,
                        },
                        {
                            _id: expectedUser._id ? expectedUser._id.toString() : '',
                            username: expectedUser.username,
                            name: expectedUser.name,
                            role: expectedUser.role,
                        },
                    ],
                },
            };

            const result = await api.users();

            expect( result.data ).to.eql( expectedResult );
        } );
    } );

    describe( 'me: User', () => {
        it( 'returns null when no user is signed in', async () => {
            const expectedResult = {
                data: {
                    me: null,
                },
            };

            const { data } = await api.me();

            expect( data ).to.eql( expectedResult );
        } );

        it( 'returns me when me is signed in', async () => {
            const expectedResult = {
                data: {
                    me: {
                        _id: expectedAdminUser._id ? expectedAdminUser._id.toString() : '',
                        username: expectedAdminUser.username,
                        name: expectedAdminUser.name,
                    },
                },
            };

            const {
                data: {
                    data: {
                        login: { token },
                    },
                },
            } = await api.login( {
                username: 'admin',
                password: 'admin',
            } );

            const { data } = await api.me( token );

            expect( data ).to.eql( expectedResult );
        } );
    } );

    describe( 'register, updateUser, deleteUser', () => {
        it( 'logs in a user, updates a user and deletes the user as admin', async () => {
            // sign up

            let {
                data: {
                    data: {
                        register: { token },
                    },
                },
            } = await api.register( {
                username: 'max_mull',
                name: 'Max Mueller',
                password: 'asdasdasd',
            } );

            const expectedNewUser = await models.User.findByLogin(
                'max_mull',
            );
            const newUser = expectedNewUser._doc || {};

            const {
                data: {
                    data: { me },
                },
            } = await api.me( token );

            expect( me ).to.eql( {
                _id: newUser._id.toString(),
                username: newUser.username,
                name: newUser.name,
            } );

            // update as user

            const {
                data: {
                    data: { updateUser },
                },
            } = await api.updateUser( { username: 'max_mueller' }, token );

            expect( updateUser.username ).to.eql( 'max_mueller' );

            // delete as admin
            const {
                data: {
                    data: {
                        login: { token: adminToken },
                    },
                },
            } = await api.login( {
                username: 'admin',
                password: 'admin',
            } );

            const {
                data: {
                    data: { deleteUser },
                },
            } = await api.deleteUser( { id: me._id }, adminToken );

            expect( deleteUser ).to.eql( true );
        } );
    } );

    describe( 'deleteUser(id: String!): Boolean!', () => {
        it( 'returns an error because only admins can delete a user', async () => {
            const {
                data: {
                    data: {
                        login: { token },
                    },
                },
            } = await api.login( {
                username: 'foo.bar',
                password: 'foobar',
            } );

            const id = expectedAdminUser._id ? expectedAdminUser._id.toString() : '';
            const {
                data: { errors },
            } = await api.deleteUser( { id }, token );

            expect( errors[ 0 ].message ).to.eql( 'Not authorized as admin.' );
        } );
    } );

    describe( 'updateUser(username: String!): User!', () => {
        it( 'returns an error because only authenticated users can update a user', async () => {
            const {
                data: { errors },
            } = await api.updateUser( { username: 'Marc' } );

            expect( errors[ 0 ].message ).to.eql( 'Not authenticated as user.' );
        } );
    } );

    describe( 'login(login: String!, password: String!): Token!', () => {
        it( 'returns a token when a user signs in with username', async () => {
            const {
                data: {
                    data: {
                        login: { token },
                    },
                },
            } = await api.login( {
                username: 'foo.bar',
                password: 'foobar',
            } );

            expect( token ).to.be.a( 'string' );
        } );

        it( 'returns an error when a user provides a wrong password', async () => {
            const {
                data: { errors },
            } = await api.login( {
                username: 'foo.bar',
                password: 'addaadadadadad',
            } );

            expect( errors[ 0 ].message ).to.eql( 'Invalid password.' );
        } );
    } );

    it( 'returns an error when a user is not found', async () => {
        const {
            data: { errors },
        } = await api.login( {
            username: 'dontknow',
            password: 'ddavids',
        } );

        expect( errors[ 0 ].message ).to.eql(
            'No user found with this login credentials.',
        );
    } );
} );
