import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type Task {
    id: ID!
    title: String!
    description: String
    completed: Boolean!
    dueDate: String!
  }

  input TaskInput {
    title: String!
    description: String
    completed: Boolean
    dueDate: String!
  }

  type Query {
    tasks(
      completed: Boolean
      startDate: String
      endDate: String
      page: Int
      pageSize: Int
    ): [Task!]!

    task(id: ID!): Task
  }

  type Mutation {
    createTask(input: TaskInput!): Task!
    updateTask(id: ID!, input: TaskInput!): Task!
    deleteTask(id: ID!): Boolean!
    deleteAllTasks: Boolean!
    markAllTasksCompleted: Int!
  }
`;
