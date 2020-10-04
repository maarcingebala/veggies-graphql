import { gql, makeExecutableSchema } from "apollo-server";
import { Resolvers } from "../generated/graphql";
import { checkPermission, Permission } from "../users";

const typeDefs = gql`
  type Vegetable {
    id: ID!
    name: String!
  }

  type Query {
    vegetables: [Vegetable!]!
    vegetable(id: ID!): Vegetable
  }

  type Error {
    message: String
  }

  input VegetableInput {
    name: String!
  }

  type CreateVegetable {
    vegetable: Vegetable
    errors: [Error!]
  }

  type UpdateVegetable {
    vegetable: Vegetable
    errors: [Error!]
  }

  type DeleteVegetable {
    success: Boolean!
    errors: [Error!]
  }

  type Mutation {
    createVegetable(input: VegetableInput!): CreateVegetable!
    updateVegetable(id: ID!, input: VegetableInput!): UpdateVegetable!
    deleteVegetable(id: ID!): DeleteVegetable!
  }
`;

const resolvers: Resolvers = {
  Query: {
    vegetables: (_, __, { dataSources }) => dataSources.vegetables.all(),
    vegetable: (_, args, { dataSources }) =>
      dataSources.vegetables.get(args.id),
  },
  Mutation: {
    createVegetable: async (_, { input }, { dataSources }) => {
      const vegetable = await dataSources.vegetables.create(input);
      return { vegetable, errors: [] };
    },
    updateVegetable: async (_, { id, input }, { dataSources, user }) => {
      checkPermission(user, Permission.MANAGE_VEGETABLES);
      const vegetable = await dataSources.vegetables.update(id, input);
      return { vegetable: vegetable, errors: [] };
    },
    deleteVegetable: async (_, { id }, { dataSources, user }) => {
      checkPermission(user, Permission.MANAGE_VEGETABLES);
      const success = await dataSources.vegetables.delete(id);
      return { success, errors: [] };
    },
  },
};

export const schema = makeExecutableSchema({ typeDefs, resolvers });
