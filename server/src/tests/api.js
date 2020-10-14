const axios = require( 'axios' );

const API_URL = 'http://localhost:3900/graphql';

const seed = require( '../seed/index' );
const server = require( '../server' );

let bStarted = false;
const startUp = async function () {
    if ( bStarted ) {
        return;
    }

    await seed();
    await server();
    bStarted = true;
};

const login = async variables =>
    await axios.post( API_URL, {
        query: `
      mutation ($username: String!, $password: String!) {
        login(username: $username, password: $password) {
          token
        }
      }
    `,
        variables,
    } );

const me = async token =>
    await axios.post(
        API_URL,
        {
            query: `
        {
          me {
            _id
            name
            username
          }
        }
      `,
        },
        token
            ? {
                headers: {
                    'x-auth-token': token,
                },
            }
            : null,
    );

const user = async variables =>
    axios.post( API_URL, {
        query: `
      query ($id: ID!) {
        user(id: $id) {
          _id
          username
          name
          role
        }
      }
    `,
        variables,
    } );

const users = async () =>
    axios.post( API_URL, {
        query: `
      {
        users {
          _id
          username
          name
          role
        }
      }
    `,
    } );

const register = async variables =>
    axios.post( API_URL, {
        query: `
      mutation(
        $username: String!,
        $name: String!,
        $password: String!
      ) {
        register(
          username: $username,
          name: $name,
          password: $password
        ) {
          token
        }
      }
    `,
        variables,
    } );

const updateUser = async ( variables, token ) =>
    axios.post(
        API_URL,
        {
            query: `
        mutation ($username: String!) {
          updateUser(username: $username) {
            username
          }
        }
      `,
            variables,
        },
        token
            ? {
                headers: {
                    'x-auth-token': token,
                },
            }
            : null,
    );

const deleteUser = async ( variables, token ) =>
    axios.post(
        API_URL,
        {
            query: `
        mutation ($id: ID!) {
          deleteUser(id: $id)
        }
      `,
            variables,
        },
        token
            ? {
                headers: {
                    'x-auth-token': token,
                },
            }
            : null,
    );

const customer = async variables =>
    axios.post( API_URL, {
        query: `
      query ($id: ID!) {
        customer(id: $id) {
          _id
          firstname
          lastname
          birthDate
        }
      }
    `,
        variables,
    } );


const customers = async () =>
    axios.post( API_URL, {
        query: `
  query {
    customers ( sort: "firstname", filter: "", limit: 2, offset: 0) {
        customers {
          firstname
        }
      }
    }
  `,
    } );

const customersInclUsers = async () =>
    axios.post( API_URL, {
        query: `
    query {
        customers ( sort: "firstname", filter: "", limit: 2, offset: 0) {
            count
            customers {
              firstname
                user {
                    username
                }
            }
 
        }
    }
  `,
    } );

const createCustomer = async ( variables, token ) =>
    axios.post( API_URL, {
            query: `
      mutation(
        $firstname: String!,
        $lastname: String!,
        $birthDate: String!
      ) {
        createCustomer(
          firstname: $firstname,
          lastname: $lastname,
          birthDate: $birthDate
        ) {
          firstname
          lastname
          birthDate
        }
      }
    `,
            variables,
        },
        token
            ? {
                headers: {
                    'x-auth-token': token,
                },
            }
            : null,
    );


const updateCustomer = async ( variables, token ) =>
    axios.post( API_URL, {
            query: `
      mutation(
        $id: ID!,
        $firstname: String!,
        $lastname: String!,
        $birthDate: String!
      ) {
        updateCustomer(
          id: $id,
          firstname: $firstname,
          lastname: $lastname,
          birthDate: $birthDate
        ) {
          _id
          firstname
          lastname
          birthDate
        }
      }
    `,
            variables,
        },
        token
            ? {
                headers: {
                    'x-auth-token': token,
                },
            }
            : null,
    );

const deleteCustomer = async ( variables, token ) =>
    axios.post( API_URL, {
            query: `
      mutation(
        $id: ID!
      ) {
        deleteCustomer(
          id: $id
        )
      }
    `,
            variables,
        },
        token
            ? {
                headers: {
                    'x-auth-token': token,
                },
            }
            : null,
    );

const voteCustomer = async ( variables, token ) =>
    axios.post( API_URL, {
            query: `
      mutation(
        $id: ID!,
        $score: Int!
      ) {
        voteCustomer(
          id: $id,
          score: $score,
        ) {
          _id
          rating
          myVote
        }
      }
    `,
            variables,
        },
        token
            ? {
                headers: {
                    'x-auth-token': token,
                },
            }
            : null,
    );

module.exports = {
    startUp,
    me,
    login,
    user,
    users,
    register,
    updateUser,
    deleteUser,
    customer,
    customers,
    customersInclUsers,
    createCustomer,
    deleteCustomer,
    updateCustomer,
    voteCustomer
};
