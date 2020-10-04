import { DataSource } from "apollo-datasource";
import jwt from "jsonwebtoken";

const JWT_SECRET = "secret";

export type TUser = {
  email: string;
  password: string;
  permissions: Array<Permission>;
};

export type TPayloadJWT = {
  iat?: number;
  email: string;
};

export enum Permission {
  MANAGE_FRUITS = "MANAGE_FRUITS",
  MANAGE_VEGETABLES = "MANAGE_VEGETABLES",
}

interface IUserDataSource {
  authenticate(email: string, password: string): TUser | null;
  createToken(user: TUser): string;
  getUser(email: string): TUser | null;
}

export class UsersDataSource extends DataSource implements IUserDataSource {
  store: TUser[] = [
    {
      email: "admin@example.com",
      password: "secret",
      permissions: [Permission.MANAGE_FRUITS, Permission.MANAGE_VEGETABLES],
    },
    {
      email: "owocnik@example.com",
      password: "secret",
      permissions: [Permission.MANAGE_FRUITS],
    },
    {
      email: "warzywnik@example.com",
      password: "secret",
      permissions: [Permission.MANAGE_VEGETABLES],
    },
  ];

  authenticate(email: string, password: string) {
    const user = this.getUser(email);
    if (user && user.password === password) {
      return user;
    }
    return null;
  }

  createToken(user: TUser) {
    const payload: TPayloadJWT = { email: user.email };
    return jwt.sign(payload, JWT_SECRET);
  }

  getUserFromToken(token: string) {
    const decoded = <TPayloadJWT>jwt.verify(token, JWT_SECRET);
    return this.getUser(decoded.email);
  }

  getUser(email: string) {
    return this.store.find((user) => user.email === email);
  }
}
