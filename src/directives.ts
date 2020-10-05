import { AuthenticationError, SchemaDirectiveVisitor } from "apollo-server";
import { GraphQLField, defaultFieldResolver } from "graphql";

export class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: GraphQLField<any, any>) {
    const { resolve = defaultFieldResolver } = field;
    // get optional permission from directive args
    const permission = this.args.permission;

    field.resolve = async function (...args) {
      const context = args[2];
      const user = context.user;
      if (!user) {
        throw new AuthenticationError(
          "You need to be authenticated to use the API"
        );
      }
      if (permission && !user.permissions.includes(permission)) {
        throw new AuthenticationError("No permissions to perform this action");
      }
      return await resolve.apply(this, args);
    };
  }
}
