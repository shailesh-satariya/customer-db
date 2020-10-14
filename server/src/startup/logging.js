const morgan = require( 'morgan' );
const winston = require( 'winston' );
require( 'express-async-errors' );

module.exports = function ( app ) {
    winston.exceptions.handle(
        new winston.transports.Console( { colorize: true, prettyPrint: true } ),
        new winston.transports.File( { filename: 'logs/uncaughtExceptions.log' } ) );

    process.on( 'unhandledRejection', ( ex ) => {
        throw ex;
    } );

    const logger = winston.createLogger({
        exitOnError: false,
        level: 'info',
        transports: [
            new (winston.transports.Console)(),
            new (winston.transports.File)( { filename: 'logs/app.log' } )
        ]
    } );

    logger.stream = {
        write: function ( message ) {
            logger.info( message );
        }
    };

    app.use( morgan( 'combined', { "stream": logger.stream } ) );
};
