import { gql, makeExecutableSchema } from "apollo-server";
import { Resolvers } from "../generated/graphql";
import { AuthDirective } from "../directives";

const typeDefs = gql`
  directive @auth(permission: Permission) on FIELD_DEFINITION

  enum Permission {
    MANAGE_FRUITS
    MANAGE_VEGETABLES
  }

  type Fruit {
    id: ID!
    name: String!
  }

  type Query {
    fruits: [Fruit!]! @auth
    fruit(id: ID!): Fruit @auth
  }

  type Error {
    message: String
  }

  input FruitInput {
    name: String!
  }

  type CreateFruit {
    fruit: Fruit
    errors: [Error!]
  }

  type UpdateFruit {
    fruit: Fruit
    errors: [Error!]
  }

  type DeleteFruit {
    success: Boolean!
    errors: [Error!]
  }

  type Mutation {
    createFruit(input: FruitInput!): CreateFruit! @auth
    updateFruit(id: ID!, input: FruitInput!): UpdateFruit!
      @auth(permission: MANAGE_FRUITS)
    deleteFruit(id: ID!): DeleteFruit! @auth(permission: MANAGE_FRUITS)
  }
`;

const resolvers: Resolvers = {
  Query: {
    fruits: (_, __, { dataSources }) => dataSources.fruits.all(),
    fruit: (_, args, { dataSources }) => dataSources.fruits.get(args.id),
  },
  Mutation: {
    createFruit: async (_, { input }, { dataSources }) => {
      const fruit = await dataSources.fruits.create(input);
      return { fruit, errors: [] };
    },
    updateFruit: async (_, { id, input }, { dataSources }) => {
      const fruit = await dataSources.fruits.update(id, input);
      return { fruit: fruit, errors: [] };
    },
    deleteFruit: async (_, { id }, { dataSources }) => {
      const success = await dataSources.fruits.delete(id);
      return { success, errors: [] };
    },
  },
};

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  schemaDirectives: { auth: AuthDirective },
});
