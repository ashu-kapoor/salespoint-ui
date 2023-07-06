/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AddCustomerInput = {
  amount: Scalars['Int']['input'];
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
};

export type AddInventoryInput = {
  price: Scalars['Float']['input'];
  productName: Scalars['String']['input'];
  quantity: Scalars['Int']['input'];
};

export type AddSalesInput = {
  amount: Scalars['Float']['input'];
  customerId: Scalars['String']['input'];
  productId: Scalars['String']['input'];
  quantity: Scalars['Int']['input'];
};

export type Command = {
  __typename?: 'Command';
  command: Scalars['String']['output'];
};

export type Customer = {
  __typename?: 'Customer';
  amount: Scalars['Float']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
};

export type Inventory = {
  __typename?: 'Inventory';
  id: Scalars['ID']['output'];
  price: Scalars['Float']['output'];
  productName: Scalars['String']['output'];
  quantity: Scalars['Int']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addCustomer?: Maybe<Customer>;
  addInventory?: Maybe<Inventory>;
  createSales?: Maybe<Sales>;
  updateCustomer?: Maybe<Customer>;
  updateInventory?: Maybe<Inventory>;
};


export type MutationAddCustomerArgs = {
  input: AddCustomerInput;
};


export type MutationAddInventoryArgs = {
  input: AddInventoryInput;
};


export type MutationCreateSalesArgs = {
  input: AddSalesInput;
};


export type MutationUpdateCustomerArgs = {
  id: Scalars['ID']['input'];
  request: AddCustomerInput;
};


export type MutationUpdateInventoryArgs = {
  id: Scalars['ID']['input'];
  request: AddInventoryInput;
};

export type Query = {
  __typename?: 'Query';
  customer?: Maybe<Customer>;
  customers?: Maybe<Array<Customer>>;
  inventories?: Maybe<Array<Inventory>>;
  inventory?: Maybe<Inventory>;
  sale?: Maybe<Sales>;
  searchCustomer?: Maybe<Array<Customer>>;
  searchInventory?: Maybe<Array<Inventory>>;
  searchSales?: Maybe<Array<Sales>>;
};


export type QueryCustomerArgs = {
  id: Scalars['ID']['input'];
};


export type QueryInventoryArgs = {
  id: Scalars['ID']['input'];
};


export type QuerySaleArgs = {
  id: Scalars['ID']['input'];
};


export type QuerySearchCustomerArgs = {
  input: SearchCustomerInput;
};


export type QuerySearchInventoryArgs = {
  input: SearchInventoryInput;
};


export type QuerySearchSalesArgs = {
  input: SearchSalesInput;
};

export type Saga = {
  __typename?: 'Saga';
  currentChannel: Scalars['String']['output'];
  currentStep: Scalars['Int']['output'];
  steps: Array<Steps>;
};

export type Sales = {
  __typename?: 'Sales';
  amount: Scalars['Float']['output'];
  customer?: Maybe<Customer>;
  customerId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  inventory?: Maybe<Inventory>;
  productId: Scalars['String']['output'];
  quantity: Scalars['Int']['output'];
  saga?: Maybe<Saga>;
  status?: Maybe<Scalars['String']['output']>;
};

export type SearchCustomerInput = {
  fields?: InputMaybe<Array<Scalars['String']['input']>>;
  filter?: InputMaybe<Scalars['String']['input']>;
  searchTerm?: InputMaybe<Scalars['String']['input']>;
};

export type SearchInventoryInput = {
  fields?: InputMaybe<Array<Scalars['String']['input']>>;
  filter?: InputMaybe<Scalars['String']['input']>;
  searchTerm?: InputMaybe<Scalars['String']['input']>;
};

export type SearchSalesInput = {
  fields?: InputMaybe<Array<Scalars['String']['input']>>;
  filter?: InputMaybe<Scalars['String']['input']>;
  searchTerm?: InputMaybe<Scalars['String']['input']>;
};

export type StepInfo = {
  __typename?: 'StepInfo';
  COMPENSATE?: Maybe<Command>;
  FORWARD: Command;
};

export type Steps = {
  __typename?: 'Steps';
  channel: Scalars['String']['output'];
  reason: Scalars['String']['output'];
  stepInfo: StepInfo;
  stepStage: Scalars['String']['output'];
  stepStatus: Scalars['String']['output'];
};

export type Get_InventoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type Get_InventoriesQuery = { __typename?: 'Query', inventories?: Array<{ __typename?: 'Inventory', id: string, quantity: number, productName: string, price: number }> | null };

export type SearchInventoryQueryVariables = Exact<{
  inventoryInput: SearchInventoryInput;
}>;


export type SearchInventoryQuery = { __typename?: 'Query', searchInventory?: Array<{ __typename?: 'Inventory', id: string, quantity: number, productName: string, price: number }> | null };

export type AddInventoryMutationVariables = Exact<{
  addInventoryInput: AddInventoryInput;
}>;


export type AddInventoryMutation = { __typename?: 'Mutation', addInventory?: { __typename?: 'Inventory', id: string, quantity: number, productName: string, price: number } | null };


export const Get_InventoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GET_INVENTORIES"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"inventories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"productName"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}}]}}]} as unknown as DocumentNode<Get_InventoriesQuery, Get_InventoriesQueryVariables>;
export const SearchInventoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchInventory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"inventoryInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SearchInventoryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchInventory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"inventoryInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"productName"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}}]}}]} as unknown as DocumentNode<SearchInventoryQuery, SearchInventoryQueryVariables>;
export const AddInventoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddInventory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"addInventoryInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddInventoryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addInventory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"addInventoryInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"productName"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}}]}}]} as unknown as DocumentNode<AddInventoryMutation, AddInventoryMutationVariables>;