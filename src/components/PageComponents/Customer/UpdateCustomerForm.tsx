import { UpdateFormProps } from "../../GenericComponents/Types";
import { FormEvent } from "react";
import { useMutation } from "@apollo/client";
import {
  AddCustomerInput,
  UpdateCustomerDocument,
} from "../../../generated/graphql";
import UpdateForm from "../../GenericComponents/UpdateForm";

export default function UpdateCustomerForm(props: UpdateFormProps) {
  const [updateCustomer, { loading, error, data }] = useMutation(
    UpdateCustomerDocument
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    const updateCustomerRequest: AddCustomerInput = {
      amount: Number(
        (
          event.currentTarget.elements.namedItem(
            "amount-input"
          ) as HTMLInputElement
        ).value
      ),
      firstName: (
        event.currentTarget.elements.namedItem(
          "firstName-input"
        ) as HTMLInputElement
      ).value,
      lastName: (
        event.currentTarget.elements.namedItem(
          "lastName-input"
        ) as HTMLInputElement
      ).value,
      email: (
        event.currentTarget.elements.namedItem(
          "email-input"
        ) as HTMLInputElement
      ).value,
    };

    const updateCustomerId = (
      event.currentTarget.elements.namedItem("id-input") as HTMLInputElement
    ).value;

    updateCustomer({ variables: { updateCustomerRequest, updateCustomerId } });
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
