import {gql} from '@apollo/client';

const CUSTOMER_DATA = `
  __typename
  _id
  firstname
  lastname
  birthDate
  userId
`;

export const CUSTOMER_TILE_DATA = gql`
  fragment CustomerTile on Customer {
    ${CUSTOMER_DATA}
  }
`;

export const GET_CUSTOMERS = gql`
  query GetCustomerList($sort: String, $filter: String, $offset: Int, $limit: Int) {
    customers(sort: $sort, filter: $filter, offset: $offset, limit: $limit) {
      count
      customers {
        ...CustomerTile
      }
    }
  }
  ${CUSTOMER_TILE_DATA}
`;

export const GET_CUSTOMER_DETAILS = gql`
  query CustomerDetails($customerId: ID!) {
    customer(id: $customerId) {
      ...CustomerTile
    }
  }
  ${CUSTOMER_TILE_DATA}
`;

export const DELETE_CUSTOMER = gql`
  mutation DeleteCustomer($id: ID!) {
    deleteCustomer(id: $id)
  }
`;

export const CREATE_CUSTOMER = gql`
  mutation CreateCustomer($firstname: String!, $lastname: String!, $birthDate: String! ) {
    createCustomer(firstname: $firstname, lastname: $lastname, birthDate: $birthDate ) {
      ...CustomerTile
    }
  }
  ${CUSTOMER_TILE_DATA}
`;

export const UPDATE_CUSTOMER = gql`
  mutation UpdateCustomer($id: ID!, $firstname: String!, $lastname: String!, $birthDate: String! ) {
    updateCustomer(id: $id, firstname: $firstname, lastname: $lastname, birthDate: $birthDate ) {
      ...CustomerTile
    }
  }
  ${CUSTOMER_TILE_DATA}
`;

export const CUSTOMER_CREATE_SUBSCRIPTION = gql`
  subscription  {
    customerAdded {
      ${CUSTOMER_DATA}
    }
  }
`;

export const CUSTOMER_UPDATED_SUBSCRIPTION = gql`
  subscription  {
    customerUpdated {
      ${CUSTOMER_DATA}
    }
  }
`;

export const CUSTOMER_DELETED_SUBSCRIPTION = gql`
  subscription  {
    customerDeleted {
      ${CUSTOMER_DATA}
    }
  }
`;
