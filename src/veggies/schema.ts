import { gql, makeExecutableSchema } from "apollo-server";
import { Resolvers } from "../generated/graphql";
import { AuthDirective } from "../directives";

const typeDefs = gql`
  directive @auth(permission: Permission) on FIELD_DEFINITION

  enum Permission {
    MANAGE_FRUITS
    MANAGE_VEGETABLES
  }

  type Vegetable {
    id: ID!
    name: String!
  }

  type Query {
    vegetables: [Vegetable!]! @auth
    vegetable(id: ID!): Vegetable @auth
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
    createVegetable(input: VegetableInput!): CreateVegetable! @auth
    updateVegetable(id: ID!, input: VegetableInput!): UpdateVegetable!
      @auth(permission: MANAGE_VEGETABLES)
    deleteVegetable(id: ID!): DeleteVegetable!
      @auth(permission: MANAGE_VEGETABLES)
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
    updateVegetable: async (_, { id, input }, { dataSources }) => {
      const vegetable = await dataSources.vegetables.update(id, input);
      return { vegetable: vegetable, errors: [] };
    },
    deleteVegetable: async (_, { id }, { dataSources }) => {
      const success = await dataSources.vegetables.delete(id);
      return { success, errors: [] };
    },
  },
};

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  schemaDirectives: { auth: AuthDirective },
});
