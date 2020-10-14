const mongoose = require( 'mongoose' );
const config = require( 'config' );

module.exports = function () {
    const url = config.get( 'db' );
    const db = mongoose.connect( url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    } )
        .then( () => console.info( `Connected to ${url}...` ) );

    return db;
};
