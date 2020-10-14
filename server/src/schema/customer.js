const { gql } = require( 'apollo-server-express' );

module.exports = gql`
  extend type Query {
    customers(sort: String, filter: String, offset: Int, limit: Int): CustomerConnection!
    customer(id: ID!): Customer!
  }

  extend type Mutation {
    createCustomer(firstname: String!, lastname: String!, birthDate: String!): Customer!
    updateCustomer(id: ID!, firstname: String!, lastname: String!, birthDate: String!): Customer!
    deleteCustomer(id: ID!): Boolean!
  }

  type CustomerConnection {
    customers: [Customer!]!
    count: String!
  }

  type Customer {
    _id: ID!
    firstname: String!
    lastname: String!
    birthDate: Date!
    userId: String!
    user: User!
  }

  extend type Subscription {
    customerAdded: Customer!
    customerUpdated: Customer!
    customerDeleted: Customer!
  }

  type CustomerSub {
    customer: Customer!
  }
`;
