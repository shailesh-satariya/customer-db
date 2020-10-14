const { ForbiddenError } = require( 'apollo-server' );
const { combineResolvers, skip } = require( 'graphql-resolvers' );

const isAuthenticated = ( parent, args, { me } ) =>
    me ? skip : new ForbiddenError( 'Not authenticated as user.' );

const isAdmin = combineResolvers(
    isAuthenticated,
    ( parent, args, { me: { role } } ) =>
        role === 'admin'
            ? skip
            : new ForbiddenError( 'Not authorized as admin.' ),
);

const isCustomerOwner = async (
    parent,
    { id },
    { models, me },
) => {
    const customer = await models.Customer.findById( id );

    if ( customer.userId.toString() !== me._id ) {
        throw new ForbiddenError( 'Not authenticated as owner.' );
    }

    return skip;
};

module.exports = { isAuthenticated, isAdmin, isCustomerOwner };
