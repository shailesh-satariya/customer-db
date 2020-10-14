const config = require( 'config' );
const jwt = require( 'jsonwebtoken' );
const mongoose = require( 'mongoose' );
const joi = require( 'joi' );
const Encryption = require( '../utils/encryption' );

const userSchema = new mongoose.Schema( {
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    username: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    role: {
        type: String
    },
} );

userSchema.methods.generateAuthToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            name: this.name,
            user: this.user,
            role: this.role
        },
        config.get( "jwtPrivateKey" )
    );
};

userSchema.methods.authenticate = async function ( password ) {
    return await Encryption.matchPassword( password, this.password );
};

userSchema.statics.validate = function ( user ) {
    const schema = joi.object({
        name: joi.string()
            .min( 2 )
            .max( 50 )
            .required(),
        username: joi.string()
            .min( 5 )
            .max( 255 )
            .required(),
        password: joi.string()
            .min( 5 )
            .max( 255 )
            .required(),
        role: joi.string()
            .min( 2 )
            .max( 50 )
            .required()
    });

    return schema.validate( user );
};

userSchema.statics.findByLogin = async function ( login ) {
    const user = await this.findOne( {
        username: login,
    } );

    return user;
};


const User = mongoose.model( "User", userSchema );

module.exports = User;
