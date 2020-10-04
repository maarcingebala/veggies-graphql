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

export type Vegetable = {
  __typename?: 'Vegetable';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type Fruit = {
  __typename?: 'Fruit';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  email: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  vegetables: Array<Vegetable>;
  vegetable?: Maybe<Vegetable>;
  fruits: Array<Fruit>;
  fruit?: Maybe<Fruit>;
};


export type QueryVegetableArgs = {
  id: Scalars['ID'];
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
  Vegetable: ResolverTypeWrapper<Vegetable>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Fruit: ResolverTypeWrapper<Fruit>;
  User: ResolverTypeWrapper<User>;
  Query: ResolverTypeWrapper<{}>;
  Error: ResolverTypeWrapper<Error>;
  FruitInput: FruitInput;
  CreateFruit: ResolverTypeWrapper<CreateFruit>;
  UpdateFruit: ResolverTypeWrapper<UpdateFruit>;
  DeleteFruit: ResolverTypeWrapper<DeleteFruit>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Mutation: ResolverTypeWrapper<{}>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Vegetable: Vegetable;
  ID: Scalars['ID'];
  String: Scalars['String'];
  Fruit: Fruit;
  User: User;
  Query: {};
  Error: Error;
  FruitInput: FruitInput;
  CreateFruit: CreateFruit;
  UpdateFruit: UpdateFruit;
  DeleteFruit: DeleteFruit;
  Boolean: Scalars['Boolean'];
  Mutation: {};
};

export type VegetableResolvers<ContextType = any, ParentType extends ResolversParentTypes['Vegetable'] = ResolversParentTypes['Vegetable']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FruitResolvers<ContextType = any, ParentType extends ResolversParentTypes['Fruit'] = ResolversParentTypes['Fruit']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  vegetables?: Resolver<Array<ResolversTypes['Vegetable']>, ParentType, ContextType>;
  vegetable?: Resolver<Maybe<ResolversTypes['Vegetable']>, ParentType, ContextType, RequireFields<QueryVegetableArgs, 'id'>>;
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
};

export type Resolvers<ContextType = any> = {
  Vegetable?: VegetableResolvers<ContextType>;
  Fruit?: FruitResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Error?: ErrorResolvers<ContextType>;
  CreateFruit?: CreateFruitResolvers<ContextType>;
  UpdateFruit?: UpdateFruitResolvers<ContextType>;
  DeleteFruit?: DeleteFruitResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;