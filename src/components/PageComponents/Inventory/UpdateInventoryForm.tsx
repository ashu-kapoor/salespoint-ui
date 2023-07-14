import { UpdateFormProps } from "../../GenericComponents/Types";
import { FormEvent } from "react";
import { useMutation } from "@apollo/client";
import {
  AddInventoryInput,
  UpdateInventoryDocument,
} from "../../../generated/graphql";
import UpdateForm from "../../GenericComponents/UpdateForm";

export default function UpdateInventoryForm(props: UpdateFormProps) {
  const [updateInventory, { loading, error, data }] = useMutation(
    UpdateInventoryDocument
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    const updateInventoryInput: AddInventoryInput = {
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

    const updateInventoryId = (
      event.currentTarget.elements.namedItem("id-input") as HTMLInputElement
    ).value;

    updateInventory({ variables: { updateInventoryInput, updateInventoryId } });
  }

  return (
    <UpdateForm
      onSubmit={handleSubmit}
      data={props.data}
      metadata={props.metadata}
      loading={loading}
      error={error}
      dataPresent={data ? true : false}
    />
  );
}
