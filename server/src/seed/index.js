const models = require( '../models' );
const mongoose = require( 'mongoose' );
const config = require( 'config' );
const encryption = require( '../utils/encryption' );

const customers = [
    { firstname: "Aida", lastname: "Bugg", birthDate: "1980-08-27" },
    { firstname: "Ray", lastname: "Sin", birthDate: "2009-06-05" },
    { firstname: "Eileen", lastname: "Sideways", birthDate: "2005-07-15" },
    { firstname: "Rita", lastname: "Book", birthDate: "1988-07-20" },
    { firstname: "Greg", lastname: "Arias", birthDate: "1984-10-26" },
    { firstname: "Damien", lastname: "Motley", birthDate: "2012-05-04" },
    { firstname: "Elbert", lastname: "Ricci", birthDate: "2004-06-25" },
    { firstname: "Harry", lastname: "Parker", birthDate: "1989-07-21" },
    { firstname: "Janeth", lastname: "Carrow", birthDate: "1990-03-23" },
    { firstname: "Stefen", lastname: "Fleming", birthDate: "1999-08-06" },
    { firstname: "Mathhew", lastname: "Hayden", birthDate: "2014-10-03" },
    { firstname: "Tim", lastname: "Bresnon", birthDate: "2001-08-10" }
];

const adminUser = {
    username: 'admin',
    name: 'Administrator',
    password: 'admin',
    role: 'admin'
};

const user = {
    username: 'foo.bar',
    name: 'Foo Bar',
    password: 'foobar',
    role: 'user'
};

module.exports = async function () {
    await mongoose.connect( config.get( "db" ) );

    const { Customer, User } = models;

    await User.deleteMany( {} );
    adminUser.password = await encryption.generateHashedPassword( adminUser.password );
    await User.create( adminUser );

    user.password = await encryption.generateHashedPassword( user.password );
    const userRecord = await User.create( user );

    for ( const customer of customers ) {
        customer.userId = userRecord._id;
    }
    await Customer.deleteMany( {} );
    await Customer.insertMany( customers );

    await mongoose.disconnect();

    console.info( "Seeding done!" );
};
