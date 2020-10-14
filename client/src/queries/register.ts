import {gql} from "@apollo/client";

export const REGISTER_USER = gql`
  mutation Register($username: String!, $password: String!, $name: String!) {
    register(username: $username, password: $password, name: $name) {
      token
    }
  }
`;