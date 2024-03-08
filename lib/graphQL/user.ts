import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation register($username: String!, $email: String!, $password: String!) {
    register(
      input: { username: $username, email: $email, password: $password }
    ) {
      user {
        id
      }
    }
  }
`;
