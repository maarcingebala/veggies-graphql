import { gql, makeExecutableSchema } from "apollo-server";
import { Resolvers } from "../generated/graphql";

const typeDefs = gql`
  type Fruit {
    id: ID!
    name: String!
  }

  type Query {
    fruits: [Fruit!]!
    fruit(id: ID!): Fruit
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
    createFruit(input: FruitInput!): CreateFruit!
    updateFruit(id: ID!, input: FruitInput!): UpdateFruit!
    deleteFruit(id: ID!): DeleteFruit!
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

export const schema = makeExecutableSchema({ typeDefs, resolvers });
