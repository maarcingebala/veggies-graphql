import { DataSource } from "apollo-datasource";
import { VegetableInput } from "../generated/graphql";

export interface IVegetableDataSource {
  create(input: VegetableInput): any;
  all(): any;
  get(id: string): any;
  update(id: string, input: VegetableInput): any;
  delete(id: string): Promise<boolean>;
}

export class VegetablesDataSource
  extends DataSource
  implements IVegetableDataSource {
  store: any;

  constructor({ store }: any) {
    super();
    this.store = store;
  }

  async create(input: VegetableInput) {
    return await this.store.vegetables.create({ name: input.name });
  }

  async all() {
    return await this.store.vegetables.findAll();
  }

  async get(id: string) {
    return await this.store.vegetables.findByPk(id);
  }

  async update(id: string, input: VegetableInput) {
    await this.store.vegetables.update({ name: input.name }, { where: { id } });
    return this.get(id);
  }

  async delete(id: string) {
    const rows = await this.store.vegetables.destroy({ where: { id } });
    return rows === 1;
  }
}
