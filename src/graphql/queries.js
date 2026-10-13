import { gql } from "@apollo/client";

export const GET_ALL_TASKS = gql`
  query GetAllTasks {
    allTasks {
      id
      title
      done
      category {
        id
        name
      }
    }
  }
`;
