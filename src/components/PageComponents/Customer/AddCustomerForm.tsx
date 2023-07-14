import { AddFormInput } from "../../GenericComponents/Types";
import { FormEvent, MouseEvent, useState } from "react";
import { useMutation } from "@apollo/client";
import {
  AddCustomerDocument,
  AddCustomerInput,
} from "../../../generated/graphql";
import { AddFormWithContext } from "../../GenericComponents/AddFormWithContext";

export default function AddCustomerForm(props: AddFormInput) {
  const [isVisible, setIsVisible] = useState(false);
  const [addCustomer, { loading, error, data }] =
    useMutation(AddCustomerDocument);

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    const addCustomerInput: AddCustomerInput = {
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

    addCustomer({ variables: { input: addCustomerInput } });
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
      header={"Add Customer"}
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
