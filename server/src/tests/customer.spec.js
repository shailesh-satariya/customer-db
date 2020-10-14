const { expect } = require( 'chai' );
const api = require( './api' );
const connectDb = require( '../startup/db' );
const models = require( '../models' );

const mongoose = require( 'mongoose' );

let db;

jest.setTimeout( 30000 );

const newCustomer = {
    firstname: 'Aida',
    lastname: 'Bugg',
    birthDate: '1985-08-27T00:00:00.000Z'
};

let expectedCustomer;

beforeAll( async () => {
    db = await connectDb();

    const customers = await models.Customer.find()
        .select( "-__v" )
        .sort( { firstname: -1 } ).skip( 0 ).limit( 1 );

    expectedCustomer = customers.length ? customers[ 0 ]._doc : {};

    if ( expectedCustomer._id ) {
        expectedCustomer.birthDate = expectedCustomer.birthDate.toISOString();
        expectedCustomer._id = expectedCustomer._id.toString();
    }
} );

describe( 'Customers', () => {
    describe( 'customer', () => {
        it( 'returns a customer when customer can be found', async () => {
            const expectedResult = {
                data: {
                    customer: {
                        _id: expectedCustomer._id,
                        birthDate: expectedCustomer.birthDate,
                        firstname: expectedCustomer.firstname,
                        lastname: expectedCustomer.lastname
                    },
                },
            };

            const result = await api.customer( { id: expectedCustomer._id } );

            expect( result.data ).to.eql( expectedResult );
        } );

        it( 'returns error when customer cannot be found', async () => {
            const {
                data: { errors },
            } = await api.customer( {
                id: new mongoose.Types.ObjectId(),
            } );

            expect( errors[ 0 ].message ).to.eql( 'Customer not found' );
        } );
    } );

    describe( 'customers (sort: String, filter: String, limit: INT, Offset: INT)', () => {
        it( 'returns a list of customers', async () => {
            const expectedResult = {
                data: {
                    customers: {
                        customers: [
                            {
                                firstname: 'Aida',
                            },
                            {
                                firstname: 'Damien',
                            },
                        ],
                    },
                },
            };

            const result = await api.customers();

            expect( result.data ).to.eql( expectedResult );
        } );

        it( 'should get customers with the users', async () => {
            const expectedResult = {
                data: {
                    customers: {
                        count: '12',
                        customers: [
                            {
                                firstname: 'Aida',
                                user: {
                                    username: 'foo.bar',
                                },
                            },
                            {
                                firstname: 'Damien',
                                user: {
                                    username: 'foo.bar',
                                },
                            },
                        ],
                    },
                },
            };

            const result = await api.customersInclUsers();

            expect( result.data ).to.eql( expectedResult );
        } );
    } );

    describe( 'createCustomer', () => {
        it( 'Create customer without user', async () => {
            const {
                data: { errors },
            } = await api.createCustomer( newCustomer );

            expect( errors[ 0 ].message ).to.eql( 'Not authenticated as user.' );
        } );

        it( 'Create customer', async () => {
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

            const expectedResult = {
                data: {
                    createCustomer: newCustomer,
                },
            };

            let result = await api.createCustomer( newCustomer, token );

            expect( result.data ).to.eql( expectedResult );
        } );
    } );

    describe( 'updateCustomer', () => {
        it( 'Update customer', async () => {
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

            const updateCustomer = {
                _id: expectedCustomer._id,
                firstname: "Aida",
                lastname: "Lee",
                birthDate: expectedCustomer.birthDate
            };

            const expectedResult = {
                data: {
                    updateCustomer,
                },
            };

            let result = await api.updateCustomer( {
                id: updateCustomer._id,
                firstname: updateCustomer.firstname,
                lastname: updateCustomer.lastname,
                birthDate: updateCustomer.birthDate
            }, token );

            expect( result.data ).to.eql( expectedResult );
        } );
    } );
    
    describe( 'deleteCustomer', () => {
        it( 'Delete customer', async () => {
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

            const {
                data: {
                    data: { deleteCustomer },
                },
            } = await api.deleteCustomer( {
                id: expectedCustomer._id
            }, token );

            expect( deleteCustomer ).to.eql( true );
        } );
    } );
} );
