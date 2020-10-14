const { AuthenticationError } = require( 'apollo-server-express' );
const jwt = require( 'jsonwebtoken' );
const config = require( 'config' );

module.exports = function ( req ) {
    const token = req.header( "x-auth-token" );

    if ( token ) {
        try {
            const user = jwt.verify( token, config.get( "jwtPrivateKey" ) );
            return user;
        } catch ( ex ) {
            throw new AuthenticationError(
                'Your session expired. Sign in again.',
            );
        }
    }

};
