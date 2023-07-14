import { AddFormInput } from "../../GenericComponents/Types";
import { FormEvent, MouseEvent, useState } from "react";
import { useMutation } from "@apollo/client";
import {
  AddInventoryDocument,
  AddInventoryInput,
} from "../../../generated/graphql";
import { AddFormWithContext } from "../../GenericComponents/AddFormWithContext";

export default function AddInventoryForm(props: AddFormInput) {
  const [isVisible, setIsVisible] = useState(false);
  const [addInventory, { loading, error, data }] =
    useMutation(AddInventoryDocument);

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    const addInventoryInput: AddInventoryInput = {
      price: Number(
        (
          event.currentTarget.elements.namedItem(
            "price-input"
          ) as HTMLInputElement
        ).value
      ),
      productName: (
        event.currentTarget.elements.namedItem(
          "productName-input"
        ) as HTMLInputElement
      ).value,
      quantity: Number(
        (
          event.currentTarget.elements.namedItem(
            "quantity-input"
          ) as HTMLInputElement
        ).value
      ),
    };

    addInventory({ variables: { addInventoryInput } });
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
    <AddFormWithContext
      header={"Add Inventory"}
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
