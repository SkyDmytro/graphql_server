# Todo Management Backend

## A GraphQL-based backend for managing todo lists.

### Overview

This project provides a simple backend API for managing todo lists using GraphQL. It allows users to create, read, update, and delete (CRUD) todo items.

### Features

GraphQL API: A GraphQL schema is defined to provide a flexible and efficient way of querying and mutating data.

Todo Item Management: Users can create, read, update, and delete todo items.

UUID-based IDs: Each todo item is assigned a unique identifier using the UUID library.

### Dependencies

`@apollo/server`: A GraphQL server library for Node.js.

`graphql`: The GraphQL library for JavaScript.

`graphql-tag`: A library for parsing GraphQL tags.

`uuid`: A library for generating unique identifiers.

`jest`: A testing framework for JavaScript.

`ts-jest`: A Jest plugin for TypeScript.

`ts-node`: A TypeScript execution environment for Node.js.

`typescript`: The TypeScript compiler.

### Getting Started

Clone the repository: git clone https://github.com/SkyDmytro/graphql_server.git

Install dependencies: `npm install` or `yarn install`

Start the server: `npm run start` or `yarn start`

Open a GraphQL client (e.g., GraphQL Playground, Apollo Client) and connect to http://localhost:4000

API Documentation

The GraphQL schema is defined in `src/schemas/tasksSchema.ts`. You can use GraphQL queries and mutations to interact with the API.

### Queries

todoItems: Retrieves a list of all todo items.

todoItem(id: ID!): Retrieves a single todo item by ID.

### Mutations

createTodoItem(title: String!, description: String!): Creates a new todo item.

updateTodoItem(id: ID!, title: String, description: String): Updates an existing todo item.

deleteTodoItem(id: ID!): Deletes a todo item.

deleteAllTasks: Boolean!: Deletes all todos (mostly used for testing).

markAllTasksCompleted: Int!: Marks all todos as completed.

### Testing

Tests are written using Jest and can be run using npm run test or yarn test.