import { ApolloClient, InMemoryCache } from "@apollo/client";

// Адрес вашего Strawberry GraphQL-сервера из темы 2.2
// (по умолчанию Strawberry + FastAPI: http://localhost:8000/graphql)
const GRAPHQL_URI = "http://localhost:8000/graphql";

export const client = new ApolloClient({
  uri: GRAPHQL_URI,
  cache: new InMemoryCache(),
});
