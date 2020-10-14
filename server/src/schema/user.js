const { gql } = require( 'apollo-server-express' );

module.exports = gql`
  extend type Query {
    users: [User!]
    user(id: ID!): User
    me: User
  }

  extend type Mutation {
    register(
      username: String!
      password: String!
      name: String!
    ): Token!

    login(username: String!, password: String!): Token!
    updateUser(username: String!): User!
    deleteUser(id: ID!): Boolean!
  }

  type Token {
    token: String!
  }

  type User {
    _id: ID!
    username: String!
    name: String!
    role: String!
  }
`;
