import { DataSource } from "apollo-datasource";
import { FruitInput } from "../generated/graphql";

export interface IFruitDataSource {
  create(input: FruitInput): any;
  all(): any;
  get(id: string): any;
  update(id: string, input: FruitInput): any;
  delete(id: string): Promise<boolean>;
}

export class FruitsDataSource extends DataSource implements IFruitDataSource {
  store: any;

  constructor({ store }: any) {
    super();
    this.store = store;
  }

  async create(input: FruitInput) {
    return await this.store.fruits.create({ name: input.name });
  }

  async all() {
    return await this.store.fruits.findAll();
  }

  async get(id: string) {
    return await this.store.fruits.findByPk(id);
  }

  async update(id: string, input: FruitInput) {
    await this.store.fruits.update({ name: input.name }, { where: { id } });
    return this.get(id);
  }

  async delete(id: string) {
    const rows = await this.store.fruits.destroy({ where: { id } });
    return rows === 1;
  }
}
