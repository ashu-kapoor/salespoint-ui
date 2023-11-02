/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "query SearchCustomer($searchCustomerInput: SearchCustomerInput!) {\n  searchCustomer(input: $searchCustomerInput) {\n    id\n    firstName\n    lastName\n    email\n    amount\n  }\n}\n\nmutation AddCustomer($input: AddCustomerInput!) {\n  addCustomer(input: $input) {\n    id\n    firstName\n    lastName\n    email\n    amount\n  }\n}\n\nmutation UpdateCustomer($updateCustomerId: ID!, $updateCustomerRequest: AddCustomerInput!) {\n  updateCustomer(id: $updateCustomerId, request: $updateCustomerRequest) {\n    id\n    firstName\n    lastName\n    email\n    amount\n  }\n}": types.SearchCustomerDocument,
    "query GET_INVENTORIES {\n  inventories {\n    id\n    quantity\n    productName\n    price\n  }\n}\n\nquery SearchInventory($inventoryInput: SearchInventoryInput!) {\n  searchInventory(input: $inventoryInput) {\n    id\n    quantity\n    productName\n    price\n  }\n}\n\nmutation AddInventory($addInventoryInput: AddInventoryInput!) {\n  addInventory(input: $addInventoryInput) {\n    id\n    quantity\n    productName\n    price\n  }\n}\n\nmutation UpdateInventory($updateInventoryId: ID!, $updateInventoryInput: AddInventoryInput!) {\n  updateInventory(id: $updateInventoryId, request: $updateInventoryInput) {\n    id\n    quantity\n    productName\n    price\n  }\n}": types.Get_InventoriesDocument,
    "query SearchSalesForCustomer($searchSalesForCustomerInput: SearchSalesInput!) {\n  searchSales(input: $searchSalesForCustomerInput) {\n    amount\n    id\n    inventory {\n      productName\n      price\n    }\n    quantity\n    status\n    saga {\n      steps {\n        stepStatus\n        stepStage\n        reason\n        channel\n      }\n    }\n  }\n}\n\nquery SearchSales($searchSalesInput: SearchSalesInput!) {\n  searchSales(input: $searchSalesInput) {\n    amount\n    customer {\n      id\n      firstName\n      lastName\n      email\n      amount\n    }\n    id\n    inventory {\n      id\n      quantity\n      productName\n      price\n    }\n    quantity\n    status\n    saga {\n      currentChannel\n      currentStep\n      steps {\n        channel\n        stepInfo {\n          FORWARD {\n            command\n          }\n          COMPENSATE {\n            command\n          }\n        }\n        reason\n        stepStage\n        stepStatus\n      }\n    }\n  }\n}\n\nmutation CreateSales($addSalesInput: AddSalesInput!) {\n  createSales(input: $addSalesInput) {\n    id\n    status\n  }\n}": types.SearchSalesForCustomerDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query SearchCustomer($searchCustomerInput: SearchCustomerInput!) {\n  searchCustomer(input: $searchCustomerInput) {\n    id\n    firstName\n    lastName\n    email\n    amount\n  }\n}\n\nmutation AddCustomer($input: AddCustomerInput!) {\n  addCustomer(input: $input) {\n    id\n    firstName\n    lastName\n    email\n    amount\n  }\n}\n\nmutation UpdateCustomer($updateCustomerId: ID!, $updateCustomerRequest: AddCustomerInput!) {\n  updateCustomer(id: $updateCustomerId, request: $updateCustomerRequest) {\n    id\n    firstName\n    lastName\n    email\n    amount\n  }\n}"): (typeof documents)["query SearchCustomer($searchCustomerInput: SearchCustomerInput!) {\n  searchCustomer(input: $searchCustomerInput) {\n    id\n    firstName\n    lastName\n    email\n    amount\n  }\n}\n\nmutation AddCustomer($input: AddCustomerInput!) {\n  addCustomer(input: $input) {\n    id\n    firstName\n    lastName\n    email\n    amount\n  }\n}\n\nmutation UpdateCustomer($updateCustomerId: ID!, $updateCustomerRequest: AddCustomerInput!) {\n  updateCustomer(id: $updateCustomerId, request: $updateCustomerRequest) {\n    id\n    firstName\n    lastName\n    email\n    amount\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GET_INVENTORIES {\n  inventories {\n    id\n    quantity\n    productName\n    price\n  }\n}\n\nquery SearchInventory($inventoryInput: SearchInventoryInput!) {\n  searchInventory(input: $inventoryInput) {\n    id\n    quantity\n    productName\n    price\n  }\n}\n\nmutation AddInventory($addInventoryInput: AddInventoryInput!) {\n  addInventory(input: $addInventoryInput) {\n    id\n    quantity\n    productName\n    price\n  }\n}\n\nmutation UpdateInventory($updateInventoryId: ID!, $updateInventoryInput: AddInventoryInput!) {\n  updateInventory(id: $updateInventoryId, request: $updateInventoryInput) {\n    id\n    quantity\n    productName\n    price\n  }\n}"): (typeof documents)["query GET_INVENTORIES {\n  inventories {\n    id\n    quantity\n    productName\n    price\n  }\n}\n\nquery SearchInventory($inventoryInput: SearchInventoryInput!) {\n  searchInventory(input: $inventoryInput) {\n    id\n    quantity\n    productName\n    price\n  }\n}\n\nmutation AddInventory($addInventoryInput: AddInventoryInput!) {\n  addInventory(input: $addInventoryInput) {\n    id\n    quantity\n    productName\n    price\n  }\n}\n\nmutation UpdateInventory($updateInventoryId: ID!, $updateInventoryInput: AddInventoryInput!) {\n  updateInventory(id: $updateInventoryId, request: $updateInventoryInput) {\n    id\n    quantity\n    productName\n    price\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query SearchSalesForCustomer($searchSalesForCustomerInput: SearchSalesInput!) {\n  searchSales(input: $searchSalesForCustomerInput) {\n    amount\n    id\n    inventory {\n      productName\n      price\n    }\n    quantity\n    status\n    saga {\n      steps {\n        stepStatus\n        stepStage\n        reason\n        channel\n      }\n    }\n  }\n}\n\nquery SearchSales($searchSalesInput: SearchSalesInput!) {\n  searchSales(input: $searchSalesInput) {\n    amount\n    customer {\n      id\n      firstName\n      lastName\n      email\n      amount\n    }\n    id\n    inventory {\n      id\n      quantity\n      productName\n      price\n    }\n    quantity\n    status\n    saga {\n      currentChannel\n      currentStep\n      steps {\n        channel\n        stepInfo {\n          FORWARD {\n            command\n          }\n          COMPENSATE {\n            command\n          }\n        }\n        reason\n        stepStage\n        stepStatus\n      }\n    }\n  }\n}\n\nmutation CreateSales($addSalesInput: AddSalesInput!) {\n  createSales(input: $addSalesInput) {\n    id\n    status\n  }\n}"): (typeof documents)["query SearchSalesForCustomer($searchSalesForCustomerInput: SearchSalesInput!) {\n  searchSales(input: $searchSalesForCustomerInput) {\n    amount\n    id\n    inventory {\n      productName\n      price\n    }\n    quantity\n    status\n    saga {\n      steps {\n        stepStatus\n        stepStage\n        reason\n        channel\n      }\n    }\n  }\n}\n\nquery SearchSales($searchSalesInput: SearchSalesInput!) {\n  searchSales(input: $searchSalesInput) {\n    amount\n    customer {\n      id\n      firstName\n      lastName\n      email\n      amount\n    }\n    id\n    inventory {\n      id\n      quantity\n      productName\n      price\n    }\n    quantity\n    status\n    saga {\n      currentChannel\n      currentStep\n      steps {\n        channel\n        stepInfo {\n          FORWARD {\n            command\n          }\n          COMPENSATE {\n            command\n          }\n        }\n        reason\n        stepStage\n        stepStatus\n      }\n    }\n  }\n}\n\nmutation CreateSales($addSalesInput: AddSalesInput!) {\n  createSales(input: $addSalesInput) {\n    id\n    status\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;