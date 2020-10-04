import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Fruit = {
  __typename?: 'Fruit';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  fruits: Array<Fruit>;
  fruit?: Maybe<Fruit>;
};


export type QueryFruitArgs = {
  id: Scalars['ID'];
};

export type Error = {
  __typename?: 'Error';
  message?: Maybe<Scalars['String']>;
};

export type FruitInput = {
  name: Scalars['String'];
};

export type CreateFruit = {
  __typename?: 'CreateFruit';
  fruit?: Maybe<Fruit>;
  errors?: Maybe<Array<Error>>;
};

export type UpdateFruit = {
  __typename?: 'UpdateFruit';
  fruit?: Maybe<Fruit>;
  errors?: Maybe<Array<Error>>;
};

export type DeleteFruit = {
  __typename?: 'DeleteFruit';
  success: Scalars['Boolean'];
  errors?: Maybe<Array<Error>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createFruit: CreateFruit;
  updateFruit: UpdateFruit;
  deleteFruit: DeleteFruit;
  tokenCreate: TokenCreate;
};


export type MutationCreateFruitArgs = {
  input: FruitInput;
};


export type MutationUpdateFruitArgs = {
  id: Scalars['ID'];
  input: FruitInput;
};


export type MutationDeleteFruitArgs = {
  id: Scalars['ID'];
};


export type MutationTokenCreateArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export enum Permission {
  ManageFruits = 'MANAGE_FRUITS',
  ManageVegetables = 'MANAGE_VEGETABLES'
}

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  permissions?: Maybe<Array<Permission>>;
};

export type TokenCreate = {
  __typename?: 'TokenCreate';
  user?: Maybe<User>;
  token?: Maybe<Scalars['String']>;
  errors?: Maybe<Array<Error>>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Fruit: ResolverTypeWrapper<Fruit>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Query: ResolverTypeWrapper<{}>;
  Error: ResolverTypeWrapper<Error>;
  FruitInput: FruitInput;
  CreateFruit: ResolverTypeWrapper<CreateFruit>;
  UpdateFruit: ResolverTypeWrapper<UpdateFruit>;
  DeleteFruit: ResolverTypeWrapper<DeleteFruit>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Mutation: ResolverTypeWrapper<{}>;
  Permission: Permission;
  User: ResolverTypeWrapper<User>;
  TokenCreate: ResolverTypeWrapper<TokenCreate>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Fruit: Fruit;
  ID: Scalars['ID'];
  String: Scalars['String'];
  Query: {};
  Error: Error;
  FruitInput: FruitInput;
  CreateFruit: CreateFruit;
  UpdateFruit: UpdateFruit;
  DeleteFruit: DeleteFruit;
  Boolean: Scalars['Boolean'];
  Mutation: {};
  User: User;
  TokenCreate: TokenCreate;
};

export type FruitResolvers<ContextType = any, ParentType extends ResolversParentTypes['Fruit'] = ResolversParentTypes['Fruit']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  fruits?: Resolver<Array<ResolversTypes['Fruit']>, ParentType, ContextType>;
  fruit?: Resolver<Maybe<ResolversTypes['Fruit']>, ParentType, ContextType, RequireFields<QueryFruitArgs, 'id'>>;
};

export type ErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['Error'] = ResolversParentTypes['Error']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateFruitResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateFruit'] = ResolversParentTypes['CreateFruit']> = {
  fruit?: Resolver<Maybe<ResolversTypes['Fruit']>, ParentType, ContextType>;
  errors?: Resolver<Maybe<Array<ResolversTypes['Error']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateFruitResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateFruit'] = ResolversParentTypes['UpdateFruit']> = {
  fruit?: Resolver<Maybe<ResolversTypes['Fruit']>, ParentType, ContextType>;
  errors?: Resolver<Maybe<Array<ResolversTypes['Error']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteFruitResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteFruit'] = ResolversParentTypes['DeleteFruit']> = {
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  errors?: Resolver<Maybe<Array<ResolversTypes['Error']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createFruit?: Resolver<ResolversTypes['CreateFruit'], ParentType, ContextType, RequireFields<MutationCreateFruitArgs, 'input'>>;
  updateFruit?: Resolver<ResolversTypes['UpdateFruit'], ParentType, ContextType, RequireFields<MutationUpdateFruitArgs, 'id' | 'input'>>;
  deleteFruit?: Resolver<ResolversTypes['DeleteFruit'], ParentType, ContextType, RequireFields<MutationDeleteFruitArgs, 'id'>>;
  tokenCreate?: Resolver<ResolversTypes['TokenCreate'], ParentType, ContextType, RequireFields<MutationTokenCreateArgs, 'email' | 'password'>>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  permissions?: Resolver<Maybe<Array<ResolversTypes['Permission']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TokenCreateResolvers<ContextType = any, ParentType extends ResolversParentTypes['TokenCreate'] = ResolversParentTypes['TokenCreate']> = {
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  errors?: Resolver<Maybe<Array<ResolversTypes['Error']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Fruit?: FruitResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Error?: ErrorResolvers<ContextType>;
  CreateFruit?: CreateFruitResolvers<ContextType>;
  UpdateFruit?: UpdateFruitResolvers<ContextType>;
  DeleteFruit?: DeleteFruitResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  TokenCreate?: TokenCreateResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
