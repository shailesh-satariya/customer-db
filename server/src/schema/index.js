const { gql } = require( 'apollo-server-express' );

const userSchema = require( './user' );
const customerSchema = require( './customer' );

const linkSchema = gql`
  scalar Date

  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`;

module.exports = [ linkSchema, userSchema, customerSchema ];
