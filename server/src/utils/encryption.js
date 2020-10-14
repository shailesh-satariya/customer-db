const bcrypt = require( 'bcryptjs' );

module.exports = {
    generateHashedPassword: ( pwd ) => {
        const salt = bcrypt.genSaltSync( 10 );
        return bcrypt.hashSync( pwd, salt );
    },
    matchPassword: ( pwd, hashedPwd ) => {
        return bcrypt.compareSync( pwd, hashedPwd );
    }
};
