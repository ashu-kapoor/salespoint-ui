import { AddFormInput } from "../../GenericComponents/Types";
import { FormEvent, MouseEvent, useState } from "react";
import {
  getApolloContext,
  useApolloClient,
  useLazyQuery,
  useMutation,
} from "@apollo/client";
import {
  AddInventoryDocument,
  AddInventoryInput,
  AddSalesInput,
  CreateSalesDocument,
  Inventory,
  SearchInventoryDocument,
} from "../../../generated/graphql";
import { AddFormWithContext } from "../../GenericComponents/AddFormWithContext";
import { AddOrderFormContext } from "./AddOrderFormContext";
import UserService from "../../../security/UserService";

export default function AddOrderForm(props: Readonly<AddFormInput>) {
  const [isVisible, setIsVisible] = useState(false);
  const [addSales, { loading, error, data }] = useMutation(
    CreateSalesDocument,
    {
      context: {
        headers: {
          authorization: UserService.getInstance().getToken()
            ? `Bearer ${UserService.getInstance().getToken()}`
            : "",
        },
      },
      onError: () => {},
    }
  );
  const apolloClient = useApolloClient();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const productId = (
      event.currentTarget.elements.namedItem(
        "inventoryId-input"
      ) as HTMLInputElement
    ).getAttribute("data-selectedid")!;

    const customerId = (
      event.currentTarget.elements.namedItem(
        "customerId-input"
      ) as HTMLInputElement
    ).getAttribute("data-selectedid")!;

    const quantity = Number(
      (
        event.currentTarget.elements.namedItem(
          "quantity-input"
        ) as HTMLInputElement
      ).value
    );

    const response = await apolloClient.query({
      query: SearchInventoryDocument,
      variables: {
        inventoryInput: {
          fields: ["id"],
          searchTerm: productId,
        },
      },
      context: {
        headers: {
          authorization: UserService.getInstance().getToken()
            ? `Bearer ${UserService.getInstance().getToken()}`
            : "",
        },
      },
    });

    let inventoryData: Inventory | undefined;

    if (response.data) {
      inventoryData = response.data.searchInventory?.at(0);
    } else {
      throw response.error;
    }

    const addSalesInput: AddSalesInput = {
      amount: Number(inventoryData!.price),
      productId,
      customerId,
      quantity,
    };

    addSales({ variables: { addSalesInput } });
  }

  function handleFormOpen(event: MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.stopPropagation();
    event.preventDefault();
    setIsVisible(true);
  }

  function handleFormClose(event: MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();
    setIsVisible(false);
  }

  return (
    <AddOrderFormContext
      header={"Place Order"}
      isVisible={isVisible}
      loading={loading}
      onModalOpenClick={handleFormOpen}
      onModalClose={handleFormClose}
      dataPresent={data ? true : false}
      metaData={props.metaData}
      onSubmit={handleSubmit}
      error={error}
    />
  );
}
