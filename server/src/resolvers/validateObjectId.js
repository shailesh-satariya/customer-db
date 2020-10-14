const mongoose = require( 'mongoose' );
const { UserInputError } = require( 'apollo-server' );
const { skip } = require( 'graphql-resolvers' );

const validateObjectId = ( parent, { id } ) => {
    if ( !mongoose.Types.ObjectId.isValid( id ) )
        throw new UserInputError( 'Invalid id' );

    return skip;
};

module.exports = { validateObjectId };
