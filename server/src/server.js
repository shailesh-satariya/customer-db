require( 'dotenv/config' );

const http = require( 'http' );
const DataLoader = require( 'dataloader' );
const express = require( 'express' );
const config = require( 'config' );
const {
    ApolloServer,
} = require( 'apollo-server-express' );

const schema = require( './schema' );
const resolvers = require( './resolvers' );
const models = require( './models' );
const loaders = require( './loaders' );
const auth = require( './middleware/auth' );
const startup = require( './startup' );

module.exports = async function () {
    const app = express();
    startup( app );

    const server = new ApolloServer( {
        introspection: true,
        typeDefs: schema,
        resolvers,
        formatError: error => {
            // remove the internal sequelize error message
            // leave only the important validation error
            const message = error.message
                .replace( 'SequelizeValidationError: ', '' )
                .replace( 'Validation error: ', '' );

            return {
                ...error,
                message,
            };
        },
        context: async ( { req, connection } ) => {
            if ( connection ) {
                return {
                    models,
                    loaders: {
                        user: new DataLoader( keys =>
                            loaders.user( keys, models ),
                        ),
                    },
                };
            }

            if ( req ) {
                const me = await auth( req );

                return {
                    models,
                    me,
                    secret: process.env.SECRET,
                    loaders: {
                        user: new DataLoader( keys =>
                            loaders.user( keys, models ),
                        ),
                    },
                };
            }
        },
    } );

    server.applyMiddleware( { app, path: '/graphql' } );

    const httpServer = http.createServer( app );
    server.installSubscriptionHandlers( httpServer );
    const port = process.env.PORT || config.get( "port" );

    httpServer.listen( { port }, () => {
        console.log( `🚀 Server ready at http://localhost:${port}${server.graphqlPath}` );
        console.log( `🚀 Subscriptions ready at ws://localhost:${port}${server.subscriptionsPath}` );
    } );
};
