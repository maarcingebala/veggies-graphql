import { ApolloServer } from "apollo-server";
import { mergeSchemas } from "@graphql-tools/merge";
import { Sequelize, DataTypes } from "sequelize";
import { fruitsSchema, FruitsDataSource, IFruitDataSource } from "./fruits";
import { usersSchema, UsersDataSource } from "./users";
import {
  vegetablesSchema,
  VegetablesDataSource,
  IVegetableDataSource,
} from "./veggies";

export interface IDataSources {
  fruits: IFruitDataSource;
  users: any;
  vegetables: IVegetableDataSource;
}

const createStore = () => {
  const db = new Sequelize({
    dialect: "sqlite",
    storage: "./db.sqlite",
    logging: console.log,
  });
  const fruits = db.define("Fruit", {
    name: { type: DataTypes.STRING, allowNull: false },
  });
  const vegetables = db.define("Vegetable", {
    name: { type: DataTypes.STRING, allowNull: false },
  });
  db.sync();
  return { db, fruits, vegetables };
};

const store = createStore();

const dataSources = {
  fruits: new FruitsDataSource({ store }),
  users: new UsersDataSource(),
  vegetables: new VegetablesDataSource({ store }),
};

const context = ({ req }: any) => {
  let user = null;
  const auth: string = (req.headers && req.headers.authorization) || "";
  if (auth) {
    const [prefix, token] = auth.split(" ", 2);
    if (prefix === "JWT") {
      user = dataSources.users.getUserFromToken(token);
    }
  }
  return { user };
};

const schema = mergeSchemas({
  schemas: [fruitsSchema, usersSchema, vegetablesSchema],
});
const server = new ApolloServer({
  schema,
  dataSources: () => dataSources,
  context,
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
