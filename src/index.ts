import { ApolloServer } from "apollo-server";
import { DataSources } from "apollo-server-core/dist/graphqlOptions";
import { mergeSchemas } from "@graphql-tools/merge";
import { Sequelize, DataTypes } from "sequelize";
import { FruitsDataSource, IFruitDataSource } from "./fruits/datasource";
import { schema as fruitsSchema } from "./fruits/schema";

export interface IDataSources {
  fruits: IFruitDataSource;
}

export interface IContext {
  dataSources: IDataSources;
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
  db.sync();
  return { db, fruits };
};

const store = createStore();

const dataSources: DataSources<IDataSources> = {
  fruits: new FruitsDataSource({ store }),
};

const schema = mergeSchemas({ schemas: [fruitsSchema] });
const server = new ApolloServer({ schema, dataSources: () => dataSources });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
