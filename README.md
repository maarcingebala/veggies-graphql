Demo GraphQL API in Apollo Server and Typescript.

# Installation

The project was built and tested with Node.js 14.13.0 and Typescript 4.0.3.

1. Install dependencies:

```shell
$ npm i
```

2. Build the project:

```shell
$ npm run build
```

3. Start the server:

```shell
$ npm start
```

4. Application should be running on `http://localhost:4000/`.

# Usage

## Authentication

There are three users predefined in the application:

- admin@example.com - can view and manage fruits and vegetables.
- owocnik@example.com - can view and manage fruits; can view and create vegetables; cannot update and delete vegetables.
- warzywnik@example.com - can view and manage vegetables; can view and create fruits; cannot update and delete fruits.

To authenticate as one of these users run the `tokenCreate` mutation (all users have password `secret`):

```graphql
mutation {
  tokenCreate(email: "admin@example.com", password: "secret") {
    user {
      email
      permissions
    }
    token
    errors {
      message
    }
  }
}
```

Response:

```json
{
  "data": {
    "tokenCreate": {
      "user": {
        "email": "admin@example.com",
        "permissions": ["MANAGE_FRUITS", "MANAGE_VEGETABLES"]
      },
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGV4YW1wbGUuY29tIiwiaWF0IjoxNjAxODMyMjkxfQ.FXUMtI4TrCpwpPr1ERvjPNaiBUW2ewTiD3mUG8LgVcU",
      "errors": []
    }
  }
}
```

Use the returned `token` to authenticate subsequent requests as this user by providing the Authorization header in this format:

```json
{
  "Authorization": "JWT token"
}
```

You can test if you're authenticated by running the query to return user data:

```graphql
{
  me {
    email
    permissions
  }
}
```

## Queries

Get list of fruits:

```graphql
{
  fruits {
    id
    name
  }
}
```

Get a single fruit by ID:

```graphql
{
  fruit(id: 5) {
    id
    name
  }
}
```

Use similar queries `vegetables` and `vegetable` to get vegetables data.

# Mutations

Create a new fruit:

```graphql
mutation {
  createFruit(input: { name: "Banana" }) {
    fruit {
      id
      name
    }
  }
}
```

Update a fruit:

```graphql
mutation {
  updateFruit(id: "5", input: { name: "Orange" }) {
    fruit {
      id
      name
    }
  }
}
```

Delete a fruit:

```graphql
mutation {
  deleteFruit(id: "5") {
    success
  }
}
```

Use similar mutations `createVegetable`, `updateVegetable` and `deleteVegetable` to manage vegetables.
