# NestJS GraphQL with PNPM - Readme

## Overview

This repository contains a NestJS GraphQL project with three modules: `auth`, `user`, and `todo`. The project uses a MySQL database and integrates TypeORM for database operations. The Node.js version required is 20, and the NestJS version is 10.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/nestjs-graphql-pnpm.git
   cd nestjs-graphql-pnpm
   ```

2. **Install dependencies using PNPM:**

   ```bash
   pnpm install
   ```

## Configuration

### Database Configuration

1. Create a MySQL database for the project.

2. Configure the database connection in the `.env` file. Copy `.env.example` to `.env` and update the database connection details:

   ```env
   DB_TYPE=mysql
   DB_HOST=localhost
   DB_PORT=3306
   DB_USERNAME=root
   DB_PASSWORD=password
   DB_DATABASE=nestjs_graphql
   ```

## Running the Application

1. **Start the application:**

   ```bash
   pnpm start
   ```

2. The GraphQL endpoint will be available at `http://localhost:3000/graphql`.

## Postman Collection

Use the provided Postman collection to test the API endpoints. Import the collection using the following link:

[Postman Collection](your-postman-collection-link)

## Project Structure

The project is structured into three modules:

1. **Auth Module**: Handles authentication and authorization.

2. **User Module**: Manages user-related operations.

3. **Todo Module**: Deals with todo tasks.

Each module has its own set of GraphQL queries, mutations, and resolvers. The modular structure allows for easy expansion and maintenance.

## Important Commands

- **Start the application:**

  ```bash
  pnpm start
  ```

- **Lint the code:**

  ```bash
  pnpm run lint
  ```

- **Run tests:**

  ```bash
  pnpm test
  ```

## Contributing

## License
