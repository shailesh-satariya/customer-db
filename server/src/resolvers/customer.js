const { combineResolvers } = require('graphql-resolvers');
const { ApolloError, UserInputError } = require('apollo-server');

const { pubsub, EVENTS } = require('../subscription');
const { isAuthenticated, isCustomerOwner } = require('./authorization');
const { validateObjectId } = require('./validateObjectId');

module.exports = {
    Query: {
        customers: async (parent, { sort: sortArg, filter: filterArg, offset: offsetArg, limit: limitArg }, { models }) => {
            const Customer = models.Customer;

            let sort = (typeof sortArg === 'string' && sortArg.trim().length) ? sortArg.trim() : 'firstname';
            let order = sort[0] === '-' ? -1 : 1;
            sort = sort[0] === '-' ? sort.substr(1) : sort;


            const filter = (typeof filterArg === 'string' && filterArg.trim().length) ? {
                $or: [{
                    firstname: {
                        $regex: filterArg.trim(),
                        $options: 'i'
                    }
                }, {
                    lastname: {
                        $regex: filterArg.trim(),
                        $options: 'i'
                    }
                },]
            } : {};
            const offset = !isNaN(offsetArg) ? Number(offsetArg) : 0;
            const limit = !isNaN(limitArg) ? Math.min(Number(limitArg), 20) : 5;


            const count = await Customer.countDocuments(filter);
            const customers = await Customer.find(filter)
                .select("-__v")
                .sort({ [sort]: order }).skip(offset).limit(limit);

            return { count, customers };
        },
        customer: combineResolvers(
            validateObjectId,
            async (parent, { id }, { models }) => {
                const customer = await models.Customer.findById(id);
                if (!customer) {
                    throw new ApolloError('Customer not found');
                }

                return customer;

            }),
    },

    Mutation: {
        createCustomer: combineResolvers(
            isAuthenticated,
            async (parent, { firstname, lastname, birthDate }, { models, me }) => {
                const Customer = models.Customer;
                const customerObj = {
                    firstname: firstname,
                    lastname: lastname,
                    birthDate: new Date(birthDate).toString(),
                    userId: me._id
                };
                const { error } = Customer.validate(customerObj);
                if (error) {
                    throw new UserInputError(error);
                }

                const customer = new Customer(customerObj);
                await customer.save();

                await pubsub.publish(EVENTS.MESSAGE.ADDED, {
                    customerAdded: customer,
                });

                return customer;
            },
        ),

        updateCustomer: combineResolvers(
            isAuthenticated,
            async (parent, { id, firstname, lastname, birthDate }, { models, me }) => {
                const Customer = models.Customer;
                const customerObj = {
                    firstname: firstname,
                    lastname: lastname,
                    birthDate: new Date(birthDate).toString(),
                    userId: me._id
                };

                const { error } = Customer.validate(customerObj);
                if (error) {
                    throw new UserInputError(error);
                }

                const customer = await Customer.findByIdAndUpdate(
                    id,
                    customerObj,
                    { new: true }
                );

                if (!customer) {
                    throw new ApolloError('Customer not found');
                }

                await pubsub.publish(EVENTS.MESSAGE.UPDATED, {
                    customerUpdated: customer,
                });

                return customer;
            },
        ),

        deleteCustomer: combineResolvers(
            isAuthenticated,
            async (parent, { id }, { models }) => {
                const customer = await models.Customer.findById(id);

                if (customer) {
                    await customer.remove();

                    await pubsub.publish(EVENTS.MESSAGE.DELETED, {
                        customerDeleted: customer,
                    });
                    return true;
                } else {
                    return false;
                }
            },
        ),
    },

    Customer: {
        user: async (customer, args, { loaders }) => {
            return await loaders.user.load(customer.userId);
        }
    },

    Subscription: {
        customerAdded: {
            subscribe: () => pubsub.asyncIterator(EVENTS.MESSAGE.ADDED),
        },
        customerUpdated: {
            subscribe: () => pubsub.asyncIterator(EVENTS.MESSAGE.UPDATED),
        },
        customerDeleted: {
            subscribe: () => pubsub.asyncIterator(EVENTS.MESSAGE.DELETED),
        },
    },
};
