import { AuthenticationError } from "apollo-server";
import { TUser, Permission } from "./datasource";

export const checkPermission = (user: TUser, permission: Permission) => {
  const hasPerm = user && user.permissions.includes(permission);
  if (!hasPerm) {
    throw new AuthenticationError("No permissions to perform this action.");
  }
};
