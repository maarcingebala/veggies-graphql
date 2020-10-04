import { gql, makeExecutableSchema } from "apollo-server";
import { Resolvers, Error } from "../generated/graphql";

const typeDefs = gql`
  type Error {
    message: String
  }

  enum Permission {
    MANAGE_FRUITS
    MANAGE_VEGETABLES
  }

  type User {
    email: String!
    permissions: [Permission!]
  }

  type TokenCreate {
    user: User
    token: String
    errors: [Error!]
  }

  type Query {
    me: User
  }

  type Mutation {
    tokenCreate(email: String!, password: String!): TokenCreate!
  }
`;

const resolvers: Resolvers = {
  Query: {
    me: (_, __, { user }) => user,
  },
  Mutation: {
    tokenCreate: (_, { email, password }, { dataSources }) => {
      let token = "";
      let errors: Array<Error> = [];
      const user = dataSources.users.authenticate(email, password);
      if (user) {
        token = dataSources.users.createToken(user);
      } else {
        errors.push({ message: "Please provide valid credentials" });
      }
      return { user, token, errors };
    },
  },
};

export const schema = makeExecutableSchema({ typeDefs, resolvers });
