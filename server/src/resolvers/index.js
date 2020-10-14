const { GraphQLDateTime } = require( 'graphql-iso-date' );

const userResolvers = require( './user' );
const customerResolvers = require( './customer' );

const customScalarResolver = {
    Date: GraphQLDateTime,
};

module.exports = [
    customScalarResolver,
    userResolvers,
    customerResolvers,
];
