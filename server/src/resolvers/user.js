const { AuthenticationError, UserInputError } = require( 'apollo-server' );
const { combineResolvers } = require( 'graphql-resolvers' );
const { isAuthenticated, isAdmin } = require( './authorization' );

module.exports = {
    Query: {
        users: async ( parent, args, { models } ) => {
            return await models.User.find();
        },
        user: async ( parent, { id }, { models } ) => {
            return await models.User.findById( id );
        },
        me: async ( parent, args, { models, me } ) => {
            if ( !me ) {
                return null;
            }

            return await models.User.findById( me._id );
        },
    },

    Mutation: {
        register: async (
            parent,
            { username, password, name },
            { models },
        ) => {
            const User = models.User;
            const userObj = { username, password, name, role: 'user' };

            const { error } = User.validate( userObj );
            if ( error ) {
                throw new UserInputError( error );
            }

            const user = await models.User.create( userObj );

            return { token: user.generateAuthToken() };
        },

        login: async (
            parent,
            { username, password },
            { models },
        ) => {
            const user = await models.User.findOne( { username } );

            if ( !user ) {
                throw new UserInputError(
                    'No user found with this login credentials.',
                );
            }

            const isValid = await user.authenticate( password );

            if ( !isValid ) {
                throw new AuthenticationError( 'Invalid password.' );
            }

            return { token: user.generateAuthToken() };
        },

        updateUser: combineResolvers(
            isAuthenticated,
            async ( parent, { username }, { models, me } ) => {
                const model = await models.User.findByIdAndUpdate(
                    me._id,
                    { username },
                    { new: true },
                );

                return model;
            },
        ),

        deleteUser: combineResolvers(
            isAdmin,
            async ( parent, { id }, { models } ) => {
                const user = await models.User.findById( id );

                if ( user ) {
                    await user.remove();
                    return true;
                } else {
                    return false;
                }
            },
        ),

    }
};
