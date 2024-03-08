import { GraphQLClient } from "graphql-request";

const API_BASE_URL = process.env.API_BASE_URL ?? "";

export const gqlClient = new GraphQLClient(`${API_BASE_URL}/graphql`, {});
