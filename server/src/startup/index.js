const checkConfig = require( './config' );
const applyCors = require( './cors' );
const connectDb = require( './db' );
const logging = require( './logging' );
const joiValidation = require( './validation' );

module.exports = function ( app ) {
    checkConfig();
    applyCors( app );
    connectDb();
    logging( app );
    joiValidation();
};
